import type {
  Extension,
  PGliteInterface,
  Results,
  Transaction,
} from '../interface'
import type {
  LiveNamespace,
  LiveQueryReturn,
  LiveChangesReturn,
  Change,
} from './interface'
import { uuid, formatQuery } from '../utils.js'

const MAX_RETRIES = 5

const setup = async (pg: PGliteInterface, _emscriptenOpts: any) => {
  // The notify triggers are only ever added and never removed
  // Keep track of which triggers have been added to avoid adding them multiple times
  const tableNotifyTriggersAdded = new Set<string>()

  const namespaceObj: LiveNamespace = {
    async query<T>(
      query: string,
      params: any[] | undefined | null,
      callback: (results: Results<T>) => void,
    ) {
      const id = uuid().replace(/-/g, '')

      let results: Results<T>
      let tables: { table_name: string; schema_name: string }[]

      const init = async () => {
        await pg.transaction(async (tx) => {
          // Create a temporary view with the query
          const formattedQuery = await formatQuery(pg, query, params, tx)
          await tx.query(
            `CREATE OR REPLACE TEMP VIEW live_query_${id}_view AS ${formattedQuery}`,
          )

          // Get the tables used in the view and add triggers to notify when they change
          tables = await getTablesForView(tx, `live_query_${id}_view`)
          await addNotifyTriggersToTables(tx, tables, tableNotifyTriggersAdded)

          // Create prepared statement to get the results
          await tx.exec(`
            PREPARE live_query_${id}_get AS
            SELECT * FROM live_query_${id}_view;
          `)

          // Get the initial results
          results = await tx.query<T>(`EXECUTE live_query_${id}_get;`)
        })
      }
      await init()

      // Function to refresh the query
      const refresh = async (count = 0) => {
        try {
          results = await pg.query<T>(`EXECUTE live_query_${id}_get;`)
        } catch (e) {
          const msg = (e as Error).message
          if (
            msg === `prepared statement "live_query_${id}_get" does not exist`
          ) {
            // If the prepared statement does not exist, reset and try again
            // This can happen if using the multi-tab worker
            if (count > MAX_RETRIES) {
              throw e
            }
            await init()
            refresh(count + 1)
          } else {
            throw e
          }
        }
        callback(results)
      }

      // Setup the listeners
      const unsubList: Array<() => Promise<void>> = await Promise.all(
        tables!.map((table) =>
          pg.listen(
            `table_change__${table.schema_name}__${table.table_name}`,
            async () => {
              refresh()
            },
          ),
        ),
      )

      // Function to unsubscribe from the query
      const unsubscribe = async () => {
        await Promise.all(unsubList.map((unsub) => unsub()))
        await pg.exec(`
            DROP VIEW IF EXISTS live_query_${id}_view;
            DEALLOCATE live_query_${id}_get;
          `)
      }

      // Run the callback with the initial results
      callback(results!)

      // Return the initial results
      return {
        initialResults: results!,
        unsubscribe,
        refresh,
      } satisfies LiveQueryReturn<T>
    },

    async changes<T>(
      query: string,
      params: any[] | undefined | null,
      key: string,
      callback: (changes: Array<Change<T>>) => void,
    ) {
      const id = uuid().replace(/-/g, '')

      let tables: { table_name: string; schema_name: string }[]
      let stateSwitch: 1 | 2 = 1
      let changes: Results<Change<T>>

      const init = async () => {
        await pg.transaction(async (tx) => {
          // Create a temporary view with the query
          const formattedQuery = await formatQuery(pg, query, params, tx)
          await tx.query(
            `CREATE OR REPLACE TEMP VIEW live_query_${id}_view AS ${formattedQuery}`,
          )

          // Get the tables used in the view and add triggers to notify when they change
          tables = await getTablesForView(tx, `live_query_${id}_view`)
          await addNotifyTriggersToTables(tx, tables, tableNotifyTriggersAdded)

          // Get the columns of the view
          const columns = [
            ...(
              await tx.query<any>(`
                SELECT column_name, data_type, udt_name
                FROM information_schema.columns 
                WHERE table_name = 'live_query_${id}_view'
              `)
            ).rows,
            { column_name: '__after__', data_type: 'integer' },
          ]

          // Init state tables as empty temp table
          await tx.exec(`
            CREATE TEMP TABLE live_query_${id}_state1 (LIKE live_query_${id}_view INCLUDING ALL);
            CREATE TEMP TABLE live_query_${id}_state2 (LIKE live_query_${id}_view INCLUDING ALL);
          `)

          // Create Diff views and prepared statements
          for (const curr of [1, 2]) {
            const prev = curr === 1 ? 2 : 1
            await tx.exec(`
              PREPARE live_query_${id}_diff${curr} AS
              WITH
                prev AS (SELECT LAG("${key}") OVER () as __after__, * FROM live_query_${id}_state${prev}),
                curr AS (SELECT LAG("${key}") OVER () as __after__, * FROM live_query_${id}_state${curr}),
                data_diff AS (
                  -- INSERT operations: Include all columns
                  SELECT 
                    'INSERT' AS __op__,
                    ${columns
                      .map(
                        ({ column_name }) =>
                          `curr."${column_name}" AS "${column_name}"`,
                      )
                      .join(',\n')},
                    ARRAY[]::text[] AS __changed_columns__
                  FROM curr
                  LEFT JOIN prev ON curr.${key} = prev.${key}
                  WHERE prev.${key} IS NULL
                UNION ALL
                  -- DELETE operations: Include only the primary key
                  SELECT 
                    'DELETE' AS __op__,
                    ${columns
                      .map(({ column_name, data_type, udt_name }) => {
                        if (column_name === key) {
                          return `prev."${column_name}" AS "${column_name}"`
                        } else {
                          return `NULL${data_type === 'USER-DEFINED' ? `::${udt_name}` : ``} AS "${column_name}"`
                        }
                      })
                      .join(',\n')},
                      ARRAY[]::text[] AS __changed_columns__
                  FROM prev
                  LEFT JOIN curr ON prev.${key} = curr.${key}
                  WHERE curr.${key} IS NULL
                UNION ALL
                  -- UPDATE operations: Include only changed columns
                  SELECT 
                    'UPDATE' AS __op__,
                    ${columns
                      .map(({ column_name, data_type, udt_name }) =>
                        column_name === key
                          ? `curr."${column_name}" AS "${column_name}"`
                          : `CASE 
                              WHEN curr."${column_name}" IS DISTINCT FROM prev."${column_name}" 
                              THEN curr."${column_name}"
                              ELSE NULL${data_type === 'USER-DEFINED' ? `::${udt_name}` : ``}
                              END AS "${column_name}"`,
                      )
                      .join(',\n')},
                      ARRAY(SELECT unnest FROM unnest(ARRAY[${columns
                        .filter(({ column_name }) => column_name !== key)
                        .map(
                          ({ column_name }) =>
                            `CASE
                              WHEN curr."${column_name}" IS DISTINCT FROM prev."${column_name}" 
                              THEN '${column_name}' 
                              ELSE NULL 
                              END`,
                        )
                        .join(
                          ', ',
                        )}]) WHERE unnest IS NOT NULL) AS __changed_columns__
                  FROM curr
                  INNER JOIN prev ON curr.${key} = prev.${key}
                  WHERE NOT (curr IS NOT DISTINCT FROM prev)
                )
              SELECT * FROM data_diff;
            `)
          }
        })
      }

      await init()

      const refresh = async () => {
        let reset = false
        for (let i = 0; i < 5; i++) {
          try {
            await pg.transaction(async (tx) => {
              // Populate the state table
              await tx.exec(`
                DELETE FROM live_query_${id}_state${stateSwitch};
                INSERT INTO live_query_${id}_state${stateSwitch} 
                  SELECT * FROM live_query_${id}_view;
              `)

              // Get the changes
              changes = await tx.query<any>(
                `EXECUTE live_query_${id}_diff${stateSwitch};`,
              )
            })
            break
          } catch (e) {
            const msg = (e as Error).message
            if (
              msg ===
              `relation "live_query_${id}_state${stateSwitch}" does not exist`
            ) {
              // If the state table does not exist, reset and try again
              // This can happen if using the multi-tab worker
              reset = true
              await init()
              continue
            } else {
              throw e
            }
          }
        }

        // Switch state
        stateSwitch = stateSwitch === 1 ? 2 : 1

        callback([
          ...(reset
            ? [
                {
                  __op__: 'RESET' as const,
                },
              ]
            : []),
          ...changes!.rows,
        ])
      }

      // Setup the listeners
      const unsubList: Array<() => Promise<void>> = await Promise.all(
        tables!.map((table) =>
          pg.listen(
            `table_change__${table.schema_name}__${table.table_name}`,
            async () => refresh(),
          ),
        ),
      )

      // Function to unsubscribe from the query
      const unsubscribe = async () => {
        await Promise.all(unsubList.map((unsub) => unsub()))
        await pg.exec(`
          DROP VIEW IF EXISTS live_query_${id}_view;
          DROP TABLE IF EXISTS live_query_${id}_state1;
          DROP TABLE IF EXISTS live_query_${id}_state2;
          DEALLOCATE live_query_${id}_diff1;
          DEALLOCATE live_query_${id}_diff2;
        `)
      }

      // Run the callback with the initial changes
      await refresh()

      // Fields
      const fields = changes!.fields.filter(
        (field) =>
          !['__after__', '__op__', '__changed_columns__'].includes(field.name),
      )

      // Return the initial results
      return {
        fields,
        initialChanges: changes!.rows,
        unsubscribe,
        refresh,
      } satisfies LiveChangesReturn<T>
    },

    async incrementalQuery<T>(
      query: string,
      params: any[] | undefined | null,
      key: string,
      callback: (results: Results<T>) => void,
    ) {
      const rowsMap: Map<any, any> = new Map()
      const afterMap: Map<any, any> = new Map()
      let lastRows: T[] = []
      let firstRun = true

      const { fields, unsubscribe, refresh } = await namespaceObj.changes<T>(
        query,
        params,
        key,
        (changes) => {
          // Process the changes
          for (const change of changes) {
            const {
              __op__: op,
              __changed_columns__: changedColumns,
              ...obj
            } = change as typeof change & { [key: string]: any }
            switch (op) {
              case 'RESET':
                rowsMap.clear()
                afterMap.clear()
                break
              case 'INSERT':
                rowsMap.set(obj[key], obj)
                afterMap.set(obj.__after__, obj[key])
                break
              case 'DELETE': {
                const oldObj = rowsMap.get(obj[key])
                rowsMap.delete(obj[key])
                afterMap.delete(oldObj.__after__)
                break
              }
              case 'UPDATE': {
                const newObj = { ...(rowsMap.get(obj[key]) ?? {}) }
                for (const columnName of changedColumns) {
                  newObj[columnName] = obj[columnName]
                  if (columnName === '__after__') {
                    afterMap.set(obj.__after__, obj[key])
                  }
                }
                rowsMap.set(obj[key], newObj)
                break
              }
            }
          }

          // Get the rows in order
          const rows: T[] = []
          let lastKey: any = null
          for (let i = 0; i < rowsMap.size; i++) {
            const nextKey = afterMap.get(lastKey)
            const obj = rowsMap.get(nextKey)
            if (!obj) {
              break
            }
            // Remove the __after__ key from the exposed row
            const cleanObj = { ...obj }
            delete cleanObj.__after__
            rows.push(cleanObj)
            lastKey = nextKey
          }
          lastRows = rows

          // Run the callback
          if (!firstRun) {
            callback({
              rows,
              fields,
            })
          }
        },
      )

      firstRun = false
      callback({
        rows: lastRows,
        fields,
      })

      return {
        initialResults: {
          rows: lastRows,
          fields,
        },
        unsubscribe,
        refresh,
      } satisfies LiveQueryReturn<T>
    },
  }

  return {
    namespaceObj,
  }
}

export const live = {
  name: 'Live Queries',
  setup,
} satisfies Extension

export type PGliteWithLive = PGliteInterface & {
  live: LiveNamespace
}

/**
 * Get a list of all the tables used in a view
 * @param tx a transaction or or PGlite instance
 * @param viewName the name of the view
 * @returns list of tables used in the view
 */
async function getTablesForView(
  tx: Transaction | PGliteInterface,
  viewName: string,
): Promise<{ table_name: string; schema_name: string }[]> {
  return (
    await tx.query<{
      table_name: string
      schema_name: string
    }>(
      `
        SELECT DISTINCT
          cl.relname AS table_name,
          n.nspname AS schema_name
        FROM pg_rewrite r
        JOIN pg_depend d ON r.oid = d.objid
        JOIN pg_class cl ON d.refobjid = cl.oid
        JOIN pg_namespace n ON cl.relnamespace = n.oid
        WHERE
        r.ev_class = (
            SELECT oid FROM pg_class WHERE relname = $1 AND relkind = 'v'
        )
        AND d.deptype = 'n';
      `,
      [viewName],
    )
  ).rows.filter((row) => row.table_name !== viewName)
}

/**
 * Add triggers to tables to notify when they change
 * @param tx a transaction or PGlite instance
 * @param tables list of tables to add triggers to
 */
async function addNotifyTriggersToTables(
  tx: Transaction | PGliteInterface,
  tables: { table_name: string; schema_name: string }[],
  tableNotifyTriggersAdded: Set<string>,
) {
  const triggers = tables
    .filter(
      (table) =>
        !tableNotifyTriggersAdded.has(
          `${table.schema_name}_${table.table_name}`,
        ),
    )
    .map((table) => {
      return `
      CREATE OR REPLACE FUNCTION "_notify_${table.schema_name}_${table.table_name}"() RETURNS TRIGGER AS $$
      BEGIN
        PERFORM pg_notify('table_change__${table.schema_name}__${table.table_name}', '');
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;
      CREATE OR REPLACE TRIGGER "_notify_trigger_${table.schema_name}_${table.table_name}"
      AFTER INSERT OR UPDATE OR DELETE ON "${table.schema_name}"."${table.table_name}"
      FOR EACH STATEMENT EXECUTE FUNCTION "_notify_${table.schema_name}_${table.table_name}"();
      `
    })
    .join('\n')
  if (triggers.trim() !== '') {
    await tx.exec(triggers)
  }
  tables.map((table) =>
    tableNotifyTriggersAdded.add(`${table.schema_name}_${table.table_name}`),
  )
}

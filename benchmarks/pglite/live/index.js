import{c as p}from"../chunk-UFY2I7FG.js";import{i as I}from"../chunk-ZYB3MGPW.js";I();var O=5,h=async(u,A)=>{let $=new Set,y={async query(s,S,t){let _=p().replace(/-/g,""),e,c,o=async()=>{await u.transaction(async r=>{await r.query(`CREATE OR REPLACE TEMP VIEW live_query_${_}_view AS ${s}`,S??[]),c=await d(r,`live_query_${_}_view`),await w(r,c,$),await r.exec(`
            PREPARE live_query_${_}_get AS
            SELECT * FROM live_query_${_}_view;
          `),e=await r.query(`EXECUTE live_query_${_}_get;`)})};await o();let l=async(r=0)=>{try{e=await u.query(`EXECUTE live_query_${_}_get;`)}catch(R){if(R.message==`prepared statement "live_query_${_}_get" does not exist`){if(r>O)throw R;await o(),l(r+1)}else throw R}t(e)},T=[];for(let r of c){let R=await u.listen(`table_change__${r.schema_name}__${r.table_name}`,async()=>{l()});T.push(R)}let f=async()=>{for(let r of T)await r();await u.exec(`
          DROP VIEW IF EXISTS live_query_${_}_view;
          DEALLOCATE live_query_${_}_get;
        `)};return t(e),{initialResults:e,unsubscribe:f,refresh:l}},async changes(s,S,t,_){let e=p().replace(/-/g,""),c,o=1,l,T=async()=>{await u.transaction(async n=>{await n.query(`CREATE OR REPLACE TEMP VIEW live_query_${e}_view AS ${s}`,S??[]),c=await d(n,`live_query_${e}_view`),await w(n,c,$);let i=[...(await n.query(`
                SELECT column_name, data_type, udt_name
                FROM information_schema.columns 
                WHERE table_name = 'live_query_${e}_view'
              `)).rows,{column_name:"__after__",data_type:"integer"}];await n.exec(`
            CREATE TEMP TABLE live_query_${e}_state1 (LIKE live_query_${e}_view INCLUDING ALL);
            CREATE TEMP TABLE live_query_${e}_state2 (LIKE live_query_${e}_view INCLUDING ALL);
          `);for(let E of[1,2]){let v=E===1?2:1;await n.exec(`
              PREPARE live_query_${e}_diff${E} AS
              WITH
                prev AS (SELECT LAG("${t}") OVER () as __after__, * FROM live_query_${e}_state${v}),
                curr AS (SELECT LAG("${t}") OVER () as __after__, * FROM live_query_${e}_state${E}),
                data_diff AS (
                  -- INSERT operations: Include all columns
                  SELECT 
                    'INSERT' AS __op__,
                    ${i.map(({column_name:a})=>`curr."${a}" AS "${a}"`).join(`,
`)},
                    ARRAY[]::text[] AS __changed_columns__
                  FROM curr
                  LEFT JOIN prev ON curr.${t} = prev.${t}
                  WHERE prev.${t} IS NULL
                UNION ALL
                  -- DELETE operations: Include only the primary key
                  SELECT 
                    'DELETE' AS __op__,
                    ${i.map(({column_name:a,data_type:m,udt_name:L})=>a===t?`prev."${a}" AS "${a}"`:`NULL::${m=="USER-DEFINED"?L:m} AS "${a}"`).join(`,
`)},
                      ARRAY[]::text[] AS __changed_columns__
                  FROM prev
                  LEFT JOIN curr ON prev.${t} = curr.${t}
                  WHERE curr.${t} IS NULL
                UNION ALL
                  -- UPDATE operations: Include only changed columns
                  SELECT 
                    'UPDATE' AS __op__,
                    ${i.map(({column_name:a,data_type:m,udt_name:L})=>a===t?`curr."${a}" AS "${a}"`:`CASE 
                              WHEN curr."${a}" IS DISTINCT FROM prev."${a}" 
                              THEN curr."${a}"
                              ELSE NULL::${m=="USER-DEFINED"?L:m} 
                              END AS "${a}"`).join(`,
`)},
                      ARRAY(SELECT unnest FROM unnest(ARRAY[${i.filter(({column_name:a})=>a!==t).map(({column_name:a})=>`CASE
                              WHEN curr."${a}" IS DISTINCT FROM prev."${a}" 
                              THEN '${a}' 
                              ELSE NULL 
                              END`).join(", ")}]) WHERE unnest IS NOT NULL) AS __changed_columns__
                  FROM curr
                  INNER JOIN prev ON curr.${t} = prev.${t}
                  WHERE NOT (curr IS NOT DISTINCT FROM prev)
                )
              SELECT * FROM data_diff;
            `)}})};await T();let f=async()=>{let n=!1;for(let i=0;i<5;i++)try{await u.transaction(async E=>{await E.exec(`
                DELETE FROM live_query_${e}_state${o};
                INSERT INTO live_query_${e}_state${o} 
                  SELECT * FROM live_query_${e}_view;
              `),l=await E.query(`EXECUTE live_query_${e}_diff${o};`)});break}catch(E){if(E.message==`relation "live_query_${e}_state${o}" does not exist`){n=!0,await T();continue}else throw E}o=o===1?2:1,_([...n?[{__op__:"RESET"}]:[],...l.rows])},r=[];for(let n of c){let i=await u.listen(`table_change__${n.schema_name}__${n.table_name}`,async()=>{f()});r.push(i)}let R=async()=>{for(let n of r)await n();await u.exec(`
          DROP VIEW IF EXISTS live_query_${e}_view;
          DROP TABLE IF EXISTS live_query_${e}_state1;
          DROP TABLE IF EXISTS live_query_${e}_state2;
          DEALLOCATE live_query_${e}_diff1;
          DEALLOCATE live_query_${e}_diff2;
        `)};return await f(),{fields:l.fields.filter(n=>!["__after__","__op__","__changed_columns__"].includes(n.name)),initialChanges:l.rows,unsubscribe:R,refresh:f}},async incrementalQuery(s,S,t,_){let e=new Map,c=new Map,o=[],l=!0,{fields:T,unsubscribe:f,refresh:r}=await y.changes(s,S,t,R=>{for(let i of R){let{__op__:E,__changed_columns__:v,...a}=i;switch(E){case"RESET":e.clear(),c.clear();break;case"INSERT":e.set(a[t],a),c.set(a.__after__,a[t]);break;case"DELETE":let m=e.get(a[t]);e.delete(a[t]),c.delete(m.__after__);break;case"UPDATE":let L={...e.get(a[t])??{}};for(let N of v)L[N]=a[N],N==="__after__"&&c.set(a.__after__,a[t]);e.set(a[t],L);break}}let g=[],n=null;for(;;){let i=c.get(n),E=e.get(i);if(!E)break;g.push(E),n=i}o=g,l||_({rows:g,fields:T})});return l=!1,_({rows:o,fields:T}),{initialResults:{rows:o,fields:T},unsubscribe:f,refresh:r}}};return{namespaceObj:y}},D={name:"Live Queries",setup:h};async function d(u,A){return(await u.query(`
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
      `,[A])).rows.filter($=>$.table_name!==A)}async function w(u,A,$){let y=A.filter(s=>!$.has(`${s.schema_name}_${s.table_name}`)).map(s=>`
      CREATE OR REPLACE FUNCTION _notify_${s.schema_name}_${s.table_name}() RETURNS TRIGGER AS $$
      BEGIN
        PERFORM pg_notify('table_change__${s.schema_name}__${s.table_name}', '');
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;
      CREATE OR REPLACE TRIGGER _notify_trigger_${s.schema_name}_${s.table_name}
      AFTER INSERT OR UPDATE OR DELETE ON ${s.schema_name}.${s.table_name}
      FOR EACH STATEMENT EXECUTE FUNCTION _notify_${s.schema_name}_${s.table_name}();
      `).join(`
`);y.trim()!==""&&await u.exec(y),A.map(s=>$.add(`${s.schema_name}_${s.table_name}`))}export{D as live};
//# sourceMappingURL=index.js.map
import{h as I,j as d}from"../chunk-RZJOGGMK.js";d();I();var h=async(E,f)=>{let $=0,A=new Set,s={async query(y,m,a){let i=$++,e,c;await E.transaction(async r=>{await r.query(`CREATE OR REPLACE TEMP VIEW live_query_${i}_view AS ${y}`,m??[]),c=await p(r,`live_query_${i}_view`),await O(r,c,A),await r.exec(`
          PREPARE live_query_${i}_get AS
          SELECT * FROM live_query_${i}_view;
        `),e=await r.query(`EXECUTE live_query_${i}_get;`)});let u=async()=>{e=await E.query(`EXECUTE live_query_${i}_get;`),a(e)},o=[];for(let r of c){let v=await E.listen(`table_change__${r.schema_name}__${r.table_name}`,async()=>{u()});o.push(v)}let l=async()=>{for(let r of o)await r();await E.exec(`
          DROP VIEW IF EXISTS live_query_${i}_view;
          DEALLOCATE live_query_${i}_get;
        `)};return a(e),{initialResults:e,unsubscribe:l,refresh:u}},async changes(y,m,a,i){let e=$++,c,u=1,o;await E.transaction(async t=>{await t.query(`CREATE OR REPLACE TEMP VIEW live_query_${e}_view AS ${y}`,m??[]),c=await p(t,`live_query_${e}_view`),await O(t,c,A);let T=[...(await t.query(`
              SELECT column_name, data_type 
              FROM information_schema.columns 
              WHERE table_name = 'live_query_${e}_view'
            `)).rows,{column_name:"__after__",data_type:"integer"}];await t.exec(`
          CREATE TEMP TABLE live_query_${e}_state1 (LIKE live_query_${e}_view INCLUDING ALL);
          CREATE TEMP TABLE live_query_${e}_state2 (LIKE live_query_${e}_view INCLUDING ALL);
        `);for(let R of[1,2]){let L=R===1?2:1;await t.exec(`
            PREPARE live_query_${e}_diff${R} AS
            WITH
              prev AS (SELECT LAG("${a}") OVER () as __after__, * FROM live_query_${e}_state${L}),
              curr AS (SELECT LAG("${a}") OVER () as __after__, * FROM live_query_${e}_state${R}),
              data_diff AS (
                -- INSERT operations: Include all columns
                SELECT 
                  'INSERT' AS __op__,
                  ${T.map(({column_name:n})=>`curr."${n}" AS "${n}"`).join(`,
`)},
                  ARRAY[]::text[] AS __changed_columns__
                FROM curr
                LEFT JOIN prev ON curr.${a} = prev.${a}
                WHERE prev.${a} IS NULL
              UNION ALL
                -- DELETE operations: Include only the primary key
                SELECT 
                  'DELETE' AS __op__,
                  ${T.map(({column_name:n,data_type:_})=>n===a?`prev."${n}" AS "${n}"`:`NULL::${_} AS "${n}"`).join(`,
`)},
                    ARRAY[]::text[] AS __changed_columns__
                FROM prev
                LEFT JOIN curr ON prev.${a} = curr.${a}
                WHERE curr.${a} IS NULL
              UNION ALL
                -- UPDATE operations: Include only changed columns
                SELECT 
                  'UPDATE' AS __op__,
                  ${T.map(({column_name:n,data_type:_})=>n===a?`curr."${n}" AS "${n}"`:`CASE 
                            WHEN curr."${n}" IS DISTINCT FROM prev."${n}" 
                            THEN curr."${n}"
                            ELSE NULL::${_} 
                            END AS "${n}"`).join(`,
`)},
                    ARRAY(SELECT unnest FROM unnest(ARRAY[${T.filter(({column_name:n})=>n!==a).map(({column_name:n})=>`CASE
                            WHEN curr."${n}" IS DISTINCT FROM prev."${n}" 
                            THEN '${n}' 
                            ELSE NULL 
                            END`).join(", ")}]) WHERE unnest IS NOT NULL) AS __changed_columns__
                FROM curr
                INNER JOIN prev ON curr.${a} = prev.${a}
                WHERE NOT (curr IS NOT DISTINCT FROM prev)
              )
            SELECT * FROM data_diff;
          `)}});let l=async()=>{await E.transaction(async t=>{await t.exec(`
            DELETE FROM live_query_${e}_state${u};
            INSERT INTO live_query_${e}_state${u} 
              SELECT * FROM live_query_${e}_view;
          `),o=await t.query(`EXECUTE live_query_${e}_diff${u};`)}),u=u===1?2:1,i(o.rows)},r=[];for(let t of c){let T=await E.listen(`table_change__${t.schema_name}__${t.table_name}`,async()=>{l()});r.push(T)}let v=async()=>{for(let t of r)await t();await E.exec(`
          DROP VIEW IF EXISTS live_query_${e}_view;
          DROP TABLE IF EXISTS live_query_${e}_state1;
          DROP TABLE IF EXISTS live_query_${e}_state2;
          DEALLOCATE live_query_${e}_diff1;
          DEALLOCATE live_query_${e}_diff2;
        `)};return await l(),{fields:o.fields.filter(t=>!["__after__","__op__","__changed_columns__"].includes(t.name)),initialChanges:o.rows,unsubscribe:v,refresh:l}},async incrementalQuery(y,m,a,i){let e=new Map,c=new Map,u=[],o=!0,{fields:l,unsubscribe:r,refresh:v}=await s.changes(y,m,a,N=>{for(let R of N){let{__op__:L,__changed_columns__:n,..._}=R;switch(L){case"INSERT":e.set(_[a],_),c.set(_.__after__,_[a]);break;case"DELETE":let w=e.get(_[a]);e.delete(_[a]),c.delete(w.__after__);break;case"UPDATE":let g={...e.get(_[a])??{}};for(let S of n)g[S]=_[S],S==="__after__"&&c.set(_.__after__,_[a]);e.set(_[a],g);break}}let t=[],T=null;for(;;){let R=c.get(T),L=e.get(R);if(!L)break;t.push(L),T=R}u=t,o||i({rows:t,fields:l})});return o=!1,i({rows:u,fields:l}),{initialResults:{rows:u,fields:l},unsubscribe:r,refresh:v}}};return{namespaceObj:s}},b={name:"Live Queries",setup:h};async function p(E,f){return(await E.query(`
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
      `,[f])).rows.filter($=>$.table_name!==f)}async function O(E,f,$){let A=f.filter(s=>!$.has(`${s.schema_name}_${s.table_name}`)).map(s=>`
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
`);A.trim()!==""&&await E.exec(A),f.map(s=>$.add(`${s.schema_name}_${s.table_name}`))}export{b as live};
//# sourceMappingURL=index.js.map
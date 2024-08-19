import{c as g,d}from"../chunk-WV37ZJ3Z.js";import{i as I}from"../chunk-TTNLE7CV.js";I();var h=5,C=async(l,A)=>{let y=new Set,v={async query(s,S,t){let E=g().replace(/-/g,""),e,c,o=async()=>{await l.transaction(async n=>{let T=await d(n,s,S);await n.query(`CREATE OR REPLACE TEMP VIEW live_query_${E}_view AS ${T}`),c=await w(n,`live_query_${E}_view`),await O(n,c,y),await n.exec(`
            PREPARE live_query_${E}_get AS
            SELECT * FROM live_query_${E}_view;
          `),e=await n.query(`EXECUTE live_query_${E}_get;`)})};await o();let u=async(n=0)=>{try{e=await l.query(`EXECUTE live_query_${E}_get;`)}catch(T){if(T.message===`prepared statement "live_query_${E}_get" does not exist`){if(n>h)throw T;await o(),u(n+1)}else throw T}t(e)},f=await Promise.all(c.map(n=>l.listen(`table_change__${n.schema_name}__${n.table_name}`,async()=>{u()}))),L=async()=>{await Promise.all(f.map(n=>n())),await l.exec(`
            DROP VIEW IF EXISTS live_query_${E}_view;
            DEALLOCATE live_query_${E}_get;
          `)};return t(e),{initialResults:e,unsubscribe:L,refresh:u}},async changes(s,S,t,E){let e=g().replace(/-/g,""),c,o=1,u,f=async()=>{await l.transaction(async r=>{let R=await d(r,s,S);await r.query(`CREATE OR REPLACE TEMP VIEW live_query_${e}_view AS ${R}`),c=await w(r,`live_query_${e}_view`),await O(r,c,y);let _=[...(await r.query(`
                SELECT column_name, data_type, udt_name
                FROM information_schema.columns 
                WHERE table_name = 'live_query_${e}_view'
              `)).rows,{column_name:"__after__",data_type:"integer"}];await r.exec(`
            CREATE TEMP TABLE live_query_${e}_state1 (LIKE live_query_${e}_view INCLUDING ALL);
            CREATE TEMP TABLE live_query_${e}_state2 (LIKE live_query_${e}_view INCLUDING ALL);
          `);for(let $ of[1,2]){let i=$===1?2:1;await r.exec(`
              PREPARE live_query_${e}_diff${$} AS
              WITH
                prev AS (SELECT LAG("${t}") OVER () as __after__, * FROM live_query_${e}_state${i}),
                curr AS (SELECT LAG("${t}") OVER () as __after__, * FROM live_query_${e}_state${$}),
                data_diff AS (
                  -- INSERT operations: Include all columns
                  SELECT 
                    'INSERT' AS __op__,
                    ${_.map(({column_name:a})=>`curr."${a}" AS "${a}"`).join(`,
`)},
                    ARRAY[]::text[] AS __changed_columns__
                  FROM curr
                  LEFT JOIN prev ON curr.${t} = prev.${t}
                  WHERE prev.${t} IS NULL
                UNION ALL
                  -- DELETE operations: Include only the primary key
                  SELECT 
                    'DELETE' AS __op__,
                    ${_.map(({column_name:a,data_type:m,udt_name:N})=>a===t?`prev."${a}" AS "${a}"`:`NULL::${m==="USER-DEFINED"?N:m} AS "${a}"`).join(`,
`)},
                      ARRAY[]::text[] AS __changed_columns__
                  FROM prev
                  LEFT JOIN curr ON prev.${t} = curr.${t}
                  WHERE curr.${t} IS NULL
                UNION ALL
                  -- UPDATE operations: Include only changed columns
                  SELECT 
                    'UPDATE' AS __op__,
                    ${_.map(({column_name:a,data_type:m,udt_name:N})=>a===t?`curr."${a}" AS "${a}"`:`CASE 
                              WHEN curr."${a}" IS DISTINCT FROM prev."${a}" 
                              THEN curr."${a}"
                              ELSE NULL::${m==="USER-DEFINED"?N:m} 
                              END AS "${a}"`).join(`,
`)},
                      ARRAY(SELECT unnest FROM unnest(ARRAY[${_.filter(({column_name:a})=>a!==t).map(({column_name:a})=>`CASE
                              WHEN curr."${a}" IS DISTINCT FROM prev."${a}" 
                              THEN '${a}' 
                              ELSE NULL 
                              END`).join(", ")}]) WHERE unnest IS NOT NULL) AS __changed_columns__
                  FROM curr
                  INNER JOIN prev ON curr.${t} = prev.${t}
                  WHERE NOT (curr IS NOT DISTINCT FROM prev)
                )
              SELECT * FROM data_diff;
            `)}})};await f();let L=async()=>{let r=!1;for(let R=0;R<5;R++)try{await l.transaction(async _=>{await _.exec(`
                DELETE FROM live_query_${e}_state${o};
                INSERT INTO live_query_${e}_state${o} 
                  SELECT * FROM live_query_${e}_view;
              `),u=await _.query(`EXECUTE live_query_${e}_diff${o};`)});break}catch(_){if(_.message===`relation "live_query_${e}_state${o}" does not exist`){r=!0,await f();continue}else throw _}o=o===1?2:1,E([...r?[{__op__:"RESET"}]:[],...u.rows])},n=await Promise.all(c.map(r=>l.listen(`table_change__${r.schema_name}__${r.table_name}`,async()=>L()))),T=async()=>{await Promise.all(n.map(r=>r())),await l.exec(`
          DROP VIEW IF EXISTS live_query_${e}_view;
          DROP TABLE IF EXISTS live_query_${e}_state1;
          DROP TABLE IF EXISTS live_query_${e}_state2;
          DEALLOCATE live_query_${e}_diff1;
          DEALLOCATE live_query_${e}_diff2;
        `)};return await L(),{fields:u.fields.filter(r=>!["__after__","__op__","__changed_columns__"].includes(r.name)),initialChanges:u.rows,unsubscribe:T,refresh:L}},async incrementalQuery(s,S,t,E){let e=new Map,c=new Map,o=[],u=!0,{fields:f,unsubscribe:L,refresh:n}=await v.changes(s,S,t,T=>{for(let R of T){let{__op__:_,__changed_columns__:$,...i}=R;switch(_){case"RESET":e.clear(),c.clear();break;case"INSERT":e.set(i[t],i),c.set(i.__after__,i[t]);break;case"DELETE":{let a=e.get(i[t]);e.delete(i[t]),c.delete(a.__after__);break}case"UPDATE":{let a={...e.get(i[t])??{}};for(let m of $)a[m]=i[m],m==="__after__"&&c.set(i.__after__,i[t]);e.set(i[t],a);break}}}let p=[],r=null;for(let R=0;R<e.size;R++){let _=c.get(r),$=e.get(_);if(!$)break;let i={...$};delete i.__after__,p.push(i),r=_}o=p,u||E({rows:p,fields:f})});return u=!1,E({rows:o,fields:f}),{initialResults:{rows:o,fields:f},unsubscribe:L,refresh:n}}};return{namespaceObj:v}},b={name:"Live Queries",setup:C};async function w(l,A){return(await l.query(`
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
      `,[A])).rows.filter(y=>y.table_name!==A)}async function O(l,A,y){let v=A.filter(s=>!y.has(`${s.schema_name}_${s.table_name}`)).map(s=>`
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
`);v.trim()!==""&&await l.exec(v),A.map(s=>y.add(`${s.schema_name}_${s.table_name}`))}export{b as live};
//# sourceMappingURL=index.js.map
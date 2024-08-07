import{c as g,d}from"../chunk-YDFRG4OI.js";import{i as I}from"../chunk-ZYB3MGPW.js";I();var h=5,C=async(l,v)=>{let y=new Set,S={async query(s,p,a){let E=g().replace(/-/g,""),e,c,o=async()=>{await l.transaction(async n=>{let T=await d(n,s,p);await n.query(`CREATE OR REPLACE TEMP VIEW live_query_${E}_view AS ${T}`),c=await w(n,`live_query_${E}_view`),await O(n,c,y),await n.exec(`
            PREPARE live_query_${E}_get AS
            SELECT * FROM live_query_${E}_view;
          `),e=await n.query(`EXECUTE live_query_${E}_get;`)})};await o();let u=async(n=0)=>{try{e=await l.query(`EXECUTE live_query_${E}_get;`)}catch(T){if(T.message==`prepared statement "live_query_${E}_get" does not exist`){if(n>h)throw T;await o(),u(n+1)}else throw T}a(e)},m=await Promise.all(c.map(n=>l.listen(`table_change__${n.schema_name}__${n.table_name}`,async()=>{u()}))),L=async()=>{await Promise.all(m.map(n=>n())),await l.exec(`
            DROP VIEW IF EXISTS live_query_${E}_view;
            DEALLOCATE live_query_${E}_get;
          `)};return a(e),{initialResults:e,unsubscribe:L,refresh:u}},async changes(s,p,a,E){let e=g().replace(/-/g,""),c,o=1,u,m=async()=>{await l.transaction(async r=>{let R=await d(r,s,p);await r.query(`CREATE OR REPLACE TEMP VIEW live_query_${e}_view AS ${R}`),c=await w(r,`live_query_${e}_view`),await O(r,c,y);let _=[...(await r.query(`
                SELECT column_name, data_type, udt_name
                FROM information_schema.columns 
                WHERE table_name = 'live_query_${e}_view'
              `)).rows,{column_name:"__after__",data_type:"integer"}];await r.exec(`
            CREATE TEMP TABLE live_query_${e}_state1 (LIKE live_query_${e}_view INCLUDING ALL);
            CREATE TEMP TABLE live_query_${e}_state2 (LIKE live_query_${e}_view INCLUDING ALL);
          `);for(let $ of[1,2]){let i=$===1?2:1;await r.exec(`
              PREPARE live_query_${e}_diff${$} AS
              WITH
                prev AS (SELECT LAG("${a}") OVER () as __after__, * FROM live_query_${e}_state${i}),
                curr AS (SELECT LAG("${a}") OVER () as __after__, * FROM live_query_${e}_state${$}),
                data_diff AS (
                  -- INSERT operations: Include all columns
                  SELECT 
                    'INSERT' AS __op__,
                    ${_.map(({column_name:t})=>`curr."${t}" AS "${t}"`).join(`,
`)},
                    ARRAY[]::text[] AS __changed_columns__
                  FROM curr
                  LEFT JOIN prev ON curr.${a} = prev.${a}
                  WHERE prev.${a} IS NULL
                UNION ALL
                  -- DELETE operations: Include only the primary key
                  SELECT 
                    'DELETE' AS __op__,
                    ${_.map(({column_name:t,data_type:f,udt_name:A})=>t===a?`prev."${t}" AS "${t}"`:`NULL::${f=="USER-DEFINED"?A:f} AS "${t}"`).join(`,
`)},
                      ARRAY[]::text[] AS __changed_columns__
                  FROM prev
                  LEFT JOIN curr ON prev.${a} = curr.${a}
                  WHERE curr.${a} IS NULL
                UNION ALL
                  -- UPDATE operations: Include only changed columns
                  SELECT 
                    'UPDATE' AS __op__,
                    ${_.map(({column_name:t,data_type:f,udt_name:A})=>t===a?`curr."${t}" AS "${t}"`:`CASE 
                              WHEN curr."${t}" IS DISTINCT FROM prev."${t}" 
                              THEN curr."${t}"
                              ELSE NULL::${f=="USER-DEFINED"?A:f} 
                              END AS "${t}"`).join(`,
`)},
                      ARRAY(SELECT unnest FROM unnest(ARRAY[${_.filter(({column_name:t})=>t!==a).map(({column_name:t})=>`CASE
                              WHEN curr."${t}" IS DISTINCT FROM prev."${t}" 
                              THEN '${t}' 
                              ELSE NULL 
                              END`).join(", ")}]) WHERE unnest IS NOT NULL) AS __changed_columns__
                  FROM curr
                  INNER JOIN prev ON curr.${a} = prev.${a}
                  WHERE NOT (curr IS NOT DISTINCT FROM prev)
                )
              SELECT * FROM data_diff;
            `)}})};await m();let L=async()=>{let r=!1;for(let R=0;R<5;R++)try{await l.transaction(async _=>{await _.exec(`
                DELETE FROM live_query_${e}_state${o};
                INSERT INTO live_query_${e}_state${o} 
                  SELECT * FROM live_query_${e}_view;
              `),u=await _.query(`EXECUTE live_query_${e}_diff${o};`)});break}catch(_){if(_.message==`relation "live_query_${e}_state${o}" does not exist`){r=!0,await m();continue}else throw _}o=o===1?2:1,E([...r?[{__op__:"RESET"}]:[],...u.rows])},n=await Promise.all(c.map(r=>l.listen(`table_change__${r.schema_name}__${r.table_name}`,async()=>L()))),T=async()=>{await Promise.all(n.map(r=>r())),await l.exec(`
          DROP VIEW IF EXISTS live_query_${e}_view;
          DROP TABLE IF EXISTS live_query_${e}_state1;
          DROP TABLE IF EXISTS live_query_${e}_state2;
          DEALLOCATE live_query_${e}_diff1;
          DEALLOCATE live_query_${e}_diff2;
        `)};return await L(),{fields:u.fields.filter(r=>!["__after__","__op__","__changed_columns__"].includes(r.name)),initialChanges:u.rows,unsubscribe:T,refresh:L}},async incrementalQuery(s,p,a,E){let e=new Map,c=new Map,o=[],u=!0,{fields:m,unsubscribe:L,refresh:n}=await S.changes(s,p,a,T=>{for(let R of T){let{__op__:_,__changed_columns__:$,...i}=R;switch(_){case"RESET":e.clear(),c.clear();break;case"INSERT":e.set(i[a],i),c.set(i.__after__,i[a]);break;case"DELETE":let t=e.get(i[a]);e.delete(i[a]),c.delete(t.__after__);break;case"UPDATE":let f={...e.get(i[a])??{}};for(let A of $)f[A]=i[A],A==="__after__"&&c.set(i.__after__,i[a]);e.set(i[a],f);break}}let N=[],r=null;for(let R=0;R<e.size;R++){let _=c.get(r),$=e.get(_);if(!$)break;let i={...$};delete i.__after__,N.push(i),r=_}o=N,u||E({rows:N,fields:m})});return u=!1,E({rows:o,fields:m}),{initialResults:{rows:o,fields:m},unsubscribe:L,refresh:n}}};return{namespaceObj:S}},b={name:"Live Queries",setup:C};async function w(l,v){return(await l.query(`
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
      `,[v])).rows.filter(y=>y.table_name!==v)}async function O(l,v,y){let S=v.filter(s=>!y.has(`${s.schema_name}_${s.table_name}`)).map(s=>`
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
`);S.trim()!==""&&await l.exec(S),v.map(s=>y.add(`${s.schema_name}_${s.table_name}`))}export{b as live};
//# sourceMappingURL=index.js.map
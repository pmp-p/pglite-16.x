"use strict";var h=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var C=Object.prototype.hasOwnProperty;var b=(a,r)=>{for(var _ in r)h(a,_,{get:r[_],enumerable:!0})},q=(a,r,_,m)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of O(r))!C.call(a,s)&&s!==_&&h(a,s,{get:()=>r[s],enumerable:!(m=I(r,s))||m.enumerable});return a};var U=a=>q(h({},"__esModule",{value:!0}),a);var j={};b(j,{live:()=>M});module.exports=U(j);var W=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var v=()=>{if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID();let a=new Uint8Array(16);if(globalThis.crypto?.getRandomValues)globalThis.crypto.getRandomValues(a);else for(let _=0;_<a.length;_++)a[_]=Math.floor(Math.random()*256);a[6]=a[6]&15|64,a[8]=a[8]&63|128;let r=[];return a.forEach(_=>{r.push(_.toString(16).padStart(2,"0"))}),r.slice(0,4).join("")+"-"+r.slice(4,6).join("")+"-"+r.slice(6,8).join("")+"-"+r.slice(8,10).join("")+"-"+r.slice(10).join("")};var F=5,P=async(a,r)=>{let _=new Set,m={async query(s,y,n){let c=v().replace(/-/g,""),e,u,T=async()=>{await a.transaction(async o=>{await o.query(`CREATE OR REPLACE TEMP VIEW live_query_${c}_view AS ${s}`,y??[]),u=await w(o,`live_query_${c}_view`),await N(o,u,_),await o.exec(`
            PREPARE live_query_${c}_get AS
            SELECT * FROM live_query_${c}_view;
          `),e=await o.query(`EXECUTE live_query_${c}_get;`)})};await T();let R=async(o=0)=>{try{e=await a.query(`EXECUTE live_query_${c}_get;`)}catch($){if($.message==`prepared statement "live_query_${c}_get" does not exist`){if(o>F)throw $;await T(),R(o+1)}else throw $}n(e)},f=[];for(let o of u){let $=await a.listen(`table_change__${o.schema_name}__${o.table_name}`,async()=>{R()});f.push($)}let g=async()=>{for(let o of f)await o();await a.exec(`
          DROP VIEW IF EXISTS live_query_${c}_view;
          DEALLOCATE live_query_${c}_get;
        `)};return n(e),{initialResults:e,unsubscribe:g,refresh:R}},async changes(s,y,n,c){let e=v().replace(/-/g,""),u,T=1,R,f=async()=>{await a.transaction(async i=>{await i.query(`CREATE OR REPLACE TEMP VIEW live_query_${e}_view AS ${s}`,y??[]),u=await w(i,`live_query_${e}_view`),await N(i,u,_);let E=[...(await i.query(`
                SELECT column_name, data_type, udt_name
                FROM information_schema.columns 
                WHERE table_name = 'live_query_${e}_view'
              `)).rows,{column_name:"__after__",data_type:"integer"}];await i.exec(`
            CREATE TEMP TABLE live_query_${e}_state1 (LIKE live_query_${e}_view INCLUDING ALL);
            CREATE TEMP TABLE live_query_${e}_state2 (LIKE live_query_${e}_view INCLUDING ALL);
          `);for(let l of[1,2]){let S=l===1?2:1;await i.exec(`
              PREPARE live_query_${e}_diff${l} AS
              WITH
                prev AS (SELECT LAG("${n}") OVER () as __after__, * FROM live_query_${e}_state${S}),
                curr AS (SELECT LAG("${n}") OVER () as __after__, * FROM live_query_${e}_state${l}),
                data_diff AS (
                  -- INSERT operations: Include all columns
                  SELECT 
                    'INSERT' AS __op__,
                    ${E.map(({column_name:t})=>`curr."${t}" AS "${t}"`).join(`,
`)},
                    ARRAY[]::text[] AS __changed_columns__
                  FROM curr
                  LEFT JOIN prev ON curr.${n} = prev.${n}
                  WHERE prev.${n} IS NULL
                UNION ALL
                  -- DELETE operations: Include only the primary key
                  SELECT 
                    'DELETE' AS __op__,
                    ${E.map(({column_name:t,data_type:p,udt_name:L})=>t===n?`prev."${t}" AS "${t}"`:`NULL::${p=="USER-DEFINED"?L:p} AS "${t}"`).join(`,
`)},
                      ARRAY[]::text[] AS __changed_columns__
                  FROM prev
                  LEFT JOIN curr ON prev.${n} = curr.${n}
                  WHERE curr.${n} IS NULL
                UNION ALL
                  -- UPDATE operations: Include only changed columns
                  SELECT 
                    'UPDATE' AS __op__,
                    ${E.map(({column_name:t,data_type:p,udt_name:L})=>t===n?`curr."${t}" AS "${t}"`:`CASE 
                              WHEN curr."${t}" IS DISTINCT FROM prev."${t}" 
                              THEN curr."${t}"
                              ELSE NULL::${p=="USER-DEFINED"?L:p} 
                              END AS "${t}"`).join(`,
`)},
                      ARRAY(SELECT unnest FROM unnest(ARRAY[${E.filter(({column_name:t})=>t!==n).map(({column_name:t})=>`CASE
                              WHEN curr."${t}" IS DISTINCT FROM prev."${t}" 
                              THEN '${t}' 
                              ELSE NULL 
                              END`).join(", ")}]) WHERE unnest IS NOT NULL) AS __changed_columns__
                  FROM curr
                  INNER JOIN prev ON curr.${n} = prev.${n}
                  WHERE NOT (curr IS NOT DISTINCT FROM prev)
                )
              SELECT * FROM data_diff;
            `)}})};await f();let g=async()=>{let i=!1;for(let E=0;E<5;E++)try{await a.transaction(async l=>{await l.exec(`
                DELETE FROM live_query_${e}_state${T};
                INSERT INTO live_query_${e}_state${T} 
                  SELECT * FROM live_query_${e}_view;
              `),R=await l.query(`EXECUTE live_query_${e}_diff${T};`)});break}catch(l){if(l.message==`relation "live_query_${e}_state${T}" does not exist`){i=!0,await f();continue}else throw l}T=T===1?2:1,c([...i?[{__op__:"RESET"}]:[],...R.rows])},o=[];for(let i of u){let E=await a.listen(`table_change__${i.schema_name}__${i.table_name}`,async()=>{g()});o.push(E)}let $=async()=>{for(let i of o)await i();await a.exec(`
          DROP VIEW IF EXISTS live_query_${e}_view;
          DROP TABLE IF EXISTS live_query_${e}_state1;
          DROP TABLE IF EXISTS live_query_${e}_state2;
          DEALLOCATE live_query_${e}_diff1;
          DEALLOCATE live_query_${e}_diff2;
        `)};return await g(),{fields:R.fields.filter(i=>!["__after__","__op__","__changed_columns__"].includes(i.name)),initialChanges:R.rows,unsubscribe:$,refresh:g}},async incrementalQuery(s,y,n,c){let e=new Map,u=new Map,T=[],R=!0,{fields:f,unsubscribe:g,refresh:o}=await m.changes(s,y,n,$=>{for(let E of $){let{__op__:l,__changed_columns__:S,...t}=E;switch(l){case"RESET":e.clear(),u.clear();break;case"INSERT":e.set(t[n],t),u.set(t.__after__,t[n]);break;case"DELETE":let p=e.get(t[n]);e.delete(t[n]),u.delete(p.__after__);break;case"UPDATE":let L={...e.get(t[n])??{}};for(let d of S)L[d]=t[d],d==="__after__"&&u.set(t.__after__,t[n]);e.set(t[n],L);break}}let A=[],i=null;for(;;){let E=u.get(i),l=e.get(E);if(!l)break;A.push(l),i=E}T=A,R||c({rows:A,fields:f})});return R=!1,c({rows:T,fields:f}),{initialResults:{rows:T,fields:f},unsubscribe:g,refresh:o}}};return{namespaceObj:m}},M={name:"Live Queries",setup:P};async function w(a,r){return(await a.query(`
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
      `,[r])).rows.filter(_=>_.table_name!==r)}async function N(a,r,_){let m=r.filter(s=>!_.has(`${s.schema_name}_${s.table_name}`)).map(s=>`
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
`);m.trim()!==""&&await a.exec(m),r.map(s=>_.add(`${s.schema_name}_${s.table_name}`))}0&&(module.exports={live});
//# sourceMappingURL=index.cjs.map
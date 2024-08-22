"use strict";var v=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var q=Object.prototype.hasOwnProperty;var b=(t,s)=>{for(var i in s)v(t,i,{get:s[i],enumerable:!0})},P=(t,s,i,R)=>{if(s&&typeof s=="object"||typeof s=="function")for(let a of C(s))!q.call(t,a)&&a!==i&&v(t,a,{get:()=>s[a],enumerable:!(R=O(s,a))||R.enumerable});return t};var U=t=>P(v({},"__esModule",{value:!0}),t);var G={};b(G,{live:()=>j});module.exports=U(G);var H=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var w=()=>{if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID();let t=new Uint8Array(16);if(globalThis.crypto?.getRandomValues)globalThis.crypto.getRandomValues(t);else for(let i=0;i<t.length;i++)t[i]=Math.floor(Math.random()*256);t[6]=t[6]&15|64,t[8]=t[8]&63|128;let s=[];return t.forEach(i=>{s.push(i.toString(16).padStart(2,"0"))}),s.slice(0,4).join("")+"-"+s.slice(4,6).join("")+"-"+s.slice(6,8).join("")+"-"+s.slice(8,10).join("")+"-"+s.slice(10).join("")};async function I(t,s,i){if(!i||i.length===0)return s;let R=s.replace(/\$([0-9]+)/g,(g,r)=>"%"+r+"L");return(await t.query(`SELECT format($1, ${i.map((g,r)=>`$${r+2}`).join(", ")}) as query`,[R,...i],{setAllTypes:!0})).rows[0].query}var F=5,M=async(t,s)=>{let i=new Set,R={async query(a,g,r){let E=w().replace(/-/g,""),e,u,T=async()=>{await t.transaction(async o=>{let m=await I(o,a,g);await o.query(`CREATE OR REPLACE TEMP VIEW live_query_${E}_view AS ${m}`),u=await N(o,`live_query_${E}_view`),await h(o,u,i),await o.exec(`
            PREPARE live_query_${E}_get AS
            SELECT * FROM live_query_${E}_view;
          `),e=await o.query(`EXECUTE live_query_${E}_get;`)})};await T();let f=async(o=0)=>{try{e=await t.query(`EXECUTE live_query_${E}_get;`)}catch(m){if(m.message===`prepared statement "live_query_${E}_get" does not exist`){if(o>F)throw m;await T(),f(o+1)}else throw m}r(e)},L=await Promise.all(u.map(o=>t.listen(`table_change__${o.schema_name}__${o.table_name}`,async()=>{f()}))),A=async()=>{await Promise.all(L.map(o=>o())),await t.exec(`
            DROP VIEW IF EXISTS live_query_${E}_view;
            DEALLOCATE live_query_${E}_get;
          `)};return r(e),{initialResults:e,unsubscribe:A,refresh:f}},async changes(a,g,r,E){let e=w().replace(/-/g,""),u,T=1,f,L=async()=>{await t.transaction(async _=>{let $=await I(_,a,g);await _.query(`CREATE OR REPLACE TEMP VIEW live_query_${e}_view AS ${$}`),u=await N(_,`live_query_${e}_view`),await h(_,u,i);let l=[...(await _.query(`
                SELECT column_name, data_type, udt_name
                FROM information_schema.columns 
                WHERE table_name = 'live_query_${e}_view'
              `)).rows,{column_name:"__after__",data_type:"integer"}];await _.exec(`
            CREATE TEMP TABLE live_query_${e}_state1 (LIKE live_query_${e}_view INCLUDING ALL);
            CREATE TEMP TABLE live_query_${e}_state2 (LIKE live_query_${e}_view INCLUDING ALL);
          `);for(let y of[1,2]){let c=y===1?2:1;await _.exec(`
              PREPARE live_query_${e}_diff${y} AS
              WITH
                prev AS (SELECT LAG("${r}") OVER () as __after__, * FROM live_query_${e}_state${c}),
                curr AS (SELECT LAG("${r}") OVER () as __after__, * FROM live_query_${e}_state${y}),
                data_diff AS (
                  -- INSERT operations: Include all columns
                  SELECT 
                    'INSERT' AS __op__,
                    ${l.map(({column_name:n})=>`curr."${n}" AS "${n}"`).join(`,
`)},
                    ARRAY[]::text[] AS __changed_columns__
                  FROM curr
                  LEFT JOIN prev ON curr.${r} = prev.${r}
                  WHERE prev.${r} IS NULL
                UNION ALL
                  -- DELETE operations: Include only the primary key
                  SELECT 
                    'DELETE' AS __op__,
                    ${l.map(({column_name:n,data_type:p,udt_name:S})=>n===r?`prev."${n}" AS "${n}"`:`NULL::${p==="USER-DEFINED"?S:p} AS "${n}"`).join(`,
`)},
                      ARRAY[]::text[] AS __changed_columns__
                  FROM prev
                  LEFT JOIN curr ON prev.${r} = curr.${r}
                  WHERE curr.${r} IS NULL
                UNION ALL
                  -- UPDATE operations: Include only changed columns
                  SELECT 
                    'UPDATE' AS __op__,
                    ${l.map(({column_name:n,data_type:p,udt_name:S})=>n===r?`curr."${n}" AS "${n}"`:`CASE 
                              WHEN curr."${n}" IS DISTINCT FROM prev."${n}" 
                              THEN curr."${n}"
                              ELSE NULL::${p==="USER-DEFINED"?S:p} 
                              END AS "${n}"`).join(`,
`)},
                      ARRAY(SELECT unnest FROM unnest(ARRAY[${l.filter(({column_name:n})=>n!==r).map(({column_name:n})=>`CASE
                              WHEN curr."${n}" IS DISTINCT FROM prev."${n}" 
                              THEN '${n}' 
                              ELSE NULL 
                              END`).join(", ")}]) WHERE unnest IS NOT NULL) AS __changed_columns__
                  FROM curr
                  INNER JOIN prev ON curr.${r} = prev.${r}
                  WHERE NOT (curr IS NOT DISTINCT FROM prev)
                )
              SELECT * FROM data_diff;
            `)}})};await L();let A=async()=>{let _=!1;for(let $=0;$<5;$++)try{await t.transaction(async l=>{await l.exec(`
                DELETE FROM live_query_${e}_state${T};
                INSERT INTO live_query_${e}_state${T} 
                  SELECT * FROM live_query_${e}_view;
              `),f=await l.query(`EXECUTE live_query_${e}_diff${T};`)});break}catch(l){if(l.message===`relation "live_query_${e}_state${T}" does not exist`){_=!0,await L();continue}else throw l}T=T===1?2:1,E([..._?[{__op__:"RESET"}]:[],...f.rows])},o=await Promise.all(u.map(_=>t.listen(`table_change__${_.schema_name}__${_.table_name}`,async()=>A()))),m=async()=>{await Promise.all(o.map(_=>_())),await t.exec(`
          DROP VIEW IF EXISTS live_query_${e}_view;
          DROP TABLE IF EXISTS live_query_${e}_state1;
          DROP TABLE IF EXISTS live_query_${e}_state2;
          DEALLOCATE live_query_${e}_diff1;
          DEALLOCATE live_query_${e}_diff2;
        `)};return await A(),{fields:f.fields.filter(_=>!["__after__","__op__","__changed_columns__"].includes(_.name)),initialChanges:f.rows,unsubscribe:m,refresh:A}},async incrementalQuery(a,g,r,E){let e=new Map,u=new Map,T=[],f=!0,{fields:L,unsubscribe:A,refresh:o}=await R.changes(a,g,r,m=>{for(let $ of m){let{__op__:l,__changed_columns__:y,...c}=$;switch(l){case"RESET":e.clear(),u.clear();break;case"INSERT":e.set(c[r],c),u.set(c.__after__,c[r]);break;case"DELETE":{let n=e.get(c[r]);e.delete(c[r]),u.delete(n.__after__);break}case"UPDATE":{let n={...e.get(c[r])??{}};for(let p of y)n[p]=c[p],p==="__after__"&&u.set(c.__after__,c[r]);e.set(c[r],n);break}}}let d=[],_=null;for(let $=0;$<e.size;$++){let l=u.get(_),y=e.get(l);if(!y)break;let c={...y};delete c.__after__,d.push(c),_=l}T=d,f||E({rows:d,fields:L})});return f=!1,E({rows:T,fields:L}),{initialResults:{rows:T,fields:L},unsubscribe:A,refresh:o}}};return{namespaceObj:R}},j={name:"Live Queries",setup:M};async function N(t,s){return(await t.query(`
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
      `,[s])).rows.filter(i=>i.table_name!==s)}async function h(t,s,i){let R=s.filter(a=>!i.has(`${a.schema_name}_${a.table_name}`)).map(a=>`
      CREATE OR REPLACE FUNCTION _notify_${a.schema_name}_${a.table_name}() RETURNS TRIGGER AS $$
      BEGIN
        PERFORM pg_notify('table_change__${a.schema_name}__${a.table_name}', '');
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;
      CREATE OR REPLACE TRIGGER _notify_trigger_${a.schema_name}_${a.table_name}
      AFTER INSERT OR UPDATE OR DELETE ON ${a.schema_name}.${a.table_name}
      FOR EACH STATEMENT EXECUTE FUNCTION _notify_${a.schema_name}_${a.table_name}();
      `).join(`
`);R.trim()!==""&&await t.exec(R),s.map(a=>i.add(`${a.schema_name}_${a.table_name}`))}0&&(module.exports={live});
//# sourceMappingURL=index.cjs.map
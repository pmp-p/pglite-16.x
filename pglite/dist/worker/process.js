import{d as o}from"../chunk-QDO3HUIE.js";import{a as s,c as y,d as c}from"../chunk-UNO2UYXI.js";import"../chunk-MAGDP6ZW.js";import{i as n,k as i}from"../chunk-TYZHXJCT.js";i();n();var t,p={async init(r,e,a){return t=new o(r,e),await t.waitReady,a&&t.onNotification(a),!0},async close(){await t.close()},async query(r,e,a){return await t.query(r,e,a)},async exec(r,e){return await t.exec(r,e)},async transaction(r){return await t.transaction(e=>r(c(e)))},async execProtocol(r){return await t.execProtocol(r)},async dumpDataDir(){let r=await t.dumpDataDir();return y(r,[await r.arrayBuffer()])}};s(p);
//# sourceMappingURL=process.js.map
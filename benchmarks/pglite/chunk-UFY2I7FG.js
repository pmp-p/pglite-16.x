import{i as a}from"./chunk-ZYB3MGPW.js";a();var n=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";async function c(){let e=new URL("./postgres.wasm",import.meta.url),t=new URL("./postgres.data",import.meta.url),o=s=>s.pathname;return n&&(o=(await import("url")).fileURLToPath),s=>{let r=null;switch(s){case"postgres.data":r=t;break;case"postgres.wasm":r=e;break;default:console.error("makeLocateFile",s)}return r?.protocol==="file:"?o(r):r?.toString()??""}}var p=()=>{if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID();let e=new Uint8Array(16);if(globalThis.crypto?.getRandomValues)globalThis.crypto.getRandomValues(e);else for(let o=0;o<e.length;o++)e[o]=Math.floor(Math.random()*256);e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=[];return e.forEach(o=>{t.push(o.toString(16).padStart(2,"0"))}),t.slice(0,4).join("")+"-"+t.slice(4,6).join("")+"-"+t.slice(6,8).join("")+"-"+t.slice(8,10).join("")+"-"+t.slice(10).join("")};export{n as a,c as b,p as c};
//# sourceMappingURL=chunk-UFY2I7FG.js.map
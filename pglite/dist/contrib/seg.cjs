"use strict";var r=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var a=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var u=(t,e)=>{for(var s in e)r(t,s,{get:e[s],enumerable:!0})},m=(t,e,s,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of a(e))!p.call(t,n)&&n!==s&&r(t,n,{get:()=>e[n],enumerable:!(i=c(e,n))||i.enumerable});return t};var f=t=>m(r({},"__esModule",{value:!0}),t);var x={};u(x,{seg:()=>g});module.exports=f(x);var l=()=>typeof document>"u"?new URL(`file:${__filename}`).href:document.currentScript&&document.currentScript.src||new URL("main.js",document.baseURI).href,o=l();var d=async(t,e)=>({bundlePath:new URL("..//seg.tar.gz",o)}),g={name:"seg",setup:d};0&&(module.exports={seg});
//# sourceMappingURL=seg.cjs.map
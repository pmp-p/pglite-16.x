"use strict";var s=Object.defineProperty;var o=Object.getOwnPropertyDescriptor;var a=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var u=(t,e)=>{for(var r in e)s(t,r,{get:e[r],enumerable:!0})},m=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of a(e))!p.call(t,n)&&n!==r&&s(t,n,{get:()=>e[n],enumerable:!(i=o(e,n))||i.enumerable});return t};var f=t=>m(s({},"__esModule",{value:!0}),t);var R={};u(R,{citext:()=>d});module.exports=f(R);var l=()=>typeof document>"u"?new URL(`file:${__filename}`).href:document.currentScript&&document.currentScript.src||new URL("main.js",document.baseURI).href,c=l();var x=async(t,e)=>({bundlePath:new URL("..//citext.tar.gz",c)}),d={name:"citext",setup:x};0&&(module.exports={citext});
//# sourceMappingURL=citext.cjs.map
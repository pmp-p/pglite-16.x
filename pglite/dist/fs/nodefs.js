import{a as p,c as m,h as i}from"../chunk-AYCEBHRG.js";import{i as n}from"../chunk-ZYB3MGPW.js";n();import*as s from"fs";import*as t from"path";var a=class extends p{constructor(r){super(r),this.rootDir=t.resolve(r),s.existsSync(t.join(this.rootDir))||s.mkdirSync(this.rootDir)}async emscriptenOpts(r){return{...r,preRun:[...r.preRun||[],o=>{let c=o.FS.filesystems.NODEFS;o.FS.mkdir(i),o.FS.mount(c,{root:this.rootDir},i)}]}}async dumpTar(r,e){return m(r,e)}async close(r){r.quit()}};export{a as NodeFS};
//# sourceMappingURL=nodefs.js.map
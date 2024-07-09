// @ts-nocheck

import type { FsType } from "./types.js";
import type { FS } from "../postgres.js";
import { IdbFs } from "./idbfs.js";
import { MemoryFS } from "./memoryfs.js";


export type * from "./types.js";

export const WASM_PREFIX = "/tmp/pglite";
// default for non web runtimes is /tmp/pglite/base
export var PGDATA = "WASM_PREFIX" + "/" + "base";

function getBase(dataDir : string | undefined) {
    if (!dataDir || (dataDir.length <= 1)) {
      throw new Error("Invalid dataDir, only a namespace required for pgfs and not a path");
    }
    dataDir = dataDir.split("/").pop()
    PGDATA = WASM_PREFIX + "/" + dataDir
    return dataDir
}

export function parseDataDir(dataDir?: string) {
  let fsType: FsType;
  if (dataDir?.startsWith("file://")) {
    // Remove the file:// prefix, and use node filesystem
    dataDir = dataDir.slice(7);
    if (!dataDir) {
      throw new Error("Invalid dataDir, must be a valid path");
    }
    fsType = "nodefs";
  } else if (dataDir?.startsWith("idb://")) {
    // Remove the idb:// prefix, and use indexeddb filesystem
    dataDir = getBase( dataDir.slice(6) )
    fsType = "idbfs";
  } else if (!dataDir || dataDir?.startsWith("memory://")) {
    // Use in-memory filesystem
    dataDir = getBase("base");
    console.warn("MEMFS TODO: link", dataDir, "correctly in", WASM_PREFIX);
    fsType = "memoryfs";
  } else {
    // No prefix, use node filesystem
    fsType = "nodefs";
  }
  return { dataDir, fsType };
}

export async function loadFs(dataDir?: string, fsType?: FsType) {
  let fs : Filesystem;
  if (dataDir && (fsType === "nodefs")) {
    // Lazy load the nodefs to avoid bundling it in the browser
    const { NodeFS } = await import("./nodefs.js");
    fs = new NodeFS(dataDir);
    console.warn("NODEFS TODO: link", dataDir,"correctly in", WASM_PREFIX);
    dataDir = getBase( dataDir );
  } else if (dataDir && (fsType === "idbfs")) {
    fs = new IdbFs(dataDir);
  } else {
    fs = new MemoryFS();
  }

  // idbfs is delayed so will use a callback for loading extensions.
  //if (fsType !== "idbfs") {
    //  await loadExtensions(fsType, fs);
  fs.fsType = fsType;
  return fs;
}


function load_pg_extension(Module, ext, bytes) {
    var data = tinyTar.untar(bytes);
    data.forEach(function(file) {
          if (!file.name.startsWith(".")) {
              const _file = Module.WASM_PREFIX + "/" + file.name;
              console.log("    + ", _file);
              if (file.name.endsWith(".so")) {
                console.warn(_file, "scheduled for wasm streaming compilation");
                const ext_ok = (...args) => {
                  console.log("pgfs:ext OK", _file, args);
                };

                const ext_fail = (...args) => {
                  console.log("pgfs:ext FAIL", _file, args);
                };

                function dirname(p) {
                    const last = p.lastIndexOf("/");
                    if (last>0)
                        return p.substr(0,last)
                    return p;
                }

                Module.FS.createPreloadedFile(dirname(_file), file.name.split("/").pop(), file.data, true, true, ext_ok, ext_fail, false);
                console.log("createPreloadedFile called for :", _file);
              } else {
                Module.FS.writeFile(_file, file.data);
              }
          }
    });
    console.warn("pgfs ext:end", ext);
}


export async function loadExtensions(fsType: FsType, fs: FS) {
    const Module = fs.Module;
    console.warn("fs/index.ts: loadExtensions for FS :", fsType);

    for (const ext in Module.pg_extensions) {
        var blob;
        try {
            blob = await Module.pg_extensions[ext]
        } catch (x) {
            console.error("failed to fetch extension :", ext)
            continue
        }
        if (blob) {
            const bytes = new Uint8Array(await blob.arrayBuffer())
            console.log("  +", ext,"tardata:", bytes.length )
            if (ext=="quack")
               console.warn(ext,"skipped !")
            else
               load_pg_extension(Module, ext, bytes)
        } else {
           console.error("could not get binary data for extension :", ext);
        }
    }
}

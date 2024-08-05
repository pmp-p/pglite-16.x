import { a as FilesystemBase, P as PostgresMod, b as FS } from '../types-BRRGJ5cy.cjs';

declare class NodeFS extends FilesystemBase {
    protected rootDir: string;
    constructor(dataDir: string);
    emscriptenOpts(opts: Partial<PostgresMod>): Promise<Partial<PostgresMod>>;
    dumpTar(mod: FS, dbname: string): Promise<Blob | File>;
    close(FS: FS): Promise<void>;
}

export { NodeFS };

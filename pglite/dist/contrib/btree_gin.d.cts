import { P as PGliteInterface } from '../interface-txcl9cTr.cjs';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.cjs';

declare const btree_gin: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { btree_gin };
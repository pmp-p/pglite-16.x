import { P as PGliteInterface } from '../interface-BmgYFDvu.cjs';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.cjs';

declare const btree_gist: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { btree_gist };

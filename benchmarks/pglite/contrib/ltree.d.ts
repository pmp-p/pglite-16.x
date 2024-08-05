import { P as PGliteInterface } from '../interface-CsW9Cczh.js';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.js';

declare const ltree: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { ltree };

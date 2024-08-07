import { P as PGliteInterface } from '../interface-Z9OGIloC.cjs';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.cjs';

declare const hstore: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { hstore };

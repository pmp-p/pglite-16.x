import { P as PGliteInterface } from '../interface-CaxYu8mu.js';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.js';

declare const pg_trgm: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { pg_trgm };

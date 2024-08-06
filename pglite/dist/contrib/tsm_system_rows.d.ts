import { P as PGliteInterface } from '../interface-Bd0KqC2R.js';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.js';

declare const tsm_system_rows: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { tsm_system_rows };

import { P as PGliteInterface } from '../interface-Bd0KqC2R.js';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.js';

declare const cube: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { cube };

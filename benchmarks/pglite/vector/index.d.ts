import { P as PGliteInterface } from '../interface-Bd0KqC2R.js';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.js';

declare const vector: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        emscriptenOpts: any;
        bundlePath: URL;
    }>;
};

export { vector };

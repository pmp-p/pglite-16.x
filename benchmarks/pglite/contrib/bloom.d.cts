import { P as PGliteInterface } from '../interface-CmiFbP3N.cjs';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.cjs';

declare const bloom: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { bloom };

import { P as PGliteInterface } from '../interface-Xh0uzKp-.js';
import 'pg-protocol/src/messages.js';
import '../types-BRRGJ5cy.js';

declare const bloom: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { bloom };

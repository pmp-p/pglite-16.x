import { P as PGliteInterface } from '../interface-PlMOR4rS.js';
import '../types-CQTnnKLt.js';

declare const bloom: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { bloom };
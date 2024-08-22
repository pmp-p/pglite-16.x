import { P as PGliteInterface } from '../interface-CWIZslPU.js';
import '../types-CQTnnKLt.js';

declare const amcheck: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { amcheck };

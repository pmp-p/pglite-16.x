import { P as PGliteInterface } from '../interface-BGC_QhTm.cjs';
import '../types-CQTnnKLt.cjs';

declare const amcheck: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { amcheck };

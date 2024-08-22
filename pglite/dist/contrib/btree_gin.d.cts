import { P as PGliteInterface } from '../interface-BGC_QhTm.cjs';
import '../types-CQTnnKLt.cjs';

declare const btree_gin: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { btree_gin };

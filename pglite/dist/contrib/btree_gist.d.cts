import { P as PGliteInterface } from '../interface-BGC_QhTm.cjs';
import '../types-CQTnnKLt.cjs';

declare const btree_gist: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { btree_gist };
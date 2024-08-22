import { P as PGliteInterface } from '../interface-ByZj4XjO.cjs';
import '../types-CQTnnKLt.cjs';

declare const adminpack: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { adminpack };

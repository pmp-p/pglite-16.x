import { P as PGliteInterface } from '../interface-CVKhRy_U.js';

declare const vector: {
    name: string;
    setup: (pg: PGliteInterface, emscriptenOpts: any) => Promise<{
        emscriptenOpts: any;
        bundlePath: URL;
    }>;
};

export { vector };

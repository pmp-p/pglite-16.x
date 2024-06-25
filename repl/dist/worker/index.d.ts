import { P as PGliteInterface, D as DebugLevel, a as PGliteOptions, Q as QueryOptions, R as Results, B as BackendMessage } from '../interface-9CbkZjI8.js';

declare class PGliteWorker implements PGliteInterface {
    #private;
    readonly dataDir?: string;
    readonly waitReady: Promise<void>;
    readonly debug: DebugLevel;
    constructor(dataDir: string, options?: PGliteOptions);
    get ready(): boolean;
    get closed(): boolean;
    close(): Promise<void>;
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    transaction<T>(callback: (tx: any) => Promise<T>): Promise<any>;
    execProtocol(message: Uint8Array): Promise<Array<[BackendMessage, Uint8Array]>>;
}

export { PGliteWorker };

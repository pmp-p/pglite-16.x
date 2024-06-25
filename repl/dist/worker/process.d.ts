import { a as PGliteOptions, Q as QueryOptions, R as Results, B as BackendMessage } from '../interface-9CbkZjI8.js';

declare const worker: {
    init(dataDir?: string, options?: PGliteOptions): Promise<boolean>;
    close(): Promise<void>;
    query(query: string, params?: any[], options?: QueryOptions): Promise<Results<unknown>>;
    exec(query: string, options?: QueryOptions): Promise<Results[]>;
    transaction(callback: (tx: any) => Promise<any>): Promise<any>;
    execProtocol(message: Uint8Array): Promise<[BackendMessage, Uint8Array][]>;
};
type Worker = typeof worker;

export type { Worker };

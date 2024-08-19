import { a as PGliteOptions, P as PGliteInterface, b as PGliteInterfaceExtensions, D as DebugLevel, Q as QueryOptions, R as Results, T as Transaction, B as BackendMessage } from '../interface-PlMOR4rS.js';
import '../types-CQTnnKLt.js';

type PGliteWorkerOptions = PGliteOptions & {
    meta?: any;
    id?: string;
};
declare class PGliteWorker implements PGliteInterface, AsyncDisposable {
    #private;
    constructor(worker: Worker, options?: PGliteWorkerOptions);
    /**
     * Create a new PGlite instance with extensions on the Typescript interface
     * This also awaits the instance to be ready before resolving
     * (The main constructor does enable extensions, however due to the limitations
     * of Typescript, the extensions are not available on the instance interface)
     * @param worker The worker to use
     * @param options Optional options
     * @returns A promise that resolves to the PGlite instance when it's ready.
     */
    static create<O extends PGliteWorkerOptions>(worker: Worker, options?: O): Promise<PGliteWorker & PGliteInterfaceExtensions<O['extensions']>>;
    get waitReady(): Promise<void>;
    get debug(): DebugLevel;
    /**
     * The ready state of the database
     */
    get ready(): boolean;
    /**
     * The closed state of the database
     */
    get closed(): boolean;
    /**
     * The leader state of this tab
     */
    get isLeader(): boolean;
    /**
     * Close the database
     * @returns Promise that resolves when the connection to shared PGlite is closed
     */
    close(): Promise<void>;
    /**
     * Close the database when the object exits scope
     * Stage 3 ECMAScript Explicit Resource Management
     * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management
     */
    [Symbol.asyncDispose](): Promise<void>;
    /**
     * Execute a single SQL statement
     * This uses the "Extended Query" postgres wire protocol message.
     * @param query The query to execute
     * @param params Optional parameters for the query
     * @returns The result of the query
     */
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    /**
     * Execute a SQL query, this can have multiple statements.
     * This uses the "Simple Query" postgres wire protocol message.
     * @param query The query to execute
     * @returns The result of the query
     */
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    /**
     * Execute a transaction
     * @param callback A callback function that takes a transaction object
     * @returns The result of the transaction
     */
    transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T | undefined>;
    /**
     * Execute a postgres wire protocol message directly without wrapping the response.
     * Only use if `execProtocol()` doesn't suite your needs.
     *
     * **Warning:** This bypasses PGlite's protocol wrappers that manage error/notice messages,
     * transactions, and notification listeners. Only use if you need to bypass these wrappers and
     * don't intend to use the above features.
     *
     * @param message The postgres wire protocol message to execute
     * @returns The direct message data response produced by Postgres
     */
    execProtocolRaw(message: Uint8Array): Promise<Uint8Array>;
    /**
     * Execute a postgres wire protocol message
     * @param message The postgres wire protocol message to execute
     * @returns The result of the query
     */
    execProtocol(message: Uint8Array): Promise<Array<[BackendMessage, Uint8Array]>>;
    /**
     * Listen for a notification
     * @param channel The channel to listen on
     * @param callback The callback to call when a notification is received
     */
    listen(channel: string, callback: (payload: string) => void): Promise<() => Promise<void>>;
    /**
     * Stop listening for a notification
     * @param channel The channel to stop listening on
     * @param callback The callback to remove
     */
    unlisten(channel: string, callback?: (payload: string) => void): Promise<void>;
    /**
     * Listen to notifications
     * @param callback The callback to call when a notification is received
     */
    onNotification(callback: (channel: string, payload: string) => void): () => void;
    /**
     * Stop listening to notifications
     * @param callback The callback to remove
     */
    offNotification(callback: (channel: string, payload: string) => void): void;
    dumpDataDir(): Promise<File | Blob>;
    onLeaderChange(callback: () => void): () => void;
    offLeaderChange(callback: () => void): void;
}
interface WorkerOptions {
    init: (options: Exclude<PGliteWorkerOptions, 'extensions'>) => Promise<PGliteInterface>;
}
declare function worker({ init }: WorkerOptions): Promise<void>;
declare class LeaderChangedError extends Error {
    constructor();
}

export { LeaderChangedError, PGliteWorker, type PGliteWorkerOptions, type WorkerOptions, worker };

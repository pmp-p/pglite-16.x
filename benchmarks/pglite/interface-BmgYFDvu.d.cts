import { NoticeMessage, BackendMessage } from 'pg-protocol/src/messages.js';
import { F as Filesystem } from './types-BRRGJ5cy.cjs';

type FilesystemType = "nodefs" | "idbfs" | "memoryfs";
type DebugLevel = 0 | 1 | 2 | 3 | 4 | 5;
type RowMode = "array" | "object";
interface ParserOptions {
    [pgType: number]: (value: string) => any;
}
interface QueryOptions {
    rowMode?: RowMode;
    parsers?: ParserOptions;
    blob?: Blob | File;
    onNotice?: (notice: NoticeMessage) => void;
}
interface ExecProtocolOptions {
    syncToFs?: boolean;
    onNotice?: (notice: NoticeMessage) => void;
}
interface ExtensionSetupResult {
    emscriptenOpts?: any;
    namespaceObj?: any;
    bundlePath?: URL;
    init?: () => Promise<void>;
    close?: () => Promise<void>;
}
type ExtensionSetup = (pg: PGliteInterface, emscriptenOpts: any, clientOnly?: boolean) => Promise<ExtensionSetupResult>;
interface Extension {
    name: string;
    setup: ExtensionSetup;
}
type Extensions = {
    [namespace: string]: Extension | URL;
};
interface DumpDataDirResult {
    tarball: Uint8Array;
    extension: ".tar" | ".tgz";
    filename: string;
}
interface PGliteOptions {
    dataDir?: string;
    fs?: Filesystem;
    debug?: DebugLevel;
    relaxedDurability?: boolean;
    extensions?: Extensions;
    loadDataDir?: Blob | File;
}
type PGliteInterface = {
    readonly waitReady: Promise<void>;
    readonly debug: DebugLevel;
    readonly ready: boolean;
    readonly closed: boolean;
    close(): Promise<void>;
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T | undefined>;
    execProtocolRaw(message: Uint8Array, options?: ExecProtocolOptions): Promise<Uint8Array>;
    execProtocol(message: Uint8Array, options?: ExecProtocolOptions): Promise<Array<[BackendMessage, Uint8Array]>>;
    listen(channel: string, callback: (payload: string) => void): Promise<() => Promise<void>>;
    unlisten(channel: string, callback?: (payload: string) => void): Promise<void>;
    onNotification(callback: (channel: string, payload: string) => void): () => void;
    offNotification(callback: (channel: string, payload: string) => void): void;
    dumpDataDir(): Promise<File | Blob>;
};
type PGliteInterfaceExtensions<E> = E extends Extensions ? {
    [K in keyof E]: E[K] extends Extension ? Awaited<ReturnType<E[K]["setup"]>>["namespaceObj"] extends infer N ? N extends undefined | null | void ? never : N : never : never;
} : {};
type Row<T = {
    [key: string]: any;
}> = T;
type Results<T = {
    [key: string]: any;
}> = {
    rows: Row<T>[];
    affectedRows?: number;
    fields: {
        name: string;
        dataTypeID: number;
    }[];
    blob?: Blob;
};
interface Transaction {
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    rollback(): Promise<void>;
    get closed(): boolean;
}

export type { DebugLevel as D, ExecProtocolOptions as E, FilesystemType as F, PGliteInterface as P, QueryOptions as Q, Results as R, Transaction as T, PGliteOptions as a, PGliteInterfaceExtensions as b, ParserOptions as c, RowMode as d, ExtensionSetupResult as e, ExtensionSetup as f, Extension as g, Extensions as h, DumpDataDirResult as i, Row as j };

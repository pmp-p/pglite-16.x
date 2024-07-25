import { ReplProps, ReplTheme } from '../src/Repl';
import { PGlite } from '@electric-sql/pglite';
import { Extension } from '@uiw/react-codemirror';

export type { ReplProps, ReplTheme };
export declare class PGliteREPL extends HTMLElement {
    #private;
    constructor();
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(_name: string, oldValue: any, newValue: any): void;
    disconnectedCallback(): void;
    get pg(): PGlite | undefined;
    set pg(pg: PGlite | undefined);
    get lightTheme(): Extension | undefined;
    set lightTheme(lightTheme: Extension | undefined);
    get darkTheme(): Extension | undefined;
    set darkTheme(darkTheme: Extension | undefined);
    render(): void;
}

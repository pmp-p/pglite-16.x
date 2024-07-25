import { Extension } from '@uiw/react-codemirror';
import { PGlite } from '@electric-sql/pglite';

export type ReplTheme = "light" | "dark" | "auto";
export interface ReplProps {
    pg: PGlite;
    border?: boolean;
    lightTheme?: Extension;
    darkTheme?: Extension;
    theme?: ReplTheme;
    showTime?: boolean;
    disableUpdateSchema?: boolean;
}
export declare function Repl({ pg, border, lightTheme, darkTheme, theme, showTime, disableUpdateSchema, }: ReplProps): import("react/jsx-runtime").JSX.Element;

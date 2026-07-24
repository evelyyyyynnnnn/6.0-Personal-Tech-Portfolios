import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Options } from 'react-markdown';
import { BundledTheme } from 'shiki';
import { MermaidConfig } from 'mermaid';
export { MermaidConfig } from 'mermaid';
import { Pluggable } from 'unified';

type ControlsConfig = boolean | {
    table?: boolean;
    code?: boolean;
    mermaid?: boolean;
};
type StreamdownProps = Options & {
    parseIncompleteMarkdown?: boolean;
    className?: string;
    shikiTheme?: [BundledTheme, BundledTheme];
    mermaidConfig?: MermaidConfig;
    controls?: ControlsConfig;
    isAnimating?: boolean;
};
declare const defaultRehypePlugins: Record<string, Pluggable>;
declare const defaultRemarkPlugins: Record<string, Pluggable>;
declare const ShikiThemeContext: react.Context<[BundledTheme, BundledTheme]>;
declare const MermaidConfigContext: react.Context<MermaidConfig | undefined>;
declare const ControlsContext: react.Context<ControlsConfig>;
type StreamdownRuntimeContextType = {
    isAnimating: boolean;
};
declare const StreamdownRuntimeContext: react.Context<StreamdownRuntimeContextType>;
declare const Streamdown: react.MemoExoticComponent<({ children, parseIncompleteMarkdown: shouldParseIncompleteMarkdown, components, rehypePlugins, remarkPlugins, className, shikiTheme, mermaidConfig, controls, isAnimating, ...props }: StreamdownProps) => react_jsx_runtime.JSX.Element>;

export { type ControlsConfig, ControlsContext, MermaidConfigContext, ShikiThemeContext, Streamdown, type StreamdownProps, StreamdownRuntimeContext, type StreamdownRuntimeContextType, defaultRehypePlugins, defaultRemarkPlugins };

import type { HtmlTagDescriptor, Plugin } from 'vite';
export interface VitePluginManusRuntimeOptions {
    scriptId?: string;
    injectTo?: HtmlTagDescriptor['injectTo'];
}
export declare function vitePluginManusRuntime(options?: VitePluginManusRuntimeOptions): Plugin;

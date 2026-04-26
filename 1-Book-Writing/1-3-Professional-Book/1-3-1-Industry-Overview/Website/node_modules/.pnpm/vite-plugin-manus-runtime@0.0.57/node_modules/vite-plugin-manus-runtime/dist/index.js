import * as fs from 'node:fs';
const RUNTIME_FILE_PATH = new URL('../runtime_dist/manus-runtime.js', import.meta.url);
const DEFAULT_SCRIPT_ID = 'manus-runtime';
let cachedContentSource;
function loadContentSource() {
    if (cachedContentSource === undefined) {
        cachedContentSource = fs.readFileSync(RUNTIME_FILE_PATH, 'utf8');
    }
    return cachedContentSource;
}
export function vitePluginManusRuntime(options = {}) {
    const scriptId = options.scriptId || DEFAULT_SCRIPT_ID;
    const injectTo = options.injectTo || 'body-prepend';
    return {
        name: 'vite-plugin-manus-runtime',
        enforce: 'post',
        transformIndexHtml(_, ctx) {
            const isHostDev = ctx.server !== undefined;
            return [
                {
                    tag: 'script',
                    attrs: { id: scriptId },
                    children: `window.__MANUS_HOST_DEV__ = ${isHostDev};\n${loadContentSource()}`,
                    injectTo,
                },
            ];
        },
    };
}

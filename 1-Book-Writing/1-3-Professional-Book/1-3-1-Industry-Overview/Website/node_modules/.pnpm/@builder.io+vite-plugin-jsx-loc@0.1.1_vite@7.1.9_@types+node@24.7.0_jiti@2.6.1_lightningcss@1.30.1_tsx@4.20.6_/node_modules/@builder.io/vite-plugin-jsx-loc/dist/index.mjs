// src/index.ts
import {
  transformJsxCode,
  shouldProcessFile
} from "@builder.io/jsx-loc-internals";
function jsxLocPlugin() {
  return {
    name: "vite-plugin-jsx-loc",
    enforce: "pre",
    async transform(code, id) {
      if (!shouldProcessFile(id)) {
        return null;
      }
      const result = transformJsxCode(code, id);
      return result;
    }
  };
}
export {
  jsxLocPlugin
};

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  defaultParserOptions: () => defaultParserOptions,
  findInsertionPoint: () => findInsertionPoint,
  getElementName: () => getElementName,
  isValidJsxNode: () => isValidJsxNode,
  shouldProcessFile: () => shouldProcessFile,
  shouldSkipElement: () => shouldSkipElement,
  transformJsxCode: () => transformJsxCode,
  validExtensions: () => validExtensions
});
module.exports = __toCommonJS(index_exports);
var import_parser = require("@babel/parser");
var import_magic_string = __toESM(require("magic-string"));
var import_path = __toESM(require("path"));
var import_estree_walker = require("estree-walker");
var defaultParserOptions = {
  sourceType: "module",
  plugins: [
    // JSX support
    "jsx",
    // TypeScript support
    "typescript",
    // Class features
    "decorators-legacy",
    "classProperties",
    "classPrivateProperties",
    "classPrivateMethods",
    "classStaticBlock",
    // Modern JS features
    "dynamicImport",
    "nullishCoalescingOperator",
    "optionalChaining",
    "objectRestSpread",
    "optionalCatchBinding",
    "asyncGenerators",
    "bigInt",
    "importAssertions",
    "importMeta",
    "numericSeparator",
    "privateIn",
    "topLevelAwait"
  ],
  allowImportExportEverywhere: true,
  errorRecovery: true
  // Try to continue parsing even if there are errors
};
var validExtensions = /* @__PURE__ */ new Set([".jsx", ".tsx"]);
function getElementName(jsxNode) {
  try {
    if (!jsxNode.name) return null;
    if (jsxNode.name.type === "JSXIdentifier") {
      return jsxNode.name.name;
    } else if (jsxNode.name.type === "JSXMemberExpression") {
      const getMemberName = (expr) => {
        if (expr.type === "JSXMemberExpression") {
          return `${getMemberName(expr.object)}.${expr.property.name}`;
        } else {
          return expr.name;
        }
      };
      return getMemberName(jsxNode.name);
    } else if (jsxNode.name.type === "JSXNamespacedName") {
      return `${jsxNode.name.namespace.name}:${jsxNode.name.name.name}`;
    }
  } catch (error) {
    return null;
  }
  return null;
}
function shouldSkipElement(elementName) {
  if (!elementName) return true;
  if (elementName === "Fragment" || elementName.endsWith(".Fragment") || elementName === "React.Fragment") {
    return true;
  }
  return false;
}
function isValidJsxNode(node) {
  return node && node.type === "JSXOpeningElement" && node.name && node.loc && node.loc.start && typeof node.loc.start.line === "number";
}
function findInsertionPoint(jsxNode, source) {
  let insertionPoint = jsxNode.name.end;
  if (source[insertionPoint] === "<") {
    let depth = 0;
    let inGeneric = false;
    let pos = insertionPoint;
    while (pos < jsxNode.end) {
      if (source[pos] === "<") {
        depth++;
        inGeneric = true;
      } else if (source[pos] === ">") {
        depth--;
        if (depth === 0 && inGeneric) {
          insertionPoint = pos + 1;
          break;
        }
      } else if (source[pos] === "{" && !inGeneric) {
        break;
      } else if (source[pos] === " " && !inGeneric) {
        break;
      }
      pos++;
    }
  }
  return insertionPoint;
}
function transformJsxCode(source, filePath, options = {}) {
  try {
    const parserOptions = options.parserOptions || defaultParserOptions;
    const ast = (0, import_parser.parse)(source, parserOptions);
    const magicString = new import_magic_string.default(source);
    const resourcePath = filePath;
    (0, import_estree_walker.walk)(ast, {
      enter(node) {
        if (node.type === "JSXOpeningElement") {
          try {
            const jsxNode = node;
            if (!isValidJsxNode(jsxNode)) {
              return;
            }
            const elementName = getElementName(jsxNode);
            if (shouldSkipElement(elementName)) {
              return;
            }
            const line = jsxNode.loc.start.line;
            const relativePath = import_path.default.relative(process.cwd(), resourcePath);
            const dataLoc = `${relativePath}:${line}`;
            if (jsxNode.name && jsxNode.name.end) {
              const insertionPoint = findInsertionPoint(jsxNode, source);
              magicString.appendLeft(insertionPoint, ` data-loc="${dataLoc}"`);
            }
          } catch (error) {
            console.error(`Error processing JSX node:`, error);
          }
        }
      }
    });
    return {
      code: magicString.toString(),
      map: magicString.generateMap({ hires: true })
    };
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return null;
  }
}
function shouldProcessFile(filePath) {
  const ext = import_path.default.extname(filePath);
  return validExtensions.has(ext) && !filePath.includes("node_modules");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultParserOptions,
  findInsertionPoint,
  getElementName,
  isValidJsxNode,
  shouldProcessFile,
  shouldSkipElement,
  transformJsxCode,
  validExtensions
});

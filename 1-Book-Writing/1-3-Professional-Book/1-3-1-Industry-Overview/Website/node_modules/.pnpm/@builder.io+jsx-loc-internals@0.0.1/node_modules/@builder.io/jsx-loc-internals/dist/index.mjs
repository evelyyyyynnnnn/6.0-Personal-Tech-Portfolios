// src/index.ts
import { parse } from "@babel/parser";
import MagicString from "magic-string";
import path from "path";
import { walk } from "estree-walker";
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
    const ast = parse(source, parserOptions);
    const magicString = new MagicString(source);
    const resourcePath = filePath;
    walk(ast, {
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
            const relativePath = path.relative(process.cwd(), resourcePath);
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
  const ext = path.extname(filePath);
  return validExtensions.has(ext) && !filePath.includes("node_modules");
}
export {
  defaultParserOptions,
  findInsertionPoint,
  getElementName,
  isValidJsxNode,
  shouldProcessFile,
  shouldSkipElement,
  transformJsxCode,
  validExtensions
};

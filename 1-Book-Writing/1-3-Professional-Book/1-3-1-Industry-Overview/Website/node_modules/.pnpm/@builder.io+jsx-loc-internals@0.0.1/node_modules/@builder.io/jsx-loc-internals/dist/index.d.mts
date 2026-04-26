import * as magic_string from 'magic-string';
import { ParserOptions } from '@babel/parser';

declare const defaultParserOptions: ParserOptions;
declare const validExtensions: Set<string>;
/**
 * Extract element name from JSXOpeningElement node
 * Handles different types of element names (Identifier, MemberExpression)
 */
declare function getElementName(jsxNode: any): string | null;
/**
 * Check if element should be skipped (Fragment, context providers, etc.)
 */
declare function shouldSkipElement(elementName: string | null): boolean;
declare function isValidJsxNode(node: any): boolean;
/**
 * Find the correct insertion point after any TypeScript generics
 */
declare function findInsertionPoint(jsxNode: any, source: string): number;
/**
 * Transform JSX code to add location data attributes
 */
declare function transformJsxCode(source: string, filePath: string, options?: {
    parserOptions?: ParserOptions;
}): {
    code: string;
    map: magic_string.SourceMap;
} | null;
/**
 * Check if file should be processed
 */
declare function shouldProcessFile(filePath: string): boolean;

export { defaultParserOptions, findInsertionPoint, getElementName, isValidJsxNode, shouldProcessFile, shouldSkipElement, transformJsxCode, validExtensions };

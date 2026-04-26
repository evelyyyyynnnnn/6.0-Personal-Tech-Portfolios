# JSX Location Internals

This package contains shared utilities for JSX location data injection used by:
- [@builder.io/vite-plugin-jsx-loc](../vite-plugin-jsx-loc)
- [@builder.io/webpack-plugin-jsx-loc](../webpack-plugin-jsx-loc)

## About

This package provides the core functionality to transform JSX code by adding `data-loc` attributes that specify the location (file and line number) of each JSX element. This information can be useful for debugging, component tracking, and tool integration.

## Usage

This package is not intended to be used directly. Instead, use one of the plugin packages mentioned above.

## API

The main functionality is provided by the `transformJsxCode` function:

```typescript
function transformJsxCode(
  source: string,
  filePath: string,
  options?: {
    parserOptions?: ParserOptions;
  }
): { code: string; map: SourceMap } | null;
```

- `source`: The source code string to transform
- `filePath`: The path to the file being processed
- `options`: Optional configuration options
  - `parserOptions`: Custom Babel parser options to use

## How It Works

The transformation works by:
1. Parsing the JSX/TSX code using Babel's parser
2. Walking the AST to find JSX elements
3. Adding a `data-loc` attribute to each element with the file path and line number
4. Generating a source map for the transformation

## License

MIT 
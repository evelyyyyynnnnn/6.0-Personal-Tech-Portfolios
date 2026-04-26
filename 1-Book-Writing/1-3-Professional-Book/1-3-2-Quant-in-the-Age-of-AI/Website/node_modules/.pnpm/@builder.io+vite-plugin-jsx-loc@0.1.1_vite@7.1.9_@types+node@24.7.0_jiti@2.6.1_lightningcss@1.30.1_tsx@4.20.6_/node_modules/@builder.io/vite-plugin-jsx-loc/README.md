# vite-plugin-jsx-loc

A Vite plugin that adds location data attributes to JSX elements for debugging and development purposes.

## Installation

```bash
npm install @builder.io/vite-plugin-jsx-loc
# or
yarn add @builder.io/vite-plugin-jsx-loc
# or
pnpm add @builder.io/vite-plugin-jsx-loc
```

## Usage

Add the plugin to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import { jsxLocPlugin } from '@builder.io/vite-plugin-jsx-loc';

export default defineConfig({
  plugins: [jsxLocPlugin()],
});
```

This will add a `data-loc` attribute to all JSX elements in your code, containing the relative file path and line number where the element is defined. For example:

```jsx
// Input: src/components/Button.tsx
export function Button() {
  return <button>Click me</button>;
}

// Output (during development):
export function Button() {
  return <button data-loc="src/components/Button.tsx:2">Click me</button>;
}
```

## Features

- Adds source location information to JSX elements
- Works with both `.jsx` and `.tsx` files
- Skips processing of `node_modules`
- Preserves source maps
- Minimal performance impact
- No configuration required

## License

MIT 
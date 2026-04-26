# rehype-harden

A rehype plugin that ensures that untrusted markdown does not contain images from and links to unexpected origins.

This is particularly important for markdown returned from [LLMs in AI agents which might have been subject to prompt
injection](https://vercel.com/blog/building-secure-ai-agents).

## Secure prefixes

This package validates URL prefixes and URL origins. Prefix allow-lists can be circumvented
with open redirects, so make sure to make the prefixes are specific enough to avoid such attacks.

E.g. it is more secure to allow `https://example.com/images/` than it is to allow all of
`https://example.com/` which may contain open redirects.

Additionally, URLs may contain path traversal like `/../`. This package does not resolve these.
It is your responsibility that your web server does not allow such traversal.

## Features

- 🔒 **URL Filtering**: Blocks links and images that don't match allowed URL prefixes
- 🔧 **Drop-in**: Works with any rehype-compatible pipeline

## Installation

```bash
npm install rehype-harden
# or
yarn add rehype-harden
# or
pnpm add rehype-harden
```

## Quick Start

```ts
import { harden } from "rehype-harden";
import remarkParse from "remark-parse";
import remarkRehype from "remarkRehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(harden, {
    defaultOrigin: "https://mysite.com",
    allowedLinkPrefixes: ["https://github.com/", "https://docs."],
    allowedImagePrefixes: ["https://via.placeholder.com", "/"],
  })
  .use(/* whatever compiler you want, eg hast-to-jsx-runtime or hast-to-svelte */);
```

## API

### Args

#### `defaultOrigin?: string`

- The origin to resolve relative URLs against
- Required when `allowedLinkPrefixes` or `allowedImagePrefixes` are provided
- Example: `"https://mysite.com"`

#### `allowedLinkPrefixes?: string[]`

- Array of URL prefixes that are allowed for links
- Links not matching these prefixes will be blocked and shown as `[blocked]`
- Use `"*"` to allow all URLs (disables filtering. However, `javascript:` and `data:` URLs are always disallowed)
- Default: `[]` (blocks all links)
- Example: `['https://github.com/', 'https://docs.example.com/']` or `['*']`

#### `allowedImagePrefixes?: string[]`

- Array of URL prefixes that are allowed for images
- Images not matching these prefixes will be blocked and shown as placeholders
- Use `"*"` to allow all URLs (disables filtering. However, `javascript:` and `data:` URLs are always disallowed unless `allowDataImages` is enabled)
- Default: `[]` (blocks all images)
- Example: `['https://via.placeholder.com/', '/']` or `['*']`

#### `allowDataImages?: boolean`

- When set to `true`, allows `data:image/*` URLs (base64-encoded images) in image sources
- This is useful for scenarios where images are embedded directly in markdown (e.g., documents converted from PDF or .docx)
- Only `data:image/*` URLs are allowed; other `data:` URLs (like `data:text/html`) remain blocked for security
- `data:` URLs are never allowed in links, regardless of this setting
- Default: `false` (blocks all data: URLs)
- Example: `true`

#### `blockedImageClass?: string`

- When an image is blocked, by default it is rendered as a span with the text `[Image blocked: {alt text (if provided)}]`. `blockedImageClass` will be added as a class to this span to allow styling.

#### `blockedLinkClass?: string`

- Same as above, but for blocked links.

## Examples

### Basic Usage with Default Blocking

```ts
import { harden } from "rehype-harden";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// Blocks all external links and images by default
const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(harden) // No options = blocks everything
  .use(/* your compiler */);

const result = processor.processSync(markdownContent);
```

### Allow Specific Domains

```ts
import { harden } from "rehype-harden";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(harden, {
    defaultOrigin: "https://mysite.com",
    allowedLinkPrefixes: [
      "https://github.com/",
      "https://docs.github.com/",
      "https://www.npmjs.com/",
    ],
    allowedImagePrefixes: [
      "https://via.placeholder.com/",
      "https://images.unsplash.com/",
      "/", // Allow relative images
    ],
  })
  .use(/* your compiler */);

const result = processor.processSync(markdownContent);
```

### Relative URL Handling

```ts
import { harden } from "rehype-harden";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(harden, {
    defaultOrigin: "https://mysite.com",
    allowedLinkPrefixes: ["https://mysite.com/"],
    allowedImagePrefixes: ["https://mysite.com/"],
  })
  .use(/* your compiler */);

const markdownWithRelativeUrls = `
[Relative Link](/internal-page)
![Relative Image](/images/logo.png)
`;

const result = processor.processSync(markdownWithRelativeUrls);
```

### Allow All URLs (Wildcard)

```ts
import { harden } from "rehype-harden";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(harden, {
    allowedLinkPrefixes: ["*"],
    allowedImagePrefixes: ["*"],
  })
  .use(/* your compiler */);

const markdownWithExternalUrls = `
[Any Link](https://anywhere.com/link)
![Any Image](https://untrusted-site.com/image.jpg)
`;

const result = processor.processSync(markdownWithExternalUrls);
```

**Note**: Using `"*"` disables URL filtering entirely. Only use this when you trust the markdown source.

### Allow Base64 Images

```ts
import { harden } from "rehype-harden";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(harden, {
    defaultOrigin: "https://mysite.com",
    allowedImagePrefixes: ["https://mysite.com/"],
    allowDataImages: true, // Enable base64 images
  })
  .use(/* your compiler */);

const markdownWithBase64Images = `
![Base64 Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==)
![Regular Image](https://mysite.com/image.png)
`;

const result = processor.processSync(markdownWithBase64Images);
```

**Note**: This is particularly useful when converting documents from formats like PDF or .docx where images are embedded as base64. Only `data:image/*` URLs are allowed; other data: URLs remain blocked for security.

### Custom Styling for Blocked Content

```ts
import { harden } from "rehype-harden";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(harden, {
    defaultOrigin: "https://mysite.com",
    allowedLinkPrefixes: ["https://trusted.com/"],
    allowedImagePrefixes: ["https://trusted.com/"],
    blockedLinkClass: "blocked-link",
    blockedImageClass: "blocked-image",
  })
  .use(/* your compiler */);

const result = processor.processSync(markdownContent);
```

## Security Features

### URL Filtering

- **Links**: Filters `href` attributes in `<a>` elements
- **Images**: Filters `src` attributes in `<img>` elements
- **Relative URLs**: Properly resolves and validates relative URLs against `defaultOrigin`
- **Path Traversal Protection**: Normalizes URLs to prevent `../` attacks
- **Wildcard Support**: Use `"*"` prefix to disable filtering (only when markdown is trusted)
- **Prefix Matching**: Validates that URLs start with allowed prefixes and have matching origins

### Blocked Content Handling

- **Blocked Links**: Rendered as plain text with `[blocked]` indicator
- **Blocked Images**: Rendered as placeholder text with image description
- **User Feedback**: Clear indication when content has been blocked for security

### Attack Prevention

- **XSS Prevention**: Blocks `javascript:`, `data:`, `vbscript:` and other dangerous protocols
- **Redirect Protection**: Prevents unauthorized redirects to malicious sites
- **Tracking Prevention**: Blocks unauthorized image tracking pixels
- **Domain Spoofing**: Validates full URLs, not just domains

## Testing

The package includes comprehensive tests covering:

- Basic markdown rendering
- URL filtering for links and images
- Relative URL handling
- Security bypass prevention
- Edge cases and malformed URLs
- TypeScript type safety

Run tests:

```bash
pnpm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Security

If you discover a security vulnerability, please send an e-mail to <security@vercel.com>.

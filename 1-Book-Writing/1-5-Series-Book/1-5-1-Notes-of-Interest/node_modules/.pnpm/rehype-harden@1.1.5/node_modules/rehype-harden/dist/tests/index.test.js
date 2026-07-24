import { describe, it, expect } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { harden } from "../index.js";
// Helper function to process markdown through our plugin
async function processMarkdown(markdown, options = {}) {
    let tree;
    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(harden, options)
        .use(() => (hastTree) => {
        tree = hastTree;
    })
        .use(rehypeStringify);
    await processor.process(markdown);
    if (!tree) {
        throw new Error("Failed to capture HAST tree");
    }
    return tree;
}
// Helper function to find elements by tag name (recursive)
function findElement(tree, tagName) {
    function search(node) {
        if (node.type === "element" && node.tagName === tagName) {
            return node;
        }
        if (node.children) {
            for (const child of node.children) {
                const result = search(child);
                if (result)
                    return result;
            }
        }
        return null;
    }
    return search(tree);
}
// Helper function to find elements by tag name (all matches, recursive)
function findElements(tree, tagName) {
    const elements = [];
    function search(node) {
        if (node.type === "element" && node.tagName === tagName) {
            elements.push(node);
        }
        if (node.children) {
            for (const child of node.children) {
                search(child);
            }
        }
    }
    search(tree);
    return elements;
}
// Helper function to find text content
function getTextContent(element) {
    let text = "";
    for (const child of element.children) {
        if (child.type === "text") {
            text += child.value;
        }
        else if (child.type === "element") {
            text += getTextContent(child);
        }
    }
    return text;
}
// Helper function to find span elements with specific text content (recursive)
function findSpanWithText(tree, text) {
    function search(node) {
        if (node.type === "element" && node.tagName === "span") {
            const spanText = getTextContent(node);
            if (spanText.includes(text)) {
                return node;
            }
        }
        if (node.children) {
            for (const child of node.children) {
                const result = search(child);
                if (result)
                    return result;
            }
        }
        return null;
    }
    return search(tree);
}
describe("rehype-harden", () => {
    // Helper function to test blocked URLs concisely
    const testBlockedUrls = (urlType, badUrls, allowedPrefixes, defaultOrigin) => {
        it.each(badUrls)(`blocks ${urlType} with URL: %s`, async (url) => {
            const markdown = urlType === "link" ? `[Test](${url})` : `![Test](${url})`;
            const tree = await processMarkdown(markdown, {
                defaultOrigin,
                allowedLinkPrefixes: urlType === "link" ? allowedPrefixes : [],
                allowedImagePrefixes: urlType === "image" ? allowedPrefixes : [],
            });
            if (urlType === "link") {
                // Should not have any <a> elements
                const link = findElement(tree, "a");
                expect(link).toBeNull();
                // Should have a span with [blocked] text
                const blockedSpan = findSpanWithText(tree, "[blocked]");
                expect(blockedSpan).not.toBeNull();
                expect(getTextContent(blockedSpan)).toContain("Test [blocked]");
            }
            else {
                // Should not have any <img> elements
                const img = findElement(tree, "img");
                expect(img).toBeNull();
                // Should have a span with blocked image text
                const blockedSpan = findSpanWithText(tree, "[Image blocked:");
                expect(blockedSpan).not.toBeNull();
                expect(getTextContent(blockedSpan)).toContain("[Image blocked: Test]");
            }
        });
    };
    describe("defaultOrigin requirement", () => {
        it("throws error when allowedLinkPrefixes provided without defaultOrigin", async () => {
            await expect(processMarkdown("[Test](https://github.com)", {
                allowedLinkPrefixes: ["https://github.com/"],
            })).rejects.toThrow("defaultOrigin is required when allowedLinkPrefixes or allowedImagePrefixes are provided");
        });
        it("throws error when allowedImagePrefixes provided without defaultOrigin", async () => {
            await expect(processMarkdown("![Test](https://example.com/image.jpg)", {
                allowedImagePrefixes: ["https://example.com/"],
            })).rejects.toThrow("defaultOrigin is required when allowedLinkPrefixes or allowedImagePrefixes are provided");
        });
        it("does not throw when no prefixes are provided", async () => {
            await expect(processMarkdown("[Test](https://github.com)")).resolves.not.toThrow();
        });
    });
    describe("URL transformation", () => {
        it("allows hash-only anchor links without requiring prefixes", async () => {
            const tree = await processMarkdown("[Jump to section](#hero)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://example.com/blog"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("#hero");
            expect(link.properties.target).toBe("_blank");
            expect(link.properties.rel).toBe("noopener noreferrer");
        });
        it("allows hash-only anchor links even with no allowed prefixes", async () => {
            const tree = await processMarkdown("[Jump to top](#top)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: [],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("#top");
        });
        it("allows hash-only anchor links without defaultOrigin", async () => {
            const tree = await processMarkdown("[Footnote](#footnote-1)", {
                allowedLinkPrefixes: ["*"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("#footnote-1");
            expect(link.properties.target).toBe("_blank");
            expect(link.properties.rel).toBe("noopener noreferrer");
        });
        it("allows hash-only anchor links with special characters without defaultOrigin", async () => {
            const tree = await processMarkdown("[Link](#user-content-special-123)", {
                allowedLinkPrefixes: ["*"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("#user-content-special-123");
        });
        it("preserves relative URLs when input is relative and allowed", async () => {
            const tree = await processMarkdown("[Test](/path/to/page?query=1#hash)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://example.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("/path/to/page?query=1#hash");
        });
        it("returns absolute URL when input is absolute and allowed", async () => {
            const tree = await processMarkdown("[Test](https://github.com/user/repo)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://github.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("https://github.com/user/repo");
        });
        it("correctly resolves relative URLs against defaultOrigin for validation", async () => {
            const tree = await processMarkdown("[Test](/api/data)", {
                defaultOrigin: "https://trusted.com",
                allowedLinkPrefixes: ["https://trusted.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("/api/data");
        });
        it("blocks relative URLs that resolve to disallowed origins", async () => {
            const tree = await processMarkdown("[Test](/api/data)", {
                defaultOrigin: "https://untrusted.com",
                allowedLinkPrefixes: ["https://trusted.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).toBeNull();
            const blockedSpan = findSpanWithText(tree, "[blocked]");
            expect(blockedSpan).not.toBeNull();
        });
        it("handles protocol-relative URLs", async () => {
            const tree = await processMarkdown("[Test](//cdn.example.com/resource)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://cdn.example.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("/resource");
        });
        it("normalizes URLs to prevent bypasses", async () => {
            const tree = await processMarkdown("[Test](https://github.com/../../../evil.com)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://github.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("https://github.com/evil.com");
        });
    });
    describe("Bad URL cases - Links", () => {
        const badLinkUrls = [
            'javascript:alert("XSS")',
            'data:text/html,<script>alert("XSS")</script>',
            'vbscript:msgbox("XSS")',
            "file:///etc/passwd",
            "about:blank",
            "blob:https://example.com/uuid",
            "tel:+1234567890",
            "ftp://ftp.example.com/file",
            "../../../etc/passwd",
            "//evil.com/malware",
            "https://evil.com@github.com",
            "https://github.com.evil.com",
            "https://github.com%2e%2e%2f%2e%2e%2fevil.com",
            "https://github.com\\.evil.com",
            "https://github.com%00.evil.com",
            "https://github.com%E2%80%8B.evil.com", // Zero-width space
            "\x00javascript:alert(1)",
            " javascript:alert(1)",
            "javascript\x00:alert(1)",
            "jav&#x61;script:alert(1)",
            "jav&#97;script:alert(1)",
        ];
        testBlockedUrls("link", badLinkUrls, ["https://github.com/"], "https://example.com");
        testBlockedUrls("link", badLinkUrls, ["https://github.com"], "https://example.com");
    });
    describe("Bad URL cases - Images", () => {
        const badImageUrls = [
            "javascript:void(0)",
            "vbscript:execute",
            "file:///etc/passwd",
            "blob:https://example.com/uuid",
            "../../../sensitive.jpg",
            "//evil.com/tracker.gif",
            "https://evil.com@trusted.com/image.jpg",
            "https://trusted.com.evil.com/image.jpg",
            "\x00javascript:void(0)",
        ];
        testBlockedUrls("image", badImageUrls, ["https://trusted.com/"], "https://example.com");
    });
    describe("Edge cases with malformed URLs", () => {
        it("handles null href gracefully", async () => {
            const tree = await processMarkdown("[Test]()", {
                defaultOrigin: "https://example.com",
            });
            const blockedSpan = findSpanWithText(tree, "[blocked]");
            expect(blockedSpan).not.toBeNull();
        });
        it("handles undefined src gracefully", async () => {
            const tree = await processMarkdown("![Test]()", {
                defaultOrigin: "https://example.com",
            });
            const blockedSpan = findSpanWithText(tree, "[Image blocked:");
            expect(blockedSpan).not.toBeNull();
        });
        it("handles numeric URL inputs", async () => {
            const tree = await processMarkdown("[Test](123)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://example.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("https://example.com/123");
        });
        it("handles URLs with unicode characters", async () => {
            const tree = await processMarkdown("[Test](https://example.com/路径/文件)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://example.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("https://example.com/%E8%B7%AF%E5%BE%84/%E6%96%87%E4%BB%B6");
        });
        it("handles extremely long URLs", async () => {
            const longPath = "a".repeat(10000);
            const tree = await processMarkdown(`[Test](https://example.com/${longPath})`, {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://example.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe(`https://example.com/${longPath}`);
        });
    });
    describe("Basic markdown rendering", () => {
        it("renders headings correctly", async () => {
            const tree = await processMarkdown("# Heading 1\n## Heading 2");
            const h1 = findElement(tree, "h1");
            const h2 = findElement(tree, "h2");
            expect(h1).not.toBeNull();
            expect(h2).not.toBeNull();
            expect(getTextContent(h1)).toBe("Heading 1");
            expect(getTextContent(h2)).toBe("Heading 2");
        });
        it("renders paragraphs and text formatting", async () => {
            const tree = await processMarkdown("This is **bold** and this is *italic*");
            const p = findElement(tree, "p");
            expect(p).not.toBeNull();
            const strong = p.children.find((child) => child.type === "element" && child.tagName === "strong");
            const em = p.children.find((child) => child.type === "element" && child.tagName === "em");
            expect(strong).not.toBeNull();
            expect(em).not.toBeNull();
            expect(getTextContent(strong)).toBe("bold");
            expect(getTextContent(em)).toBe("italic");
        });
        it("renders lists correctly", async () => {
            const markdown = `
- Item 1
- Item 2

1. First
2. Second
      `;
            const tree = await processMarkdown(markdown);
            const ul = findElement(tree, "ul");
            const ol = findElement(tree, "ol");
            expect(ul).not.toBeNull();
            expect(ol).not.toBeNull();
        });
        it("renders code blocks", async () => {
            const tree = await processMarkdown(`\`inline code\`

\`\`\`
block code
\`\`\``);
            const p = findElement(tree, "p");
            const pre = findElement(tree, "pre");
            expect(p).not.toBeNull();
            expect(pre).not.toBeNull();
            const code = p.children.find((child) => child.type === "element" && child.tagName === "code");
            expect(code).not.toBeNull();
            expect(getTextContent(code)).toBe("inline code");
        });
    });
    describe("Security properties - Links", () => {
        it("blocks all links when no prefixes are allowed", async () => {
            const tree = await processMarkdown("[GitHub](https://github.com)");
            const link = findElement(tree, "a");
            expect(link).toBeNull();
            const blockedSpan = findSpanWithText(tree, "[blocked]");
            expect(blockedSpan).not.toBeNull();
        });
        it("blocks all links when empty allowedLinkPrefixes array is provided", async () => {
            const tree = await processMarkdown("[GitHub](https://github.com)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: [],
            });
            const link = findElement(tree, "a");
            expect(link).toBeNull();
            const blockedSpan = findSpanWithText(tree, "[blocked]");
            expect(blockedSpan).not.toBeNull();
        });
        it("allows links with allowed prefixes", async () => {
            const tree = await processMarkdown("[GitHub](https://github.com/user/repo)", {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://github.com/"],
            });
            const link = findElement(tree, "a");
            expect(link).not.toBeNull();
            expect(link.properties.href).toBe("https://github.com/user/repo");
            expect(link.properties.target).toBe("_blank");
            expect(link.properties.rel).toBe("noopener noreferrer");
        });
        it("blocks links that do not match allowed prefixes", async () => {
            const tree = await processMarkdown(`
[Allowed](https://github.com/repo)
[Blocked](https://evil.com/malware)
      `, {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://github.com/"],
            });
            const links = findElements(tree, "a");
            expect(links).toHaveLength(1);
            expect(getTextContent(links[0])).toBe("Allowed");
            const blockedSpan = findSpanWithText(tree, "[blocked]");
            expect(blockedSpan).not.toBeNull();
        });
        it("handles multiple allowed prefixes", async () => {
            const tree = await processMarkdown(`
[GitHub](https://github.com/repo)
[Docs](https://docs.example.com/page)
[Website](https://www.example.com/)
[Blocked](https://malicious.com)
      `, {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: [
                    "https://github.com/",
                    "https://docs.example.com",
                    "https://www.example.com",
                ],
            });
            const links = findElements(tree, "a");
            expect(links).toHaveLength(3);
            const hrefs = links.map((link) => link.properties.href);
            expect(hrefs).toContain("https://github.com/repo");
            expect(hrefs).toContain("https://docs.example.com/page");
            expect(hrefs).toContain("https://www.example.com/");
            const blockedSpan = findSpanWithText(tree, "[blocked]");
            expect(blockedSpan).not.toBeNull();
        });
    });
    describe("Security properties - Images", () => {
        it("blocks all images when no prefixes are allowed", async () => {
            const tree = await processMarkdown("![Alt text](https://example.com/image.jpg)");
            const img = findElement(tree, "img");
            expect(img).toBeNull();
            const blockedSpan = findSpanWithText(tree, "[Image blocked:");
            expect(blockedSpan).not.toBeNull();
        });
        it("blocks all images when empty allowedImagePrefixes array is provided", async () => {
            const tree = await processMarkdown("![Alt text](https://example.com/image.jpg)", {
                defaultOrigin: "https://example.com",
                allowedImagePrefixes: [],
            });
            const img = findElement(tree, "img");
            expect(img).toBeNull();
            const blockedSpan = findSpanWithText(tree, "[Image blocked:");
            expect(blockedSpan).not.toBeNull();
        });
        it("allows images with allowed prefixes", async () => {
            const tree = await processMarkdown("![Placeholder](https://via.placeholder.com/150)", {
                defaultOrigin: "https://example.com",
                allowedImagePrefixes: ["https://via.placeholder.com/"],
            });
            const img = findElement(tree, "img");
            expect(img).not.toBeNull();
            expect(img.properties.src).toBe("https://via.placeholder.com/150");
            expect(img.properties.alt).toBe("Placeholder");
        });
        it("blocks images that do not match allowed prefixes", async () => {
            const tree = await processMarkdown(`
![Allowed](https://via.placeholder.com/150)
![Blocked](https://evil.com/malware.jpg)
      `, {
                defaultOrigin: "https://example.com",
                allowedImagePrefixes: ["https://via.placeholder.com/"],
            });
            const imgs = findElements(tree, "img");
            expect(imgs).toHaveLength(1);
            expect(imgs[0].properties.alt).toBe("Allowed");
            const blockedSpan = findSpanWithText(tree, "[Image blocked:");
            expect(blockedSpan).not.toBeNull();
        });
        it("handles images without alt text", async () => {
            const tree = await processMarkdown("![](https://example.com/image.jpg)");
            const blockedSpan = findSpanWithText(tree, "[Image blocked: No description]");
            expect(blockedSpan).not.toBeNull();
        });
        it("allows local images with correct origin", async () => {
            const tree = await processMarkdown("![Logo](/logo.png)", {
                defaultOrigin: "https://example.com",
                allowedImagePrefixes: ["https://example.com/"],
            });
            const img = findElement(tree, "img");
            expect(img).not.toBeNull();
            expect(img.properties.src).toBe("/logo.png");
        });
        it("transforms relative image URLs correctly", async () => {
            const tree = await processMarkdown("![Image](/images/test.jpg?v=1#section)", {
                defaultOrigin: "https://trusted.com",
                allowedImagePrefixes: ["https://trusted.com/"],
            });
            const img = findElement(tree, "img");
            expect(img).not.toBeNull();
            expect(img.properties.src).toBe("/images/test.jpg?v=1#section");
        });
    });
    describe("Edge cases", () => {
        it("handles undefined href in links", async () => {
            const tree = await processMarkdown("[No href]()");
            const blockedSpan = findSpanWithText(tree, "[blocked]");
            expect(blockedSpan).not.toBeNull();
        });
        it("handles undefined src in images", async () => {
            const tree = await processMarkdown("![No src]()");
            const blockedSpan = findSpanWithText(tree, "[Image blocked:");
            expect(blockedSpan).not.toBeNull();
        });
        it("handles complex markdown with mixed allowed/blocked content", async () => {
            const tree = await processMarkdown(`
# My Document

This has [allowed link](https://github.com/repo) and [blocked link](https://bad.com).

![Allowed image](https://via.placeholder.com/100)
![Blocked image](https://external.com/img.jpg)

> Quote with [another link](https://docs.github.com/)
      `, {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: [
                    "https://github.com/",
                    "https://docs.github.com",
                ],
                allowedImagePrefixes: ["https://via.placeholder.com/"],
            });
            // Check allowed content
            const links = findElements(tree, "a");
            const imgs = findElements(tree, "img");
            expect(links).toHaveLength(2);
            expect(imgs).toHaveLength(1);
            const hrefs = links.map((link) => link.properties.href);
            expect(hrefs).toContain("https://github.com/repo");
            expect(hrefs).toContain("https://docs.github.com/");
            expect(imgs[0].properties.alt).toBe("Allowed image");
            // Check blocked content
            const blockedSpans = [
                findSpanWithText(tree, "blocked link [blocked]"),
                findSpanWithText(tree, "[Image blocked: Blocked image]"),
            ];
            blockedSpans.forEach((span) => expect(span).not.toBeNull());
        });
    });
    describe("Image transformation with relative URLs", () => {
        it("preserves query params and hash in relative image URLs", async () => {
            const tree = await processMarkdown("![Test](/img.jpg?size=large&v=2#section)", {
                defaultOrigin: "https://trusted.com",
                allowedImagePrefixes: ["https://trusted.com/"],
            });
            const img = findElement(tree, "img");
            expect(img).not.toBeNull();
            expect(img.properties.src).toBe("/img.jpg?size=large&v=2#section");
        });
        it("blocks relative images when origin not allowed", async () => {
            const tree = await processMarkdown("![Test](/evil.jpg)", {
                defaultOrigin: "https://untrusted.com",
                allowedImagePrefixes: ["https://trusted.com/"],
            });
            const img = findElement(tree, "img");
            expect(img).toBeNull();
            const blockedSpan = findSpanWithText(tree, "[Image blocked:");
            expect(blockedSpan).not.toBeNull();
        });
    });
    describe("Specific bypass attempts", () => {
        it("correctly handles URLs that appear to bypass but actually resolve correctly", async () => {
            const tree = await processMarkdown("![Test](https://trusted.com/../../../evil.com/image.jpg)", {
                defaultOrigin: "https://example.com",
                allowedImagePrefixes: ["https://trusted.com/"],
            });
            const img = findElement(tree, "img");
            expect(img).not.toBeNull();
            expect(img.properties.src).toBe("https://trusted.com/evil.com/image.jpg");
        });
        it("blocks images inside blocked links", async () => {
            const tree = await processMarkdown('[![click](http://evil.com/img.png)](javascript:alert("nested-img-link"))', {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://example.com/", "https://trusted.org/"],
                allowedImagePrefixes: ["https://example.com/", "https://images.com/"],
            });
            // The link should be blocked
            const link = findElement(tree, "a");
            expect(link).toBeNull();
            // No img elements should exist (even the nested one should be blocked)
            const img = findElement(tree, "img");
            expect(img).toBeNull();
            // Should have a blocked link span
            const blockedLinkSpan = findSpanWithText(tree, "[blocked]");
            expect(blockedLinkSpan).not.toBeNull();
            // Should have a blocked image placeholder inside the blocked link
            const blockedImageSpan = findSpanWithText(tree, "[Image blocked: click]");
            expect(blockedImageSpan).not.toBeNull();
        });
        it("blocks nested images in complex blocked link structures", async () => {
            const tree = await processMarkdown('[![![nested](javascript:alert("inner"))](https://safe.com)](javascript:alert("outer"))', {
                defaultOrigin: "https://example.com",
                allowedLinkPrefixes: ["https://example.com/", "https://trusted.org/"],
                allowedImagePrefixes: ["https://example.com/", "https://images.com/"],
            });
            // No links or images should exist
            const link = findElement(tree, "a");
            const img = findElement(tree, "img");
            expect(link).toBeNull();
            expect(img).toBeNull();
            // Should have blocked content
            const blockedLinkSpan = findSpanWithText(tree, "[blocked]");
            expect(blockedLinkSpan).not.toBeNull();
            // The nested image should also be blocked
            const blockedImageSpan = findSpanWithText(tree, "[Image blocked: nested]");
            expect(blockedImageSpan).not.toBeNull();
        });
        it.each([
            "[Test](javascript:alert)",
            "[Test](data:text)",
            "[Test](vbscript:)",
        ])("handles malformed URLs that contain invalid characters (%s)", async (markdown) => {
            const tree = await processMarkdown(markdown, {
                defaultOrigin: "https://example.com",
            });
            // These should be blocked
            const link = findElement(tree, "a");
            expect(link).toBeNull();
        });
    });
});
describe("URL prefix validation behavior", () => {
    it("requires complete valid URL prefixes (protocol-only prefixes don't work)", async () => {
        const tree = await processMarkdown("[Test Link](https://github.com/test)", {
            defaultOrigin: "https://example.com",
            allowedLinkPrefixes: ["https://"],
        });
        // The link should be blocked because "https://" cannot be parsed as a valid URL
        const link = findElement(tree, "a");
        expect(link).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[blocked]");
        expect(blockedSpan).not.toBeNull();
    });
    it("works with complete domain prefixes", async () => {
        const tree = await processMarkdown("[Test Link](https://github.com/user/repo)", {
            defaultOrigin: "https://example.com",
            allowedLinkPrefixes: ["https://github.com/"],
        });
        const link = findElement(tree, "a");
        expect(link).not.toBeNull();
        expect(link.properties.href).toBe("https://github.com/user/repo");
    });
    it("requires origin and prefix to match for validation", async () => {
        const tree = await processMarkdown("[Allowed](https://github.com/user/repo) [Blocked](https://github.com/other/repo)", {
            defaultOrigin: "https://example.com",
            allowedLinkPrefixes: ["https://github.com/user/"],
        });
        // Only the first link should be rendered since it matches the prefix
        const links = findElements(tree, "a");
        expect(links).toHaveLength(1);
        expect(getTextContent(links[0])).toBe("Allowed");
        expect(links[0].properties.href).toBe("https://github.com/user/repo");
        const blockedSpan = findSpanWithText(tree, "[blocked]");
        expect(blockedSpan).not.toBeNull();
    });
});
describe("Wildcard prefix support", () => {
    it.each([
        {
            input: "https://example.com/test",
            expected: "https://example.com/test",
        },
        {
            input: "https://malicious-site.com/tracker",
            expected: "https://malicious-site.com/tracker",
        },
        {
            input: "http://insecure-site.com/",
            expected: "http://insecure-site.com/",
        },
        {
            input: "https://any-domain.org/path",
            expected: "https://any-domain.org/path",
        },
    ])("allows all links when allowedLinkPrefixes includes '*' (input: $input, expected: $expected)", async ({ input, expected }) => {
        const tree = await processMarkdown(`[Test Link](${input})`, {
            defaultOrigin: "https://example.com",
            allowedLinkPrefixes: ["*"],
        });
        const link = findElement(tree, "a");
        expect(link).not.toBeNull();
        expect(link.properties.href).toBe(expected);
        expect(getTextContent(link)).toBe("Test Link");
    });
    it.each([
        "https://example.com/image.png",
        "https://untrusted-site.com/tracker.gif",
        "http://insecure-images.com/photo.jpg",
        "https://any-cdn.net/asset.svg",
    ])("allows all images when allowedImagePrefixes includes '*' (%s)", async (url) => {
        const tree = await processMarkdown(`![Test Image](${url})`, {
            defaultOrigin: "https://example.com",
            allowedImagePrefixes: ["*"],
        });
        const img = findElement(tree, "img");
        expect(img).not.toBeNull();
        expect(img.properties.src).toBe(url);
        expect(img.properties.alt).toBe("Test Image");
    });
    it("handles relative URLs with wildcard prefix", async () => {
        const tree1 = await processMarkdown("[Relative Link](/internal-page)", {
            defaultOrigin: "https://example.com",
            allowedLinkPrefixes: ["*"],
        });
        const link = findElement(tree1, "a");
        expect(link).not.toBeNull();
        expect(link.properties.href).toBe("/internal-page");
        const tree2 = await processMarkdown("![Relative Image](/images/logo.png)", {
            defaultOrigin: "https://example.com",
            allowedImagePrefixes: ["*"],
        });
        const img = findElement(tree2, "img");
        expect(img).not.toBeNull();
        expect(img.properties.src).toBe("/images/logo.png");
    });
    it("wildcard works alongside other prefixes", async () => {
        const tree = await processMarkdown("[Any Link](https://random-site.com/path)", {
            defaultOrigin: "https://example.com",
            allowedLinkPrefixes: ["https://github.com/", "*"],
        });
        const link = findElement(tree, "a");
        expect(link).not.toBeNull();
        expect(link.properties.href).toBe("https://random-site.com/path");
    });
    it("wildcard allows malformed URLs that can still be parsed", async () => {
        const tree = await processMarkdown("[Test](//example.com/protocol-relative)", {
            defaultOrigin: "https://example.com",
            allowedLinkPrefixes: ["*"],
        });
        const link = findElement(tree, "a");
        expect(link).not.toBeNull();
        expect(link.properties.href).toBe("/protocol-relative");
    });
    it("wildcard allows URLs that can be resolved with defaultOrigin", async () => {
        const tree = await processMarkdown("[Test](invalid-url-without-protocol)", {
            defaultOrigin: "https://example.com",
            allowedLinkPrefixes: ["*"],
        });
        // With defaultOrigin, this gets resolved to an absolute URL
        const link = findElement(tree, "a");
        expect(link).not.toBeNull();
        expect(link.properties.href).toBe("https://example.com/invalid-url-without-protocol");
    });
    it("wildcard doesn't require defaultOrigin for absolute URLs", async () => {
        const tree = await processMarkdown("[Test](https://example.com/test)", {
            allowedLinkPrefixes: ["*"],
        });
        const link = findElement(tree, "a");
        expect(link).not.toBeNull();
        expect(link.properties.href).toBe("https://example.com/test");
    });
    it("wildcard still blocks completely unparseable URLs", async () => {
        const tree = await processMarkdown("[Test](ht@tp://not-a-valid-url)", {
            allowedLinkPrefixes: ["*"],
        });
        const link = findElement(tree, "a");
        expect(link).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[blocked]");
        expect(blockedSpan).not.toBeNull();
    });
    it("wildcard still blocks javascript: URLs", async () => {
        const tree = await processMarkdown("[Test](javascript:alert('XSS'))", {
            allowedLinkPrefixes: ["*"],
        });
        // Even with wildcard "*", javascript: URLs are blocked because they can't be parsed by URL()
        const link = findElement(tree, "a");
        expect(link).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[blocked]");
        expect(blockedSpan).not.toBeNull();
    });
    it("wildcard blocks data: URLs", async () => {
        const tree = await processMarkdown("[Test](data:text/html,123)", {
            allowedLinkPrefixes: ["*"],
        });
        // Even with wildcard "*", data: URLs are blocked because they can't be parsed by URL()
        const link = findElement(tree, "a");
        expect(link).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[blocked]");
        expect(blockedSpan).not.toBeNull();
    });
    it("wildcard still blocks javascript: URLs (with identity transform)", async () => {
        const tree = await processMarkdown('[Test](javascript:alert("XSS"))', {
            allowedLinkPrefixes: ["*"],
        });
        const link = findElement(tree, "a");
        expect(link).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[blocked]");
        expect(blockedSpan).not.toBeNull();
    });
    it("wildcard still blocks data: URLs (with identity transform)", async () => {
        const tree = await processMarkdown("[Test](data:text/html,123)", {
            allowedLinkPrefixes: ["*"],
        });
        const link = findElement(tree, "a");
        expect(link).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[blocked]");
        expect(blockedSpan).not.toBeNull();
    });
});
describe("Data image support", () => {
    const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    it("blocks data: image URLs by default", async () => {
        const tree = await processMarkdown(`![Test](${base64Image})`);
        const img = findElement(tree, "img");
        expect(img).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[Image blocked:");
        expect(blockedSpan).not.toBeNull();
    });
    it("allows data: image URLs when allowDataImages is true", async () => {
        const tree = await processMarkdown(`![Test](${base64Image})`, {
            allowDataImages: true,
        });
        const img = findElement(tree, "img");
        expect(img).not.toBeNull();
        expect(img.properties.src).toBe(base64Image);
        expect(img.properties.alt).toBe("Test");
    });
    it("blocks data: image URLs when allowDataImages is false", async () => {
        const tree = await processMarkdown(`![Test](${base64Image})`, {
            allowDataImages: false,
        });
        const img = findElement(tree, "img");
        expect(img).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[Image blocked:");
        expect(blockedSpan).not.toBeNull();
    });
    it("blocks non-image data: URLs even when allowDataImages is true", async () => {
        const tree = await processMarkdown("![Test](data:text/html,<script>alert('XSS')</script>)", {
            allowDataImages: true,
        });
        const img = findElement(tree, "img");
        expect(img).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[Image blocked:");
        expect(blockedSpan).not.toBeNull();
    });
    it("blocks data: URLs in links even when allowDataImages is true", async () => {
        const tree = await processMarkdown("[Test](data:text/html,<script>alert('XSS')</script>)", {
            allowDataImages: true,
        });
        const link = findElement(tree, "a");
        expect(link).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[blocked]");
        expect(blockedSpan).not.toBeNull();
    });
    it("supports various data: image formats", async () => {
        const formats = [
            "data:image/png;base64,iVBORw0KGgoAAAANS",
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA",
            "data:image/gif;base64,R0lGODlhAQABAIAAAP",
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0",
            "data:image/webp;base64,UklGRiQAAABXRUJQVlA4",
        ];
        for (const format of formats) {
            const tree = await processMarkdown(`![Test](${format})`, {
                allowDataImages: true,
            });
            const img = findElement(tree, "img");
            expect(img).not.toBeNull();
            expect(img.properties.src).toBe(format);
        }
    });
    it("allows data: images alongside allowedImagePrefixes", async () => {
        const markdown = `
![Data Image](${base64Image})
![HTTP Image](https://example.com/image.png)
    `;
        const tree = await processMarkdown(markdown, {
            defaultOrigin: "https://example.com",
            allowedImagePrefixes: ["https://example.com/"],
            allowDataImages: true,
        });
        const imgs = findElements(tree, "img");
        expect(imgs).toHaveLength(2);
        expect(imgs[0].properties.src).toBe(base64Image);
        expect(imgs[1].properties.src).toBe("https://example.com/image.png");
    });
    it("blocks data: images when allowedImagePrefixes is set but allowDataImages is false", async () => {
        const tree = await processMarkdown(`![Test](${base64Image})`, {
            defaultOrigin: "https://example.com",
            allowedImagePrefixes: ["https://example.com/"],
            allowDataImages: false,
        });
        const img = findElement(tree, "img");
        expect(img).toBeNull();
        const blockedSpan = findSpanWithText(tree, "[Image blocked:");
        expect(blockedSpan).not.toBeNull();
    });
});
//# sourceMappingURL=index.test.js.map
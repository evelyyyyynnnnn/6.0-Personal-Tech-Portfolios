import { CONTINUE, SKIP, visit } from "unist-util-visit";
export function harden({ defaultOrigin = "", allowedLinkPrefixes = [], allowedImagePrefixes = [], allowDataImages = false, blockedImageClass = "inline-block bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded text-sm", blockedLinkClass = "text-gray-500", }) {
    // Only require defaultOrigin if we have specific prefixes (not wildcard only)
    const hasSpecificLinkPrefixes = allowedLinkPrefixes.length && !allowedLinkPrefixes.every((p) => p === "*");
    const hasSpecificImagePrefixes = allowedImagePrefixes.length &&
        !allowedImagePrefixes.every((p) => p === "*");
    if (!defaultOrigin && (hasSpecificLinkPrefixes || hasSpecificImagePrefixes)) {
        throw new Error("defaultOrigin is required when allowedLinkPrefixes or allowedImagePrefixes are provided");
    }
    return (tree) => {
        const visitor = createVisitor(defaultOrigin, allowedLinkPrefixes, allowedImagePrefixes, allowDataImages, blockedImageClass, blockedLinkClass);
        visit(tree, visitor);
    };
}
function parseUrl(url, defaultOrigin) {
    if (typeof url !== "string")
        return null;
    try {
        // Try to parse as absolute URL first
        return new URL(url);
    }
    catch {
        // If that fails and we have a defaultOrigin, try with it
        if (defaultOrigin) {
            try {
                return new URL(url, defaultOrigin);
            }
            catch {
                return null;
            }
        }
        return null;
    }
}
function isPathRelativeUrl(url) {
    if (typeof url !== "string")
        return false;
    return url.startsWith("/");
}
const safeProtocols = new Set([
    "https:",
    "http:",
    "irc:",
    "ircs:",
    "mailto:",
    "xmpp:",
]);
function transformUrl(url, allowedPrefixes, defaultOrigin, allowDataImages = false, isImage = false) {
    if (!url)
        return null;
    // Allow hash-only (fragment-only) URLs - they navigate within the current page
    if (typeof url === "string" && url.startsWith("#") && !isImage) {
        // Hash-only URLs don't need defaultOrigin validation
        // Just verify it's a valid fragment identifier
        try {
            // Use a dummy base to validate the hash format
            const testUrl = new URL(url, "http://example.com");
            if (testUrl.hash === url) {
                return url;
            }
        }
        catch {
            // Invalid hash format, fall through to normal validation
        }
    }
    // Handle data: URLs for images if allowDataImages is enabled
    if (typeof url === "string" && url.startsWith("data:")) {
        // Only allow data: URLs for images when explicitly enabled
        if (isImage && allowDataImages && url.startsWith("data:image/")) {
            return url;
        }
        return null;
    }
    const parsedUrl = parseUrl(url, defaultOrigin);
    if (!parsedUrl)
        return null;
    if (!safeProtocols.has(parsedUrl.protocol))
        return null;
    if (parsedUrl.protocol === "mailto:")
        return parsedUrl.href;
    // If the input is path relative, we output a path relative URL as well,
    // however, we always run the same checks on an absolute URL and we
    // always reconstruct the output from the parsed URL to ensure that
    // the output is always a valid URL.
    const inputWasRelative = isPathRelativeUrl(url);
    if (parsedUrl &&
        allowedPrefixes.some((prefix) => {
            const parsedPrefix = parseUrl(prefix, defaultOrigin);
            if (!parsedPrefix) {
                return false;
            }
            if (parsedPrefix.origin !== parsedUrl.origin) {
                return false;
            }
            return parsedUrl.href.startsWith(parsedPrefix.href);
        })) {
        if (inputWasRelative) {
            return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
        }
        return parsedUrl.href;
    }
    // Check for wildcard - allow all URLs
    if (allowedPrefixes.includes("*")) {
        // Wildcard only allows http and https URLs
        if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
            return null;
        }
        if (inputWasRelative) {
            return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
        }
        return parsedUrl.href;
    }
    return null;
}
const SEEN = Symbol("node-seen");
const createVisitor = (defaultOrigin, allowedLinkPrefixes, allowedImagePrefixes, allowDataImages, blockedImageClass, blockedLinkClass) => {
    const visitor = (node, index, parent) => {
        if (node.type !== "element" ||
            // @ts-expect-error
            node[SEEN]) {
            return CONTINUE;
        }
        if (node.tagName === "a") {
            const transformedUrl = transformUrl(node.properties.href, allowedLinkPrefixes, defaultOrigin, false, false);
            if (transformedUrl === null) {
                // @ts-expect-error
                node[SEEN] = true;
                // We need to eagerly visit children so that we catch any nested nastiness as well,
                // prior to modifying the node's parent.
                visit(node, visitor);
                if (parent && typeof index === "number") {
                    parent.children[index] = {
                        type: "element",
                        tagName: "span",
                        properties: {
                            title: "Blocked URL: " + String(node.properties.href),
                            class: blockedLinkClass,
                        },
                        children: [
                            ...node.children,
                            {
                                type: "text",
                                value: " [blocked]",
                            },
                        ],
                    };
                }
                return SKIP;
            }
            else {
                node.properties.href = transformedUrl;
                node.properties.target = "_blank";
                node.properties.rel = "noopener noreferrer";
                return CONTINUE;
            }
        }
        if (node.tagName === "img") {
            const transformedUrl = transformUrl(node.properties.src, allowedImagePrefixes, defaultOrigin, allowDataImages, true);
            if (transformedUrl === null) {
                // @ts-expect-error
                node[SEEN] = true;
                visit(node, visitor);
                if (parent && typeof index === "number") {
                    parent.children[index] = {
                        type: "element",
                        tagName: "span",
                        properties: {
                            class: blockedImageClass,
                        },
                        children: [
                            {
                                type: "text",
                                value: "[Image blocked: " +
                                    String(node.properties.alt || "No description") +
                                    "]",
                            },
                        ],
                    };
                }
                return SKIP;
            }
            else {
                node.properties.src = transformedUrl;
                return CONTINUE;
            }
        }
        return CONTINUE;
    };
    return visitor;
};
//# sourceMappingURL=index.js.map
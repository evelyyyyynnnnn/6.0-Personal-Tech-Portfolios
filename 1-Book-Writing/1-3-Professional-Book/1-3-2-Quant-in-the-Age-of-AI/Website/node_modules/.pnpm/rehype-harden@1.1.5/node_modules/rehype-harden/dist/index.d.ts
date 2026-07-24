import type { Root as HastRoot } from "hast";
export declare function harden({ defaultOrigin, allowedLinkPrefixes, allowedImagePrefixes, allowDataImages, blockedImageClass, blockedLinkClass, }: {
    defaultOrigin?: string;
    allowedLinkPrefixes?: string[];
    allowedImagePrefixes?: string[];
    allowDataImages?: boolean;
    blockedImageClass?: string;
    blockedLinkClass?: string;
}): (tree: HastRoot) => void;
//# sourceMappingURL=index.d.ts.map
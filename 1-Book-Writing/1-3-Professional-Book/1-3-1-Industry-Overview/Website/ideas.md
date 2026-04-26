# Industry Overview Website — Design Brainstorm

## Three Design Approaches

<response>
<text>
### Idea A — Swiss Corporate Minimalism
**Design Movement:** International Typographic Style (Swiss Design)
**Core Principles:**
- Grid-based precision with deliberate asymmetry in section breaks
- Information hierarchy through weight and scale, not decoration
- Restrained color — monochrome base with a single steel-blue accent
- Every element earns its place; no ornamental clutter

**Color Philosophy:** Off-white (#F7F7F5) background, near-black (#1A1A1A) text, steel-blue (#2563EB) accent. Dark mode inverts to deep slate (#0F172A) with cool-gray text. The palette signals trust, authority, and global reach — ideal for B2B and institutional buyers.

**Layout Paradigm:** Left-anchored navigation sidebar (desktop) with a wide content column. Sections use a 12-column grid with intentional bleeds. Hero uses a split layout: large typographic headline left, abstract data-grid graphic right.

**Signature Elements:**
- Thin horizontal rule dividers with section numbers (01, 02…)
- Monospaced chapter/section labels in small caps
- Data tables with alternating row shading and sticky headers

**Interaction Philosophy:** Hover states reveal underlines and subtle color shifts. Smooth scroll between sections. Language toggle animates with a crossfade.

**Animation:** Entrance animations are staggered fade-up (60ms delay per item). No bouncing or overly playful motion. Transitions at 200ms ease-out.

**Typography System:** Headlines — IBM Plex Serif Bold. Body — IBM Plex Sans Regular. Labels/captions — IBM Plex Mono. Hierarchy: 48px / 32px / 20px / 16px / 13px.
</text>
<probability>0.08</probability>
</response>

<response>
<text>
### Idea B — Editorial Finance (CHOSEN)
**Design Movement:** Financial Times / Bloomberg editorial aesthetic
**Core Principles:**
- Newspaper-inspired column layouts with strong vertical rhythm
- Data-forward presentation: numbers, stats, and classifications are heroes
- Neutral warmth: cream/sand tones in light mode; deep charcoal in dark
- Professional credibility — the site looks like a reference publication

**Color Philosophy:** Light mode: warm cream (#FAFAF7) background, deep ink (#1C1917) text, accent #B45309 (amber-brown — evokes financial print). Dark mode: deep charcoal (#18181B) background, warm off-white (#F4F4F5) text, accent #F59E0B (gold). The palette communicates expertise and premium positioning without being cold.

**Layout Paradigm:** Top navigation bar with language + theme toggles. Hero: full-width banner with a large headline and a subtitle, followed by a structured table-of-contents grid. Content sections use a two-column layout (main content + sticky sidebar with quick-nav). Chapter cards use a newspaper-style grid.

**Signature Elements:**
- Chapter number badges in amber/gold
- Thin vertical rule separating sidebar from main content
- "Key Trends" callout boxes with left border accent

**Interaction Philosophy:** Smooth anchor-scroll navigation. Cards lift on hover with a 2px shadow increase. Language switch is instant with no page reload.

**Animation:** Subtle fade-in on scroll (Intersection Observer). Header shrinks on scroll. Theme transition with 300ms CSS variable interpolation.

**Typography System:** Headlines — Playfair Display Bold. Body — Source Serif 4 Regular. UI/Labels — DM Sans Medium. Hierarchy: 56px / 36px / 24px / 18px / 14px.
</text>
<probability>0.07</probability>
</response>

<response>
<text>
### Idea C — Structured Corporate Atlas
**Design Movement:** Corporate Atlas / McKinsey Report aesthetic
**Core Principles:**
- Dense information architecture with clear visual hierarchy
- Navy + white as the primary palette — conveys authority and global scope
- Modular card-based layout for industry sectors
- Strong use of icons and color-coded sector tags

**Color Philosophy:** Navy (#0F2D5C) primary, white (#FFFFFF) background, sky-blue (#38BDF8) accent. Dark mode: deep navy (#0A1628) background, light blue-gray text. Communicates institutional gravitas.

**Layout Paradigm:** Full-width top nav. Hero with a world-map or network graphic. Below: a 3-column card grid for industry sectors. Each card has a color-coded icon, title, and brief description.

**Signature Elements:**
- Color-coded sector tags (Primary=green, Secondary=blue, Tertiary=orange, Quaternary=purple)
- World map with highlighted regional hotspots
- Progress bars showing industry size/importance

**Interaction Philosophy:** Cards expand on click to show chapter details. Filtering by sector type. Search functionality.

**Animation:** Cards animate in with a stagger. Map regions highlight on hover. Smooth modal transitions.

**Typography System:** Headlines — Montserrat Bold. Body — Open Sans Regular. Labels — Roboto Mono. Hierarchy: 52px / 34px / 22px / 16px / 12px.
</text>
<probability>0.06</probability>
</response>

---

## Selected Approach: **Idea B — Editorial Finance**

The Editorial Finance aesthetic is chosen because:
1. It directly mirrors how professional industry reports and financial publications look — immediately credible to B2B buyers
2. The warm cream/charcoal palette is distinctive and avoids the generic "tech startup blue"
3. The newspaper-column layout naturally accommodates the book's hierarchical structure (Parts → Chapters → Sections)
4. It scales well for embedding into a larger system as a module
5. Bilingual content (EN/ZH) is handled gracefully with the same typographic system

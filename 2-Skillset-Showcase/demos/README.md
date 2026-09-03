# Skillset Showcase — Demo Pages

Four self-contained demo pages, one per subfolder of `2-Skillset-Showcase`, plus a landing page that links them.

| File | Demos | Source project |
| --- | --- | --- |
| `index.html` | Landing page linking all four | — |
| `2-1-full-stack-demo.html` | Docusaurus blog UI: post list ⇄ grid views, category filter, dark mode, repo layout, stack | `2-1-My-Full-Stack/` |
| `2-2-ui-designer-demo.html` | vCard portfolio: sidebar contacts, tab routing, resume timeline, filterable projects, contact form | `2-2-My-UI-Designer-Site/` |
| `2-3-website-design-demo.html` | Three mini builds: living weather card, beeper typewriter, AI accounting ledger dashboard | `2-3-Website-Design/` |
| `2-4-academic-site-demo.html` | Hugo Blox academic landing page: research, publications, courses, projects, talks, posts | `2-4-My-Academic-Site/` |

## Running locally

No build step. Open any file in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploying to Vercel

Each page is plain static HTML, so the whole folder deploys as-is:

- **Framework preset:** Other
- **Root directory:** `2-Skillset-Showcase/demos`
- **Build command:** _(none)_
- **Output directory:** `.`

Or from the CLI, inside this folder:

```bash
npx vercel deploy --prod
```

## Notes

- Every page is one file. The only external requests are Google Fonts; everything else — icons, avatars,
  project thumbnails, charts — is CSS or inline SVG, so the pages render offline apart from font fallback.
- All four are responsive; `2-1` and `2-4` also carry a light/dark toggle.
- Demo interactions (the contact form, CV button, social links) are intentionally inert — wire them up
  before treating any page as a live site.
- Content is drawn from each project's real files. Copy in the academic demo was lightly proofread against
  `content/_index.md`.

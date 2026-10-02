# Languages — Français · 한국어 · 日本語

One site for three languages. French, Korean and Japanese each carry the **same
four sections**, so a chapter in one has a counterpart in the others.

## How it is built

It isn't. There is no build step, no `node_modules`, no Hexo, no generator —
Vercel just serves these files. That is the same pattern as the subfolders in
`7.0-Side-Interest-Tools`.

```
index.html          the whole site: styling, sidebar, router
content.js          the table of contents — the one file you edit to add a page
source/**/*.md      the content, one markdown file per page (front matter kept)
picture/            images referenced as /picture/...
lib/marked.min.js   marked 4.3.0, vendored (MIT) so there is no CDN to depend on
vercel.json         static serving + the ignoreCommand
```

`index.html` fetches the markdown file for whatever page the URL hash names,
renders it with marked, and drops it into the reading column. Because the
markdown is fetched rather than compiled in, **editing a `.md` file is the whole
update** — commit it and the page changes. No rebuild, nothing to regenerate.

## Adding a page

1. Put the markdown at `source/<Language>/<Section>/<name>.md`, with front
   matter:

   ```markdown
   ---
   title: 3️⃣ Something New
   date: 2026-10-02 00:00:00
   ---
   ```

   The `title:` becomes the page's `<h1>`; you never write it twice.

2. Add one line to the matching section in `content.js`:

   ```js
   { slug: 'name', nav: 'Short label for the sidebar' }
   ```

That's it — the sidebar entry, the route (`#language-section-name`) and the
styling all follow from those two edits.

## Viewing it locally

The page fetches the markdown, so `file://` will not work (the browser blocks
it). Serve the folder instead:

```bash
python3 -m http.server 8000     # then open http://127.0.0.1:8000/
```

## Links and images inside the markdown

The markdown keeps the paths the old Hexo site used, and `index.html` rewrites
them when it renders:

| In the markdown | What happens |
|---|---|
| `/French/Grammar/chapter1.html` | becomes the hash route `#french-grammar-chapter1` |
| `../Word-Phrase/Basic-Verb.html` | resolved against the page's folder, then routed the same way |
| `#note` | left alone — the browser scrolls to it, the page does not reload |
| `/picture/author.jpg` | served straight from `picture/` |
| `https://…` | opens in a new tab |

An image whose host has gone away leaves a labelled slot with a link to the
original, instead of a broken-image icon. Several of the French pages point at
`picss.sunbangyan.cn` / `picdm.sunbangyan.cn`, which may or may not still be up;
replacing those with files under `picture/` is a safe cleanup whenever you get
to it.

## vercel.json

Two settings matter beyond the static serving:

- **`ignoreCommand`** — compares `$VERCEL_GIT_PREVIOUS_SHA` (the last *successful
  deployment*, not `HEAD^`) against `HEAD` for this folder only. Exit 0 skips the
  build, exit 1 runs it. Without it, a commit anywhere in the repo redeploys
  every project pointing at this repo, which burns through the daily deployment
  limit fast.
- **`git.deploymentEnabled`** — `claude/*` and `claude/**` are set to `false`, so
  pushes to working branches don't create preview deployments.

## Checking the content against a reference copy

`tools/compare.py` walks every page of this site in Chromium and diffs its
visible text against a reference copy of the same site (a directory of rendered
HTML), so a rebuild can be shown to have lost nothing:

```bash
python3 -m http.server 8731 &          # serve this folder
python3 tools/compare.py path/to/reference-html/
```

It compares text, not markup: whitespace is collapsed, `<br>` and block
boundaries are treated the way `innerText` treats them, and an image is reduced
to its filename, so only real content differences show up.

## Status of the content

The **French** pages are the real thing, carried over from the original site.
The **Korean** and **Japanese** pages are scaffolds: the structure, the sidebar
entries and the styling are wired, and each page says what belongs in it. Fill
them in by editing the markdown — nothing else needs to change.

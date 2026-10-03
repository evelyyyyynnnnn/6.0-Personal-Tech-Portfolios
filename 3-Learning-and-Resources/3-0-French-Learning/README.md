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

All three languages carry the **real content**, imported from the sites they
came from:

| | source | pages |
| --- | --- | --- |
| 🇫🇷 Français | french-book.netlify.app | 10 |
| 🇰🇷 한국어 | korean-book.netlify.app | 15 |
| 🇯🇵 日本語 | japanese-book.netlify.app | 11 |

The structure mirrors each site's own URL paths, so a page here and the page it
came from line up by path — `korean-book.netlify.app/grammar/topik-i` is
`source/Korean/grammar/topik-i.md`. The three sites are **not** the same shape:
Korean has Listening and Learn Everyday that the other two don't, and each
language's own Intro and Self-introduction pages live under its `about` section.

### What the import kept as-is

The import is faithful, so a few things the original sites have are still here.
They are worth knowing about before you edit:

- Several pages share a title with their sibling, because the original does:
  French `dialogue-passage` ch1 and ch2 are both *dialogue-passage*, French
  `grammars/chapter2` is titled *Word-Phraze*, Japanese `word-phraze` ch1 and
  ch2 are both *Word-Phraze*, Japanese `grammar/grammar2` is titled *Basement*,
  Korean `word-phraze/topik-ii` is titled *Topik-I*, and both Korean
  `learn-korean-everyday` pages share one title.
- `Word and Phraze` is the sites' own spelling of "Phrase", kept so the paths
  match.
- French `culture-media/book` and `culture-media/movie` are **empty on the
  original site** — a heading and nothing else. Japanese `culture-media/movie`
  and `show` are nearly empty.
- Korean `culture-media/books` links to PDFs. Those are two full novels, 20 MB,
  so they are **not** copied into this repo; the links point at the original
  host instead. Three more PDF links were already 404 on the original site and
  still are.
- Images on several pages come from `s2.loli.net` and `*.sunbangyan.cn`. If a
  host has gone away the page shows a labelled slot with a link to the
  original, rather than a broken-image icon. Replacing those with files under
  `picture/` is a safe cleanup whenever you get to it.

### Verifying against the originals

`tools/compare.py` drives every page in Chromium and diffs its visible text
against a reference copy of the same site. It reads the page list from
`content.js`, so it never drifts from the site:

```bash
python3 -m http.server 8755 &
python3 tools/compare.py path/to/reference-html/
```

Last run: **30 of 36 pages identical**. The 6 that differ are the three
`about/intro` pages, which now render their title as an `h1` where the original
index page showed none, and the three `about/self` pages, where a duplicated
"Contact" heading in the original is dropped because it came from a stray
nested `<title>` tag.

# Languages — Français · 한국어 · 日本語

One site for three languages. French, Korean and Japanese each carry the **same
spine** — About · Foundations · Vocabulary · Grammar · Reading · Listening ·
Culture & Media · Journal — so a chapter in one has a counterpart in the others,
and anything new has an obvious home. What differs is the level each language is
organised by: **CEFR** for French, **TOPIK** for Korean, **JLPT** for Japanese.

## How it is built

It isn't. There is no build step, no `node_modules`, no Hexo, no generator —
Vercel just serves these files. That is the same pattern as the subfolders in
`7.0-Side-Interest-Tools`.

```
index.html          the whole site: styling, sidebar, router
content.js          the table of contents — the one file you edit to add a page
source/**/*.md      the content, one markdown file per page (front matter kept)
picture/            images referenced as /picture/...
pdf/                the five books the Korean Culture & Media page links to
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
styling all follow from those two edits. Add `soon: true` to the `content.js`
line while a page is still a placeholder, and drop it once you write the page.

## Writing a page

Plain markdown works everywhere. For the shapes that repeat, write a fenced
block and the site renders it as a component — the `.md` file still reads as
plain text, one item per line.

````markdown
```grammar                     numbered pattern cards
Le subjonctif | Subjunctive        ← pattern | gloss
Il faut que tu **viennes** demain. ← example
You need to come tomorrow.         ← translation
                                   (blank line between cards)
```

```vocab                       a term table
# 단어 | Romanisation | Meaning     ← optional header row, starts with #
안녕하세요 | annyeonghaseyo | hello
```

```chart                       a kana / hangul / alphabet grid
あ a | い i | う u | え e | お o
```

```pair                        a line and its translation
당신은 날 설레게 만들어
You make my heart flutter
zh: 你让我心动                       optional Chinese version of the line
                                   above (EN / 中文 switch picks one)
                                   (blank line between pairs)
```

```tr                          an English sentence on its own
Now let’s continue.
zh: 我们继续。
```

```media                       books, films, shows
마녀식당으로 오세요 | Demon Girl Canteen | /pdf/manyeo-sikdang.pdf
```

```notes                       the glossary at the foot of a page
본성 | nature // 本性           a cell can carry "English // 中文" too
```                                (grammar glosses, vocab, notes, media)

```contact                     small icons, not full-width logos
mail | you@example.com | mailto:you@example.com
```

```soon                        a page that is not written yet
😛 This place hasn't been explored by the author…..
Journal · nothing here yet
```
````

A block whose contents don't parse falls back to showing the source, so a typo
never takes a page down.

### English / 中文

Every page has an EN / 中文 switch. It swaps only the English, never the
French, Korean or Japanese. Give English a Chinese version with:

- a `zh:` line under a translation in `pair`, `grammar` or `tr` blocks
- `English // 中文` in a table cell, grammar gloss, note or media subtitle
- `{{English // 中文}}` anywhere else: page titles, headings, running text,
  e.g. `## {{Preview // 预览}} （Avant-première）`
- `zh:` next to a section `label` or page `nav` in `content.js` for the sidebar

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
| `/French/grammar/a1.html` | becomes the hash route `#french-grammar-a1` |
| `../foundations/basic-verb.html` | resolved against the page's folder, then routed the same way |
| `#note` | left alone — the browser scrolls to it, the page does not reload |
| `/picture/author.jpg` | served straight from `picture/` |
| `https://…` | opens in a new tab |

An image that cannot load is removed from the page rather than left as a broken
icon. The 17 references to the dead `*.sunbangyan.cn` host have been deleted
outright — they were decorative headers, and the pages read the same without
them. Every image the site still references is a local file under `picture/`.

## vercel.json

### Caching

`picture/` and `index.html` are served `max-age=0, must-revalidate`: the
browser always asks, and the answer is a 304 when nothing changed. That costs
one cheap request and keeps an edited file from going stale.

**Do not put `immutable` on these.** It means "never ask again", which is only
true for a filename that carries a content hash. These filenames are stable and
the files get edited in place — the homepage logo was replaced with a
transparent version and every browser that had already seen the old one kept
showing it, because the header said not to check for a year.

That is why the logo is `picture/homepage-v2.png` and not `homepage.png`: a new
name was the only way to reach browsers already holding the year-long entry.
With `must-revalidate` in place this is a one-off — editing an image in place
now works, and the file does not need renaming again.

`pdf/` is cached for a week. Those are books; they are not edited.

### Deployment

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

The import was faithful, so a few things the original sites have are still here.
They are worth knowing about before you edit:

- `Word and Phraze` was the sites' own spelling of "Phrase". The sections are
  now `vocabulary/` and `foundations/`, so the spelling only survives inside
  page text.
- Duplicate and placeholder page titles from the original sites (*dialogue-passage*,
  *Word-Phraze*, *Basement*, two *Topik-I*s) have been replaced with titles that
  say what the page holds.
- French `culture/books` and `culture/film` were **empty on the original site** —
  a heading and nothing else. They now carry the same placeholder as every other
  unwritten page, as do Japanese `culture/film` and `culture/show`.
- Korean's five books are in this repo under `pdf/` — four PDFs and one EPUB,
  73 MB in total. They were renamed to ASCII slugs, because percent-encoded
  Korean filenames are a liability in both a repo and a URL; the Korean titles
  stay in the link text. They are listed on `Korean/library/books`.
- The external image hosts were checked one URL at a time. **`s2.loli.net` is
  alive**, so those five images live in `picture/` and the pages point at them.
  **`*.sunbangyan.cn` is dead** — every one of its images returned 404, so they
  were already broken on the original sites. Those references have been removed.
  The images are not recoverable from the host; the Wayback Machine is the only
  remaining avenue if you ever want them back.

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

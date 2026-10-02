# Languages — Français · 한국어 · 日本語

A Hexo site holding notes for **three** languages under one structure, so a
chapter in one has a counterpart in the others.

Built with [hexo-theme-book](https://github.com/kaiiiz/hexo-theme-book).

## Structure

```
source/
  home.md                  the landing page
  menu.md                  the whole sidebar — one accordion per language
  Home/index.md            about & contact
  French/ | Korean/ | Japanese/
    Word-Phrase/           Alphabet.md · Basic-Verb.md
    Grammar/               chapter1.md · chapter2.md
    Dialogue/              chapter1.md · chapter2.md
    Culture/               Book.md · Movie.md
```

Every language carries **the same four sections and the same eight files**.
That is the point: it keeps the three comparable, and it means adding a page
to one language tells you exactly where it goes in the other two.

## Adding a page

1. Drop the `.md` file in the right folder — it needs only `title` and `date`
   in the front matter.
2. Add one line to `source/menu.md` under the right language and section.

That is all. The sidebar, the styling and the routing follow from those two.

## How the sidebar works

`source/menu.md` is rendered to HTML and injected into every page, then
`themes/book/source/js/book-menu.js` turns it into navigation:

- an `h1` and its list stay permanently open (that is the **Home** link)
- every other heading becomes a **collapsible accordion** wrapping the list
  that follows it — which is why there is one `#####` per language
- the accordion containing the page you are on **opens itself**, and the
  current link is highlighted

So the heading levels in `menu.md` are not cosmetic. Changing `#####` to
something else changes the behaviour.

## Two theme fixes live here

Both are in `themes/`, so they survive a rebuild but would be lost if the
theme were ever replaced wholesale.

**1. Pages had no typography.** `layout/post.ejs` wraps posts in
`.book-post`, which is what carries the theme's styling for tables, lists,
images, blockquotes and code. `layout/page.ejs` never did — and every page on
this site is a Hexo *page*, not a post. So none of it applied. `page.ejs` now
adds the same class.

**2. Tables were never wrapped.** The theme styles
`.book-post .table-wrapper table`, but the markdown renderer emits a bare
`<table>` with no wrapper, so tables got no borders, no padding and no
horizontal scroll. `scripts/render.js` now wraps them in its
`after_post_render` filter — the same hook the theme already used for
checkboxes.

## Local development

```bash
npm install
npx hexo clean && npx hexo generate   # build to public/
npx hexo server                       # http://localhost:4000
```

Note that the theme loads Spectre.css, tocbot and Zooming from
`cdnjs.cloudflare.com`. On a network that blocks it the page still renders and
reads fine, but the sidebar accordions will not collapse and the table of
contents will not appear — those are the CDN, not the site.

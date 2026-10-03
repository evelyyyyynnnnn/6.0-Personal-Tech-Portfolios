#!/usr/bin/env python3
"""
Compare the content of the new static site against a reference copy of the
same site, page by page.

Reference pages are read from a directory of rendered HTML (REF_DIR). Each
page's body is taken from the .book-post / #page container, div-depth aware,
then reduced to normalised visible text. The new site is driven in Chromium
and the rendered #doc is read the same way.

Usage:  python3 compare.py <REF_DIR> [BASE_URL]
"""
import sys, re, json, difflib, pathlib
from html.parser import HTMLParser
from playwright.sync_api import sync_playwright

REF  = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else 'langpreview')
BASE = sys.argv[2] if len(sys.argv) > 2 else 'http://127.0.0.1:8731/'

# The page list comes from content.js, so the comparator never drifts from the
# site: a page added there is compared the next time this runs.
def manifest():
    js = (pathlib.Path(__file__).resolve().parent.parent / 'content.js').read_text()
    langs = []
    for lm in re.finditer(r"slug: '([^']+)', label: '([^']+)', flag: '([^']+)',\s*"
                          r"sections: \[(.*?)\n      \]", js, re.S):
        slug, label, flag, secblob = lm.groups()
        secs = []
        for sm in re.finditer(r"\{ slug: '([^']+)', label: '([^']+)', pages: \[(.*?)\] \}",
                              secblob, re.S):
            sslug, slabel, pblob = sm.groups()
            pages = re.findall(r"slug: '([^']+)'", pblob)
            secs.append((sslug, slabel, pages))
        langs.append((slug, label, flag, secs))
    return langs

def idOf(l, s, p):
    return re.sub(r'[^a-z0-9]+', '-', f'{l}-{s}-{p}'.lower())

BREAKS = {'br','p','div','article','section','h1','h2','h3','h4','h5','h6',
          'li','ul','ol','tr','td','th','table','blockquote','pre','hr'}

class Body(HTMLParser):
    """Visible text of the first .book-post / #page container, div-depth aware."""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.on = False; self.done = False; self.depth = 0
        self.skip = 0; self.out = []
    def _is_post(self, a):
        d = dict(a)
        # exact class token: 'book-post-info' is a different, earlier div
        return 'book-post' in (d.get('class') or '').split() or d.get('id') == 'page'
    def handle_starttag(self, t, a):
        if not self.on and not self.done and t in ('div', 'article') and self._is_post(a):
            self.on = True; self.depth = 1; return
        if not self.on: return
        if t in ('div', 'article'): self.depth += 1
        if t in ('script', 'style'): self.skip += 1
        # innerText breaks the line at a <br> and at every block boundary;
        # match that here or the two sides differ only in where words join
        if t in BREAKS: self.out.append('\n')
        if t == 'img':
            self.out.append('[img ' + (dict(a).get('src') or '').split('/')[-1] + ']')
    def handle_startendtag(self, t, a):
        if self.on and t == 'img':
            self.out.append('[img ' + (dict(a).get('src') or '').split('/')[-1] + ']')
    def handle_endtag(self, t):
        if not self.on: return
        if t in ('script', 'style'): self.skip = max(0, self.skip - 1)
        if t in BREAKS: self.out.append('\n')
        if t in ('div', 'article'):
            self.depth -= 1
            if self.depth == 0: self.on = False; self.done = True
    def handle_data(self, d):
        if self.on and not self.skip: self.out.append(d)

def norm(text):
    """Visible words, in order. Where a renderer puts its line breaks is a
    markup difference, not a content one, so whitespace collapses away
    entirely before comparing."""
    text = text.replace('\u00a0', ' ')
    return re.sub(r'\s+', ' ', text).strip()

def chunks(s):
    """The same text cut at sentence ends, so a diff prints something readable."""
    return [c.strip() for c in re.split(r'(?<=[.!?\u3002;\uff1b])\s+', s) if c.strip()]

def ref_page(path):
    f = REF / path
    if not f.exists(): return None
    b = Body(); b.feed(f.read_text(encoding='utf-8'))
    return norm(''.join(b.out))

def main():
    pages = []
    for lslug, _, _, secs in manifest():
        for sslug, _, ps in secs:
            for p in ps:
                pages.append((idOf(lslug, sslug, p), f'{lslug}/{sslug}/{p}.html'))

    with sync_playwright() as pw:
        br = pw.chromium.launch(executable_path='/opt/pw-browsers/chromium')
        pg = br.new_page(viewport={'width': 1280, 'height': 900})
        pg.goto(BASE); pg.wait_for_timeout(500)
        same, diff, missing = [], [], []
        for route, refpath in pages:
            want = ref_page(refpath)
            if want is None:
                missing.append((route, refpath)); continue
            pg.evaluate("h=>{location.hash='#'+h}", route)
            pg.wait_for_function(
                "h=>{const d=document.getElementById('doc');"
                "return d && d.dataset.route===h;}", arg=route, timeout=4000) \
                if False else pg.wait_for_timeout(260)
            got = norm(pg.evaluate("""()=>{const d=document.getElementById('doc');
                const c=d.cloneNode(true);
                c.querySelectorAll('img').forEach(i=>i.replaceWith(
                  document.createTextNode('[img '+(i.getAttribute('src')||'').split('/').pop()+']')));
                c.querySelectorAll('.img-missing').forEach(s=>s.replaceWith(
                  document.createTextNode('[img '+(s.dataset.src||'').split('/').pop()+']')));
                c.querySelector('.crumb')?.remove();
                // innerText only inserts line breaks for a node that is laid
                // out, so the clone has to be in the document to read like the
                // rendered page rather than like textContent
                c.style.position='absolute'; c.style.left='-99999px';
                document.body.appendChild(c);
                const t=c.innerText; c.remove(); return t;}"""))
            if got == want: same.append(route)
            else: diff.append((route, refpath, want, got))
        br.close()

    print(f'identical : {len(same)}/{len(pages)}')
    print(f'different : {len(diff)}')
    print(f'no ref    : {len(missing)}')
    for r, p in missing: print(f'   MISSING  {r}  (no {p} in reference)')
    for r, p, want, got in diff:
        print(f'\n--- {r}   (reference: {p})')
        for line in list(difflib.unified_diff(chunks(want), chunks(got),
                                              'reference', 'new site',
                                              lineterm='', n=1))[:24]:
            print('   ' + line)
    return 0 if not diff and not missing else 1

sys.exit(main())

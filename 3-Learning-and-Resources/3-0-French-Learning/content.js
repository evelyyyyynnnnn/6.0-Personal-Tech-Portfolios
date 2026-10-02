/* ---------------------------------------------------------------------------
   content.js — the table of contents.

   This is the ONE file you edit to add, remove or rename a page. Everything
   else (the sidebar, the routing, the page titles) is derived from it.

   A page entry {slug, nav} points at the markdown file

       source/<language.slug>/<section.slug>/<page.slug>.md

   and its heading comes from that file's own `title:` front matter, so you
   never write a title twice. To add a chapter: drop the .md file in the right
   folder and add one line here.
--------------------------------------------------------------------------- */
window.LANG_SITE = {
  brand:    'Languages',
  subtitle: 'Français · 한국어 · 日本語',

  home:  { file: 'source/home.md',       nav: 'Home' },
  about: { file: 'source/Home/index.md', nav: 'About & contact' },

  langs: [
    {
      slug: 'French', label: 'Français', flag: '🇫🇷',
      sections: [
        { slug: 'Word-Phrase', label: 'Word & Phrase', pages: [
          { slug: 'Alphabet',   nav: 'Alphabet' },
          { slug: 'Basic-Verb', nav: 'Basic Verbs' } ] },
        { slug: 'Grammar', label: 'Grammar', pages: [
          { slug: 'chapter1', nav: 'Chapter 1' },
          { slug: 'chapter2', nav: 'Chapter 2' } ] },
        { slug: 'Dialogue', label: 'Dialogue & Passage', pages: [
          { slug: 'chapter1', nav: 'Chapter 1' },
          { slug: 'chapter2', nav: 'Chapter 2' } ] },
        { slug: 'Culture', label: 'Culture & Media', pages: [
          { slug: 'Book',  nav: 'Books' },
          { slug: 'Movie', nav: 'Film & TV' } ] }
      ]
    },
    {
      slug: 'Korean', label: '한국어', flag: '🇰🇷',
      sections: [
        { slug: 'Word-Phrase', label: 'Word & Phrase', pages: [
          { slug: 'Alphabet',   nav: 'Alphabet' },
          { slug: 'Basic-Verb', nav: 'Basic Verbs' } ] },
        { slug: 'Grammar', label: 'Grammar', pages: [
          { slug: 'chapter1', nav: 'Chapter 1' },
          { slug: 'chapter2', nav: 'Chapter 2' } ] },
        { slug: 'Dialogue', label: 'Dialogue & Passage', pages: [
          { slug: 'chapter1', nav: 'Chapter 1' },
          { slug: 'chapter2', nav: 'Chapter 2' } ] },
        { slug: 'Culture', label: 'Culture & Media', pages: [
          { slug: 'Book',  nav: 'Books' },
          { slug: 'Movie', nav: 'Film & TV' } ] }
      ]
    },
    {
      slug: 'Japanese', label: '日本語', flag: '🇯🇵',
      sections: [
        { slug: 'Word-Phrase', label: 'Word & Phrase', pages: [
          { slug: 'Alphabet',   nav: 'Alphabet' },
          { slug: 'Basic-Verb', nav: 'Basic Verbs' } ] },
        { slug: 'Grammar', label: 'Grammar', pages: [
          { slug: 'chapter1', nav: 'Chapter 1' },
          { slug: 'chapter2', nav: 'Chapter 2' } ] },
        { slug: 'Dialogue', label: 'Dialogue & Passage', pages: [
          { slug: 'chapter1', nav: 'Chapter 1' },
          { slug: 'chapter2', nav: 'Chapter 2' } ] },
        { slug: 'Culture', label: 'Culture & Media', pages: [
          { slug: 'Book',  nav: 'Books' },
          { slug: 'Movie', nav: 'Film & TV' } ] }
      ]
    }
  ]
};

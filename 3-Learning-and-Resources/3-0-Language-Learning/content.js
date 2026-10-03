/* ---------------------------------------------------------------------------
   content.js — the table of contents.

   This is the ONE file you edit to add, remove or rename a page. Everything
   else (the sidebar, the routing, the page titles) is derived from it.

   A page entry {slug, nav} points at

       source/<language.slug>/<section.slug>/<page.slug>.md

   and its heading comes from that file's own `title:` front matter, so you
   never write a title twice. To add a chapter: drop the .md file in the right
   folder and add one line here.

   All three languages carry the same spine —

       About · Foundations · Vocabulary · Grammar · Reading · Listening
       · Culture & Media · Journal

   — so a chapter in one has a counterpart in the others, and there is always
   an obvious folder for something new. What differs is the level axis each
   language is organised by: CEFR for French, TOPIK for Korean, JLPT for
   Japanese. `soon: true` marks a page that exists in the structure but is
   still waiting to be written; drop the flag once you write it.
--------------------------------------------------------------------------- */
window.LANG_SITE = {
  brand:    'Languages',
  subtitle: 'Français · 한국어 · 日本語',

  home: { file: 'source/home.md', nav: 'Home' },

  langs: [
    {
      slug: 'French', label: 'Français', flag: '🇫🇷', level: 'CEFR',
      sections: [
        { slug: 'about', label: 'About', pages: [
          { slug: 'intro', nav: 'Intro' },
          { slug: 'self',  nav: 'Self-introduction' } ] },
        { slug: 'foundations', label: 'Foundations', pages: [
          { slug: 'alphabet',   nav: 'Alphabet & Sounds' },
          { slug: 'basic-verb', nav: 'Basic Words' },
          { slug: 'numbers',    nav: 'Numbers', soon: true } ] },
        { slug: 'grammar', label: 'Grammar', pages: [
          { slug: 'a1', nav: 'A1 · Foundations' },
          { slug: 'a2', nav: 'A2 · Moods & Tenses' },
          { slug: 'b1', nav: 'B1 · Nuance', soon: true } ] },
        { slug: 'vocabulary', label: 'Vocabulary', pages: [
          { slug: 'themes', nav: 'Thematic Decks', soon: true } ] },
        { slug: 'reading', label: 'Reading & Dialogue', pages: [
          { slug: 'chapter1', nav: 'An Email · TEF' },
          { slug: 'chapter2', nav: 'The Evening News' } ] },
        { slug: 'listening', label: 'Listening', pages: [
          { slug: 'podcasts', nav: 'Podcasts & Songs', soon: true } ] },
        { slug: 'culture', label: 'Culture & Media', pages: [
          { slug: 'film',  nav: 'Film',  soon: true },
          { slug: 'books', nav: 'Books', soon: true },
          { slug: 'tv',    nav: 'Television', soon: true } ] },
        { slug: 'journal', label: 'Journal', pages: [
          { slug: '2026-10', nav: '2026-10', soon: true } ] }
      ]
    },
    {
      slug: 'Korean', label: '한국어', flag: '🇰🇷', level: 'TOPIK',
      sections: [
        { slug: 'about', label: 'About', pages: [
          { slug: 'intro', nav: 'Intro' },
          { slug: 'self',  nav: 'Self-introduction' } ] },
        { slug: 'foundations', label: 'Foundations', pages: [
          { slug: 'hangul', nav: '한글 Hangul', soon: true } ] },
        { slug: 'vocabulary', label: 'Vocabulary', pages: [
          { slug: 'topik-i',  nav: 'TOPIK I' },
          { slug: 'topik-ii', nav: 'TOPIK II' } ] },
        { slug: 'grammar', label: 'Grammar', pages: [
          { slug: 'topik-i',  nav: 'TOPIK I' },
          { slug: 'topik-ii', nav: 'TOPIK II' } ] },
        { slug: 'reading', label: 'Reading & Writing', pages: [
          { slug: 'topik-i',  nav: 'TOPIK I' },
          { slug: 'topik-ii', nav: 'TOPIK II' } ] },
        { slug: 'listening', label: 'Listening', pages: [
          { slug: 'topik-i',  nav: 'TOPIK I' },
          { slug: 'topik-ii', nav: 'TOPIK II' } ] },
        { slug: 'library', label: 'Library', pages: [
          { slug: 'books', nav: 'Books to Download' } ] },
        { slug: 'culture', label: 'Culture & Media', pages: [
          { slug: 'books', nav: 'Books' },
          { slug: 'film',  nav: 'Film' },
          { slug: 'show',  nav: 'Television' } ] },
        { slug: 'journal', label: 'Journal · 매일', pages: [
          { slug: '2023-10', nav: '2023-10' },
          { slug: '2023-11', nav: '2023-11' } ] }
      ]
    },
    {
      slug: 'Japanese', label: '日本語', flag: '🇯🇵', level: 'JLPT',
      sections: [
        { slug: 'about', label: 'About', pages: [
          { slug: 'intro', nav: 'Intro' },
          { slug: 'self',  nav: 'Self-introduction' } ] },
        { slug: 'foundations', label: 'Foundations', pages: [
          { slug: 'hiragana', nav: '五十音 Hiragana' },
          { slug: 'katakana', nav: 'カタカナ Katakana', soon: true },
          { slug: 'kanji',    nav: '漢字 Kanji', soon: true } ] },
        { slug: 'vocabulary', label: 'Vocabulary', pages: [
          { slug: 'chapter1', nav: 'Everyday Words' },
          { slug: 'chapter2', nav: 'Culture & Aesthetics' } ] },
        { slug: 'grammar', label: 'Grammar', pages: [
          { slug: 'n5-n3', nav: 'N5–N3 · Sentence Patterns' } ] },
        { slug: 'reading', label: 'Reading & Dialogue', pages: [
          { slug: 'chapter1', nav: 'News & Culture' },
          { slug: 'chapter2', nav: 'Everyday Scenes' } ] },
        { slug: 'listening', label: 'Listening', pages: [
          { slug: 'podcasts', nav: 'Podcasts & Songs', soon: true } ] },
        { slug: 'culture', label: 'Culture & Media', pages: [
          { slug: 'books', nav: 'Books' },
          { slug: 'film',  nav: 'Film',  soon: true },
          { slug: 'show',  nav: 'Television', soon: true } ] },
        { slug: 'journal', label: 'Journal', pages: [
          { slug: '2026-10', nav: '2026-10', soon: true } ] }
      ]
    }
  ]
};

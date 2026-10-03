/* ---------------------------------------------------------------------------
   content.js — the table of contents.

   This is the ONE file you edit to add, remove or rename a page. Everything
   else (the sidebar, the routing, the page titles) is derived from it.

   The shape mirrors the three sites this content came from, so a page here and
   the page it came from line up by path:

       korean-book.netlify.app/grammar/topik-i
       source/Korean/grammar/topik-i.md

   A page entry {slug, nav} points at

       source/<language.slug>/<section.slug>/<page.slug>.md

   and its heading comes from that file's own `title:` front matter, so you
   never write a title twice. To add a chapter: drop the .md file in the right
   folder and add one line here.
--------------------------------------------------------------------------- */
window.LANG_SITE = {
  brand:    'Languages',
  subtitle: 'Français · 한국어 · 日本語',

  home: { file: 'source/home.md', nav: 'Home' },

  langs: [
    {
      slug: 'French', label: 'Français', flag: '🇫🇷',
      sections: [
        { slug: 'about', label: 'About', pages: [
          { slug: 'intro', nav: 'Intro' }, 
          { slug: 'self', nav: 'Self-introduction' } ] },
        { slug: 'word-phraze', label: 'Word and Phraze', pages: [
          { slug: 'alphabet', nav: 'Alphabet' }, 
          { slug: 'basic-verb', nav: 'Basic-Verb' } ] },
        { slug: 'grammars', label: 'Grammar', pages: [
          { slug: 'chapter1', nav: 'Chapter1' }, 
          { slug: 'chapter2', nav: 'Chapter2' } ] },
        { slug: 'dialogue-passage', label: 'Dialogue and Passage', pages: [
          { slug: 'chapter1', nav: 'Chapter1' }, 
          { slug: 'chapter2', nav: 'Chapter2' } ] },
        { slug: 'culture-media', label: 'Culture and Media', pages: [
          { slug: 'book', nav: 'Chapter1' }, 
          { slug: 'movie', nav: 'Chapter2' } ] }
      ]
    },
    {
      slug: 'Korean', label: '한국어', flag: '🇰🇷',
      sections: [
        { slug: 'about', label: 'About', pages: [
          { slug: 'intro', nav: 'Intro' }, 
          { slug: 'self', nav: 'Self-introduction' } ] },
        { slug: 'grammar', label: 'Grammar', pages: [
          { slug: 'topik-i', nav: 'Topik-I' }, 
          { slug: 'topik-ii', nav: 'Topik-II' } ] },
        { slug: 'word-phraze', label: 'Word and Phraze', pages: [
          { slug: 'topik-i', nav: 'Topik-I' }, 
          { slug: 'topik-ii', nav: 'Topik-II' } ] },
        { slug: 'listening', label: 'Listening', pages: [
          { slug: 'topik-i', nav: 'Topik-I' }, 
          { slug: 'topik-ii', nav: 'Topik-II' } ] },
        { slug: 'dialogue-passage', label: 'Writing and Reading', pages: [
          { slug: 'topik-i', nav: 'Topik-I' }, 
          { slug: 'topik-ii', nav: 'Topik-II' } ] },
        { slug: 'learn-korean-everyday', label: 'Learn Everyday', pages: [
          { slug: '2023-10', nav: '2023-10' }, 
          { slug: '2023-11', nav: '2023-11' } ] },
        { slug: 'culture-media', label: 'Culture and Media', pages: [
          { slug: 'books', nav: 'Books' }, 
          { slug: 'movie', nav: 'Movie' }, 
          { slug: 'show', nav: 'Show' } ] }
      ]
    },
    {
      slug: 'Japanese', label: '日本語', flag: '🇯🇵',
      sections: [
        { slug: 'about', label: 'About', pages: [
          { slug: 'intro', nav: 'Intro' }, 
          { slug: 'self', nav: 'Self-introduction' } ] },
        { slug: 'grammar', label: 'Grammar', pages: [
          { slug: 'fifties', nav: 'Fifties' }, 
          { slug: 'grammar2', nav: 'N3-N5' } ] },
        { slug: 'word-phraze', label: 'Word and Phraze', pages: [
          { slug: 'chapter1', nav: 'Chapter1' }, 
          { slug: 'chapter2', nav: 'Chapter2' } ] },
        { slug: 'dialogue-passage', label: 'Dialogue and Passage', pages: [
          { slug: 'chapter1', nav: 'Chapter1' }, 
          { slug: 'chapter2', nav: 'Chapter2' } ] },
        { slug: 'culture-media', label: 'Culture and Media', pages: [
          { slug: 'books', nav: 'Books' }, 
          { slug: 'movie', nav: 'Movie' }, 
          { slug: 'show', nav: 'Show' } ] }
      ]
    }
  ]
};

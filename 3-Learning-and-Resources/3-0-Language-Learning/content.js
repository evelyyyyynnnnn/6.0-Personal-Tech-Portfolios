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

   `zh` on a section or page is its Chinese name, shown in the sidebar when
   the EN / 中文 switch is on 中文.
--------------------------------------------------------------------------- */
window.LANG_SITE = {
  brand:    'Languages', brandZh: '语言',
  subtitle: 'Français · 한국어 · 日本語',

  home: { file: 'source/home.md', nav: 'Home', zh: '首页' },

  langs: [
    {
      slug: 'French', label: 'Français', flag: '🇫🇷', level: 'CEFR',
      sections: [
        { slug: 'about', label: 'About', zh: '关于', pages: [
          { slug: 'intro', nav: 'Intro', zh: '简介' },
          { slug: 'self',  nav: 'Self-introduction', zh: '自我介绍' } ] },
        { slug: 'foundations', label: 'Foundations', zh: '基础', pages: [
          { slug: 'alphabet',   nav: 'Alphabet & Sounds', zh: '字母与发音' },
          { slug: 'basic-verb', nav: 'Basic Words', zh: '基础词汇' },
          { slug: 'numbers',    nav: 'Numbers', zh: '数字', soon: true } ] },
        { slug: 'grammar', label: 'Grammar', zh: '语法', pages: [
          { slug: 'a1', nav: 'A1 · Foundations', zh: 'A1 · 基础' },
          { slug: 'a2', nav: 'A2 · Moods & Tenses', zh: 'A2 · 语式与时态' },
          { slug: 'b1', nav: 'B1 · Nuance', zh: 'B1 · 细微差别', soon: true } ] },
        { slug: 'vocabulary', label: 'Vocabulary', zh: '词汇', pages: [
          { slug: 'themes', nav: 'Thematic Decks', zh: '主题词卡', soon: true } ] },
        { slug: 'reading', label: 'Reading & Dialogue', zh: '阅读与对话', pages: [
          { slug: 'chapter1', nav: 'An Email · TEF', zh: '一封邮件 · TEF' },
          { slug: 'chapter2', nav: 'The Evening News', zh: '晚间新闻' } ] },
        { slug: 'listening', label: 'Listening', zh: '听力', pages: [
          { slug: 'podcasts', nav: 'Podcasts & Songs', zh: '播客与歌曲', soon: true } ] },
        { slug: 'culture', label: 'Culture & Media', zh: '文化与媒体', pages: [
          { slug: 'film',  nav: 'Film', zh: '电影',  soon: true },
          { slug: 'books', nav: 'Books', zh: '书籍', soon: true },
          { slug: 'tv',    nav: 'Television', zh: '电视节目', soon: true } ] },
        { slug: 'journal', label: 'Journal', zh: '日记', pages: [
          { slug: '2026-10', nav: '2026-10', soon: true } ] }
      ]
    },
    {
      slug: 'Korean', label: '한국어', flag: '🇰🇷', level: 'TOPIK',
      sections: [
        { slug: 'about', label: 'About', zh: '关于', pages: [
          { slug: 'intro', nav: 'Intro', zh: '简介' },
          { slug: 'self',  nav: 'Self-introduction', zh: '自我介绍' } ] },
        { slug: 'foundations', label: 'Foundations', zh: '基础', pages: [
          { slug: 'hangul', nav: '한글 Hangul', zh: '한글 韩文字母', soon: true } ] },
        { slug: 'vocabulary', label: 'Vocabulary', zh: '词汇', pages: [
          { slug: 'topik-i',  nav: 'TOPIK I' },
          { slug: 'topik-ii', nav: 'TOPIK II' } ] },
        { slug: 'grammar', label: 'Grammar', zh: '语法', pages: [
          { slug: 'topik-i',  nav: 'TOPIK I' },
          { slug: 'topik-ii', nav: 'TOPIK II' } ] },
        { slug: 'reading', label: 'Reading & Writing', zh: '阅读与写作', pages: [
          { slug: 'topik-i',  nav: 'TOPIK I' },
          { slug: 'topik-ii', nav: 'TOPIK II' } ] },
        { slug: 'listening', label: 'Listening', zh: '听力', pages: [
          { slug: 'topik-i',  nav: 'TOPIK I' },
          { slug: 'topik-ii', nav: 'TOPIK II' } ] },
        { slug: 'library', label: 'Library', zh: '图书馆', pages: [
          { slug: 'books', nav: 'Books to Download', zh: '书籍下载' } ] },
        { slug: 'culture', label: 'Culture & Media', zh: '文化与媒体', pages: [
          { slug: 'books', nav: 'Books', zh: '书籍' },
          { slug: 'film',  nav: 'Film', zh: '电影' },
          { slug: 'show',  nav: 'Television', zh: '电视节目' } ] },
        { slug: 'journal', label: 'Journal · 매일', zh: '日记 · 매일', pages: [
          { slug: '2023-10', nav: '2023-10' },
          { slug: '2023-11', nav: '2023-11' } ] }
      ]
    },
    {
      slug: 'Japanese', label: '日本語', flag: '🇯🇵', level: 'JLPT',
      sections: [
        { slug: 'about', label: 'About', zh: '关于', pages: [
          { slug: 'intro', nav: 'Intro', zh: '简介' },
          { slug: 'self',  nav: 'Self-introduction', zh: '自我介绍' } ] },
        { slug: 'foundations', label: 'Foundations', zh: '基础', pages: [
          { slug: 'hiragana', nav: '五十音 Hiragana', zh: '五十音 平假名' },
          { slug: 'katakana', nav: 'カタカナ Katakana', zh: 'カタカナ 片假名', soon: true },
          { slug: 'kanji',    nav: '漢字 Kanji', zh: '漢字 汉字', soon: true } ] },
        { slug: 'vocabulary', label: 'Vocabulary', zh: '词汇', pages: [
          { slug: 'chapter1', nav: 'Everyday Words', zh: '日常词汇' },
          { slug: 'chapter2', nav: 'Culture & Aesthetics', zh: '文化与美学' } ] },
        { slug: 'grammar', label: 'Grammar', zh: '语法', pages: [
          { slug: 'n5-n3', nav: 'N5–N3 · Sentence Patterns', zh: 'N5–N3 · 句型' } ] },
        { slug: 'reading', label: 'Reading & Dialogue', zh: '阅读与对话', pages: [
          { slug: 'chapter1', nav: 'News & Culture', zh: '新闻与文化' },
          { slug: 'chapter2', nav: 'Everyday Scenes', zh: '日常场景' } ] },
        { slug: 'listening', label: 'Listening', zh: '听力', pages: [
          { slug: 'podcasts', nav: 'Podcasts & Songs', zh: '播客与歌曲', soon: true } ] },
        { slug: 'culture', label: 'Culture & Media', zh: '文化与媒体', pages: [
          { slug: 'books', nav: 'Books', zh: '书籍' },
          { slug: 'film',  nav: 'Film', zh: '电影',  soon: true },
          { slug: 'show',  nav: 'Television', zh: '电视节目', soon: true } ] },
        { slug: 'journal', label: 'Journal', zh: '日记', pages: [
          { slug: '2026-10', nav: '2026-10', soon: true } ] }
      ]
    }
  ]
};

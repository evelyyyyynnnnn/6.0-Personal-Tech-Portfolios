// Design: "Warm Notebook" — Scrapbook stationery aesthetic
// Chapter page: Section list + vocabulary cards with bilingual support

import { useState } from "react";
import { Link, useParams } from "wouter";
import { Sun, Moon, BookOpen, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import { chapters, siteContent } from "@/lib/content";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const content = siteContent[lang];

  const chapter = chapters.find((c) => c.id === chapterId);
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(chapter?.sections.map((s) => s.id) ?? [])
  );

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Chapter not found.</p>
          <Link href="/">
            <Button variant="outline">{content.backToChapters}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const speakWord = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const totalVocab = chapter.sections.reduce((acc, s) => acc + s.vocab.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-14 gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">{content.backToChapters}</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="text-xs font-semibold border-primary/40 text-primary hover:bg-primary/10 px-3"
            >
              {content.langToggle}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-8 h-8 text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* ── Chapter Header ── */}
      <div className={`border-b border-border bg-muted/30`}>
        <div className="container py-8">
          <div className="flex items-start gap-4">
            <span className="text-5xl leading-none">{chapter.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold badge-${chapter.color}`}>
                  {totalVocab} {lang === "en" ? "words" : "词"}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold badge-${chapter.color}`}>
                  {chapter.sections.length} {lang === "en" ? "sections" : "小节"}
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
              >
                {lang === "en" ? chapter.titleEn : chapter.titleZh}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {lang === "en" ? chapter.titleZh : chapter.titleEn}
              </p>
              <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                {lang === "en" ? chapter.descriptionEn : chapter.descriptionZh}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <main className="container py-10 max-w-4xl">
        <div className="space-y-6">
          {chapter.sections.map((section) => {
            const isOpen = openSections.has(section.id);
            return (
              <div key={section.id} className={`paper-card overflow-hidden accent-${chapter.color}`}>
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                >
                  <div>
                    <h2
                      className="text-lg font-bold text-foreground"
                      style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
                    >
                      {lang === "en" ? section.titleEn : section.titleZh}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lang === "en" ? section.titleZh : section.titleEn}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lang === "en" ? section.descriptionEn : section.descriptionZh}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Vocab cards */}
                {isOpen && (
                  <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.vocab.map((item) => (
                      <div
                        key={item.word}
                        className="rounded-xl border border-border bg-background p-4 hover:border-primary/40 transition-colors"
                      >
                        {/* Word row */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <span
                              className="vocab-term text-base font-bold text-foreground"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {item.word}
                            </span>
                            {item.phonetic && (
                              <span className="ml-2 text-xs text-muted-foreground font-mono">
                                {item.phonetic}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => speakWord(item.word)}
                            className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                            title="Listen"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-primary" />
                          </button>
                        </div>

                        {/* Translation */}
                        <p
                          className="text-sm font-semibold text-primary mb-2"
                          style={{ fontFamily: "'Noto Serif SC', 'Noto Sans SC', serif" }}
                        >
                          {item.translation}
                        </p>

                        {/* Example */}
                        {item.example && (
                          <div className="mt-2 pl-3 border-l-2 border-primary/30">
                            <p className="text-xs text-foreground italic leading-relaxed">
                              "{item.example}"
                            </p>
                            {item.exampleZh && (
                              <p
                                className="text-xs text-muted-foreground mt-0.5 leading-relaxed"
                                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                              >
                                {item.exampleZh}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Note */}
                        {item.note && (
                          <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-accent/50 text-xs text-accent-foreground leading-relaxed">
                            <span className="font-semibold">
                              {lang === "en" ? "💡 Note: " : "💡 注："}
                            </span>
                            {lang === "en" ? item.note : (item.noteZh ?? item.note)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Back button */}
        <div className="mt-10 flex justify-center">
          <Link href="/">
            <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
              {content.backToChapters}
            </Button>
          </Link>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border mt-8 py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">{content.footerText}</p>
        </div>
      </footer>
    </div>
  );
}

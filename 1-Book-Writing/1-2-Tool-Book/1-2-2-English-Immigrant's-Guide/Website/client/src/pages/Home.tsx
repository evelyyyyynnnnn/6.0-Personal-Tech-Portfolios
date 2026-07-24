// Design: "Warm Notebook" — Scrapbook stationery aesthetic
// Home page: Hero banner + chapter grid + search

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Sun, Moon, BookOpen, Sparkles } from "lucide-react";
import { chapters, siteContent } from "@/lib/content";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/GfubN9MLdf7iizVeGd9z3i/hero-banner-oRRStvNjon88y9eQ9xJPei.webp";

const CHAPTER_IMAGES: Record<string, string> = {
  "home-living": "https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/GfubN9MLdf7iizVeGd9z3i/chapter-home-3t9gHX7pLyrCGcGdyEjKz5.webp",
  "food-daily": "https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/GfubN9MLdf7iizVeGd9z3i/chapter-food-aq29mrRjTyZCef8Cz5Txzp.webp",
  "work-career": "https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/GfubN9MLdf7iizVeGd9z3i/chapter-work-6B44TapUaniAEiKNpPEr7S.webp",
};

export default function Home() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const content = siteContent[lang];
  const [search, setSearch] = useState("");

  const filteredChapters = useMemo(() => {
    if (!search.trim()) return chapters;
    const q = search.toLowerCase();
    return chapters.filter((ch) => {
      const titleMatch =
        ch.titleEn.toLowerCase().includes(q) ||
        ch.titleZh.includes(q);
      const vocabMatch = ch.sections.some((s) =>
        s.vocab.some(
          (v) =>
            v.word.toLowerCase().includes(q) ||
            v.translation.includes(q) ||
            (v.example?.toLowerCase().includes(q) ?? false)
        )
      );
      return titleMatch || vocabMatch;
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-14 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm text-foreground hidden sm:block" style={{ fontFamily: "'Playfair Display', serif" }}>
              {content.siteTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="text-xs font-semibold border-primary/40 text-primary hover:bg-primary/10 px-3"
            >
              {content.langToggle}
            </Button>
            {/* Theme toggle */}
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

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Warm notebook with American life vocabulary"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/20" />
        </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative container py-16 sm:py-24 max-w-3xl"
          >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {lang === "en" ? "Practical English for Real Life" : "真实生活实用英语"}
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
          >
            {content.siteTitle}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
            {content.heroDescription}
          </p>
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={content.searchPlaceholder}
              className="pl-10 bg-background/80 border-border focus:border-primary"
            />
          </div>
          </motion.div>
      </section>

      {/* ── Chapter Grid ── */}
      <main className="container py-12">
        <div className="mb-8">
          <h2
            className="text-2xl font-bold text-foreground mb-1"
            style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
          >
            {content.chaptersTitle}
          </h2>
          <p className="text-muted-foreground text-sm">{content.chaptersSubtitle}</p>
        </div>

        {filteredChapters.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">{content.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChapters.map((chapter, i) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              >
              <Link href={`/chapter/${chapter.id}`}>
                <div className="paper-card overflow-hidden group cursor-pointer h-full">
                  {/* Card image for featured chapters */}
                  {CHAPTER_IMAGES[chapter.id] && (
                    <div className="h-36 overflow-hidden">
                      <img
                        src={CHAPTER_IMAGES[chapter.id]}
                        alt={chapter.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  {/* Card body */}
                  <div className={`p-5 ${!CHAPTER_IMAGES[chapter.id] ? `accent-${chapter.color}` : ""}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl leading-none mt-0.5">{chapter.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-bold text-foreground text-base leading-snug"
                          style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
                        >
                          {lang === "en" ? chapter.titleEn : chapter.titleZh}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {lang === "en" ? chapter.titleZh : chapter.titleEn}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {lang === "en" ? chapter.descriptionEn : chapter.descriptionZh}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium badge-${chapter.color}`}>
                        {chapter.sections.length} {lang === "en" ? "sections" : "小节"}
                      </span>
                      <span className="text-xs text-primary font-semibold group-hover:underline">
                        {lang === "en" ? "Explore →" : "查看 →"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── About section ── */}
        <section className="mt-16 paper-card p-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <h2
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}
            >
              {content.proposalTitle}
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {content.proposalDesc}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { en: "Visual Memory", zh: "视觉记忆", icon: "🧠" },
              { en: "Story-Based", zh: "故事驱动", icon: "📖" },
              { en: "Real-Life Context", zh: "真实场景", icon: "🌎" },
              { en: "Bilingual Bridge", zh: "双语桥梁", icon: "🌉" },
            ].map((item) => (
              <div key={item.en} className="text-center p-3 rounded-xl bg-muted/50">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-xs font-semibold text-foreground">
                  {lang === "en" ? item.en : item.zh}
                </p>
              </div>
            ))}
          </div>
        </section>
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

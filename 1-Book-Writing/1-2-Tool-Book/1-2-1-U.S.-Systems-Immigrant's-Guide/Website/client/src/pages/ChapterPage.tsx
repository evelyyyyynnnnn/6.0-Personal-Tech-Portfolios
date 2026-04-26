// ============================================================
// CHAPTER PAGE — U.S. Immigrant's Guide
// Uses CSS design tokens (--bg-main, --text-primary, etc.)
// Light: cold white bg + deep blue primary + gold accent
// Dark:  deep blue-black bg + blue primary + gold accent
// ============================================================

import { useParams, Link } from "wouter";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { chapters, getChapterById } from "@/lib/guideData";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Streamdown } from "streamdown";

export default function ChapterPage() {
  const { chapterId, sectionId } = useParams<{ chapterId: string; sectionId?: string }>();
  const { lang } = useLanguage();
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);

  const chapter = getChapterById(chapterId || "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSubsection(null);
  }, [chapterId, sectionId]);

  if (!chapter) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
        <Sidebar />
        <main className="flex-1 lg:ml-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              {lang === "zh" ? "章节未找到" : "Chapter not found"}
            </p>
            <Link href="/">
              <span
                className="mt-4 inline-flex items-center gap-2 text-sm hover:underline cursor-pointer"
                style={{ color: "var(--brand-primary)" }}
              >
                <ArrowLeft size={14} />
                {lang === "zh" ? "返回首页" : "Back to Home"}
              </span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const currentSection = sectionId
    ? chapter.sections.find((s) => s.id === sectionId)
    : null;

  const chapterIdx = chapters.findIndex((c) => c.id === chapterId);
  const prevChapter = chapterIdx > 0 ? chapters[chapterIdx - 1] : null;
  const nextChapter = chapterIdx < chapters.length - 1 ? chapters[chapterIdx + 1] : null;

  const sectionIdx = currentSection
    ? chapter.sections.findIndex((s) => s.id === sectionId)
    : -1;
  const prevSection = sectionIdx > 0 ? chapter.sections[sectionIdx - 1] : null;
  const nextSection =
    sectionIdx >= 0 && sectionIdx < chapter.sections.length - 1
      ? chapter.sections[sectionIdx + 1]
      : null;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      <Sidebar />

      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 lg:py-12">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-[11px] mb-8 flex-wrap"
            style={{ color: "var(--text-secondary)" }}
          >
            <Link href="/">
              <span className="hover:underline cursor-pointer transition-colors">
                {lang === "zh" ? "首页" : "Home"}
              </span>
            </Link>
            <ChevronRight size={10} />
            <Link href={`/chapter/${chapter.id}`}>
              <span
                className={`cursor-pointer transition-colors ${!currentSection ? "font-medium" : "hover:underline"}`}
                style={{ color: !currentSection ? "var(--text-primary)" : undefined }}
              >
                {lang === "zh" ? chapter.zh.title : chapter.en.title}
              </span>
            </Link>
            {currentSection && (
              <>
                <ChevronRight size={10} />
                <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                  {lang === "zh" ? currentSection.zh.title : currentSection.en.title}
                </span>
              </>
            )}
          </nav>

          {/* ── Chapter Overview ── */}
          {!currentSection && (
            <>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8" style={{ backgroundColor: "var(--accent-gold)" }} />
                  <span
                    className="text-[11px] tracking-[0.18em] uppercase font-semibold"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {lang === "zh" ? `第 ${chapter.number} 章` : `Chapter ${chapter.number}`}
                  </span>
                </div>
                <h1
                  className="font-display text-3xl md:text-4xl font-bold leading-tight mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {lang === "zh" ? chapter.zh.title : chapter.en.title}
                </h1>
                <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {lang === "zh" ? chapter.zh.subtitle : chapter.en.subtitle}
                </p>
              </div>

              {/* Sections List */}
              <div className="space-y-3">
                <h2
                  className="text-[11px] tracking-[0.18em] uppercase font-medium mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {lang === "zh" ? "本章节内容" : "Sections in this Chapter"}
                </h2>
                {chapter.sections.map((section, idx) => (
                  <Link key={section.id} href={`/chapter/${chapter.id}/section/${section.id}`}>
                    <div
                      className="group rounded-lg p-5 border cursor-pointer transition-all duration-200 hover:shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-gold)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span
                            className="text-[10px] font-semibold tracking-wider uppercase mb-1 block"
                            style={{ color: "var(--brand-primary)" }}
                          >
                            {idx + 1}.
                          </span>
                          <h3
                            className="font-semibold text-[14px] leading-snug mb-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {lang === "zh" ? section.zh.title : section.en.title}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {section.subsections.slice(0, 4).map((sub) => (
                              <span
                                key={sub.id}
                                className="text-[10px] px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: "var(--bg-subtle)",
                                  color: "var(--text-secondary)",
                                }}
                              >
                                {lang === "zh" ? sub.zh.title : sub.en.title}
                              </span>
                            ))}
                            {section.subsections.length > 4 && (
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: "var(--bg-subtle)",
                                  color: "var(--text-secondary)",
                                }}
                              >
                                +{section.subsections.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight
                          size={16}
                          className="flex-shrink-0 mt-1 transition-colors"
                          style={{ color: "var(--text-secondary)" }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Chapter Navigation */}
              <div
                className="mt-10 flex items-center justify-between gap-4 pt-6"
                style={{ borderTop: "1px solid var(--border-color)" }}
              >
                {prevChapter ? (
                  <Link href={`/chapter/${prevChapter.id}`}>
                    <div
                      className="flex items-center gap-2 text-[12px] cursor-pointer transition-colors group"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                          {lang === "zh" ? "上一章" : "Previous"}
                        </p>
                        <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                          {lang === "zh" ? prevChapter.zh.title : prevChapter.en.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : <div />}
                {nextChapter ? (
                  <Link href={`/chapter/${nextChapter.id}`}>
                    <div
                      className="flex items-center gap-2 text-[12px] cursor-pointer transition-colors group text-right"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                          {lang === "zh" ? "下一章" : "Next"}
                        </p>
                        <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                          {lang === "zh" ? nextChapter.zh.title : nextChapter.en.title}
                        </p>
                      </div>
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ) : <div />}
              </div>
            </>
          )}

          {/* ── Section Content ── */}
          {currentSection && (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8" style={{ backgroundColor: "var(--accent-gold)" }} />
                  <span
                    className="text-[11px] tracking-[0.18em] uppercase font-semibold"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {lang === "zh" ? chapter.zh.title : chapter.en.title}
                  </span>
                </div>
                <h1
                  className="font-display text-2xl md:text-3xl font-bold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {lang === "zh" ? currentSection.zh.title : currentSection.en.title}
                </h1>
              </div>

              {/* Subsection TOC */}
              {currentSection.subsections.length > 1 && (
                <div
                  className="mb-8 rounded-lg p-4 border"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {lang === "zh" ? "本节内容" : "In This Section"}
                  </p>
                  <ul className="space-y-1.5">
                    {currentSection.subsections.map((sub) => (
                      <li key={sub.id}>
                        <button
                          onClick={() => {
                            setActiveSubsection(sub.id);
                            const el = document.getElementById(sub.id);
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="text-[12px] text-left transition-colors hover:underline"
                          style={{ color: "var(--brand-primary)" }}
                        >
                          {lang === "zh" ? sub.zh.title : sub.en.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Subsections */}
              <div className="space-y-10">
                {currentSection.subsections.map((sub) => (
                  <div
                    key={sub.id}
                    id={sub.id}
                    className="scroll-mt-6 transition-all duration-300"
                    style={
                      activeSubsection === sub.id
                        ? {
                            outline: `1px solid var(--accent-gold)`,
                            borderRadius: "0.5rem",
                            padding: "1rem",
                            margin: "0 -1rem",
                            backgroundColor: "var(--bg-card)",
                          }
                        : {}
                    }
                  >
                    <h2
                      className="font-display text-lg font-bold mb-4 pb-2"
                      style={{
                        color: "var(--text-primary)",
                        borderBottom: "1px solid var(--border-color)",
                      }}
                    >
                      {lang === "zh" ? sub.zh.title : sub.en.title}
                    </h2>
                    <div className="prose-guide">
                      <Streamdown>
                        {lang === "zh" ? sub.zh.content : sub.en.content}
                      </Streamdown>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section Navigation */}
              <div
                className="mt-10 flex items-center justify-between gap-4 pt-6"
                style={{ borderTop: "1px solid var(--border-color)" }}
              >
                {prevSection ? (
                  <Link href={`/chapter/${chapter.id}/section/${prevSection.id}`}>
                    <div
                      className="flex items-center gap-2 text-[12px] cursor-pointer transition-colors group"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wide">
                          {lang === "zh" ? "上一节" : "Previous"}
                        </p>
                        <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                          {lang === "zh" ? prevSection.zh.title : prevSection.en.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link href={`/chapter/${chapter.id}`}>
                    <div
                      className="flex items-center gap-2 text-[12px] cursor-pointer transition-colors group"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wide">
                          {lang === "zh" ? "返回章节" : "Back to Chapter"}
                        </p>
                        <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                          {lang === "zh" ? chapter.zh.title : chapter.en.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
                {nextSection ? (
                  <Link href={`/chapter/${chapter.id}/section/${nextSection.id}`}>
                    <div
                      className="flex items-center gap-2 text-[12px] cursor-pointer transition-colors group text-right"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-wide">
                          {lang === "zh" ? "下一节" : "Next"}
                        </p>
                        <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                          {lang === "zh" ? nextSection.zh.title : nextSection.en.title}
                        </p>
                      </div>
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ) : nextChapter ? (
                  <Link href={`/chapter/${nextChapter.id}`}>
                    <div
                      className="flex items-center gap-2 text-[12px] cursor-pointer transition-colors group text-right"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-wide">
                          {lang === "zh" ? "下一章" : "Next Chapter"}
                        </p>
                        <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                          {lang === "zh" ? nextChapter.zh.title : nextChapter.en.title}
                        </p>
                      </div>
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ) : <div />}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

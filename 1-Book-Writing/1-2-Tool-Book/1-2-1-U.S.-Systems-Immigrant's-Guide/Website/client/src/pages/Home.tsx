// ============================================================
// HOME PAGE — U.S. Immigrant's Guide
// Uses CSS design tokens (--bg-main, --text-primary, etc.)
// Light: cold white bg + deep blue primary + gold accent
// Dark:  deep blue-black bg + blue primary + gold accent
// ============================================================

import { Link } from "wouter";
import Sidebar from "@/components/Sidebar";
import { chapters } from "@/lib/guideData";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

const CHAPTER_ICONS = ["⚖️", "💼", "🧾", "🎓", "🏠", "💡", "✈️", "🗺️"];

export default function Home() {
  const { lang } = useLanguage();

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      <Sidebar />

      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Hero — uses sidebar/brand color palette */}
        <div
          className="px-8 pt-16 pb-12 lg:pt-12 relative overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: "var(--sidebar-bg)" }}
        >
          {/* Subtle grid lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 border-r border-white"
                style={{ left: `${(i + 1) * 12.5}%` }}
              />
            ))}
          </div>

          <div className="relative max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ backgroundColor: "var(--accent-gold)" }} />
              <span
                className="text-[11px] tracking-[0.2em] uppercase font-semibold"
                style={{ color: "var(--accent-gold)" }}
              >
                {lang === "zh" ? "美国制度百科全书" : "Encyclopedia of U.S. Systems"}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-2">
              <span className="text-white">
                {lang === "zh" ? "美国制度" : "An Immigrant's"}
              </span>
              <br />
              <span style={{ color: "var(--accent-gold)" }}>
                {lang === "zh" ? "移民实用指南" : "Guide to the U.S."}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-base leading-relaxed mt-4 max-w-xl"
              style={{ color: "var(--sidebar-text-muted)" }}
            >
              {lang === "zh"
                ? "涵盖移民身份、就业、税务、教育、日常生活、常识、专业知识与地理的全面实用指南。"
                : "A comprehensive practical guide covering immigration status, employment, taxes, education, daily life, common sense, professional knowledge, and geography."}
            </p>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {[
                lang === "zh" ? "8 章节" : "8 Chapters",
                lang === "zh" ? "双语内容" : "Bilingual Content",
                lang === "zh" ? "实用参考" : "Practical Reference",
              ].map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 text-[12px]"
                  style={{ color: "var(--sidebar-text-muted)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--accent-gold)" }}
                  />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chapter Grid */}
        <div className="px-6 lg:px-10 py-10">
          <h2
            className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            {lang === "zh" ? "全部章节" : "All Chapters"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((chapter, idx) => (
              <Link key={chapter.id} href={`/chapter/${chapter.id}`}>
                <div
                  className="group rounded-lg p-5 border cursor-pointer transition-all duration-200 hover:shadow-md"
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
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 text-lg"
                        style={{ backgroundColor: "var(--bg-subtle)" }}
                      >
                        {CHAPTER_ICONS[idx]}
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Chapter label */}
                        <p
                          className="text-[10px] font-semibold tracking-wider uppercase mb-1"
                          style={{ color: "var(--brand-primary)" }}
                        >
                          {lang === "zh" ? `第 ${chapter.number} 章` : `Chapter ${chapter.number}`}
                        </p>
                        {/* Chapter title */}
                        <h3
                          className="font-semibold text-[14px] leading-snug mb-1.5"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {lang === "zh" ? chapter.zh.title : chapter.en.title}
                        </h3>
                        {/* Subtitle */}
                        <p
                          className="text-[12px] leading-relaxed mb-3"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {lang === "zh" ? chapter.zh.subtitle : chapter.en.subtitle}
                        </p>
                        {/* Section tags */}
                        <div className="flex flex-wrap gap-1">
                          {chapter.sections.slice(0, 3).map((s) => (
                            <span
                              key={s.id}
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: "var(--bg-subtle)",
                                color: "var(--text-secondary)",
                              }}
                            >
                              {lang === "zh" ? s.zh.title : s.en.title}
                            </span>
                          ))}
                          {chapter.sections.length > 3 && (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: "var(--bg-subtle)",
                                color: "var(--text-secondary)",
                              }}
                            >
                              +{chapter.sections.length - 3}
                            </span>
                          )}
                        </div>
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
        </div>
      </main>
    </div>
  );
}

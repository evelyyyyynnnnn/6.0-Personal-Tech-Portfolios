// ============================================================
// SIDEBAR — Swiss Typographic Style
// Uses CSS variable tokens (--sidebar-bg, --sidebar-text, etc.)
// so colors respond to light/dark theme toggle.
// Dark mode (default): deep navy sidebar
// Light mode: lighter steel-blue sidebar
// Content area (white) is unchanged in both modes.
// ============================================================

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { chapters } from "@/lib/guideData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronDown, ChevronRight, BookOpen, Menu, X, Sun, Moon } from "lucide-react";

const CHAPTER_ICONS = ["⚖️", "💼", "🧾", "🎓", "🏠", "💡", "✈️", "🗺️"];

export default function Sidebar() {
  const { lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [openChapters, setOpenChapters] = useState<Set<string>>(new Set(["ch1"]));
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === "dark";

  const toggleChapter = (id: string) => {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  const SidebarContent = () => (
    <div
      className="flex flex-col h-full transition-colors duration-300"
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      {/* Header */}
      <div
        className="px-5 py-5"
        style={{ borderBottom: "1px solid var(--sidebar-border-color)" }}
      >
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--gold)" }}
            >
              <BookOpen size={16} style={{ color: "var(--sidebar-bg-deep)" }} />
            </div>
            <div>
              <p
                className="text-[11px] font-medium tracking-widest uppercase leading-none mb-0.5"
                style={{ color: "var(--sidebar-text-muted)" }}
              >
                {lang === "zh" ? "美国制度百科" : "Encyclopedia"}
              </p>
              <p
                className="text-[13px] font-semibold leading-tight transition-colors"
                style={{ color: "var(--sidebar-text)" }}
              >
                {lang === "zh" ? "移民指南" : "Immigrant's Guide"}
              </p>
            </div>
          </div>
        </Link>

        {/* Language Toggle */}
        <div
          className="mt-4 flex items-center gap-1 rounded p-0.5"
          style={{ backgroundColor: "var(--sidebar-bg-deep)" }}
        >
          <button
            onClick={() => setLang("en")}
            className="flex-1 text-xs font-medium py-1.5 rounded transition-all"
            style={
              lang === "en"
                ? { backgroundColor: "var(--gold)", color: "var(--sidebar-bg-deep)" }
                : { color: "var(--sidebar-text-muted)" }
            }
          >
            EN
          </button>
          <button
            onClick={() => setLang("zh")}
            className="flex-1 text-xs font-medium py-1.5 rounded transition-all"
            style={
              lang === "zh"
                ? { backgroundColor: "var(--gold)", color: "var(--sidebar-bg-deep)" }
                : { color: "var(--sidebar-text-muted)" }
            }
          >
            中文
          </button>
        </div>

        {/* Theme Toggle */}
        <div
          className="mt-2 flex items-center gap-1 rounded p-0.5"
          style={{ backgroundColor: "var(--sidebar-bg-deep)" }}
        >
          <button
            onClick={() => setTheme('light')}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded transition-all"
            style={
              !isDark
                ? { backgroundColor: "var(--gold)", color: "var(--sidebar-bg-deep)" }
                : { color: "var(--sidebar-text-muted)" }
            }
          >
            <Sun size={11} />
            {lang === "zh" ? "浅色" : "Light"}
          </button>
          <button
            onClick={() => setTheme('dark')}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded transition-all"
            style={
              isDark
                ? { backgroundColor: "var(--gold)", color: "var(--sidebar-bg-deep)" }
                : { color: "var(--sidebar-text-muted)" }
            }
          >
            <Moon size={11} />
            {lang === "zh" ? "深色" : "Dark"}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {chapters.map((chapter, idx) => {
          const chapterPath = `/chapter/${chapter.id}`;
          const isChapterActive = isActive(chapterPath);
          const isOpen = openChapters.has(chapter.id);

          return (
            <div key={chapter.id} className="mb-0.5">
              {/* Chapter Header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-all"
                style={
                  isChapterActive
                    ? {
                        backgroundColor: "var(--sidebar-bg-active)",
                        borderLeft: "3px solid var(--gold)",
                      }
                    : {
                        borderLeft: "3px solid transparent",
                      }
                }
                onMouseEnter={(e) => {
                  if (!isChapterActive)
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "var(--sidebar-bg-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!isChapterActive)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "";
                }}
              >
                <span className="text-base leading-none flex-shrink-0">{CHAPTER_ICONS[idx]}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[11px] font-medium tracking-wider uppercase leading-none mb-0.5"
                    style={{
                      color: isChapterActive ? "var(--gold)" : "var(--sidebar-text-label)",
                    }}
                  >
                    Ch. {chapter.number}
                  </p>
                  <p
                    className="text-[12.5px] font-medium leading-snug truncate"
                    style={{
                      color: isChapterActive ? "var(--sidebar-text)" : "var(--sidebar-text-muted)",
                    }}
                  >
                    {lang === "zh" ? chapter.zh.title : chapter.en.title}
                  </p>
                </div>
                <span style={{ color: isChapterActive ? "var(--gold)" : "var(--sidebar-text-label)" }}>
                  {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </span>
              </button>

              {/* Sections */}
              {isOpen && (
                <div
                  className="ml-4"
                  style={{ borderLeft: "1px solid var(--sidebar-border-color)" }}
                >
                  {chapter.sections.map((section) => {
                    const sectionPath = `/chapter/${chapter.id}/section/${section.id}`;
                    const isSectionActive = location === sectionPath;
                    return (
                      <Link
                        key={section.id}
                        href={sectionPath}
                        onClick={() => setMobileOpen(false)}
                      >
                        <div
                          className="px-3 py-2 cursor-pointer transition-all -ml-px"
                          style={
                            isSectionActive
                              ? {
                                  backgroundColor: "var(--sidebar-bg-hover)",
                                  borderLeft: "2px solid var(--gold)",
                                }
                              : { borderLeft: "2px solid transparent" }
                          }
                          onMouseEnter={(e) => {
                            if (!isSectionActive)
                              (e.currentTarget as HTMLElement).style.backgroundColor =
                                "var(--sidebar-bg-hover)";
                          }}
                          onMouseLeave={(e) => {
                            if (!isSectionActive)
                              (e.currentTarget as HTMLElement).style.backgroundColor = "";
                          }}
                        >
                          <p
                            className="text-[11.5px] leading-snug"
                            style={{
                              color: isSectionActive
                                ? "var(--sidebar-text)"
                                : "var(--sidebar-text-muted)",
                            }}
                          >
                            {lang === "zh" ? section.zh.title : section.en.title}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-4"
        style={{ borderTop: "1px solid var(--sidebar-border-color)" }}
      >
        <p className="text-[10px] leading-relaxed" style={{ color: "var(--sidebar-text-label)" }}>
          {lang === "zh"
            ? "美国制度百科全书：移民指南 © 2025"
            : "Encyclopedia of U.S. Systems: An Immigrant's Guide © 2025"}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded shadow-lg text-white"
        style={{ backgroundColor: "var(--sidebar-bg)" }}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 min-h-screen fixed left-0 top-0 bottom-0 z-30 overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: "var(--sidebar-bg)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 transform transition-transform duration-300 overflow-hidden flex flex-col ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "var(--sidebar-bg)" }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}

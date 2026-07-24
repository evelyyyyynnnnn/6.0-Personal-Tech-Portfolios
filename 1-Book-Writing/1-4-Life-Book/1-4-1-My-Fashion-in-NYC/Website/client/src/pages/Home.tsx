/*
 * DESIGN: Kyoto Stationery × Rive Gauche Minimalism
 * Warm linen base, Cormorant Garamond display, Outfit UI, blush rose accent
 * Single-column editorial layout, left-border accent rules on sections
 * Bilingual EN/ZH, Light/Dark mode, scroll-reveal animations
 */

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sun, Moon, Globe } from "lucide-react";

// ── Image URLs ──────────────────────────────────────────────
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/WztTcYNQZRUx9LSp9N7gCQ/hero-fashion-RjYM7qUCyi4sCGXnPM4Zg7.webp";
const WARDROBE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/WztTcYNQZRUx9LSp9N7gCQ/wardrobe-assets-K7xuqVXanS8pHscrL7jJnD.webp";
const OOTD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/WztTcYNQZRUx9LSp9N7gCQ/ootd-diary-7rpvUv4pst75D9QatcdNmt.webp";
const COLOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/WztTcYNQZRUx9LSp9N7gCQ/color-palette-8CW8P3ESscGb4ppsyUjjMq.webp";
const STYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/WztTcYNQZRUx9LSp9N7gCQ/style-dna-3WStAEDw8pb3z6akq5RbPp.webp";

// ── Scroll Reveal Hook ──────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Sub-components ──────────────────────────────────────────

function SectionHeader({
  num, en, zh, descEn, descZh
}: { num: string; en: string; zh: string; descEn: string; descZh: string }) {
  const { t } = useLanguage();
  return (
    <div className="section-rule mb-8">
      <p className="section-num mb-1">{num}</p>
      <h2 className="font-display text-3xl md:text-4xl font-light leading-tight mb-3">
        {t(en, zh)}
      </h2>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
        {t(descEn, descZh)}
      </p>
    </div>
  );
}

// ── Section 1: Digital Wardrobe Assets ─────────────────────
function WardrobeSection() {
  const { t } = useLanguage();
  const ref = useReveal();

  const categories = [
    { en: "Tops", zh: "上衣", count: 24, icon: "👚" },
    { en: "Bottoms", zh: "下装", count: 18, icon: "👖" },
    { en: "Accessories", zh: "配饰", count: 31, icon: "💍" },
    { en: "Footwear", zh: "鞋履", count: 12, icon: "👟" },
  ];

  const materials = [
    { en: "Cashmere", zh: "羊绒", pct: 22 },
    { en: "Leather", zh: "皮革", pct: 15 },
    { en: "Denim", zh: "丹宁", pct: 28 },
    { en: "Silk", zh: "真丝", pct: 18 },
    { en: "Cotton", zh: "棉质", pct: 17 },
  ];

  return (
    <section id="wardrobe" className="py-16 md:py-24">
      <div className="container">
        <div ref={ref} className="reveal">
          <SectionHeader
            num="01"
            en="Digital Wardrobe Assets"
            zh="单品资产库"
            descEn="The smallest unit of your style, digitized. Not just categories — asset management."
            descZh="穿搭的最小颗粒度数字化。不仅是分类，更是「资产管理」。"
          />
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: image + categories */}
            <div>
              <div className="rounded-sm overflow-hidden mb-6 aspect-[4/3]">
                <img src={WARDROBE_IMG} alt="Wardrobe flat lay" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((c) => (
                  <div key={c.en} className="border border-border rounded-sm p-4 hover:border-primary transition-colors">
                    <div className="text-2xl mb-1">{c.icon}</div>
                    <div className="font-display text-lg font-medium">{t(c.en, c.zh)}</div>
                    <div className="data-mono text-muted-foreground">{c.count} {t("items", "件")}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: material breakdown + year index */}
            <div>
              <h3 className="font-display text-xl font-medium mb-5">{t("Material Index", "材质索引")}</h3>
              <div className="space-y-4 mb-10">
                {materials.map((m) => (
                  <div key={m.en}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{t(m.en, m.zh)}</span>
                      <span className="data-mono text-xs text-muted-foreground">{m.pct}%</span>
                    </div>
                    <div className="h-1 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-700"
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="font-display text-xl font-medium mb-4">{t("Acquisition Timeline", "购入年份")}</h3>
              <div className="space-y-2">
                {[
                  { year: "2024", count: 28 },
                  { year: "2023", count: 22 },
                  { year: "2022", count: 15 },
                  { year: "2021", count: 20 },
                ].map((y) => (
                  <div key={y.year} className="flex items-center gap-3">
                    <span className="data-mono text-xs text-muted-foreground w-10">{y.year}</span>
                    <div className="flex-1 h-px bg-border relative">
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-accent rounded-full"
                        style={{ width: `${(y.count / 28) * 100}%` }}
                      />
                    </div>
                    <span className="data-mono text-xs text-muted-foreground">{y.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 2: OOTD Behavior Log ───────────────────────────
function OOTDSection() {
  const { t } = useLanguage();
  const ref = useReveal();
  const [activeEntry, setActiveEntry] = useState(0);

  const entries = [
    {
      date: "Apr 24",
      dateZh: "4月24日",
      outfit: "Cream linen trousers + blush silk blouse",
      outfitZh: "米色亚麻阔腿裤 + 粉色真丝衬衫",
      confidence: 9,
      comfort: 8,
      occasion: "Brunch",
      occasionZh: "周末早午餐",
      tags: ["Clean Fit", "Linen", "Blush"],
    },
    {
      date: "Apr 22",
      dateZh: "4月22日",
      outfit: "Navy straight-leg jeans + camel knit",
      outfitZh: "深蓝直筒牛仔裤 + 驼色针织衫",
      confidence: 8,
      comfort: 9,
      occasion: "Campus",
      occasionZh: "校园通勤",
      tags: ["Casual", "Denim", "Camel"],
    },
    {
      date: "Apr 20",
      dateZh: "4月20日",
      outfit: "Black tailored blazer + white tee + wide trousers",
      outfitZh: "黑色西装外套 + 白T + 阔腿裤",
      confidence: 10,
      comfort: 7,
      occasion: "Presentation",
      occasionZh: "课堂展示",
      tags: ["Power Fit", "Monochrome", "Tailored"],
    },
  ];

  const entry = entries[activeEntry];

  return (
    <section id="ootd" className="py-16 md:py-24 bg-secondary/40">
      <div className="container">
        <div ref={ref} className="reveal">
          <SectionHeader
            num="02"
            en="OOTD Behavior Log"
            zh="日记与行为追踪"
            descEn="Recording real-world data — turning 'what to wear' into data points."
            descZh="记录实战数据，将「穿什么」转化为「数据点」。"
          />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {entries.map((e, i) => (
              <button
                key={i}
                onClick={() => setActiveEntry(i)}
                className={`text-left p-5 rounded-sm border transition-all ${
                  activeEntry === i
                    ? "border-primary bg-accent/50"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="data-mono text-xs text-muted-foreground mb-2">{t(e.date, e.dateZh)}</div>
                <div className="font-display text-base font-medium leading-snug mb-3">
                  {t(e.outfit, e.outfitZh)}
                </div>
                <div className="flex gap-1 flex-wrap">
                  {e.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
          {/* Detail panel */}
          <div className="grid md:grid-cols-2 gap-10 items-center border border-border rounded-sm p-6 md:p-8">
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img src={OOTD_IMG} alt="OOTD diary" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="data-mono text-xs text-muted-foreground mb-1">{t(entry.date, entry.dateZh)}</div>
              <h3 className="font-display text-2xl font-medium mb-1">{t(entry.outfit, entry.outfitZh)}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t(entry.occasion, entry.occasionZh)}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">{t("Confidence Level", "自信指数")}</p>
                  <div className="flex items-end gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 rounded-full transition-all ${
                          i < entry.confidence ? "bg-primary" : "bg-border"
                        }`}
                        style={{ height: `${8 + i * 2}px` }}
                      />
                    ))}
                  </div>
                  <p className="data-mono text-xs text-primary mt-1">{entry.confidence}/10</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">{t("Comfort Score", "舒适度")}</p>
                  <div className="flex items-end gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 rounded-full transition-all ${
                          i < entry.comfort ? "bg-[var(--sage)]" : "bg-border"
                        }`}
                        style={{ height: `${8 + i * 2}px` }}
                      />
                    ))}
                  </div>
                  <p className="data-mono text-xs text-[var(--sage)] mt-1">{entry.comfort}/10</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {entry.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 3: Style DNA & Architecture ────────────────────
function StyleDNASection() {
  const { t } = useLanguage();
  const ref = useReveal();

  const styles = [
    { en: "Clean Fit", zh: "极简干净", pct: 45, color: "var(--primary)" },
    { en: "Intellectual", zh: "知识分子风", pct: 30, color: "var(--sage)" },
    { en: "Urban Soft", zh: "都市柔美", pct: 25, color: "var(--camel)" },
  ];

  const silhouettes = [
    { en: "Relaxed H-line", zh: "松弛感 H型", desc: "Wide trousers, oversized knits", descZh: "阔腿裤、宽松针织" },
    { en: "Fitted X-line", zh: "修身 X型", desc: "Tailored blazers, wrap dresses", descZh: "西装外套、裹身裙" },
    { en: "A-line Soft", zh: "A型柔美", desc: "Midi skirts, flowy blouses", descZh: "中长裙、飘逸上衣" },
  ];

  return (
    <section id="style-dna" className="py-16 md:py-24">
      <div className="container">
        <div ref={ref} className="reveal">
          <SectionHeader
            num="03"
            en="Style DNA & Architecture"
            zh="风格建模与矩阵"
            descEn="Deconstructing intuitive aesthetics into definable tag combinations."
            descZh="将感性的审美拆解为可定义的标签组合。"
          />
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="aspect-[4/3] rounded-sm overflow-hidden mb-6">
                <img src={STYLE_IMG} alt="Style DNA moodboard" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-xl font-medium mb-4">{t("Core Style Distribution", "核心风格分布")}</h3>
              <div className="space-y-5">
                {styles.map((s) => (
                  <div key={s.en}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm">{t(s.en, s.zh)}</span>
                      <span className="data-mono text-xs text-muted-foreground">{s.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-medium mb-5">{t("Silhouette Preferences", "廓形偏好")}</h3>
              <div className="space-y-4 mb-8">
                {silhouettes.map((s, i) => (
                  <div key={i} className="border border-border rounded-sm p-4 hover:border-primary/60 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-display text-lg font-medium">{t(s.en, s.zh)}</span>
                      <span className="data-mono text-xs text-muted-foreground">0{i + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{t(s.desc, s.descZh)}</p>
                  </div>
                ))}
              </div>
              <div className="bg-accent/40 rounded-sm p-5 border border-border">
                <p className="text-xs text-muted-foreground mb-2 font-ui">{t("Style Compass", "审美坐标")}</p>
                <p className="font-display text-lg italic leading-relaxed">
                  {t(
                    "\"Quiet confidence. Dressed for herself, not for the room.\"",
                    "「静水流深。为自己而穿，而非为了被看见。」"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 4: Context & Weather ───────────────────────────
function ContextSection() {
  const { t, lang } = useLanguage();
  const ref = useReveal();
  const [activeTemp, setActiveTemp] = useState(1);

  const tempRanges = [
    {
      range: "< 5°C",
      label: t("Deep Winter", "严冬"),
      items: ["Heavy wool coat", "Cashmere turtleneck", "Thermal layer"],
      itemsZh: ["厚羊毛大衣", "羊绒高领毛衣", "保暖打底"],
    },
    {
      range: "5–15°C",
      label: t("Cool Season", "凉季"),
      items: ["Trench coat", "Light knit", "Straight-leg jeans"],
      itemsZh: ["风衣", "轻薄针织衫", "直筒牛仔裤"],
    },
    {
      range: "15–25°C",
      label: t("Mild Season", "温和季"),
      items: ["Linen blazer", "Silk blouse", "Wide trousers"],
      itemsZh: ["亚麻西装", "真丝衬衫", "阔腿裤"],
    },
    {
      range: "> 25°C",
      label: t("Summer", "夏季"),
      items: ["Slip dress", "Linen shorts", "Minimal accessories"],
      itemsZh: ["吊带裙", "亚麻短裤", "极简配饰"],
    },
  ];

  const occasions = [
    { en: "Academic", zh: "学术会议", icon: "🎓", count: 12 },
    { en: "Commute", zh: "日常通勤", icon: "🚇", count: 28 },
    { en: "Date", zh: "约会", icon: "🌸", count: 8 },
    { en: "Fitness", zh: "健身", icon: "🏃", count: 6 },
    { en: "Dinner", zh: "正式晚宴", icon: "🍷", count: 5 },
    { en: "Weekend", zh: "周末休闲", icon: "☕", count: 22 },
  ];

  return (
    <section id="context" className="py-16 md:py-24 bg-secondary/40">
      <div className="container">
        <div ref={ref} className="reveal">
          <SectionHeader
            num="04"
            en="Context & Weather"
            zh="场景与气候关联"
            descEn="Dressing is a function constrained by environment. Automate the decision."
            descZh="穿搭是受环境约束的函数。实现决策自动化。"
          />
          <div className="grid md:grid-cols-2 gap-10">
            {/* Temperature selector */}
            <div>
              <h3 className="font-display text-xl font-medium mb-4">{t("Temperature Index", "温度区间")}</h3>
              <div className="flex gap-2 mb-5 flex-wrap">
                {tempRanges.map((tr, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTemp(i)}
                    className={`px-3 py-1.5 rounded-sm border text-sm transition-all ${
                      activeTemp === i
                        ? "border-primary bg-accent/50 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="data-mono">{tr.range}</span>
                  </button>
                ))}
              </div>
              <div className="border border-border rounded-sm p-5">
                <p className="font-display text-lg font-medium mb-3">{tempRanges[activeTemp].label}</p>
                <ul className="space-y-2">
                  {(lang === "en"
                    ? tempRanges[activeTemp].items
                    : tempRanges[activeTemp].itemsZh
                  ).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Occasion grid */}
            <div>
              <h3 className="font-display text-xl font-medium mb-4">{t("Occasion Labels", "场合标签")}</h3>
              <div className="grid grid-cols-2 gap-3">
                {occasions.map((o) => (
                  <div
                    key={o.en}
                    className="border border-border rounded-sm p-4 hover:border-primary/60 transition-colors"
                  >
                    <div className="text-xl mb-1">{o.icon}</div>
                    <div className="font-medium text-sm">{t(o.en, o.zh)}</div>
                    <div className="data-mono text-xs text-muted-foreground">{o.count} {t("looks", "套穿搭")}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 5: Color Palette Analysis ──────────────────────
function ColorSection() {
  const { t } = useLanguage();
  const ref = useReveal();

  const palette = [
    { name: "Ivory", nameZh: "象牙白", hex: "#F5F0E8", pct: 28, type: t("Neutral", "中性色") },
    { name: "Camel", nameZh: "驼色", hex: "#C4956A", pct: 22, type: t("Earth", "大地色") },
    { name: "Navy", nameZh: "深蓝", hex: "#2C3E6B", pct: 18, type: t("Cool", "冷色调") },
    { name: "Blush", nameZh: "玫瑰粉", hex: "#E8B4B8", pct: 14, type: t("Accent", "点缀色") },
    { name: "Sage", nameZh: "鼠尾草绿", hex: "#8FAF8A", pct: 10, type: t("Earth", "大地色") },
    { name: "Charcoal", nameZh: "炭灰", hex: "#3A3A3A", pct: 8, type: t("Neutral", "中性色") },
  ];

  return (
    <section id="color" className="py-16 md:py-24">
      <div className="container">
        <div ref={ref} className="reveal">
          <SectionHeader
            num="05"
            en="Color Palette Analysis"
            zh="色彩图谱分析"
            descEn="Quantifying visual presentation. Record dominant, secondary, and accent colors per look."
            descZh="视觉呈现的量化。记录每套穿搭的主色、辅色、点缀色。"
          />
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="aspect-[4/3] rounded-sm overflow-hidden mb-6">
                <img src={COLOR_IMG} alt="Color palette swatches" className="w-full h-full object-cover" />
              </div>
              {/* Color bar */}
              <div className="flex h-8 rounded-sm overflow-hidden mb-3">
                {palette.map((c) => (
                  <div
                    key={c.name}
                    style={{ width: `${c.pct}%`, backgroundColor: c.hex }}
                    title={`${c.name} ${c.pct}%`}
                  />
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {palette.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full border border-border/50" style={{ backgroundColor: c.hex }} />
                    <span className="text-xs text-muted-foreground">{t(c.name, c.nameZh)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-medium mb-5">{t("Color Distribution", "色系分布")}</h3>
              <div className="space-y-4">
                {palette.map((c) => (
                  <div key={c.name} className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-sm flex-shrink-0 border border-border/30"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{t(c.name, c.nameZh)}</span>
                        <span className="data-mono text-xs text-muted-foreground">{c.pct}%</span>
                      </div>
                      <div className="h-1 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${c.pct}%`, backgroundColor: c.hex }}
                        />
                      </div>
                    </div>
                    <span className="tag-pill text-xs">{c.type}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-accent/30 rounded-sm p-5 border border-border">
                <p className="text-xs text-muted-foreground mb-1">{t("Signature Color", "本命色")}</p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#C4956A" }} />
                  <span className="font-display text-xl">{t("Camel — 22% dominance", "驼色 — 22% 占比")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 6: Cost per Wear ────────────────────────────────
function CPWSection() {
  const { t } = useLanguage();
  const ref = useReveal();

  const items = [
    { en: "Camel Cashmere Coat", zh: "驼色羊绒大衣", price: 680, wears: 42, category: t("Outerwear", "外套") },
    { en: "White Linen Shirt", zh: "白色亚麻衬衫", price: 85, wears: 38, category: t("Tops", "上衣") },
    { en: "Navy Straight Jeans", zh: "深蓝直筒牛仔裤", price: 120, wears: 55, category: t("Bottoms", "下装") },
    { en: "Cognac Leather Bag", zh: "棕色皮革手提包", price: 420, wears: 60, category: t("Accessories", "配饰") },
    { en: "White Minimalist Sneakers", zh: "白色极简运动鞋", price: 180, wears: 70, category: t("Footwear", "鞋履") },
    { en: "Blush Silk Blouse", zh: "粉色真丝衬衫", price: 160, wears: 18, category: t("Tops", "上衣") },
  ];

  const cpw = (price: number, wears: number) => (price / wears).toFixed(2);

  return (
    <section id="cpw" className="py-16 md:py-24 bg-secondary/40">
      <div className="container">
        <div ref={ref} className="reveal">
          <SectionHeader
            num="06"
            en="Cost per Wear — CPW"
            zh="穿着效益量化"
            descEn="Financial thinking applied to fashion. Cost per Wear = Purchase Price ÷ Total Wears."
            descZh="引入金融思维，评估每件衣服的「投资回报率」。单次穿着成本 = 购买价格 ÷ 穿着总次数。"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-medium text-muted-foreground font-ui">
                    {t("Item", "单品")}
                  </th>
                  <th className="text-left py-3 pr-4 font-medium text-muted-foreground font-ui">
                    {t("Category", "品类")}
                  </th>
                  <th className="text-right py-3 pr-4 font-medium text-muted-foreground font-ui data-mono">
                    {t("Price", "价格")}
                  </th>
                  <th className="text-right py-3 pr-4 font-medium text-muted-foreground font-ui data-mono">
                    {t("Wears", "穿着次数")}
                  </th>
                  <th className="text-right py-3 font-medium text-muted-foreground font-ui data-mono">
                    CPW
                  </th>
                </tr>
              </thead>
              <tbody>
                {items
                  .sort((a, b) => parseFloat(cpw(a.price, a.wears)) - parseFloat(cpw(b.price, b.wears)))
                  .map((item, i) => {
                    const cpwVal = parseFloat(cpw(item.price, item.wears));
                    const isGood = cpwVal < 5;
                    return (
                      <tr key={i} className="border-b border-border/50 hover:bg-accent/20 transition-colors">
                        <td className="py-4 pr-4 font-display font-medium">
                          {t(item.en, item.zh)}
                        </td>
                        <td className="py-4 pr-4">
                          <span className="tag-pill">{item.category}</span>
                        </td>
                        <td className="py-4 pr-4 text-right data-mono text-muted-foreground">
                          ${item.price}
                        </td>
                        <td className="py-4 pr-4 text-right data-mono text-muted-foreground">
                          {item.wears}×
                        </td>
                        <td className="py-4 text-right">
                          <span className={`data-mono font-medium ${isGood ? "text-[var(--sage)]" : "text-[var(--camel)]"}`}>
                            ${cpwVal.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { label: t("Best CPW", "最优CPW"), value: "$1.71", sub: t("Navy Straight Jeans", "深蓝直筒牛仔裤"), color: "var(--sage)" },
              { label: t("Avg CPW", "平均CPW"), value: "$4.38", sub: t("Across all tracked items", "所有追踪单品"), color: "var(--camel)" },
              { label: t("Needs Attention", "待优化"), value: "$8.89", sub: t("Blush Silk Blouse", "粉色真丝衬衫"), color: "var(--primary)" },
            ].map((stat, i) => (
              <div key={i} className="border border-border rounded-sm p-5">
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="font-display text-3xl font-light mb-1" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Navigation ──────────────────────────────────────────────
function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#wardrobe", en: "Assets", zh: "资产库" },
    { href: "#ootd", en: "OOTD", zh: "日记" },
    { href: "#style-dna", en: "Style DNA", zh: "风格" },
    { href: "#context", en: "Context", zh: "场景" },
    { href: "#color", en: "Color", zh: "色彩" },
    { href: "#cpw", en: "CPW", zh: "效益" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-14">
        {/* Logo */}
        <a href="#" className="font-display text-base font-medium tracking-tight">
          <span className="text-primary">MF</span>
          <span className="text-muted-foreground mx-1">·</span>
          <span>NYC</span>
        </a>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-ui text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
            >
              {lang === "en" ? l.en : l.zh}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-xs font-ui text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={14} />
            <span className="font-medium">{lang === "en" ? "EN" : "中"}</span>
            <span className="text-border">/</span>
            <span>{lang === "en" ? "中" : "EN"}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Hero Section ────────────────────────────────────────────
function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Fashion hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container pb-16 md:pb-24">
        <div className="max-w-2xl">
          <p className="section-num mb-3">
            {t("A Digital Wardrobe", "数字衣橱")}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-light leading-tight mb-4">
            {lang === "en" ? (
              <>A Chinese Girl's<br /><em>Fashion Style</em><br />in the U.S.</>
            ) : (
              <>一个中国女孩的<br /><em>时尚风格</em><br />在纽约</>
            )}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed mb-8">
            {t(
              "Six chapters of wardrobe intelligence — from asset tracking to style DNA, color analysis to cost-per-wear.",
              "六个章节的衣橱智识 — 从单品追踪到风格建模，从色彩分析到穿着效益。"
            )}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#wardrobe"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-ui rounded-sm hover:opacity-90 transition-opacity"
            >
              {t("Explore Wardrobe", "探索衣橱")}
            </a>
            <a
              href="#cpw"
              className="px-5 py-2.5 border border-border text-sm font-ui rounded-sm hover:border-primary transition-colors"
            >
              {t("View CPW Analysis", "查看效益分析")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-base font-medium">
            <span className="text-primary">MF</span>
            <span className="text-muted-foreground mx-1">·</span>
            NYC
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("A Chinese Girl's Fashion Style in the U.S.", "一个中国女孩在美国的时尚风格")}
          </p>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          {["#wardrobe", "#ootd", "#style-dna", "#context", "#color", "#cpw"].map((href, i) => (
            <a key={href} href={href} className="hover:text-foreground transition-colors">
              {String(i + 1).padStart(2, "0")}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {t("Part of the Start System", "Start 系统的一部分")} · 2025
        </p>
      </div>
    </footer>
  );
}

// ── Main Page ───────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <HeroSection />
      <WardrobeSection />
      <OOTDSection />
      <StyleDNASection />
      <ContextSection />
      <ColorSection />
      <CPWSection />
      <Footer />
    </div>
  );
}

/*
 * DESIGN PHILOSOPHY: Editorial Finance
 * Hero: Left-aligned large headline + right-side visual
 * Light hero with teal accents; dark mode inverts background
 */
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/9hRpYbdiGBVyCjz5FqhgCn/hero-quant-ai-ayo3yQ48fSFrbVSCLUyAk2.webp';

export default function HeroSection() {
  const { t, lang } = useLanguage();

  const titleLines = t('hero.title').split('\n');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Teal gradient blob - top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06] dark:opacity-[0.08] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 30%, var(--teal) 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)] py-20">
          {/* Left: Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <span className="chapter-badge" style={{ color: 'var(--teal)', background: 'var(--accent)' }}>
                {t('hero.badge')}
              </span>
              <span className="text-xs font-mono text-muted-foreground tracking-wider">
                {lang === 'en' ? '2025 Edition' : '2025年版'}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1
                className="font-display font-bold leading-[1.08] tracking-tight"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                  color: 'var(--foreground)',
                }}
              >
                {titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span style={{ color: 'var(--teal)' }}>{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h1>
              <p
                className="mt-3 font-display italic text-muted-foreground"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
              >
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t('hero.desc')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#curriculum"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white transition-all hover:opacity-90 hover:gap-3 no-underline"
                style={{ background: 'var(--teal)' }}
              >
                {t('hero.cta.primary')}
                <ArrowRight size={16} />
              </a>
              <a
                href="#why"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold border border-border text-foreground hover:bg-muted transition-all no-underline"
              >
                {t('hero.cta.secondary')}
                <ChevronRight size={16} />
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-2">
              {[
                { num: t('hero.stat1.num'), label: t('hero.stat1.label') },
                { num: t('hero.stat2.num'), label: t('hero.stat2.label') },
                { num: t('hero.stat3.num'), label: t('hero.stat3.label') },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: '1.75rem', color: 'var(--teal)' }}
                  >
                    {stat.num}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="relative hidden lg:block">
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 24px 80px oklch(0 0 0 / 0.12)',
              }}
            >
              <img
                src={HERO_IMG}
                alt="Quantitative Finance and AI Visualization"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '16/10' }}
              />
              {/* Overlay gradient for dark mode */}
              <div className="absolute inset-0 opacity-0 dark:opacity-20 bg-gradient-to-br from-background to-transparent pointer-events-none" />
            </div>

            {/* Floating label card */}
            <div
              className="absolute -bottom-4 -left-6 bg-card border border-border rounded-lg px-4 py-3 shadow-lg"
            >
              <div className="font-mono text-xs text-muted-foreground mb-0.5">
                {lang === 'en' ? 'COVERAGE' : '覆盖范围'}
              </div>
              <div className="font-display font-semibold text-sm text-foreground">
                {lang === 'en' ? 'Finance × Models × AI' : '金融 × 模型 × AI'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

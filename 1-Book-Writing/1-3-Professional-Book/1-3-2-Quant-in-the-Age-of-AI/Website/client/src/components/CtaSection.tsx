/*
 * DESIGN PHILOSOPHY: Editorial Finance
 * CTA: Full-width teal-accented section with strong headline
 * Footer: Clean, minimal, two-column layout
 */
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CtaSection() {
  const { t, lang } = useLanguage();
  const ref = useScrollAnimation();

  return (
    <>
      {/* CTA Section */}
      <section
        id="cta"
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: 'var(--foreground)' }}
      >
        {/* Teal accent blob */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 80% 20%, var(--teal) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-8 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 80%, var(--teal) 0%, transparent 65%)',
          }}
        />

        <div className="container relative z-10" ref={ref}>
          <div className="max-w-3xl">
            <h2
              className="fade-up font-display font-bold leading-tight mb-6"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                color: 'oklch(0.97 0 0)',
              }}
              data-delay="0"
            >
              {t('cta.title')}
            </h2>
            <p
              className="fade-up text-lg mb-8 leading-relaxed"
              style={{ color: 'oklch(0.75 0 0)' }}
              data-delay="100"
            >
              {t('cta.subtitle')}
            </p>
            <div className="fade-up flex flex-wrap gap-4 items-center" data-delay="200">
              <a
                href="#curriculum"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold transition-all hover:opacity-90 hover:gap-3 no-underline"
                style={{ background: 'var(--teal)', color: 'white' }}
              >
                {t('cta.btn')}
                <ArrowRight size={16} />
              </a>
              <span
                className="text-sm font-mono"
                style={{ color: 'oklch(0.55 0 0)' }}
              >
                {t('cta.note')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 border-t border-border"
        style={{ background: 'var(--background)' }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-7 h-7 rounded-sm flex items-center justify-center"
                  style={{ background: 'var(--teal)' }}
                >
                  <span className="text-white font-mono text-xs font-bold">Q</span>
                </div>
                <span className="font-display font-semibold text-foreground">
                  Quant in the Age of AI
                </span>
              </div>
              <p className="text-sm text-muted-foreground italic font-display">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Curriculum links */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                {t('footer.parts')}
              </h4>
              <ul className="flex flex-col gap-2">
                {['footer.part1', 'footer.part2', 'footer.part3', 'footer.part4'].map(key => (
                  <li key={key}>
                    <a
                      href="#curriculum"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
                    >
                      {t(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                {lang === 'en' ? 'About' : '关于'}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === 'en'
                  ? 'A comprehensive learning resource for quantitative analysts, researchers, and students navigating the intersection of finance and AI.'
                  : '面向量化分析师、研究者和学生的综合学习资源，助力探索金融与AI的交汇地带。'}
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground font-mono">
              {t('footer.rights')}
            </p>
            <div className="flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--teal)' }}
              />
              <span className="text-xs font-mono text-muted-foreground">
                {lang === 'en' ? 'Part of a comprehensive learning system' : '综合学习系统的组成部分'}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

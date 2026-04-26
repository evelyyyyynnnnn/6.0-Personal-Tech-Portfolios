// DESIGN: Editorial Finance — about section with feature grid and CTA

import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { Layout, Languages, LineChart } from 'lucide-react';

const FEATURE_ICONS = [Layout, Languages, LineChart];

export default function AboutSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  const handleCta = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="py-24"
      style={{ background: 'var(--secondary)' }}
    >
      <div ref={ref} className="container">
        {/* Header */}
        <div className={`mb-14 max-w-2xl transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="chapter-badge mb-4 block">{t.about.sectionLabel}</span>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            }}
          >
            {t.about.title}
          </h2>
          <p
            className="text-muted-foreground mb-4"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1rem' }}
          >
            {t.about.subtitle}
          </p>
          <p
            className="text-muted-foreground"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '0.9rem' }}
          >
            {t.about.desc}
          </p>
        </div>

        {/* Features */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-0 border border-border mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '150ms' }}
        >
          {[
            { titleKey: 'feature1Title' as const, descKey: 'feature1Desc' as const },
            { titleKey: 'feature2Title' as const, descKey: 'feature2Desc' as const },
            { titleKey: 'feature3Title' as const, descKey: 'feature3Desc' as const },
          ].map(({ titleKey, descKey }, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div key={i} className="p-6 border-r border-b border-border bg-card">
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{ background: 'var(--amber-light)', color: 'var(--amber-accent)' }}
                >
                  <Icon size={18} />
                </div>
                <h4
                  className="font-semibold mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem' }}
                >
                  {t.about[titleKey]}
                </h4>
                <p
                  className="text-muted-foreground"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '0.85rem' }}
                >
                  {t.about[descKey]}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap gap-3 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '250ms' }}
        >
          <button
            onClick={handleCta}
            className="px-7 py-3 font-semibold text-sm tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: 'var(--amber-accent)',
              color: '#fff',
            }}
          >
            {t.about.cta}
          </button>
          <button
            onClick={handleCta}
            className="px-7 py-3 font-semibold text-sm tracking-wide border transition-all duration-200 hover:bg-accent"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
          >
            {t.about.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}

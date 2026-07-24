// DESIGN: Editorial Finance — trends as full-width editorial cards with numbered badges

import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { Leaf, Cpu, Telescope } from 'lucide-react';

type TrendKey = 'green' | 'ai' | 'frontier';
const TREND_KEYS: TrendKey[] = ['green', 'ai', 'frontier'];
const TREND_ICONS = [Leaf, Cpu, Telescope];
const TREND_NUMS = ['24–25', '25', '26'];

export default function TrendsSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section id="trends" className="py-24 bg-background">
      <div ref={ref} className="container">
        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="chapter-badge mb-4 block">{t.trends.sectionLabel}</span>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            }}
          >
            {t.trends.title}
          </h2>
          <p className="text-muted-foreground max-w-xl" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {t.trends.subtitle}
          </p>
        </div>

        {/* Trend Cards */}
        <div className="flex flex-col gap-6">
          {TREND_KEYS.map((key, i) => {
            const trend = t.trends[key];
            const Icon = TREND_ICONS[i];
            return (
              <div
                key={key}
                className={`border border-border bg-card overflow-hidden transition-all duration-700 hover:shadow-md ${
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left accent column */}
                  <div
                    className="flex flex-col items-center justify-center p-6 md:w-28 shrink-0"
                    style={{ background: 'var(--amber-light)' }}
                  >
                    <Icon size={28} style={{ color: 'var(--amber-accent)' }} className="mb-2" />
                    <span
                      className="text-xs font-semibold tracking-widest text-center"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: 'var(--amber-accent)',
                        fontSize: '0.65rem',
                      }}
                    >
                      CH. {TREND_NUMS[i]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row flex-1 p-6 gap-6">
                    {/* Main content */}
                    <div className="flex-1">
                      <h3
                        className="font-bold mb-3"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '1.3rem',
                        }}
                      >
                        {trend.title}
                      </h3>
                      <p
                        className="text-muted-foreground leading-relaxed"
                        style={{
                          fontFamily: "'Source Serif 4', Georgia, serif",
                          fontSize: '0.9rem',
                        }}
                      >
                        {trend.desc}
                      </p>
                    </div>

                    {/* Points */}
                    <div className="md:w-56 shrink-0">
                      <div className="section-rule md:hidden mb-4" />
                      <ul className="flex flex-col gap-2">
                        {trend.points.map((point, pi) => (
                          <li key={pi} className="flex items-start gap-2">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: 'var(--amber-accent)' }}
                            />
                            <span
                              className="text-sm"
                              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem' }}
                            >
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// DESIGN: Editorial Finance — sector cards with editorial illustrations, chapter badges, trend callouts

import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { TrendingUp } from 'lucide-react';

const SECTOR_IMAGES = {
  primary: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/kHCB2ZxntRUqqdFc7fuHRD/sector-primary-EHguai2aha3hAyQoPuddaB.webp',
  secondary: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/kHCB2ZxntRUqqdFc7fuHRD/sector-secondary-VLLnCVwb3mQYp9FsjHjCYT.webp',
  tertiary: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/kHCB2ZxntRUqqdFc7fuHRD/sector-tertiary-2dbqx4AjWR3GYAkxMGmVyt.webp',
  quaternary: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/kHCB2ZxntRUqqdFc7fuHRD/sector-quaternary-FA2SVQipSmwvtFf3f8V7w7.webp',
};

type SectorKey = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
const SECTOR_KEYS: SectorKey[] = ['primary', 'secondary', 'tertiary', 'quaternary'];

export default function SectorsSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      id="sectors"
      className="py-24"
      style={{ background: 'var(--secondary)' }}
    >
      <div ref={ref} className="container">
        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="chapter-badge mb-4 block">{t.sectors.sectionLabel}</span>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            }}
          >
            {t.sectors.title}
          </h2>
          <p className="text-muted-foreground max-w-xl" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {t.sectors.subtitle}
          </p>
        </div>

        {/* Sector Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SECTOR_KEYS.map((key, i) => {
            const sector = t.sectors[key];
            return (
              <div
                key={key}
                className={`bg-card border border-border overflow-hidden transition-all duration-700 hover:shadow-lg hover:-translate-y-0.5 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={SECTOR_IMAGES[key]}
                    alt={sector.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4) 100%)' }} />
                  <div className="absolute bottom-3 left-4">
                    <span className="chapter-badge" style={{ background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(251,191,36,0.7)', color: 'rgb(251,191,36)' }}>
                      {sector.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-bold mb-3"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.35rem',
                    }}
                  >
                    {sector.title}
                  </h3>
                  <p
                    className="text-muted-foreground mb-5 leading-relaxed"
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: '0.9rem',
                    }}
                  >
                    {sector.desc}
                  </p>

                  {/* Chapters */}
                  <div className="mb-4">
                    <div className="section-rule mb-3" />
                    <div className="flex flex-col gap-1.5">
                      {sector.chapters.map((ch, ci) => (
                        <div key={ci} className="flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: 'var(--amber-accent)' }}
                          />
                          <span
                            className="text-xs text-muted-foreground"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {ch}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trends */}
                  <div className="trend-callout p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <TrendingUp size={12} style={{ color: 'var(--amber-accent)' }} />
                      <span
                        className="text-xs font-semibold tracking-wider uppercase"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--amber-accent)' }}
                      >
                        Key Trends
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sector.trends.map((trend, ti) => (
                        <span
                          key={ti}
                          className="text-xs px-2 py-0.5 border"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            borderColor: 'var(--amber-accent)',
                            color: 'var(--foreground)',
                            background: 'transparent',
                            fontSize: '0.72rem',
                          }}
                        >
                          {trend}
                        </span>
                      ))}
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

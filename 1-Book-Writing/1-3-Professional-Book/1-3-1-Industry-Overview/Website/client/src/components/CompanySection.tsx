// DESIGN: Editorial Finance — company profile cards with tag chips and vertical rule dividers

import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { Rocket, BarChart2, Globe2, Building2 } from 'lucide-react';

const ICONS = [Rocket, BarChart2, Globe2, Building2];
type CompanyKey = 'startup' | 'midmarket' | 'large' | 'soe';
const COMPANY_KEYS: CompanyKey[] = ['startup', 'midmarket', 'large', 'soe'];

export default function CompanySection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section id="company" className="py-24 bg-background">
      <div ref={ref} className="container">
        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="chapter-badge mb-4 block">{t.company.sectionLabel}</span>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            }}
          >
            {t.company.title}
          </h2>
          <p className="text-muted-foreground max-w-xl" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {t.company.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
          {COMPANY_KEYS.map((key, i) => {
            const company = t.company[key];
            const Icon = ICONS[i];
            return (
              <div
                key={key}
                className={`p-6 border-r border-b border-border hover:bg-accent/40 transition-all duration-500 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{ background: 'var(--amber-light)', color: 'var(--amber-accent)' }}
                >
                  <Icon size={18} />
                </div>

                {/* Title */}
                <h3
                  className="font-bold mb-3 leading-snug"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.1rem',
                  }}
                >
                  {company.title}
                </h3>

                {/* Rule */}
                <div className="section-rule mb-3" />

                {/* Description */}
                <p
                  className="text-muted-foreground mb-4 leading-relaxed"
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: '0.85rem',
                  }}
                >
                  {company.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {company.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-xs px-2 py-0.5"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        background: 'var(--amber-light)',
                        color: 'var(--amber-accent)',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

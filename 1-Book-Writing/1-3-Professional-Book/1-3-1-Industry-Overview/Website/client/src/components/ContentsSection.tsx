// DESIGN: Editorial Finance — newspaper-style TOC with chapter numbers and amber accents

import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';

const PARTS = [
  { num: '00', key: 'preface', descKey: 'prefaceDesc' },
  { num: '01', key: 'part1', descKey: 'part1Desc' },
  { num: '02', key: 'part2', descKey: 'part2Desc' },
  { num: '03', key: 'part3', descKey: 'part3Desc' },
  { num: '04', key: 'part4', descKey: 'part4Desc' },
  { num: '05', key: 'part5', descKey: 'part5Desc' },
  { num: '06', key: 'part6', descKey: 'part6Desc' },
  { num: '07', key: 'part7', descKey: 'part7Desc' },
  { num: '08', key: 'part8', descKey: 'part8Desc' },
] as const;

export default function ContentsSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section id="contents" className="py-24 bg-background">
      <div ref={ref} className="container">
        {/* Section Header */}
        <div className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="chapter-badge mb-4 block">{t.toc.sectionLabel}</span>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            }}
          >
            {t.toc.title}
          </h2>
          <p className="text-muted-foreground max-w-xl" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {t.toc.subtitle}
          </p>
        </div>

        {/* TOC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {PARTS.map((part, i) => (
            <div
              key={part.key}
              className={`p-6 border-b border-r border-border hover:bg-accent/50 transition-all duration-500 cursor-default ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="font-bold shrink-0 leading-none mt-0.5"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.8rem',
                    color: 'var(--amber-accent)',
                    opacity: 0.35,
                  }}
                >
                  {part.num}
                </span>
                <div>
                  <h3
                    className="font-semibold mb-2 leading-snug"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.875rem',
                    }}
                  >
                    {t.toc[part.key]}
                  </h3>
                  <p
                    className="text-muted-foreground leading-relaxed"
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: '0.82rem',
                    }}
                  >
                    {t.toc[part.descKey]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

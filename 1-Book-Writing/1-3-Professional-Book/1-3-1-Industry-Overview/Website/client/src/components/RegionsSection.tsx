// DESIGN: Editorial Finance — regions in a 2x2 editorial grid with highlight badges

import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { MapPin } from 'lucide-react';

type RegionKey = 'northAmerica' | 'europe' | 'asiaPacific' | 'emerging';
const REGION_KEYS: RegionKey[] = ['northAmerica', 'europe', 'asiaPacific', 'emerging'];

const REGION_IMAGES: Record<RegionKey, string> = {
  northAmerica: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80',
  europe: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
  asiaPacific: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80',
  emerging: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
};

const CHAPTER_NUMS: Record<RegionKey, string> = {
  northAmerica: 'Ch. 20',
  europe: 'Ch. 21',
  asiaPacific: 'Ch. 22',
  emerging: 'Ch. 23',
};

export default function RegionsSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      id="regions"
      className="py-24"
      style={{ background: 'var(--secondary)' }}
    >
      <div ref={ref} className="container">
        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="chapter-badge mb-4 block">{t.regions.sectionLabel}</span>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            }}
          >
            {t.regions.title}
          </h2>
          <p className="text-muted-foreground max-w-xl" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {t.regions.subtitle}
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REGION_KEYS.map((key, i) => {
            const region = t.regions[key];
            return (
              <div
                key={key}
                className={`group relative overflow-hidden border border-border bg-card transition-all duration-700 hover:shadow-lg ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={REGION_IMAGES[key]}
                    alt={region.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6) 100%)' }} />
                  <div className="absolute top-3 left-4">
                    <span className="chapter-badge" style={{ background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(251,191,36,0.7)', color: 'rgb(251,191,36)' }}>
                      {CHAPTER_NUMS[key]}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        background: 'var(--amber-accent)',
                        color: '#fff',
                        fontSize: '0.7rem',
                      }}
                    >
                      {region.highlight}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={13} style={{ color: 'var(--amber-accent)' }} />
                    <h3
                      className="font-bold"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.15rem',
                      }}
                    >
                      {region.title}
                    </h3>
                  </div>
                  <div className="section-rule mb-3" />
                  <p
                    className="text-muted-foreground leading-relaxed"
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: '0.875rem',
                    }}
                  >
                    {region.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

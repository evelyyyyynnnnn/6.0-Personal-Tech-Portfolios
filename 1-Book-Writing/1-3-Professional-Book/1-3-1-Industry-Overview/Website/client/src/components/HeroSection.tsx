// DESIGN: Editorial Finance — full-width hero with editorial map banner
// Dark overlay on warm parchment image, Playfair Display headline, amber accent stats

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, BookOpen } from 'lucide-react';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/kHCB2ZxntRUqqdFc7fuHRD/hero-banner-4eZveYkMLd7SsgsXgeRAdr.webp';

export default function HeroSection() {
  const { t, language } = useLanguage();

  const scrollToContents = () => {
    document.querySelector('#contents')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const scrollToSectors = () => {
    document.querySelector('#sectors')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: '#1C1917' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundPosition: 'center 30%',
        }}
      />
      {/* Gradient Overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,25,23,0.3) 0%, rgba(28,25,23,0.55) 50%, rgba(28,25,23,0.92) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 container pb-20 pt-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="animate-fade-up mb-5">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 border"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'rgb(251 191 36)',
                borderColor: 'rgba(251,191,36,0.5)',
                background: 'rgba(251,191,36,0.08)',
              }}
            >
              {t.hero.eyebrow}
            </span>
          </div>

          {/* Title */}
          <h1
            className="animate-fade-up-delay-1 font-bold leading-none mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              color: '#FAFAF7',
              lineHeight: 1.05,
            }}
          >
            {t.hero.title}
            <br />
            <span style={{ color: 'rgb(251 191 36)' }}>{t.hero.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up-delay-2 mb-8 max-w-xl leading-relaxed"
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(250,250,247,0.8)',
            }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-delay-3 flex flex-wrap gap-3 mb-14">
            <button
              onClick={scrollToContents}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: 'rgb(251 191 36)',
                color: '#1C1917',
              }}
            >
              <BookOpen size={15} />
              {t.hero.cta}
            </button>
            <button
              onClick={scrollToSectors}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-wide border transition-all duration-200 hover:bg-white/10"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: '#FAFAF7',
                borderColor: 'rgba(250,250,247,0.4)',
              }}
            >
              {t.hero.ctaSecondary}
            </button>
          </div>

          {/* Stats Row */}
          <div className="animate-fade-up-delay-4 flex flex-wrap gap-8">
            {[
              { value: t.hero.stat1Value, label: t.hero.stat1Label },
              { value: t.hero.stat2Value, label: t.hero.stat2Label },
              { value: t.hero.stat3Value, label: t.hero.stat3Label },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="font-bold leading-none"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '2.5rem',
                    color: 'rgb(251 191 36)',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs tracking-widest uppercase mt-1"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: 'rgba(250,250,247,0.6)',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContents}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontSize: '0.6rem' }}>Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}

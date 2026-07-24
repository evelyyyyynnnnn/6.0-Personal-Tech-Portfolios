// DESIGN: Editorial Finance — minimal footer with amber rule and publication stats

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="py-10 border-t border-border"
      style={{ background: 'var(--background)' }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <div
              className="font-bold mb-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.1rem',
                color: 'var(--amber-accent)',
              }}
            >
              {t.nav.title}
            </div>
            <div
              className="text-muted-foreground text-xs"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              {t.footer.tagline}
            </div>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {[t.footer.parts, t.footer.chapters, t.footer.appendices].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span
                  className="font-semibold text-sm"
                  style={{ color: 'var(--amber-accent)' }}
                >
                  {stat.split(' ')[0]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stat.split(' ').slice(1).join(' ')}
                </span>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.footer.copyright}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="section-rule mt-8" />
        <div
          className="mt-4 text-xs text-muted-foreground text-center"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem' }}
        >
          Designed with Editorial Finance aesthetic · Bilingual EN / 中文 · Light &amp; Dark Mode
        </div>
      </div>
    </footer>
  );
}

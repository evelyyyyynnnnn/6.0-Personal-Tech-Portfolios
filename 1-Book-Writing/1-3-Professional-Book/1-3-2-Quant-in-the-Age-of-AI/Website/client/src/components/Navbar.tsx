/*
 * DESIGN PHILOSOPHY: Editorial Finance
 * Sticky navbar with theme toggle (sun/moon) and language toggle (EN/ZH)
 * Clean, minimal, no heavy shadows — just a subtle border-bottom
 */
import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const { theme, toggleTheme, switchable } = useTheme();
  const { t, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { key: 'nav.home', href: '#hero' },
    { key: 'nav.curriculum', href: '#curriculum' },
    { key: 'nav.about', href: '#why' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group no-underline">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: 'var(--teal)' }}>
              <span className="text-white font-mono text-xs font-bold">Q</span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-sm text-foreground">Quant</div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">in the Age of AI</div>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline"
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
              aria-label="Toggle language"
            >
              {t('nav.lang')}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => toggleTheme?.()}
              className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA */}
            <a
              href="#cta"
              className="hidden md:flex items-center px-4 py-1.5 rounded-md text-sm font-medium text-white transition-all hover:opacity-90 no-underline"
              style={{ background: 'var(--teal)' }}
            >
              {t('nav.cta')}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md pb-4">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map(link => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline"
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="flex items-center gap-2 px-2 pt-2">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-border text-muted-foreground hover:text-foreground transition-all"
                >
                  {t('nav.lang')}
                </button>
                <a
                  href="#cta"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-1.5 rounded-md text-sm font-medium text-white transition-all hover:opacity-90 no-underline"
                  style={{ background: 'var(--teal)' }}
                >
                  {t('nav.cta')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

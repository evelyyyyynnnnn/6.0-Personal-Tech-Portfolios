// DESIGN: Editorial Finance — top navigation bar with language + theme toggles
// Shrinks on scroll, amber accent, DM Sans UI font

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { key: 'contents', href: '#contents' },
  { key: 'sectors', href: '#sectors' },
  { key: 'regions', href: '#regions' },
  { key: 'trends', href: '#trends' },
  { key: 'about', href: '#about' },
] as const;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLanguage, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-ui ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border py-2'
          : 'bg-transparent py-4'
      }`}
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex flex-col leading-tight"
        >
          <span
            className="font-bold text-base tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--amber-accent)' }}
          >
            {t.nav.title}
          </span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase" style={{ fontSize: '0.65rem' }}>
            {t.nav.subtitle}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 tracking-wide"
            >
              {t.nav[item.key]}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-150 border"
            style={{
              borderColor: 'var(--amber-accent)',
              color: 'var(--amber-accent)',
              background: 'transparent',
            }}
            title={language === 'en' ? 'Switch to Chinese' : '切换为英文'}
          >
            <Globe size={12} />
            {t.nav.langToggle}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded transition-colors duration-150 text-muted-foreground hover:text-foreground hover:bg-accent"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <nav className="container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="text-left py-2.5 px-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
              >
                {t.nav[item.key]}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

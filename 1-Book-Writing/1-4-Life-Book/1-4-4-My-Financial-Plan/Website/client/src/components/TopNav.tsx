import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Menu, X, TrendingUp, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/calculators", label: t("Calculators", "计算器") },
    { href: "/planner", label: t("Planner", "退休规划") },
    { href: "/tax", label: t("Tax Engine", "税务引擎") },
    { href: "/allocation", label: t("Allocation", "资产配置") },
    { href: "/benefits", label: t("Benefits", "公司福利") },
    { href: "/ai-advisor", label: t("AI Advisor", "AI顾问") },
    { href: "/consultation", label: t("Consult", "咨询") },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "border-b border-border/50 bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-background" />
          </div>
          <span className="font-display font-semibold text-lg text-foreground">
            WealthWise <span className="text-primary">Pro</span>
          </span>
          <div className="hidden sm:flex gap-1">
            <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px] px-1.5 py-0.5">CFA</Badge>
            <Badge className="bg-chart-1/15 text-chart-1 border-chart-1/30 text-[10px] px-1.5 py-0.5">FRM</Badge>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                location === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: toggles + auth */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Language toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "zh" : "en")}
            className="border-border/50 text-xs font-semibold px-2.5 h-8 min-w-[52px]"
            title={language === "en" ? "切换到中文" : "Switch to English"}
          >
            {language === "en" ? "中文" : "EN"}
          </Button>

          {/* Theme toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="border-border/50 h-8 w-8 p-0"
            title={theme === "dark" ? (language === "en" ? "Switch to Light" : "切换到亮色") : (language === "en" ? "Switch to Dark" : "切换到暗色")}
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </Button>

          {/* Divider */}
          <div className="w-px h-5 bg-border/50 mx-1" />

          {/* Auth */}
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  {t("Dashboard", "仪表盘")}
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground">{user?.name}</span>
              <Button variant="outline" size="sm" onClick={logout} className="border-border/50">
                {t("Sign Out", "退出")}
              </Button>
            </>
          ) : (
            <>
              <a href={getLoginUrl()}>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  {t("Sign In", "登录")}
                </Button>
              </a>
              <a href={getLoginUrl()}>
                <Button size="sm" className="gradient-gold text-background font-semibold hover:opacity-90">
                  {t("Get Started Free", "免费开始")}
                </Button>
              </a>
            </>
          )}
        </div>

        {/* Mobile: toggles + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Language toggle (mobile) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "zh" : "en")}
            className="border-border/50 text-xs font-semibold px-2 h-7"
          >
            {language === "en" ? "中文" : "EN"}
          </Button>

          {/* Theme toggle (mobile) */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="border-border/50 h-7 w-7 p-0"
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </Button>

          <button
            className="p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border/50 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">{t("Dashboard", "仪表盘")}</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={logout} className="w-full">{t("Sign Out", "退出")}</Button>
                </>
              ) : (
                <>
                  <a href={getLoginUrl()} className="w-full">
                    <Button variant="outline" size="sm" className="w-full">{t("Sign In", "登录")}</Button>
                  </a>
                  <a href={getLoginUrl()} className="w-full">
                    <Button size="sm" className="w-full gradient-gold text-background font-semibold">
                      {t("Get Started Free", "免费开始")}
                    </Button>
                  </a>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

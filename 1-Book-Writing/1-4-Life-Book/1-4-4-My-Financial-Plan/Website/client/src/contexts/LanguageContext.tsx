import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "en" | "zh";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, zh: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("ww-language");
      return stored === "zh" ? "zh" : "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("ww-language", lang);
    } catch {}
  };

  const t = (en: string, zh: string) => (language === "zh" ? zh : en);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

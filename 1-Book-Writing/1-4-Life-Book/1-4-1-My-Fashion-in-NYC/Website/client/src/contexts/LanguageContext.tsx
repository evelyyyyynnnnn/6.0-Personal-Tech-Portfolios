import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "zh";

interface LanguageContextValue {
  lang: Language;
  toggleLang: () => void;
  t: (en: string, zh: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggleLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const toggleLang = () => setLang((l) => (l === "en" ? "zh" : "en"));

  const t = (en: string, zh: string) => (lang === "en" ? en : zh);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

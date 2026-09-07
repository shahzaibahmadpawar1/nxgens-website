'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isReady: boolean;
  t: (en: string, ar: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Read from localStorage
    try {
      const saved = localStorage.getItem('nx-lang') || localStorage.getItem('lang');
      if (saved === 'ar' || saved === 'en') {
        setLangState(saved as Language);
      }
    } catch (e) {
      console.error(e);
    }
    setIsReady(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('nx-lang', newLang);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isReady) return;

    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    if (lang === 'ar') {
      htmlEl.setAttribute('lang', 'ar');
      htmlEl.setAttribute('dir', 'rtl');
      bodyEl.classList.add('arabic');
    } else {
      htmlEl.setAttribute('lang', 'en');
      htmlEl.setAttribute('dir', 'ltr');
      bodyEl.classList.remove('arabic');
    }
  }, [lang, isReady]);

  const t = (en: string, ar: string) => {
    return lang === 'ar' ? ar : en;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isReady, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

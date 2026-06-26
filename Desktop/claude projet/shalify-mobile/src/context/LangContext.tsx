import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getStoredLang, storeLang, applyRTL, isRTL as isRTLFn, t, type TranslationKey } from '../i18n';
import type { Lang } from '../types';

interface LangState {
  lang: Lang;
  isRTL: boolean;
  changeLang: (l: Lang) => Promise<void>;
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangState>({
  lang: 'fr',
  isRTL: false,
  changeLang: async () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  useEffect(() => {
    getStoredLang().then(l => { setLang(l); applyRTL(l); });
  }, []);

  const changeLang = async (l: Lang) => {
    await storeLang(l);
    applyRTL(l);
    setLang(l);
  };

  const translate = (key: TranslationKey) => t(lang, key);

  return (
    <LangContext.Provider value={{ lang, isRTL: isRTLFn(lang), changeLang, t: translate }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() { return useContext(LangContext); }

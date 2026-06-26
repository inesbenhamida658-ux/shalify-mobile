import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { fr } from './fr';
import { en } from './en';
import { ar } from './ar';
import type { Lang } from '../types';

const LANG_KEY = 'shalify_mobile_lang';

export const translations = { fr, en, ar } as const;
export type TranslationKey = keyof typeof fr;

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang]?.[key] ?? translations.fr[key] ?? key;
}

export async function getStoredLang(): Promise<Lang> {
  const stored = await AsyncStorage.getItem(LANG_KEY);
  if (stored === 'fr' || stored === 'en' || stored === 'ar') return stored;
  return 'fr';
}

export async function storeLang(lang: Lang): Promise<void> {
  await AsyncStorage.setItem(LANG_KEY, lang);
}

export function isRTL(lang: Lang): boolean {
  return lang === 'ar';
}

export function applyRTL(lang: Lang): void {
  const rtl = lang === 'ar';
  if (I18nManager.isRTL !== rtl) {
    I18nManager.allowRTL(rtl);
    I18nManager.forceRTL(rtl);
  }
}

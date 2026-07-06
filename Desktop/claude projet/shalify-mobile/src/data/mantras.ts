import type { Lang } from '../types';

// Mantras positifs (identité coaching Shalify). Rotation par jour, zéro mot banni.
const MANTRAS: Record<Lang, string[]> = {
  fr: [
    'Chaque pas compte. Avance à ton rythme.',
    'Ton talent mérite d\'être partagé.',
    'Prends soin de toi aujourd\'hui.',
    'Une intention claire ouvre le chemin.',
    'Ta valeur grandit chaque jour.',
    'Respire, souris, continue.',
    'Le bon moment, c\'est maintenant.',
  ],
  en: [
    'Every step counts. Move at your pace.',
    'Your talent deserves to be shared.',
    'Take good care of yourself today.',
    'A clear intention opens the way.',
    'Your value grows every day.',
    'Breathe, smile, keep going.',
    'The right moment is now.',
  ],
  ar: [
    'كل خطوة تهم. تقدّم بإيقاعك.',
    'موهبتك تستحق أن تُشارَك.',
    'اعتنِ بنفسك اليوم.',
    'نية واضحة تفتح الطريق.',
    'قيمتك تكبر كل يوم.',
    'تنفّس، ابتسم، وواصل.',
    'اللحظة المناسبة هي الآن.',
  ],
};

// Mantra du jour : déterministe par date (même mantra toute la journée).
export function mantraDuJour(lang: Lang, now: Date = new Date()): string {
  const list = MANTRAS[lang] ?? MANTRAS.fr;
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start) / 86400000);
  return list[((dayOfYear % list.length) + list.length) % list.length];
}

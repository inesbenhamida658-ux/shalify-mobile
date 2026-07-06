// Recherche vocale — version web (appli-web Shalify).
// Utilise l'API du navigateur window.SpeechRecognition || webkitSpeechRecognition.
// Repli silencieux total si l'API est absente (aucun package natif).
export interface SpeechHandle { stop: () => void; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCtor(): any {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function isSpeechAvailable(): boolean {
  return getCtor() != null;
}

const LOCALE: Record<string, string> = { fr: 'fr-FR', en: 'en-US', ar: 'ar-SA' };

export function startDictation(
  lang: string,
  onResult: (text: string) => void,
  onEnd?: () => void,
): SpeechHandle | null {
  const Ctor = getCtor();
  if (!Ctor) return null;
  try {
    const rec = new Ctor();
    rec.lang = LOCALE[lang] ?? 'fr-FR';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.continuous = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const text = e?.results?.[0]?.[0]?.transcript;
      if (typeof text === 'string' && text.trim()) onResult(text.trim());
    };
    rec.onend = () => { if (onEnd) onEnd(); };
    rec.onerror = () => { if (onEnd) onEnd(); };
    rec.start();
    return { stop: () => { try { rec.stop(); } catch { /* ignore */ } } };
  } catch {
    return null;
  }
}

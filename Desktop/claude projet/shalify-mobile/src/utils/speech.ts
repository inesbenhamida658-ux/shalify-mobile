// Recherche vocale — repli natif silencieux.
// Sur natif (iOS/Android), l'API navigateur n'existe pas : on renvoie
// simplement "non disponible" sans jamais planter. La version web réelle
// est dans speech.web.ts.
export interface SpeechHandle { stop: () => void; }

export function isSpeechAvailable(): boolean {
  return false;
}

export function startDictation(
  _lang: string,
  _onResult: (text: string) => void,
  _onEnd?: () => void,
): SpeechHandle | null {
  return null;
}

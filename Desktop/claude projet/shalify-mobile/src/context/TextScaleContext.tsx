import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTextScale, saveTextScale, type TextScale } from '../services/douceur';

interface TextScaleState {
  scale: TextScale;
  setScale: (s: TextScale) => Promise<void>;
}

const TextScaleContext = createContext<TextScaleState>({
  scale: 1,
  setScale: async () => {},
});

// Réglage de la taille du texte (accessibilité). Multiplie les tailles de police
// dans AppText, sans toucher aux mises en page (interlignes proportionnels).
export function TextScaleProvider({ children }: { children: ReactNode }) {
  const [scale, setScaleState] = useState<TextScale>(1);

  useEffect(() => { getTextScale().then(setScaleState); }, []);

  const setScale = async (s: TextScale) => {
    setScaleState(s);
    await saveTextScale(s);
  };

  return (
    <TextScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </TextScaleContext.Provider>
  );
}

export function useTextScale() { return useContext(TextScaleContext); }

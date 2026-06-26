import { Platform } from 'react-native';

const playfairFallback = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' });
const bodyFont = Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' });

export const Typography = {
  // Titres — style Playfair
  h1: { fontFamily: playfairFallback, fontSize: 32, fontWeight: '400' as const, lineHeight: 40 },
  h2: { fontFamily: playfairFallback, fontSize: 24, fontWeight: '400' as const, lineHeight: 32 },
  h3: { fontFamily: playfairFallback, fontSize: 20, fontWeight: '400' as const, lineHeight: 28 },
  // Corps — minimum 16px
  body: { fontFamily: bodyFont, fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: bodyFont, fontSize: 14, lineHeight: 22 }, // minimum 14px
  caption: { fontFamily: bodyFont, fontSize: 12, lineHeight: 18 },
  // Labels
  label: { fontFamily: bodyFont, fontSize: 14, fontWeight: '600' as const, lineHeight: 20, letterSpacing: 0.5 },
  labelSmall: { fontFamily: bodyFont, fontSize: 12, fontWeight: '600' as const, lineHeight: 18, letterSpacing: 0.8 },
  // Boutons
  button: { fontFamily: bodyFont, fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
} as const;

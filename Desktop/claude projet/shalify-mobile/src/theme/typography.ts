import { Fonts } from '../fonts';

// Charte validée : titres Cormorant 500, texte Poppins 300/400.
// Cormorant rend petit : tailles de titres légèrement montées.
export const Typography = {
  // Titres — Cormorant 500 (h3 en 600 pour rester lisible en petit)
  h1: { fontFamily: Fonts.serifMedium, fontSize: 40, lineHeight: 44 },
  h2: { fontFamily: Fonts.serifMedium, fontSize: 30, lineHeight: 36 },
  h3: { fontFamily: Fonts.serifSemi, fontSize: 22, lineHeight: 28 },
  // Corps — Poppins (minimum 16px)
  body: { fontFamily: Fonts.bodyRegular, fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: Fonts.bodyRegular, fontSize: 14, lineHeight: 22 },
  caption: { fontFamily: Fonts.bodyRegular, fontSize: 12, lineHeight: 18 },
  // Labels
  label: { fontFamily: Fonts.bodySemi, fontSize: 14, lineHeight: 20, letterSpacing: 0.3 },
  labelSmall: { fontFamily: Fonts.bodySemi, fontSize: 12, lineHeight: 18, letterSpacing: 1.6 },
  // Boutons
  button: { fontFamily: Fonts.bodySemi, fontSize: 16, lineHeight: 24 },
} as const;

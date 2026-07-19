export const Colors = {
  // Palette Shalify — charte validée (DESIGN-SHALIFY-VALIDE.md)
  // Fond CRÈME CHAUD #FAF7F2 : choix d'Inès du 17/07 (le sauge #E7EEE5 tirait vers
  // le bleu-gris froid sur son écran, rejeté). Zéro bleu. Ne jamais remettre #E7EEE5.
  creme: '#FAF7F2',
  creme2: '#F3EEE1',
  cremeF: '#F3EEE1',
  vert: '#3D6B4F',
  vertF: '#2A4E38',
  vertTF: '#1C2A20',
  or: '#C9A84C',
  orF: '#C9A84C',
  orClair: '#E9D9A6', // accent d'un mot sur fond vert (ex : « valeur »)
  encre: '#1C2A20',
  brume: '#5C6A60',
  texte: '#1C2A20',
  texteSec: '#5C6A60',
  blanc: '#FFFFFF',
  bordure: '#E8E1D3',
  gris: '#7A857C',
  erreur: '#C0392B',
  succes: '#3D6B4F',
  avertissement: '#C9A84C',
  // Overlays
  overlay: 'rgba(28,42,32,0.6)',
  // Fond écrans — crème chaud, choix d'Inès 17/07 (voir creme ci-dessus)
  fond: '#FAF7F2',
  fondCard: '#FBFCFA',
} as const;

export type ColorKey = keyof typeof Colors;

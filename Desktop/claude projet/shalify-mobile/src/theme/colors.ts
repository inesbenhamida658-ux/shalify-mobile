export const Colors = {
  // Palette Shalify — charte validée (DESIGN-SHALIFY-VALIDE.md)
  creme: '#F1F5EF',
  creme2: '#F3EEE1',
  cremeF: '#F3EEE1',
  vert: '#3D6B4F',
  vertF: '#2A4E38',
  vertTF: '#1C2A20',
  or: '#C9A84C',
  orF: '#C9A84C',
  orClair: '#E9D9A6', // accent d'un mot sur fond vert (ex : « valeur »)
  encre: '#1C2A20',
  brume: '#6F7D72',
  texte: '#1C2A20',
  texteSec: '#6F7D72',
  blanc: '#FFFFFF',
  bordure: '#E8E1D3',
  gris: '#9AA69C',
  erreur: '#C0392B',
  succes: '#3D6B4F',
  avertissement: '#C9A84C',
  // Overlays
  overlay: 'rgba(28,42,32,0.6)',
  // Fond écrans
  fond: '#F1F5EF',
  fondCard: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof Colors;

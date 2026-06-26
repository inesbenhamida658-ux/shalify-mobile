export const Colors = {
  // Palette Shalify
  creme: '#FAF7F2',
  cremeF: '#F2EDE4',
  vert: '#3D6B4F',
  vertF: '#2A4E38',
  vertTF: '#0F1F17',
  or: '#D4A853',
  orF: '#C9A84C',
  texte: '#2A2A2A',
  texteSec: '#666666',
  blanc: '#FFFFFF',
  bordure: '#E8E4DC',
  gris: '#9A9A9A',
  erreur: '#C0392B',
  succes: '#27AE60',
  avertissement: '#F39C12',
  // Overlays
  overlay: 'rgba(15,31,23,0.6)',
  // Fond écrans
  fond: '#FAF7F2',
  fondCard: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof Colors;

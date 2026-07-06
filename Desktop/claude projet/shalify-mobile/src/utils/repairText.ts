// Filet d'affichage temporaire.
// Certaines données du site ont été enregistrées avec les accents perdus
// (caractère de remplacement U+FFFD « � »). Tant que la source n'est pas
// corrigée (script REPARER-TEXTE-LIVE.bat côté site), on rétablit le texte
// français lisible au moment de l'affichage. Zéro effet si le texte est sain.
const FFFD = '�';

export function repairText(s?: string): string {
  if (!s || s.indexOf(FFFD) === -1) return s ?? '';
  return s
    .replace(
      'D�couverte SHALIFY � Premi�re session collective',
      'Découverte SHALIFY · Première session collective',
    )
    .replace(
      'Une premi�re rencontre collective pour d�couvrir SHALIFY, ses valeurs et comment partager votre talent avec le monde. Session ouverte � tous, anim�e par In�s Ben Hamida, fondatrice et coach PNL.',
      'Une première rencontre collective pour découvrir SHALIFY, ses valeurs et comment partager votre talent avec le monde. Session ouverte à tous, animée par Inès Ben Hamida, fondatrice et coach PNL.',
    )
    .replace(/In�s/g, 'Inès')
    .replace(/Premi�re/g, 'Première')
    .replace(/premi�re/g, 'première')
    .replace(/D�couverte/g, 'Découverte')
    .replace(/d�couvrir/g, 'découvrir')
    .replace(/anim�e/g, 'animée');
}

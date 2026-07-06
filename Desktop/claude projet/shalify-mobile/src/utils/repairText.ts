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
    .replace(/anim�e/g, 'animée')
    // Mots fréquents du contenu Shalify (é/è/à/ê/ç/î perdus).
    .replace(/cr�ateur/g, 'créateur')
    .replace(/Cr�ateur/g, 'Créateur')
    .replace(/cr�atrice/g, 'créatrice')
    .replace(/cr�ation/g, 'création')
    .replace(/s�ance/g, 'séance')
    .replace(/m�ditation/g, 'méditation')
    .replace(/exp�rience/g, 'expérience')
    .replace(/th�rapeute/g, 'thérapeute')
    .replace(/bien-�tre/g, 'bien-être')
    .replace(/�tre/g, 'être')
    .replace(/d�veloppe/g, 'développe')
    .replace(/transmi�/g, 'transmi')
    .replace(/valid�e/g, 'validée')
    .replace(/r�serv/g, 'réserv')
    .replace(/pr�sent/g, 'présent')
    // Puce médiane cassée entre deux mots (« SHALIFY � Première »).
    .replace(/ � /g, ' · ');
}

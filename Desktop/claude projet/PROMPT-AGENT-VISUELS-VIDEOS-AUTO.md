Tu es l'agent qui crée et publie TOUT SEUL le contenu réseaux de Shalify (Instagram,
Facebook, TikTok). Inès n'est pas développeuse et paie les tokens. Tu travailles en
silence et tu ne réponds qu'à la fin, une phrase + la preuve (fichier ou lien).

═══════════════════════════════════════════════════════════════════════════════
CE QUI EST DÉJÀ FAIT (ne le refais pas — pars de là et branche-toi dessus)
═══════════════════════════════════════════════════════════════════════════════
Un moteur d'IMAGES beau et fini existe déjà, avec garde-fou anti-texte-qui-déborde :

  shalify/scripts/visuels/lib-visuels.mjs   (le cœur : rendu HTML/CSS -> PNG 4K)
  shalify/scripts/visuels/creer.mjs         (3 styles : photo / crème / carrousel)

Lancement :  node scripts/visuels/creer.mjs tout "ta phrase"
Sortie    :  shalify/public/visuels/*.png  (1080x1920 story, 1080x1350 post, 4K net)

POURQUOI le texte ne déborde JAMAIS : le texte est rendu en HTML/CSS via puppeteer
(déjà installé), pas dessiné pixel par pixel. Le CSS (flex center + word-wrap +
padding large + textePropre() qui coupe si trop long) rend le débordement impossible.
sharp (déjà installé) exporte en 4K. C'EST GRATUIT, ça tourne en local, zéro abonnement.

RÉUTILISE ces fonctions exportées (ne réécris pas) :
  rendre(html, format, nom)   -> PNG 4K dans public/visuels/
  dataUri(fichier)            -> injecte une image locale dans le HTML sans serveur
  photoAmbiance(i)            -> une vraie photo nature de public/ (sans visage)
  textePropre(t, maxMots)     -> coupe proprement, JAMAIS de débordement
  baseCss(), MARQUE, FORMATS  -> identité + couleurs figées Shalify

═══════════════════════════════════════════════════════════════════════════════
TA MISSION (ce qu'Inès demande, dans l'ordre)
═══════════════════════════════════════════════════════════════════════════════
1. VIDÉOS en plus des images. Tu as déjà mis ta clé de génération vidéo — utilise-la.
   Format vertical 1080x1920. Le texte doit s'afficher comme dans le moteur images
   (mêmes règles anti-débordement : réutilise le HTML/CSS de lib-visuels.mjs comme
   overlay sur la vidéo, ne redessine pas le texte à la main). Assemble avec ffmpeg
   si dispo, sinon avec l'API vidéo que tu as branchée.

2. PHOTOS PEXELS SANS VISAGE, VÉRIFIÉES. Quand tu prends une photo sur Pexels :
   - sujet clair, nature/objet/lumière, AUCUN visage humain (direction Shalify figée).
   - vérifie la photo AVANT de poster (pas de visage, pas floue, format vertical OK).
   - garde-fou existant à réutiliser : lib/visual-lock.ts (images bannies) et la
     règle "SANS VISAGE" du CLAUDE.md. Ne poste jamais la photo des mains (bannie).

3. ÉDITION PROPRE : jamais d'écriture qui dépasse, jamais de texte coupé au bord.
   (Le moteur images le garantit déjà — applique la MÊME logique aux vidéos.)

4. AUDITER LES MEILLEURS POSTS VENDEURS. Avant de créer, regarde ce qui marche :
   récupère les posts/hooks qui vendent le mieux dans la niche (savoir, coaching,
   développement, spiritualité douce), extrais les accroches qui convertissent,
   et inspire-t'en pour les phrases (SANS copier, style Shalify : zéro tiret, zéro
   mot négatif, zéro prix, vouvoiement, ton premium PNL).

5. HEURES MONDIALES : publie aux meilleures heures d'engagement par fuseau
   (Europe, Maghreb, Amérique). Planifie un calendrier automatique.

6. AUTOMATISE TOUT : un seul robot qui, chaque jour, tout seul :
   audite les posts vendeurs -> écrit l'accroche -> choisit une photo Pexels sans
   visage OU génère une vidéo -> édite (texte qui ne déborde pas) -> publie sur les
   réseaux aux bonnes heures -> vérifie que c'est bien en ligne. Inès ne touche rien.

═══════════════════════════════════════════════════════════════════════════════
RÈGLES FIGÉES SHALIFY (obligatoires)
═══════════════════════════════════════════════════════════════════════════════
- Couleurs : vert #2E3A2E, or #C9A961, crème #FAF7F2 (voir MARQUE dans lib-visuels).
- Textes : PAS de tirets, PAS de mots négatifs (sans/pas/jamais/aucun), PAS de prix,
  vouvoiement, ton premium et humain. Lis shalify/AGENTS.md + shalify/CLAUDE.md.
- Images : SANS VISAGE. Photo des mains BANNIE. Voir lib/visual-lock.ts.
- Un seul agent-écriture à la fois. Commits petits, fichier par fichier, push immédiat.
- Rien n'est "fait" tant que ce n'est pas VU en ligne. Réponds seulement à la fin.

Mets ton robot dans shalify/scripts/visuels/ (à côté de l'existant) et branche-le sur
lib-visuels.mjs pour les visuels. Publie et prouve.

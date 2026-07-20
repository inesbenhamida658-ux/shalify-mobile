# Direction visuelle validée par Inès — 2026-07-20 (à refléter dans l'appli au prochain build APK)

> Inès a validé une refonte visuelle premium sur le site (aperçu jour+nuit approuvé). L'appli doit être mise au même niveau. Ce fichier est la consigne pour l'agent qui construit l'application. Le backend ne change pas ; c'est purement visuel.

## Ce qui est validé (identique site ↔ appli)

- **Fond jour = ivoire chaud** `#FAF7F2` (déjà en place `src/theme/colors.ts:5` — NE PAS changer, c'est le choix figé d'Inès, zéro bleu).
- **Nuit = vert forêt profond** `#0C1710` (fond) / `#15231A` (cartes), texte `#F3EFE6`, texte secondaire `#AEC7B6`.
- **Or de la marque** `#C9A84C` / `#D4A853` : réservé aux touches précieuses uniquement (accent d'un mot, rubrique active, cœur Connect, bordures fines). Jamais en aplat massif.
- **Titres** = serif Playfair ; **corps** = Poppins clair et lisible ; labels en capitales avec letter-spacing léger.

## LE point clé de la refonte : voile lisible sur TOUTE image avec du texte

Partout où un titre/texte est posé SUR une photo (cartes rubriques, hero, bannières, posters), ajouter un **voile dégradé vert très foncé** derrière le texte, pour que le texte blanc/crème se lise TOUJOURS, jour comme nuit :

```
overlay: linear-gradient(to top,
  rgba(10,20,14,0.82) 0%,
  rgba(10,20,14,0.30) 45%,
  rgba(10,20,14,0.00) 75%)
```
(en RN : composant absolu plein cadre avec ce dégradé via expo-linear-gradient, texte au-dessus, `textShadow` doux `0 1px 8px rgba(0,0,0,0.4)` sur le titre.)

- Titre sur image = **blanc `#FFFFFF`**, label (kicker) = **or clair `#E8C97A`** en capitales.
- Le texte ne doit JAMAIS être posé sur une image sans ce voile (c'était la plainte d'Inès : « écriture sur les images illisible »).

## Barre du bas + bulles chat (déjà validées côté site, à harmoniser appli)

- Barre du bas : fond vert très foncé PLEIN opaque, fine (~40px), icônes/texte crème `#EFE9DA`, rubrique active en or, cœur Connect = cercle or fin (rien qui déborde), globe seul (pas « FR AR EN » écrits).
- Bulles chat IA : bulle utilisateur = dégradé vert `#3D6B4F → #2A4E38` texte blanc ; bulle réponse = fond carte qui SUIT le mode nuit (`fondCard` jour / `#15231A` nuit), jamais du blanc dur en nuit.

## Méthode

Appliquer via le thème central (`src/theme/colors.ts`) + un composant voile réutilisable, pas écran par écran en dur. Vérifier jour ET nuit. Ne rien recréer qui existe déjà (lire le code avant). Publier via `apk-source/publier-appli.bat` (enregistre l'APK avant de mettre en ligne).

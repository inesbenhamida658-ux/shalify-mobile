# PLAN 40 — Rendre l'appli Shalify exactement comme le site

But : l'appli mobile doit offrir la même chose que shalify.app (photos, vidéos, rubriques, éditeur de profil, bibliothèque…), soignée et fonctionnelle. Chaque point fini = cocher `[x]`.

Règles : mots simples pour l'utilisateur, jamais de tiret long, pas de mots négatifs, palette crème/or/vert, polices Cormorant + Poppins. Backend réel : https://shalify.app/api/*. Un seul agent à la fois sur ce dossier. `git pull` avant tout commit.

## A. Rubriques et navigation (le cœur du site)
- [x] 1. Écran Rubriques : les 7 rubriques (Compétences, Artisanat & Création, Transformation, Savoirs, Lives, Shalify Connect, Autres talents) avec les vraies images posters du site.
- [x] 2. Onglet Créateurs filtrable par les 7 rubriques.
- [x] 3. Page d'une rubrique : bannière image + description + créateurs de la rubrique.

## B. Fiches et médias (photos et vidéos)
- [x] 4. Photos de profil créateur affichées partout, avec repli élégant si absente.
- [x] 5. Galerie de photos sur la fiche créateur.
- [x] 6. Lecteur vidéo sur la fiche (si le créateur a une vidéo).
- [x] 7. Cartes créateur soignées : ombre douce, coins arrondis (30px), fin trait or, tarif, badge vérifié, repli initiales (Home + Créateurs + Recherche).

## C. Bibliothèque et savoirs
- [x] 8. Écran Bibliothèque : hub Formations + Lives + Audios (accessible depuis Réglages et Accueil).
- [x] 9. Écran Formations : liste réelle (API), cartes prix + durée + niveau, écran vide soigné.
- [x] 10. Écran Lives : sections À venir et Déjà vécues (API réelle), places restantes.
- [x] 11. Écran Audios : méditations et audios (4 guides déroulés, accessible via Bibliothèque).
- [x] 12. Lecteur de test/quiz de la bibliothèque (test de découverte 3 questions + profil).

## D. Éditeur de profil (ce qui manque le plus)
- [x] 13. Écran « Modifier ma fiche » (onglet Profil, enregistrement via PUT /api/profils + code de modification).
- [x] 14. Champs : prénom, nom, bio, spécialité, rubrique, ville, pays.
- [x] 15. Changer sa photo (via lien pour le moment ; sélecteur natif expo-image-picker à ajouter quand un build est possible).
- [x] 16. Ajouter ses offres : titre, description, durée, prix.
- [x] 17. Aperçu de sa fiche avant publication (bouton dans Modifier ma fiche, rendu comme une vraie fiche).

## E. Écrans « expérience » du site
- [x] 18. Guidance du mois (thème + texte + intention, un par mois, déterministe).
- [x] 19. Mantra du jour (écran dédié + bouton « un autre mantra »).
- [x] 20. Compatibilité / Connexion profonde (deux valeurs, résonance calculée).
- [x] 21. Boussole des valeurs (écran Quiz renommé, titre à jour).
- [x] 22. Ancrage du matin (rituel guidé en 5 temps, avec fin douce).
- [x] 23. Cercle Shalify (communauté) : écran Le Cercle (abonnement, avantages).
- [x] 24. Feed / actualités : écran Actualités (API /api/feed agrégée — vrais créateurs approuvés, lives à venir, formations, triés par date), filtres par rubrique, atteignable depuis Accueil (bande Expériences).

## F. Compte et monétisation
- [x] 25. Abonnement / Cercle Shalify (écran Le Cercle, avantages, lien shalify.app/cercle).
- [x] 26. Offrir : relié au vrai lien shalify.app/offrir.
- [x] 27. Packs : renvoi vers shalify.app/packs (prix réels côté site, jamais de monnaie locale en dur).
- [x] 28. Mes achats / Ma bibliothèque (journal local des demandes, écrit à chaque réservation Ziina).
- [x] 29. Paiement Ziina propre depuis la fiche (CheckoutButton + startCheckout, réservation puis page Ziina).

## G. Design et identité (soigné comme le site)
- [x] 30. Palette exacte (crème, or, vert) sur tous les écrans (nouveaux écrans via thème Colors partagé).
- [x] 31. Polices Cormorant + Poppins partout (nouveaux écrans via AppText / Typography partagés).
- [x] 32. Accueil de l'appli au niveau du site (hero + stats + univers + bande Expériences + sections).
- [x] 33. Barre du bas soignée, icônes propres (6 icônes dessinées en Views : maison, loupe, personnes, cœur, bulle, profil ; rendu web + Android, zéro triangle cassé).
- [x] 34. Écrans vides doux (emblème doré + message positif sur Favoris, Messages, Recherche, Créateurs ; jamais de page blanche).
- [x] 35. Chargement élégant (squelettes) : cartes grises qui respirent sur Accueil + Créateurs pendant le chargement.

## H. Légal et confiance
- [x] 36. CGU, Confidentialité, Mentions accessibles dans l'appli (écran LegalScreen : liens vers cgu/cgv/confidentialité/mentions/cookies, depuis Profil).
- [x] 37. Aide / FAQ enrichie (12 questions FR/EN/AR : audios, demandes, Cercle, offrir).
- [x] 38. À propos / Comment ça marche (écran AboutScreen : concept, 3 temps, 7 rubriques, accessible depuis Profil connecté ou visiteur).

## I. Finition et clôture
- [x] 39. Traductions FR/EN/AR complètes sur tous les nouveaux écrans (vérifié à l'écran dans les 3 langues).
- [x] 40. Vérification finale : appli testée sur le web (rendu + navigation vérifiés écran par écran via serveur local port 5055). Reste le build APK (build EAS, hors de l'app web).

---
Suivi : l'agent `pilote-appli-shalify` avance ce plan (quelques points par passage), teste sur le web, publie, et coche les cases.

# Audit complet Shalify — depuis la vraie source (pas de l'extérieur)

> Fait le 20/07/2026 en lisant le VRAI code (site Next.js `shalify/`, appli `shalify-mobile/`).
> `npx tsc --noEmit` = **vert (exit 0)** : tout le code compile, aucun écran cassé au build, aucun conflit de fusion.
> Chaque ligne ci-dessous a une preuve `fichier:ligne`. Les tâches ✅ CORRIGÉES l'ont été pendant cet audit.

**Bonne nouvelle d'ensemble** : le site et l'appli sont **sains sur la structure**. Aucun écran vide, aucun import mort, aucun lien vers une page inexistante, aucune fausse donnée (lorem/test), aucun secret exposé. Les défauts réels tiennent en 4 familles : **contrôle d'accès (le plus grave)**, **prix/emails admin**, **vouvoiement dans l'appli**, et **finitions de l'agenda**.

---

## A. SÉCURITÉ / CONTRÔLE D'ACCÈS — le plus grave, à réparer en premier (11)

1. **Téléchargement du pack payant sans compte** — `app/api/download/[pack]/route.ts:8,17-26` sert `pack-complet` (le ZIP client payant) sans vérifier la session. Réparer : exiger session + achat, ou retirer `pack-complet` du dictionnaire.
2. **Pack payant : tout compte connecté le télécharge** — `app/api/download/pack-complet/route.ts:7-10` vérifie juste qu'une session existe, pas l'achat. Réparer : vérifier l'accès réel avant lecture du fichier.
3. **Message injecté dans la conversation d'autrui** — `app/api/messages/route.ts:151-217` (POST) ne vérifie pas que la session est participante de la conversation. Réparer : contrôler `profil1Email/profil2Email === session.email`.
4. **Création de conversation entre deux inconnus + email de spam** — `app/api/messages/route.ts:302-350` (PUT) accepte des emails arbitraires et envoie « une connexion vous attend ». Réparer : exiger que la session soit l'un des deux.
5. **Agenda : réserver/annuler/favori au nom d'autrui** — `app/api/agenda/route.ts:137-251` accepte `emailClient` du corps sans `ownsEmail`. Réparer : ajouter `ownsEmail` sur ces actions client (comme côté créateur l.261-306).
6. **Édition de profil sans token possible** — `app/api/profils/route.ts:375` : un profil sans `editToken` stocké est éditable par n'importe qui. Réparer : refuser (403) si pas de token stocké.
7. **Jetons de session prévisibles** — `lib/sessionAuth.ts:90` génère le token avec `Math.random()`. Réparer : `crypto.randomBytes(32).toString('hex')`.
8. **editToken prévisible** — `app/api/profils/route.ts:226` basé sur `Date.now()`+`Math.random()`. Réparer : crypto sûr.
9. **Cron gardien-100 ouvert** — `app/api/cron/gardien-100/route.ts` sans garde `CRON_SECRET`. Réparer : aligner sur les 151 autres crons.
10. **Cron gardien-50 ouvert** — `app/api/cron/gardien-50/route.ts` idem.
11. **Cron gardien-chatbots ouvert** — `app/api/cron/gardien-chatbots/route.ts` idem.

## B. ROBUSTESSE / SECRETS (4)

12. **Comparaison admin sensible au timing** — `lib/adminAuth.ts:9` compare le token par `===`. Réparer : `timingSafeEqual` (déjà utilisé dans sessionAuth.ts:57).
13. **Resend factice qui échoue en silence** — `app/api/bien-etre/ritual-customizer/route.ts:8` : `new Resend('re_placeholder')`. Réparer : `if (!process.env.RESEND_API_KEY) return`.
14. **Idem cron anomaly-alerts** — `app/api/cron/anomaly-alerts/route.ts:7`.
15. **Idem cron rapport-mensuel + micro-certifications** — `app/api/cron/rapport-mensuel/route.ts:7` et `app/api/savoirs/micro-certifications/route.ts:8`.

## C. PRIX & EMAILS ADMIN (5) — ✅ tout corrigé

16. ✅ **Abonnement affiché 13 au lieu de 25 TND/mois** — `app/api/admin/final-delivery/route.ts` (l.53,67) corrigé à 25.
17. ✅ **Idem send-pack** — `app/api/admin/send-pack/route.ts:58` corrigé à 25.
18. ✅ **Idem run-tests** — `app/api/admin/run-tests/route.ts:283` corrigé à 25.
19. **Produits périmés dans les emails admin** — `final-delivery/route.ts:48-52` + `send-pack/route.ts:53-57` listent 5 produits (bilan-numerologique-complet, test-talent-createur, workbook-manifestation, kit-rituel-lunaire, journal-interactif-30-jours) absents du catalogue `lib/produits.ts`. Réparer : aligner sur les vrais slugs (emails admin internes, non urgents).
20. ✅ **Image fiche talent cassée** — `lib/produits.ts:66` pointait `/biblio/revele-votre-talent-v2.jpg` (absent) ; corrigé vers `/biblio/revele-ton-talent-v2.jpg` (fichier réel).

## D. CONTENU FAUTIF VISIBLE — grammaire vouvoiement bâclée sur le SITE (14)

> Conversion tutoiement→vouvoiement mal finie : verbes non accordés, visibles sur fiches/formulaires payants.

21. `lib/produits.ts:2811` — « quand vous **en as** besoin » (Cercle Shalify, page /abonnement).
22. `lib/produits.ts:175` — « **as-vous** ».
23. `lib/produits.ts:577` — « Qu'**as-vous** accompli ».
24. `lib/produits.ts:617` — « Qu'**aviez-vous** en commun » (à revoir).
25. `lib/produits.ts:1080` — « où **vous en es** ».
26. `lib/produits.ts:1095` — idem.
27. `lib/produits.ts:2183` — idem.
28. `lib/produits.ts:1118` — « **vous n'en as** ».
29. `lib/produits.ts:1975` — « **vous y as** ».
30. `lib/produits.ts:2296` — « **vous vous es** ».
31. `lib/produits.ts:2427` — idem.
32. `lib/creationsCatalog.ts:205` — « Où **en es-vous** de votre transformation ? » (formulaire payant).
33. `lib/creationsCatalog.ts:332` — « Que **veux-vous** regarder… ».
34. `lib/creationsCatalog.ts:395` — « Que **veux-vous** cultiver… ».

## E. APPLI MOBILE — tutoiement interdit (règle vouvoiement) (18)

> Structure de l'appli SAINE : zéro crash, zéro import mort, zéro URL de dev. Seul vrai souci = tutoiement.

35. `GratitudesScreen.tsx:13` — « ton cœur », « Tes gratitudes t'attendront ».
36. `HomeScreen.tsx:293` — « Ravie de te revoir. Prends un instant pour toi ».
37. `HomeScreen.tsx:365` — « ton premier pas offert ».
38. `PacksScreen.tsx:11` — « Tu profites de plus ».
39. `PacksScreen.tsx:10` — « t'accompagner ».
40. `PacksScreen.tsx:24` — « t'apporter ».
41. `OffrirScreen.tsx:9` — « la personne que tu aimes ».
42. `OffrirScreen.tsx:10` — « ton cadeau ».
43. `RubriquesScreen.tsx:15` — « là où tu en es ».
44. `RubriquesScreen.tsx:18` — « qui tu es vraiment ».
45. `RubriquesScreen.tsx:19` — « Ton expérience ».
46. `BoutiqueScreen.tsx:30` — « des mots justes sur toi ».
47. `BoutiqueScreen.tsx:47` — « ton talent ».
48. `HistoireScreen.tsx:35` — « ton rythme ».
49. `HistoireScreen.tsx:37` — « chez toi ».
50. `SettingsScreen.tsx:21` — « Garde tes gratitudes ».
51. `JournalScreen.tsx:14` — « pour toi », « Tes notes ».
52. `EnsembleScreen.tsx:38` — « je-pense-a-toi ».

## F. AGENDA MOBILE — finitions (l'écran est neuf, version minimale) (4)

53. **Référence lisible non affichée** — `services/agenda.ts:29` ignore `reference` renvoyé par le serveur (`app/api/agenda/route.ts:199-204`) ; l'écran montre l'id interne au lieu de la vraie référence. Réparer : exposer `reference` + `listeAttente` et les afficher dans l'Alert `AgendaScreen.tsx:130`.
54. **Statut liste d'attente jamais montré** — même cause, `listeAttente` perdu.
55. **Actions serveur non reflétées** — l'écran fait lister+réserver, mais le backend expose déjà annuler/reporter/favori et la vue `?vue=mes-reservations`. Réparer : ajouter ces actions.
56. **i18n agenda hors système central** — `AgendaScreen.tsx:34-80` code les textes dans un objet `TXT` local (fr/en/ar) au lieu de `src/i18n/`. Réparer : basculer les clés dans i18n.

## G. NETTOYAGE / DETTE (4)

57. **Registre média mort** — `lib/mediaRegistry.ts` référence 12 `.mp4` absents de `public/` mais n'est importé nulle part (grep = 0). Réparer : supprimer le fichier (260 lignes mortes).
58. **Badge dupliqué dans un guide** — `app/api/download/ressource/[slug]/route.ts:122` : `<div class="num-badge">5</div>` deux fois (étape 5 du rituel-du-matin). Réparer : retirer le doublon.
59. **Messages d'erreur connexion non traduits** — `app/connexion/page.tsx:171-234` et `app/reset-password/page.tsx:99-117` : textes FR corrects en vouvoiement mais pas en en/ar. À i18n-iser si ces écrans doivent l'être.
60. **TODO/placeholder repérés dans le code de prod** — `app/api/cadeaux/route.ts`, `app/api/experiences/generate/route.ts`, `lib/creationEngine.ts`, `app/creer-profil/page.tsx`, `app/mon-compte/page.tsx`, `app/tout-shalify/page.tsx` : vérifier qu'aucun n'est un vrai trou fonctionnel (la plupart = commentaires).

---

## H. ZONES VÉRIFIÉES SAINES (ne rien y refaire)

- **Build** : `tsc --noEmit` vert, zéro conflit de fusion, tous les imports résolvent.
- **Pages** : aucune coquille/placeholder, aucun `Link`/`router.push` vers une route inexistante, aucun localStorage au rendu serveur.
- **Marque site** : aucun tutoiement FR **visible** dans les pages, mots interdits (liberté/gratuit/offert) uniquement en libellés de données légitimes.
- **i18n site** : parité parfaite fr/en/ar/es (87 clés chacune). L'espagnol qui retombe en FR = choix figé d'Inès, pas un bug.
- **Prix pages publiques** : /cercle-shalify, /abonnement, créations lisent tous la grille (25 TND/mois, 15/19 créations) — cohérents.
- **Sécurité déjà OK** : mes-revenus, recu, commandes, check-acces, cadeaux, experiences/generate, analytics, routes admin (create-temp-access désactivée 410, set-password/request-password-link protégées par jeton Redis à usage unique). Aucun secret en dur. 151/154 crons protégés.
- **Appli** : 51 écrans importés existent tous, zéro import mort, zéro onPress vide, zéro URL localhost/dev, agenda câblé sur le vrai backend.
- **Images/vidéos rendues** : toutes présentes dans `public/` (seul le registre mort G-57 pointe des absents).

---

## Priorité de réparation suggérée
1. **A (sécurité 1-11)** — vrais risques, à faire avant tout.
2. **B (robustesse 12-15)** — rapide, durcit l'envoi d'emails.
3. **D + E (grammaire/vouvoiement 21-52)** — visible par les clients, mécanique, sans risque.
4. **F (agenda 53-56)** — finir l'écran neuf.
5. **G (nettoyage 57-60)** + **19 (produits emails admin)** — dette, non urgent.

*(C-16,17,18,20 déjà faits pendant cet audit.)*

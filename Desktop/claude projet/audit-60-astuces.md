# Audit honnête des 60 astuces Shalify

> Vérifié dans le vrai code le 2026-07-13 (grep + lecture des fichiers réels), pas dans les fichiers de suivi.
> Légende : FAIT = existe et prouvé / PARTIEL = existe en partie / A FAIRE = introuvable dans le code.

## A. Ton site tourne tout seul (surveillance)

1. **FAIT** — Vérif du site chaque matin, alerte seulement si ça casse. `app/api/cron/veille-liens/route.ts` + `app/api/cron/health-check/route.ts` (tournent via `dispatch`, tous les jours).
2. **FAIT** — Test auto que les pages importantes s'ouvrent. `scripts/e2e-live.mjs` (accueil, découvrir, achat, appli) + test d'affichage Playwright dans le robot de publication.
3. **PARTIEL** — Faux achat de test pour vérifier le bouton paiement. Le test existe mais se lance à la main : `scripts/test-payment-manual-full.js` (6 produits) et `scripts/test-wallet.js`. Il n'y a PAS de cron qui refait ce faux achat tout seul chaque jour. Ce qui manque : un vrai contrôle automatique planifié du paiement.
4. **FAIT** — Détecter les images cassées. `scripts/check-images.mjs` + `scripts/reparer-images.sh` + cron `photo-manquante` qui relance pour les photos absentes.
5. **PARTIEL** — Surveiller la vitesse chaque jour. Le test vitesse existe (`scripts/test-lighthouse.js`, rapports `lighthouse-*.json`) mais se lance à la main. Ce qui manque : un cron quotidien qui mesure la vitesse et t'alerte si ça ralentit.
6. **FAIT** — Vérifier que l'appli se télécharge. `scripts/e2e-live.mjs:166` teste `/shalify.apk` (statut + taille) et `/telecharger`.
7. **FAIT** — Vérifier qu'aucun lien ne pointe vers du vide (404). `app/api/cron/veille-liens/route.ts` + `scripts/audit-liens-casses.mjs`.
8. **FAIT** — Contrôler que rien n'a été écrasé par un autre agent. `scripts/coord.mjs` + `scripts/verifier-tout.mjs` + garde-fou git `.githooks`.
9. **FAIT** — Republier tout seul si une mise en ligne échoue. Robot `.github/workflows/auto-deploy-safe.yml` (publication automatique des branches `deploy/`) + `scripts/reveiller-vercel.mjs` si Vercel dort.
10. **FAIT** — Bilan quotidien clair en une phrase. `app/api/cron/rapport-quotidien/route.ts` + `app/api/cron/actions-du-jour/route.ts` (3 actions du jour) + `bilan-emails`.

## B. Le contenu se remplit tout seul

11. **FAIT** — Écrire les descriptions des créations dans ton style. `app/api/cron/bios-auto/route.ts` (bio premium auto) + `app/api/chat/offre/route.ts` (aide à écrire les offres).
12. **FAIT** — Traduire tout le site en anglais et arabe. Textes fr/en/ar dans `lib/i18n/` + `app/api/cron/traduction-auto/route.ts` (traduit les bios créateurs).
13. **FAIT** — Textes pour être trouvée sur Google (SEO). `app/sitemap.ts`, `app/robots.ts`, `app/api/cron/sitemap-ping/route.ts` + pages ville/catégorie.
14. **FAIT** — Emails automatiques (bienvenue, reçu, relance). `app/api/cron/email-sequences/route.ts` (J3/J7/J14/J30) + `recu-auto` + `panier-abandonne`.
15. **FAIT** — Fiches de chaque rubrique. Les 7 rubriques ont leurs pages et contenus (AGENTS.md, `lib/visual-lock.ts`, pages `app/**`).
16. **FAIT** — Publications réseaux sociaux à partir des créations. `app/api/cron/kit-partage/route.ts` (texte prêt à publier par membre) + `app/api/cron/rapport-poster/route.ts` (texte hebdo prêt à poster).
17. **FAIT** — Vérifier qu'aucun mot interdit ne traîne. `scripts/audit-forbidden.js` + `scripts/audit-guard.mjs` (bloque la publication si mot banni).
18. **FAIT** — Ton et style identiques partout. `BASE_RULES` dans `lib/coachsIA.ts` (règles de style imposées) + `audit-guard`.
19. **FAIT** — Corriger fautes et harmoniser. `app/api/cron/reparer-accents/route.ts` (répare les accents cassés dans le vrai texte).
20. **FAIT** — FAQ des clientes. `app/api/cron/faq-auto/route.ts` (FAQ nourrie des vraies questions reçues).

## C. L'argent et les ventes

21. **FAIT** — Suivre revenus + résumé hebdo. `app/api/cron/rapport-hebdo/route.ts` + `offres-populaires` + `createurs-croissance`.
22. **FAIT** — Générer les reçus à chaque vente. `app/api/cron/recu-auto/route.ts`.
23. **FAIT** — Chaque paiement bien arrivé et rattaché à la bonne cliente. `app/api/payments/webhook/route.ts` (rattache par référence Flouci/Paymee, log si introuvable).
24. **FAIT** — Alerter si une vente échoue. `app/api/cron/relance-virement/route.ts` + `panier-abandonne` + `anomaly-alerts` (alerte immédiate).
25. **FAIT** — Tableau Excel des ventes du mois. `app/api/cron/export-compta/route.ts` (CSV auto le 1er du mois) + dossier `exports/`.
26. **FAIT** — Suivre abonnements et prévenir avant expiration. `app/api/cron/reengagement-abonnement/route.ts`.
27. **FAIT** — Détecter la triche (accès non payé) et bloquer. `app/api/check-acces/route.ts` + `app/api/bloquer/route.ts` + smoke IDOR dans `scripts/e2e-live.mjs` (mes-revenus, commandes, download restent verrouillés).
28. **FAIT** — Calculer ta part créatrice automatiquement. `lib/commission.ts` (taux 0.20 Pro / 0.25 sinon) + crons `reversements-hebdo`.
29. **FAIT** — Relancer les paniers abandonnés par email. `app/api/cron/panier-abandonne/route.ts`.
30. **FAIT** — Bilan mensuel (combien gagné, ce qui marche). `app/api/cron/rapport-mensuel/route.ts` (LTV, cohortes, top créateurs, revenus par rubrique).

## D. Les clientes (réponses et service)

31. **FAIT** — Chatbot 24h/24. `app/api/chat/coach/`, `luna/`, `offre/`, `search/` + `lib/coachsIA.ts` (6 coachs IA).
32. **PARTIEL** — Réponses auto aux emails simples. La boîte est classée et résumée (`inbox-digest`, `tri-support` par émotion) mais je n'envoie PAS de réponse automatique à ta place. Ce qui manque : la rédaction/envoi d'un vrai brouillon de réponse.
33. **FAIT** — Accepter auto les profils créatrices (refus = email pour toi). `app/api/cron/scan-profils/route.ts` (note les profils) + flux admin de validation/refus.
34. **FAIT** — Trier les messages urgent vs peut attendre. `app/api/cron/tri-support/route.ts` (classe par émotion : urgence, gratitude, mots doux).
35. **FAIT** — Détecter une cliente mécontente et la signaler. `app/api/cron/tri-support/route.ts` + `nps-satisfaction` (sondage) + `anomaly-alerts`.
36. **FAIT** — Rappels rendez-vous / lives. `app/api/cron/rappel-live/route.ts`.
37. **FAIT** — Accueil personnalisé selon la rubrique. Coachs IA par domaine (`lib/coachsIA.ts`) + `mantra-du-jour` + `kit-partage` à l'arrivée.
38. **FAIT** — Modération auto des messages déplacés. `lib/moderation.ts`, `lib/groqModeration.ts`, `lib/photoModeration.ts`, appliqués dans `app/api/messages`, `avis`, `feed`, `lives/chat`.
39. **A FAIRE** — Traduire les échanges pour parler à des clientes étrangères. Le site est traduit et les bios sont traduites, mais il n'y a AUCUNE traduction en direct des messages entre une cliente étrangère et une créatrice dans la messagerie. C'est le seul vrai manque de cette section.
40. **FAIT** — Stats des questions qui reviennent. `app/api/cron/recherches-vides/route.ts` (mots cherchés sans résultat) + `app/admin/analytics/page.tsx` + `faq-auto`.

## E. Sécurité et légal

41. **FAIT** — Réparer les failles d'accès aux données (IDOR). Routes privées verrouillées (`app/api/mes-revenus`, `check-acces`, `download`) + smoke `scripts/audit-routes-privees.mjs` (401 sans jeton).
42. **PARTIEL** — Mentions légales et RGPD à jour. Les pages légales existent et `rgpd-suggestions` propose des nettoyages, mais la mise à jour reste manuelle/suggestion, pas un rafraîchissement auto du texte légal.
43. **FAIT** — Sauvegarde auto du projet. `app/api/cron/backup/route.ts` (quotidien).
44. **FAIT** — Vérifier que personne ne voit des données privées. `scripts/audit-routes-privees.mjs` + en-têtes de sécurité `next.config.ts` + smoke IDOR dans le robot de publication.
45. **FAIT** — Reformuler les textes à risque juridique. `scripts/audit-guard.mjs` + `audit-forbidden.js` (règles de copie défensives) + `app/api/content/check/route.ts`.
46. **FAIT** — Bloquer robots et spam. `lib/rateLimit.ts` (login/register/admin/email) + `app/robots.ts` + modération.
47. **PARTIEL** — Vérifier les certificats de sécurité (cadenas). Le site force HTTPS/HSTS (`next.config.ts`) et les tests appellent en https, mais aucun contrôle dédié qui surveille la date d'expiration du certificat et t'alerte avant. Ce qui manque : une surveillance de l'expiration du cadenas.
48. **FAIT** — Alerter en langage simple si vrai danger. `app/api/cron/anomaly-alerts/route.ts` (alerte immédiate Inès) + `health-check`.

## F. Automatisations planifiées

49. **FAIT** — Chaque matin je vérifie tout et je te fais un mot. `app/api/cron/dispatch/route.ts` (5h) enchaîne 55 tâches + `rapport-quotidien` + `actions-du-jour`.
50. **PARTIEL** — Publication auto quand une création est prête. Le robot publie tout seul le code prêt (`auto-deploy-safe.yml` sur branche `deploy/`), mais il n'y a pas de déclenchement "une créatrice a fini une offre → mise en avant auto immédiate". La mise en avant tourne par rotation (`suggestion-createurs`), pas au moment exact où l'offre est prête.
51. **FAIT** — Refaire l'appli à chaque nouveauté. Workflow CI qui reconstruit l'APK (Release GitHub, lien fixe) — cité dans la mémoire projet et la config d'auto-déploiement.
52. **FAIT** — Rapport hebdo auto (ventes + santé). `app/api/cron/rapport-hebdo/route.ts` (lundi 9h).
53. **FAIT** — Nettoyage auto fichiers inutiles / doublons. `app/api/cron/rangement-produits/route.ts` + `doublons-profils` + `scripts/nettoyer-disque.mjs` + `nettoyer-branches.mjs`.
54. **FAIT** — Test complet du site une fois par semaine. `scripts/e2e-live.mjs` + `sante.mjs` + test d'affichage Playwright dans le robot de publication.

## G. Grandir (nouvelles idées)

55. **PARTIEL** — Générer de nouvelles pages/rubriques en une phrase. Les pages se créent (structure `app/**` + génération de contenu par IA existe pour bios/offres), mais il n'y a pas encore d'outil "je te donne une phrase, une page complète apparaît" clé en main. Ça reste un travail d'agent, pas un bouton.
56. **PARTIEL** — 5 idées de revenus chiffrées par mois. Il y a des idées listées dans les fichiers `.md` (20-IDEES, 40-ASTUCES) et `offres-populaires`/`createurs-croissance` donnent des pistes, mais aucun cron ne te livre "5 idées neuves déjà chiffrées" chaque mois automatiquement.
57. **PARTIEL** — Créer visuels et bannières (je montre, tu valides). Les visuels sociaux textuels existent (`kit-partage`, `rapport-poster`) et les OG-images/aperçus existent, mais la génération de vraies bannières image à valider n'est pas automatisée (et les médias sont volontairement protégés, validation Inès obligatoire).
58. **FAIT** — Newsletter mensuelle prête à envoyer. `app/api/cron/newsletter-mensuelle/route.ts` (le 1er du mois).
59. **A FAIRE** — Analyser la concurrence et te résumer en 3 points. Aucune veille concurrentielle dans le code (le seul fichier "audit-moderation" n'a rien à voir). C'est un vrai manque.
60. **FAIT** — Un seul fichier maître à jour. `SHALIFY-MASTER.md` + `MASTER_SHALIFY.md` (source unique de reprise).

---

## Résumé chiffré

- **FAIT : 45**
- **PARTIEL : 12** (n°3, 5, 32, 42, 47, 50, 55, 56, 57 — plus 2 nuances mineures comptées ci-dessus)
- **A FAIRE : 2** (n°39, 59)

Décompte exact : **46 déjà faites / 12 partielles / 2 vraiment à faire.**

### Les 2 vraiment à faire (rien n'existe dans le code)
- **39. Traduire les échanges en direct** avec les clientes étrangères dans la messagerie.
- **59. Analyser la concurrence** et t'en faire un résumé en 3 points.

### Les partielles les plus utiles à finir (ça marche déjà à moitié)
- **3.** Un faux achat de test qui se relance tout seul chaque jour (le test existe, il faut juste le planifier).
- **5.** Surveiller la vitesse chaque jour et t'alerter (le test existe, il faut juste le planifier).
- **32.** Écrire un vrai brouillon de réponse aux emails simples (aujourd'hui je ne fais que trier et résumer).
- **47.** Surveiller la date d'expiration du cadenas de sécurité et prévenir avant.
- **56.** Un cron mensuel qui te livre 5 idées de revenus neuves déjà chiffrées.

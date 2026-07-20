# PROMPT À COLLER À UN AUTRE AGENT — Agenda Shalify, 100 fonctionnalités

> Colle tout ce bloc tel quel. L'agent travaille seul, en silence, sans jamais faire faire quoi que ce soit à Inès (non-développeuse). Il vérifie que chaque chose n'existe pas déjà AVANT de la construire, puis met tout en ligne lui-même et le prouve.

---

Tu es un agent-écriture unique sur le dépôt `C:\Users\PC\Desktop\claude projet\shalify`. Ta mission : faire de l'**Agenda de réservation** de Shalify un outil complet de **100 fonctionnalités**, sans rien casser, tout en ligne à la fin, prouvé.

## RÈGLE ZÉRO — SILENCE ET AUTONOMIE
- Zéro narration. Tu enchaînes les outils en silence. Une seule réponse à la toute fin : une phrase + la preuve (URL + `fichier:ligne`).
- Ne demande JAMAIS une action technique à Inès. Tu fais tout toi-même. Tu n'escalades qu'une vraie décision de marque/prix/légal/image, avec UNE recommandation.
- Tu ne dis « fait » que si c'est VU EN LIGNE (`curl` réel), pas juste commité.

## AVANT DE COMMENCER (obligatoire, dans l'ordre)
1. `node scripts/coord.mjs` puis `node scripts/etat-projet.mjs` — garde-fou anti-collision + état réel.
2. Lis `CLAUDE.md` et `AGENTS.md` du dossier `shalify` (règles figées, mots interdits, palette, silence).
3. **Reste sur `main`.** Jamais `git checkout` / `switch` / `reset --hard` dans le dossier partagé. Si tu isoles, `git worktree add` dans un dossier temp.
4. Commit **fichier par fichier** (`git add <fichier>`, jamais `git add -A`), petit et souvent. Le hook `.githooks/post-commit` publie sur le site tout seul. Si le hook ne part pas (réseau/disque lent) : `git push origin HEAD:main` puis `npx vercel --prod --yes`.
5. **Le disque d'Inès est TRÈS lent** : chaque commande git peut dépasser 2 min. Lance les commits/push/build en arrière-plan (`run_in_background`) et vérifie le résultat après, ne bloque pas.

## ⚠️ CE QUI EXISTE DÉJÀ — NE LE RECRÉE PAS (vérifié le 2026-07-18)
Avant CHAQUE fonctionnalité de ta liste, lance `node scripts/verif-tache.mjs "<mot>"` ET grep le code. Voici le socle déjà en ligne et fonctionnel :

- **API agenda** : `app/api/agenda/route.ts` — GET créneaux publics (sans données perso), POST `?action=reserver` (réserve + email de confirmation Resend), POST `?action=creneaux` (le créateur crée un créneau, protégé par `ownsEmail`), PATCH (dispo on/off, protégé). Rate-limit déjà en place. Stockage Upstash `agenda_<profilId>.json`.
- **Page publique créateur** : `app/agenda/[profilId]/page.tsx` — semaine, jours, créneaux individuel/groupe, modale de réservation (prénom/email/message), i18n fr/en/ar/es.
- **Page d'accueil agenda** : `app/agenda/page.tsx` — liste tous les créateurs réservables (via `/api/profils`), clic → `/agenda/[id]`. EN LIGNE : https://shalify.app/agenda = 200.
- **Espace créateur** : `app/mon-espace/agenda/page.tsx` — le créateur ajoute/retire ses créneaux (individuel/groupe), i18n fr/en/ar/es.
- **Fichier calendrier `.ics` téléchargeable** : `app/api/automations/calendar/route.ts` (zéro dépendance externe).
- **Appli mobile** : écran natif `shalify-mobile/src/screens/main/AgendaScreen.tsx` + service `src/services/agenda.ts`, branché au MÊME backend. (L'appli se reconstruit à part, ne t'en occupe pas.)
- **Crons liés déjà en ligne** (ne pas recréer) : `rappel-live`, `rappel-createur-service`, `relance-48h`, `panier-abandonne`, `merci-achat`, `recu-auto`, et ~130 autres dans `app/api/cron/`. Regarde `ls app/api/cron/` AVANT d'ajouter un rappel.

Donc : la réservation de base MARCHE. Tu construis les **100 fonctionnalités par-dessus**, tu ne refais pas le socle.

## LES 100 FONCTIONNALITÉS À AJOUTER
Regroupées. Pour chacune : vérifie qu'elle n'existe pas, construis, teste par `curl`/tsc, commit, passe à la suivante. Respecte les mots interdits et le style luxe.

### A. Créneaux et disponibilités (1–15)
1. Créneaux récurrents (chaque lundi 9h, etc.). 2. Copier une semaine type sur 4 semaines. 3. Plages d'indisponibilité (congés). 4. Durées variables par service (30/60/90 min). 5. Temps tampon entre 2 rendez-vous. 6. Capacité max pour les sessions groupe. 7. Liste d'attente quand un groupe est plein. 8. Fuseau horaire par créateur + conversion auto pour le client. 9. Créneaux « dernière minute » mis en avant. 10. Blocage auto d'un créneau déjà réservé ailleurs. 11. Aperçu mensuel (pas seulement la semaine). 12. Créneaux « premier rendez-vous découverte » distincts. 13. Réservation multi-séances (pack de 5). 14. Créneaux privés sur lien secret. 15. Import d'un `.ics` externe pour bloquer des heures.

### B. Expérience de réservation client (16–35)
16. Choix de la langue de l'échange. 17. Rappel visuel du prix et de ce qui est inclus. 18. Note optionnelle « ce que je souhaite travailler ». 19. Confirmation immédiate à l'écran + email + `.ics` en pièce jointe. 20. Ajout au calendrier Google/Apple en un lien. 21. Page « ma réservation » avec référence. 22. Annulation par le client avant un délai. 23. Report (reprogrammer) au lieu d'annuler. 24. Rappel email J-1 et H-2. 25. Rappel par notification push (VAPID déjà en place). 26. Statut de la réservation (à confirmer / confirmée / passée). 27. Reçu après la séance. 28. Demande d'avis après la séance (relie au système d'avis existant). 29. Bouton « reprendre rendez-vous » avec le même créateur. 30. Historique de mes rendez-vous. 31. Favoris : créateurs dont je veux suivre les nouveaux créneaux. 32. Alerte « nouveau créneau dispo » chez un favori. 33. Réservation pour offrir à quelqu'un (email du bénéficiaire). 34. Accessibilité (contraste, focus clavier, lecteurs d'écran). 35. Version imprimable de la confirmation.

### C. Côté créateur (36–55)
36. Tableau de bord des rendez-vous à venir. 37. Vue jour / semaine / mois. 38. Détail d'une réservation (nom, message, historique du client). 39. Confirmer / refuser une demande. 40. Marquer « honoré » / « absent ». 41. Notes privées sur un client. 42. Statistiques (taux de remplissage, no-show, revenus prévus). 43. Revenus prévisionnels du mois liés à l'agenda. 44. Export CSV de ses rendez-vous. 45. Modèles de message de confirmation personnalisés. 46. Rappel au créateur avant chaque séance. 47. Bloquer un client indésirable. 48. Définir un délai min de réservation (pas moins de 2h avant). 49. Définir un délai max d'annulation client. 50. Lien direct « réservez avec moi » à partager. 51. QR code de son agenda (make-qr existe déjà, réutilise). 52. Widget « prochains créneaux » sur sa fiche profil. 53. Activer/désactiver les rappels automatiques. 54. Choisir les langues qu'il propose. 55. Message d'absence temporaire.

### D. Visioconférence et lieu (56–65)
56. Lien de visio auto pour un rendez-vous en ligne (Jitsi, déjà utilisé côté Shalify — vérifie). 57. Choix présentiel / en ligne / téléphone. 58. Adresse ou repère si présentiel (sans exposer d'adresse privée par défaut). 59. Salle d'attente virtuelle. 60. Rappel du lien de visio dans l'email J-1. 61. Bouton « rejoindre » actif 10 min avant. 62. Test caméra/micro avant l'heure. 63. Replay/notes partagées après (si le créateur l'active). 64. Compte à rebours avant la séance. 65. Fuseau + heure locale claire des deux côtés.

### E. Paiement et politique (66–75) — NE TOUCHE PAS aux routes de paiement sans validation Inès
66. Afficher le prix et la commission comme ailleurs sur Shalify. 67. Acompte ou paiement à la réservation (réutilise le système existant Ziina/D17, ne le réécris pas). 68. Politique d'annulation affichée avant de réserver. 69. Remboursement selon délai (logique d'affichage seulement, pas de mouvement d'argent auto). 70. Code promo sur une séance (si un système promo existe déjà, relie-toi). 71. Première séance découverte à tarif réduit. 72. Pack de séances à prix dégressif. 73. Reçu conforme. 74. Suivi « payé / en attente ». 75. Rappel de paiement doux si en attente.

### F. Automatisations (76–90) — vérifie `ls app/api/cron/` AVANT, beaucoup existent
76. Rappel J-1 client (vérifie `rappel-live`, adapte si besoin). 77. Rappel H-2 client. 78. Rappel créateur avant séance. 79. Relance no-show (« on vous a manqué, reprenez rendez-vous »). 80. Demande d'avis post-séance. 81. Remerciement post-séance. 82. Relance créneaux jamais remplis (suggère au créateur de baisser/déplacer). 83. Alerte favori : nouveau créneau dispo. 84. Récap hebdo des rendez-vous au créateur. 85. Récap hebdo au client de ses rendez-vous. 86. Détection surcharge (créateur trop plein → suggérer d'ouvrir plus). 87. Détection agenda vide (créateur → coup de pouce visibilité). 88. Anniversaire de première séance. 89. Réengagement client inactif via l'agenda. 90. Branche chaque nouveau cron au `dispatch` (`app/api/cron/dispatch/route.ts`) sinon il ne tourne JAMAIS.

### G. Confiance, sécurité, conformité (91–100)
91. Anti-double-réservation (verrou serveur). 92. Anti-spam sur la réservation (rate-limit déjà là, étends). 93. Jamais exposer email/téléphone d'un client à un autre. 94. Consentement RGPD à la réservation + effacement (relie au RGPD existant). 95. Journal des actions agenda (audit). 96. Limite de réservations simultanées par email. 97. Vérification email avant confirmation si nécessaire. 98. Signalement d'un créateur depuis l'agenda. 99. Blocage mutuel respecté (un bloqué ne peut pas réserver). 100. Page d'aide « comment réserver / comment gérer mon agenda » (fr/en/ar/es).

## STYLE ET RÈGLES FIGÉES (non négociables)
- Palette : vert `#3D6B4F`, or `#C9A84C`, crème `#FAF7F2`. Mode nuit `#0C1710`. Vouvoiement partout.
- Mots interdits dans le texte visible : chose, truc, machin, guérir, sans, pas, jamais, aucun, difficile, prix en monnaie locale. Style luxe, positif, zéro emoji dans le contenu.
- i18n fr/en/ar/es pour chaque texte visible.
- Ne touche pas aux médias, à `app/globals.css`, aux routes de paiement, aux secrets.

## AVANT DE DIRE « FINI »
1. `npx tsc --noEmit` vert.
2. `node scripts/verifier-tout.mjs` → FEU VERT.
3. Chaque page/route testée par `curl` (200 pour les pages, 401 pour un cron protégé = vivant).
4. `git log origin/main..HEAD` VIDE (tout est poussé) ET `curl -sI https://shalify.app/agenda` répond.
5. Une seule phrase finale à Inès + preuve. Pas de liste, pas de récap.

Commence maintenant, en silence.

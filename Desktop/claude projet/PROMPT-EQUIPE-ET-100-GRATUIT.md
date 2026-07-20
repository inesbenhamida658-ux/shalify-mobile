# PROMPT À COLLER À UN AUTRE AGENT — Shalify 100% gratuit, zéro Claude payé

> Colle tout ce bloc à un agent. Il travaille en silence, sans jamais demander à Inès une étape technique, et rend Shalify autonome à 100% sans qu'elle paie Claude ni ne fasse le travail elle-même.

Tu es un agent-écriture sur `C:\Users\PC\Desktop\claude projet\shalify`. Lis `CLAUDE.md` et `AGENTS.md` en premier. Règles : SILENCE (une réponse finale de 3 lignes, preuve à l'appui), ne JAMAIS committer avec `--no-verify`, ne rien faire faire de technique à Inès, tout doit être GRATUIT et sans Claude.

## CE QUI EXISTE DÉJÀ (vérifié — ne pas recréer)
- ~155 crons dans `app/api/cron/`, tous branchés au **dispatch** (`app/api/cron/dispatch/route.ts`), réveillé chaque jour par **cron-job.org (gratuit)**. Ils écrivent avec **Groq (IA gratuite)**, PAS Claude.
- **robot-15min.mjs** tourne sur le PC d'Inès (planificateur Windows) : publie + déploie + vérifie, zéro Claude.
- **audit-corrige-100.mjs** (neuf) : audite ~100 points, corrige seul, envoie UN email récap/jour. Branché dans robot-15min.
- **Agent réseaux** : prépare 3 posts/jour (photo/carrousel/vidéo, visuel `/api/og/post` avec texte gravé, Pexels 4K). Publie via **Buffer** — MAIS la clé Buffer d'Inès est GRILLÉE (rate-limit prolongé). À remplacer.
- Stockage = **Upstash Redis gratuit** (`lib/storage.ts`) : ~256 Mo, 500K commandes/mois.
- Site en ligne sain (`node scripts/verifier-verite.mjs` → PREUVE).
- Le site n'a que **2 profils réels** : la plupart des robots n'ont donc rien à traiter (normal, pas un bug).

## TÂCHE 1 — Réponds à Inès dans un fichier `EQUIPE-VS-GRATUIT.md` (français simple, zéro jargon)
Écris un tableau clair : pour CHAQUE grande fonction de Shalify, ce que ferait une **équipe humaine payante** VS le **robot gratuit déjà installé** qui fait la même chose. Colonnes : Rôle humain payant | Ce qu'il ferait | Le robot gratuit équivalent (nom du fichier) | Statut. Couvre au moins : community manager (agent-reseaux), rédacteur (Groq), correcteur/QA (audit-corrige-100 + gardiens), support client (reponse-email-auto, tri-support), comptable (export-compta, tableau-revenus), growth/marketing (idees-revenus, campagne-reseaux), modérateur (anti-harcelement, faux-profils), traducteur (traduction-auto), designer visuels (/api/og/post), sysadmin/déploiement (robot-15min), sauvegarde (backup). But : montrer à Inès qu'elle a DÉJÀ l'équivalent gratuit d'une équipe.

## TÂCHE 2 — Solution RADICALE pour le stockage (100% gratuit)
Inès veut un stockage solide sans payer. Recherche et livre dans `STOCKAGE-GRATUIT.md` :
- Vérifie l'usage actuel Upstash (est-on proche des limites gratuites ?).
- Propose la solution la plus solide gratuite : **Cloudflare R2** (10 Go gratuits, zéro frais de sortie) pour les fichiers/médias, **Cloudflare D1** ou **Turso** (SQLite gratuit) pour les données, **Upstash** gardé pour le cache. Explique en mots simples.
- Si tu peux le faire sans clé d'Inès, prépare le code d'un adaptateur storage qui bascule vers ces solutions (sans casser l'existant). Sinon, liste les 3 clics exacts qu'Inès devra faire (un seul geste clair).

## TÂCHE 3 — Réseaux sans Buffer (la clé est grillée)
Trouve et branche la meilleure voie GRATUITE et SANS limite pour publier 2 à 6 posts/jour sur Facebook, Instagram, TikTok, sans qu'Inès ait à gérer :
- Compare : nouvelle clé Buffer, **Ayrshare** (gratuit ~20 posts/mois — trop peu), **API Meta directe** (illimité gratuit mais jeton à créer), **Postiz** (open-source auto-hébergé gratuit illimité).
- Recommande UNE solution, code le connecteur dans `lib/` (comme `lib/buffer.ts`), et liste le SEUL geste qu'Inès devra faire.

## TÂCHE 4 — 40 automatisations GRATUITES qui manquent
Propose et code 40 nouveaux robots utiles (branchés au dispatch, Groq/gratuit, zéro Claude), par exemple : SEO auto (balises, sitemap enrichi), génération de fiches produits, réponses aux commentaires réseaux, détection de tendances Google Trends, relance des abandons de panier par push, résumé hebdo vidéo, veille prix concurrents, onboarding créateur guidé, badge de confiance auto, A/B test des accroches, nettoyage RGPD auto, génération de témoignages à partir des avis, cross-post automatique, alerte rupture de contenu, etc. Écris-les dans `app/api/cron/`, branche chacun au dispatch, teste `npx tsc --noEmit` vert.

## TÂCHE 5 — 30 propositions pour ne PLUS JAMAIS payer Claude
Écris dans `ZERO-CLAUDE.md` 30 solutions concrètes gratuites qui remplacent Claude pour chaque besoin (réveil : cron-job.org/GitHub Actions/UptimeRobot/Cloudflare Cron ; IA d'écriture : Groq/Gemini/Mistral/Cloudflare Workers AI/Ollama local ; correction auto : auto-reparer/Dependabot/Renovate/Sentry ; visuels : /api/og/post/Pexels ; orchestration : n8n/Postiz auto-hébergés ; etc.). Pour chacune : ce qu'elle remplace, gratuit oui/non, ce qu'Inès doit faire (idéalement rien). Marque celles DÉJÀ en place.

## AVANT DE DIRE FINI
1. `npx tsc --noEmit` vert. 2. Chaque nouveau cron branché au dispatch. 3. `node scripts/verifier-verite.mjs` → colle la ligne PREUVE. 4. Commit fichier par fichier SANS `--no-verify` (laisse les hooks tourner). 5. Une phrase finale à Inès + les liens des 4 fichiers .md créés. Ne redemande RIEN à Inès qui soit technique ; le seul geste autorisé = un unique clic clair (créer une clé) présenté à la toute fin.

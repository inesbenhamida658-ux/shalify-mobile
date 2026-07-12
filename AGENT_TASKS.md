# Registre des agents — dépôt appli (racine → shalify-mobile)

> Garde-fou 10 : avant d'écrire un fichier, un agent l'annonce ici (anti-collision par déclaration).
> Règle : **un seul agent-écriture à la fois**. Avant d'écrire : `git fetch`, partir de `origin/main`,
> lancer `node scripts/coord.mjs`. Commit fichier par fichier (jamais `git add -A`). Publier via branche `deploy/`.

## En cours
_(rien)_

## Fait récemment
- 2026-07-12 : garde-fous installés (hooks pre-commit/pre-push, auto-deploy-app.yml, quality-app.yml, coord.mjs, verifier-tout.mjs, .gitignore racine).

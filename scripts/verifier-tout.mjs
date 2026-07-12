#!/usr/bin/env node
// Verification lecture seule : est-ce que tout le travail appli est bien EN LIGNE ?
// A lancer AVANT de dire "fait" ou de proposer une tache : `node scripts/verifier-tout.mjs`.
// N'ecrit rien, ne casse rien. Repond : reste-a-publier, modifs oubliees, worktrees en avance.

import { execSync } from 'node:child_process';
const root = execSync('git rev-parse --show-toplevel').toString().trim();
const sh = (c) => { try { return execSync(c, { cwd: root }).toString().trim(); } catch { return ''; } };

sh('git fetch origin --quiet');
let ok = true;

// Un vrai "reste a publier" = du CONTENU different de main, pas juste un historique different.
// (Le robot auto-deploy rebase : la branche garde des commits d'avance alors que le contenu est deja en ligne.)
const contenuDiffere = (ref) => sh(`git diff --stat origin/main ${ref}`) !== '';

// 1) Branche courante : du contenu pas encore en ligne ?
const br = sh('git rev-parse --abbrev-ref HEAD');
if (contenuDiffere('HEAD')) { ok = false; console.log(`RESTE A PUBLIER: '${br}' a du contenu pas encore en ligne. Pousse la branche deploy/ (le robot publie, sinon bouton vert).`); }

// 2) Branches deploy/* distantes : du contenu pas encore en ligne ?
for (const b of sh('git branch -r').split('\n').map(s => s.trim()).filter(Boolean)) {
  if (!/\/deploy\//.test(b)) continue;
  if (contenuDiffere(b)) { ok = false; console.log(`RESTE A PUBLIER: ${b} a du contenu pas en ligne. Le robot devrait publier; sinon bouton vert.`); }
}

// 3) Modifs locales non enregistrees (hors fichiers ignores).
const dirty = sh('git status -s').split('\n').filter(l => l && !l.startsWith('??')).length;
if (dirty) { ok = false; console.log(`OUBLI: ${dirty} fichiers modifies non enregistres. Commit fichier par fichier.`); }

if (ok) console.log('OK: tout le travail est en ligne, rien en attente, rien d oublie.');
process.exit(ok ? 0 : 1);

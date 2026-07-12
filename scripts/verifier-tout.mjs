#!/usr/bin/env node
// Verification lecture seule : est-ce que tout le travail appli est bien EN LIGNE ?
// A lancer AVANT de dire "fait" ou de proposer une tache : `node scripts/verifier-tout.mjs`.
// N'ecrit rien, ne casse rien. Repond : reste-a-publier, modifs oubliees, worktrees en avance.

import { execSync } from 'node:child_process';
const root = execSync('git rev-parse --show-toplevel').toString().trim();
const sh = (c) => { try { return execSync(c, { cwd: root }).toString().trim(); } catch { return ''; } };

sh('git fetch origin --quiet');
let ok = true;

// 1) Branche courante en avance sur main = travail pas encore publie.
const br = sh('git rev-parse --abbrev-ref HEAD');
const ahead = sh(`git rev-list --count origin/main..HEAD`) || '0';
if (ahead !== '0') { ok = false; console.log(`RESTE A PUBLIER: ${ahead} commits sur '${br}' pas encore en ligne. Pousse la branche deploy/ + bouton vert.`); }

// 2) Toutes les branches deploy/* distantes en avance sur main.
for (const b of sh('git branch -r').split('\n').map(s => s.trim()).filter(Boolean)) {
  if (!/\/deploy\//.test(b)) continue;
  const a = sh(`git rev-list --count origin/main..${b}`) || '0';
  if (a !== '0') { ok = false; console.log(`RESTE A PUBLIER: ${a} commits sur ${b}. Cree/merge la PR.`); }
}

// 3) Modifs locales non enregistrees (hors fichiers ignores).
const dirty = sh('git status -s').split('\n').filter(l => l && !l.startsWith('??')).length;
if (dirty) { ok = false; console.log(`OUBLI: ${dirty} fichiers modifies non enregistres. Commit fichier par fichier.`); }

if (ok) console.log('OK: tout le travail est en ligne, rien en attente, rien d oublie.');
process.exit(ok ? 0 : 1);

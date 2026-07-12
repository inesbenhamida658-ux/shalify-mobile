#!/usr/bin/env node
// Coordination anti-collision des agents sur le depot appli (racine -> shalify-mobile).
// A lancer au demarrage de chaque agent : `node scripts/coord.mjs`.
// 1) Installe les hooks (pre-commit / pre-push) via core.hooksPath.
// 2) Pose un verrou : un seul agent-ecriture a la fois. Verrou de +30 min = considere perime.
// 3) Rappelle la regle : partir de la derniere version en ligne.

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, chmodSync } from 'node:fs';
import { join } from 'node:path';

const root = execSync('git rev-parse --show-toplevel').toString().trim();
const sh = (c) => { try { return execSync(c, { cwd: root }).toString().trim(); } catch { return ''; } };

// 1) Hooks
sh('git config core.hooksPath .githooks');
for (const h of ['pre-commit', 'pre-push']) {
  const p = join(root, '.githooks', h);
  if (existsSync(p)) { try { chmodSync(p, 0o755); } catch {} }
}
console.log('coord: hooks actives (core.hooksPath=.githooks).');

// 2) Verrou anti-collision
const lock = join(root, '.githooks', 'AGENT.lock');
const now = Date.now();
const me = process.env.CLAUDE_AGENT_ID || process.env.USERNAME || 'agent';
if (existsSync(lock)) {
  try {
    const { ts, who } = JSON.parse(readFileSync(lock, 'utf8'));
    const ageMin = (now - ts) / 60000;
    if (ageMin < 30 && who !== me) {
      console.log(`coord: ATTENTION un autre agent ecrit (${who}, il y a ${ageMin.toFixed(0)} min).`);
      console.log('coord: adapte-toi (autre fichier/approche), n ecrase pas. Isole-toi avec git worktree si besoin.');
    }
  } catch {}
}
writeFileSync(lock, JSON.stringify({ ts: now, who: me }));

// 3) Rappel : partir du dernier etat en ligne
const behind = sh('git rev-list --count HEAD..origin/main 2>/dev/null') || '0';
if (behind !== '0') {
  console.log(`coord: tu es en retard de ${behind} commits sur le site en ligne. Fais 'git fetch' + repars de origin/main.`);
}
console.log('coord: pret. Un seul agent-ecriture, commit fichier par fichier, publie via branche deploy/.');

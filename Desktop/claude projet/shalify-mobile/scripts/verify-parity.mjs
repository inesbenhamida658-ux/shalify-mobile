#!/usr/bin/env node
/**
 * verify-parity.mjs — Contrôle automatique de cohérence appli <-> site.
 * Vérifie, sans dépendance externe :
 *   1) Palette : l'appli garde bien la charte du site (vert/crème/or).
 *   2) i18n : fr/en/ar ont exactement les mêmes clés (aucune traduction oubliée).
 *   3) Réparation d'accents (◆) appliquée sur tous les services de données live.
 * Sort en code 1 si un écart est trouvé (pour bloquer la CI et déclencher un rapport).
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const ok = (m) => console.log('  ✓ ' + m);
const ko = (m) => { errors.push(m); console.log('  ✗ ' + m); };

// 1) Palette officielle du site (charte figée).
console.log('\n[1] Palette (charte du site)');
const CANON = { vert: '#3D6B4F', creme: '#FAF6EE', or: '#C9A84C' };
try {
  const colors = readFileSync(join(root, 'src/theme/colors.ts'), 'utf8');
  for (const [nom, hex] of Object.entries(CANON)) {
    if (colors.toUpperCase().includes(hex.toUpperCase())) ok(`${nom} ${hex} présent`);
    else ko(`${nom} ${hex} ABSENT de src/theme/colors.ts (divergence avec le site)`);
  }
} catch { ko('src/theme/colors.ts illisible'); }

// 2) Parité des clés i18n fr/en/ar.
console.log('\n[2] i18n fr / en / ar (mêmes clés)');
function keysOf(file) {
  const txt = readFileSync(join(root, 'src/i18n', file), 'utf8');
  const set = new Set();
  for (const m of txt.matchAll(/^\s*['"]?([a-zA-Z0-9_]+)['"]?\s*:/gm)) set.add(m[1]);
  return set;
}
try {
  const fr = keysOf('fr.ts'), en = keysOf('en.ts'), ar = keysOf('ar.ts');
  for (const [nom, set] of [['en', en], ['ar', ar]]) {
    const manquantes = [...fr].filter((k) => !set.has(k));
    const enTrop = [...set].filter((k) => !fr.has(k));
    if (manquantes.length === 0 && enTrop.length === 0) ok(`${nom} : ${set.size} clés, identique à fr`);
    else ko(`${nom} : ${manquantes.length} manquantes, ${enTrop.length} en trop vs fr` +
      (manquantes.length ? ` (ex: ${manquantes.slice(0, 5).join(', ')})` : ''));
  }
} catch { ko('fichiers i18n illisibles'); }

// 3) Réparation d'accents sur les services de données live.
console.log('\n[3] Réparation accents (◆) sur les services live');
for (const svc of ['creators.ts', 'feed.ts', 'formations.ts', 'lives.ts', 'avis.ts']) {
  try {
    const txt = readFileSync(join(root, 'src/services', svc), 'utf8');
    if (txt.includes('repairText')) ok(`${svc} utilise repairText`);
    else ko(`${svc} n'applique PAS repairText (risque de ◆ à l'affichage)`);
  } catch { ko(`src/services/${svc} illisible`); }
}

console.log('');
if (errors.length) {
  console.error(`✗ Parité : ${errors.length} écart(s) détecté(s).`);
  process.exit(1);
}
console.log('✓ Parité appli/site : tout est cohérent.');

#!/usr/bin/env node
// Scanner de mots interdits pour l'appli Shalify mobile.
// Verifie les textes destines aux utilisateurs (fichiers i18n + chaines dans src/).
// Informatif : liste ce qui est a corriger, sans bloquer le build.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

// Mots bannis (contenu utilisateur)
const MOTS_BANNIS = ['gratuit', 'offert', 'offerte', 'liberté', 'liberte', 'chose', 'truc', 'machin', 'guérir', 'guerir', 'justesse', 'sonnerie', 'carte'];
// Tournures negatives a reformuler en positif
const NEGATIONS = ['sans', 'jamais', 'aucun', 'aucune', 'impossible', 'difficile'];
// Prix en monnaie locale interdits dans le contenu public
const PRIX = ['DT', 'DZD', 'MAD', 'EUR'];
// Tirets longs interdits
const TIRETS = ['—', '–'];

function listerFichiers(dir) {
  const out = [];
  for (const nom of readdirSync(dir)) {
    if (nom === 'node_modules' || nom === '__tests__') continue;
    const chemin = join(dir, nom);
    const s = statSync(chemin);
    if (s.isDirectory()) out.push(...listerFichiers(chemin));
    else if (['.ts', '.tsx'].includes(extname(nom))) out.push(chemin);
  }
  return out;
}

function motPresent(ligne, mot) {
  const re = new RegExp(`(^|[^A-Za-zÀ-ÿ])${mot}([^A-Za-zÀ-ÿ]|$)`, 'i');
  return re.test(ligne);
}

const fichiers = listerFichiers(racine);
let total = 0;
const parFichier = {};

for (const f of fichiers) {
  const estI18n = f.includes(`${join('src', 'i18n')}`) || f.replace(/\\/g, '/').includes('/i18n/');
  const lignes = readFileSync(f, 'utf8').split('\n');
  lignes.forEach((ligne, i) => {
    // Hors i18n, on ne regarde que les chaines qui ressemblent a du texte affiche (avec un espace)
    const contexteTexte = estI18n || /['"`][^'"`]* [^'"`]*['"`]/.test(ligne);
    // On ignore les lignes de commentaire (texte technique, pas affiche a l'utilisateur)
    const estCommentaire = /^\s*(\/\/|\*|\/\*)/.test(ligne);
    const signals = [];
    if (contexteTexte && !estCommentaire) {
      for (const m of MOTS_BANNIS) if (motPresent(ligne, m)) signals.push(`mot banni: ${m}`);
      for (const m of NEGATIONS) if (motPresent(ligne, m)) signals.push(`negation: ${m}`);
      for (const p of PRIX) if (new RegExp(`\\b${p}\\b`).test(ligne)) signals.push(`prix local: ${p}`);
      for (const t of TIRETS) if (ligne.includes(t)) signals.push('tiret long');
    }
    if (signals.length) {
      const rel = f.replace(racine, 'src');
      (parFichier[rel] ||= []).push({ ligne: i + 1, signals });
      total += signals.length;
    }
  });
}

console.log('\n=== SCANNER MOTS INTERDITS (appli mobile) ===\n');
if (total === 0) {
  console.log('Tout est propre : zero mot interdit, zero tiret long, zero prix local.');
} else {
  for (const [f, hits] of Object.entries(parFichier)) {
    for (const h of hits) console.log(`  [${h.signals.join(' | ')}] ${f}:${h.ligne}`);
  }
  console.log(`\n${total} signalement(s) a revoir dans ${Object.keys(parFichier).length} fichier(s).`);
}
console.log('');

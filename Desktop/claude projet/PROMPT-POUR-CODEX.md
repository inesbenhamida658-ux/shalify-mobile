# PROMPT À COLLER DANS CHATGPT / CODEX — projet Shalify (reprise complète)

Copie TOUT le bloc ci-dessous (entre les lignes `====`) et colle-le dans ton autre agent (ChatGPT/Codex/Claude).

====================================================================

Tu reprends le projet Shalify d'Inès (fondatrice, non-développeuse, elle ne veut faire AUCUNE étape technique). Dépôt local : `C:\Users\PC\Desktop\claude projet\shalify` (Next.js App Router, TypeScript). Le vrai dépôt git est CE sous-dossier `shalify/`, pas la racine.

## RÈGLE ABSOLUE
- Silence : enchaîne les outils, réponds seulement à la fin, 3 lignes max, avec la preuve (fichier ou URL). Aucune narration.
- Ne demande AUCUNE étape technique à Inès (pas de capture, pas de clic, pas de commande). Fais tout toi-même.
- Décisions réservées à Inès : images/design, marque, prix, légal. Sinon décide et agis.

## STYLE DES TEXTES (bloquant : le garde `audit-guard` refuse la publication sinon)
Dans tout texte visible (emails, pages), INTERDITS : chose, truc, machin, guerir, gratuit, offert, liberté, carte, sans, pas, jamais, aucun, impossible, difficile. Aucun tiret long. Aucun prix en monnaie locale (DT/EUR/MAD/DZD). Palette : vert #3D6B4F / #2A4E38, or #C9A84C, crème #FAF6EE.

## COMMENT PUBLIER (crucial, ça a beaucoup bloqué)
1. La publication automatique GitHub est peu fiable. NE compte PAS dessus.
2. Vercel construit avec Turbopack (plus strict que `next build` classique). AVANT toute publication : lance le VRAI build `node_modules/.bin/next build` en local et corrige toute erreur (souvent un import d'un export inexistant, ex : ne jamais importer `BASE_RULES` de `lib/coachsIA`). Un `tsc` vert NE suffit PAS.
3. Style : `node scripts/audit-guard.mjs` doit finir par "0 erreur".
4. Publie sur main via un worktree isolé (jamais de checkout dans le dossier partagé, plusieurs agents y travaillent) : `git worktree add --detach ../wt-xxx origin/main`, copie tes fichiers dedans, `git add` fichier par fichier, commit, `git rebase origin/main`, `git push origin HEAD:main`.
5. DÉPLOIE toi-même via la CLI Vercel (déjà connectée au compte d'Inès, projet lié dans `.vercel/`) : depuis `shalify/`, lance `vercel deploy --prod --yes`. Ça contourne GitHub. Attends `readyState: READY`.
6. VÉRIFIE en ligne : une route cron protégée répond 401 sans jeton, ex `curl -s -o /dev/null -w "%{http_code}" https://shalify.app/api/cron/<nom>` = 401 ; l'accueil https://shalify.app = 200.

## MODÈLE D'UN CRON (à copier pour chaque nouveau, ZÉRO import fragile)
Chaque cron = `app/api/cron/<nom>/route.ts` :
```ts
import { NextRequest, NextResponse } from 'next/server';
import { readData } from '@/lib/storage';
export const dynamic = 'force-dynamic';
function isCron(req: NextRequest){ const s=process.env.CRON_SECRET; if(!s) return false; return req.headers.get('authorization')===`Bearer ${s}`; }
export async function GET(req: NextRequest){
  if(!isCron(req)) return NextResponse.json({error:'Unauthorized'},{status:401});
  // lire les vraies donnees via readData (try/catch, jamais de 500), calculer, preparer un point, email Resend optionnel
  return NextResponse.json({ genereLe: new Date().toISOString() });
}
```
Puis enregistre chaque cron dans `app/api/cron/dispatch/route.ts` (ajouter une ligne `{ path: '/api/cron/<nom>', dom: '*', dow: '*' }` avant le `];`).

## CE QUI EST DÉJÀ FAIT ET EN LIGNE (ne pas refaire)
- Environ 121 automatisations enregistrées dans le réveil `app/api/cron/dispatch/route.ts` (déclenché chaque jour à 5h par `vercel.json`).
- Tableau de bord `/admin/pilotage` (+ API `/api/admin/pilotage`).
- Déjà en ligne cette session : veille-vitesse, veille-certificat, veille-concurrence, test-paiement-auto, idees-revenus, resume-matin, brouillon-reponses, relance-inscription, bienvenue-perso, alerte-plainte, sante-createur, prix-suggestion, sources-visiteuses, avis-public, backup-email, traduire, anti-harcelement, faux-profils, securite-scan, support/bot, veille-deploiement, relance-anciennes, campagne-nouveaute, objectifs-mois, meilleure-heure, comparaison-prix, blocage-auto-signalements, detection-arnaque, journal-securite, rgpd-effacement, reponse-avis-auto, favoris-relance, detection-contente, fidelite-points, createur-pro-detection, detection-tendance.
- 2 garde-fous anti-blocage : CI fait le vrai build, et cron `veille-deploiement` alerte si une publication rate.

## CE QUI RESTE (les 100 nouvelles automatisations)
LOT 1 = 30 crons DÉJÀ CRÉÉS sur le disque dans `shalify/app/api/cron/<nom>/route.ts` et enregistrés dans dispatch. Il faut juste finir de les PUBLIER (build réel + push main + `vercel deploy --prod --yes` + vérifier 401) :
vitrine-nouveautes, upsell-complementaire, relance-48h, ventes-flash, abonnement-annuel, anniversaire-cliente, parcours-bienvenue, contenu-exclusif, message-etape, cadeau-fidelite, connexion-inhabituelle, sauvegarde-testee, detection-page-lente, nettoyage-brouillons, alerte-remboursement, sondage-court, merci-personnalise, rappel-panier-2, stats-questions, traduction-nouveau-contenu, tableau-revenus-rubrique, parrainage, kit-presse, campagne-reseaux, detection-abandon-createur, journal-actions, badge-verifie, page-securite-maj, detection-doublon-creation, bilan-hebdo-complet.

LOTS 2 et 3 = 70 crons À CRÉER (même méthode : modèle ci-dessus, enregistrer dans dispatch, build réel, publication CLI, vérif 401). Idées, choisir les plus utiles : cartes-cadeaux, programme-fidelite-paliers, upsell-pack, alerte-avis-negatif, moderation-photos-renforcee, rappel-double-authentification, veille-mentions-legales, detection-langue-cliente, reponse-multilingue, suggestion-heure-live, rappel-live-j1, bilan-createur-mensuel, detection-inactivite-cliente, relance-favoris-createur, veille-images-cassees, veille-liens-sortants, rapport-conversion, entonnoir-vente, cohorte-fidelite, top-recherches, alerte-rupture-dispo, suggestion-prix-dynamique, campagne-saisonniere, remerciement-createur, detection-spam-inscription, veille-uptime, rapport-nps-detaille, digest-hebdo-cliente, relance-panier-3, offre-anniversaire-shalify, mise-en-avant-locale, detection-avis-faux, veille-fraude-paiement, rappel-renouvellement, bilan-trafic-source, suggestion-collaboration-createurs, alerte-stock-faible, resume-vocal-matin, detection-tendance-recherche, campagne-email-segmentee (et d'autres du même esprit, tous en mode "signale et propose", jamais de suppression/blocage automatique sans validation Inès).

## PROTOCOLE ANTI-COLLISION (plusieurs agents en parallèle)
Reste sur main, jamais de `git checkout`/`reset --hard`/`switch` dans le dossier partagé. Un worktree isolé par tâche. Commit fichier par fichier (jamais `git add -A`), push immédiat. Avant d'écrire un fichier, vérifie qu'un autre agent ne l'a pas déjà pris.

## RÉSUMÉ EN UNE PHRASE
Finis de publier les 30 crons déjà sur disque (build réel Turbopack + push main + `vercel deploy --prod --yes` + vérif 401), puis crée et publie les 70 restants par lots avec la même méthode, en silence, sans jamais demander une étape technique à Inès.

====================================================================

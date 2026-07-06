# Expo SDK 54 — version verrouillée

Lis la doc versionnée exacte ici avant d'écrire du code : https://docs.expo.dev/versions/v54.0.0/

> Note : l'app utilise **Expo SDK 54** (voir `app.json` : `"sdkVersion": "54.0.0"`).
> Stack réelle validée par Inès le 2026-06-29 : React 19.1.0, React Native 0.81.5, React Navigation v7.
> Cette version est cohérente entre `app.json` et `package.json`. Ne pas suivre la doc d'une autre version SDK.
> Cible build iPhone : build de développement EAS (pas seulement Expo Go), pour éviter le verrouillage de version d'Expo Go.

---

## ⛔ RÈGLE OBLIGATOIRE — VÉRIFIER LA RÉALITÉ AVANT DE (RE)LISTER OU DÉCLARER UNE TÂCHE
> Ajoutée par Inès (fondatrice) le 2026-07-05. Priorité absolue. Tout agent lit cette règle AVANT d'écrire un rapport ou une liste de tâches.

Problème constaté : les agents se renvoient les mêmes tâches et listent comme « à faire » des écrans/fonctions DÉJÀ FAITS, en recopiant les listes des autres sans vérifier le code. C'est terminé. Désormais, pour CHAQUE agent :

1. **Avant de lister une tâche comme « à faire »** : ouvre le vrai code (`src/screens/`, `src/services/`, `src/navigation/`) et VÉRIFIE qu'elle n'est pas déjà faite. Si elle est déjà faite, ne la relist pas ; marque-la ✅ avec la preuve `fichier:ligne`.
2. **Avant de déclarer une tâche « faite »** : prouve-le avec `fichier:ligne` ET un test réel (`npx tsc --noEmit`). Une case cochée dans un `.md` ne prouve rien.
3. **Ne jamais recopier la liste d'un autre agent sans revérifier chaque ligne dans le code.** Le code est la seule vérité ; les `.md` de suivi mentent souvent.
4. **Une seule source de vérité par tâche.** Signale les doublons au lieu de les propager.
5. **Distinguer « écran existe » et « écran branché à un vrai backend ».** Un écran qui affiche une façade sans système derrière n'est PAS une tâche faite : marque-le ⚠️ à moitié.

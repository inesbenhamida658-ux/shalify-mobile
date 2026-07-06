# Comment publier une mise à jour de l'appli Shalify

> Guide simple, sans jargon. Tu n'as jamais besoin de comprendre le code.

## Si l'appli « ne marche plus » sur le PC
1. Double-clic sur **`lancer-shalify.ps1`** (clic droit → Exécuter avec PowerShell).
2. Il répare tout seul ce que Defender a cassé et vérifie le code.
3. Attends le message vert « Terminé ».

## Pour mettre l'appli sur ton iPhone (la 1re fois)
1. **Une seule fois** : double-clic sur **`ajouter-exclusion-defender.ps1`** (accepte la fenêtre bleue). → Defender ne casse plus rien.
2. Double-clic sur **`build-iphone.ps1`**.
3. La 1re fois, connecte-toi à ton **compte Expo** (gratuit) quand il le demande.
4. Attends que le cloud Expo finisse (tu reçois un **QR code**).
5. Scanne le QR avec ton iPhone → l'appli s'installe.

## Pour pousser une petite modif sans tout reconstruire
> Valable seulement après le 1er build (EAS Update).
1. Double-clic sur **`maj-rapide.ps1`** *(à créer quand EAS Update sera activé)*.
2. La modif arrive sur ton tél en quelques secondes, sans rebuild.

## Règle d'or pour éviter les bugs
- ⚠️ **Une seule fenêtre Claude à la fois** sur ce dossier. Deux en même temps cassent l'installation.
- Ne déplace pas le dossier `shalify-mobile` sans prévenir (les scripts pointent dessus).

## Tes 2 seules responsabilités (le reste est automatisé)
| | Quoi | Quand |
|--|------|-------|
| 1 | Lancer `ajouter-exclusion-defender.ps1` | Une fois |
| 2 | Te connecter à Expo dans `build-iphone.ps1` | Une fois |

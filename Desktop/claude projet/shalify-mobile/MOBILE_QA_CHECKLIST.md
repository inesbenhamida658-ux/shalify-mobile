# SHALIFY MOBILE — CHECKLIST QA

> But : tester l'app Expo existante de bout en bout, sans toucher au style, aux
> images, aux médias ni aux paiements. Source de cadrage : `AGENTS.md`,
> `../shalify/docs/MOBILE_START_NEXT_STEP.md`.
>
> Rédigé le 2026-06-29. Expo SDK 52, React Native 0.76.9.

## 1. Lancer Expo

```bash
cd shalify-mobile
npx expo start            # QR code Wi-Fi local (même réseau que le téléphone)
# ou, si le Wi-Fi bloque la connexion :
npx expo start --tunnel   # passe par un tunnel, fonctionne hors réseau local
```

Puis sur le téléphone : ouvrir **Expo Go**, scanner le QR code.

- iPhone : appareil photo ou Expo Go.
- Android : scanner depuis Expo Go.

Ne pas lancer EAS, ne rien publier, ne pas créer de build store.

## 2. Tester le login OTP

Flux codé dans `src/screens/auth/LoginScreen.tsx` + `src/services/auth.ts` :

1. Saisir un email réel.
2. Toucher le bouton de connexion : appel `POST /api/auth/login`.
3. Lire le code reçu par email (Resend côté web).
4. Saisir le code (4 à 6 chiffres) : appel `POST /api/auth/verify`.
5. Le token est stocké dans `SecureStore` (`shalify_session_token`).
6. L'app charge le profil via `GET /api/auth/me` et passe sur les onglets connectés.
7. Déconnexion depuis l'onglet Profil (confirmation par alerte).

Ne jamais créer de faux compte. Utiliser uniquement un email réel fourni par Inès.

## 3. Écrans à vérifier

| Écran | Fichier | Point à vérifier |
|-------|---------|------------------|
| Login | `screens/auth/LoginScreen.tsx` | email → OTP → accueil |
| Signup | `screens/auth/SignupScreen.tsx` | création puis retour Login |
| ForgotPassword | `screens/auth/ForgotPasswordScreen.tsx` | envoi lien, retour |
| Accueil | `screens/main/HomeScreen.tsx` | chargement, bouton « Voir tout » (placeholder) |
| Recherche | `screens/main/SearchScreen.tsx` | saisie + résultats |
| Créateurs | `screens/main/CreatorsScreen.tsx` | liste → détail |
| Détail créateur | `screens/main/CreatorDetailScreen.tsx` | infos, bouton « Réserver » (paiement manuel, inactif) |
| Favoris | `screens/main/FavoritesScreen.tsx` | retrait d'un favori |
| Messages | `screens/main/MessagesScreen.tsx` | envoi message |
| Profil | `screens/main/ProfileScreen.tsx` | langue, devise, déconnexion |
| Settings | `screens/main/SettingsScreen.tsx` | écran présent mais non relié à un onglet (voir notes) |

## 4. Boutons / actions

Tous les boutons passent par `AppButton` (`onPress`) ou `TouchableOpacity`.
Points connus à garder en tête lors du test manuel :

- « Voir tout » (Accueil) : `onPress` vide, placeholder volontaire, sans action.
- « Réserver » (Détail créateur) : `onPress` vide volontaire. Le paiement est manuel
  et hors périmètre. Ne pas brancher de paiement sans validation d'Inès.
- Navigation auth : Login ↔ Signup ↔ ForgotPassword (cibles existantes).
- Créateurs : carte → `CreatorDetail` (route existante dans la stack Créateurs).

Aucune action destructrice, aucune suppression de données, aucun paiement déclenché.

## 5. Langues FR / EN / AR

- Changement de langue depuis l'onglet Profil (boutons FR / EN / AR).
- `t()` retombe sur le français puis sur la clé : une clé manquante n'entraîne pas de crash.
- AR active le RTL via `I18nManager.forceRTL` (un rechargement de l'app peut être
  nécessaire pour appliquer pleinement le sens RTL, comportement normal de React Native).
- Vérifier qu'aucun écran ne casse en AR.

## 6. Erreurs

- Erreur réseau / API : message affiché via `ErrorState` ou le champ d'erreur du formulaire.
- États de chargement : `LoadingState` et indicateurs `loading` sur les boutons.
- États vides : `EmptyState` sur les listes.

## 7. Interdictions pendant la QA

- Ne pas modifier le style, les couleurs, les polices, le design.
- Ne pas toucher aux images, vidéos, médias.
- Ne pas toucher aux paiements ni aux providers.
- Ne pas toucher au web (`../shalify`), à `.env`, à `.vercel`, aux secrets.
- Ne pas créer de fausse donnée ni de faux compte.
- Ne pas lancer EAS, ne rien publier.
- Pas de `git add .` ni `git commit -am` : commit fichier par fichier.

## 8. Checks automatisés disponibles

```bash
npm run typecheck     # tsc --noEmit --project tsconfig.check.json
npx expo-doctor       # santé du projet Expo
```

Pas de Jest / Detox / E2E / CI pour l'instant (hors périmètre).

## 9. Critères de sortie de la session QA

1. `npm run typecheck` vert.
2. `npx expo-doctor` vert.
3. `npx expo start` démarre et génère un QR code.
4. L'app s'ouvre dans Expo Go sans crash.
5. Le login OTP aboutit (token stocké, profil chargé) ou le blocage exact est noté.
6. Les onglets s'ouvrent, les langues ne cassent rien.
7. Les boutons morts connus sont documentés (Voir tout, Réserver).

## Notes (non bloquant)

- `SettingsScreen` est importé dans `src/navigation/MainTabs.tsx` mais n'est relié
  à aucun onglet. Ses réglages (langue) sont déjà disponibles dans l'onglet Profil.
  À relier ou à laisser tel quel selon décision d'Inès. Ne rien supprimer.
- CORS web : non configuré côté `../shalify`. Sans effet pour Expo Go natif
  (le fetch natif n'est pas soumis au CORS). Le CORS ne deviendrait nécessaire
  que pour `expo start --web` (navigateur).

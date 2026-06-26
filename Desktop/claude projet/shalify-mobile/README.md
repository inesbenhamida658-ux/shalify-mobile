# Shalify Mobile

Application mobile Expo/React Native pour la plateforme Shalify.

## Stack

- **Expo** ~56 (React Native 0.85, React 19)
- **TypeScript** strict
- **React Navigation** v7 (native-stack + bottom-tabs)
- **expo-secure-store** — tokens de session uniquement
- **@react-native-async-storage/async-storage** — préférences non sensibles uniquement
- **i18n** FR / EN / AR avec support RTL

## Structure

```
src/
├── components/      # 8 composants réutilisables
├── config/          # env.ts (EXPO_PUBLIC_ seulement)
├── context/         # AuthContext, LangContext
├── i18n/            # fr.ts, en.ts, ar.ts + index
├── navigation/      # AuthStack, MainTabs, RootNavigator
├── screens/
│   ├── auth/        # Login, Signup, ForgotPassword
│   └── main/        # Home, Search, Creators, CreatorDetail, Messages, Profile, Settings
├── services/        # api.ts, auth.ts, creators.ts
├── storage/         # AsyncStorage helpers (non-sensible)
├── theme/           # colors, spacing, typography, radius, shadows
├── types/           # index.ts
└── utils/           # currency.ts, analytics.ts, notifications.ts, offline.ts
```

## Variables d'environnement

Copier `.env.example` → `.env.local` :

```bash
EXPO_PUBLIC_API_BASE_URL=https://shalify.app
```

Aucun secret côté mobile. Toutes les clés (Upstash, Resend, Admin) restent dans Vercel Dashboard.

## Démarrage

```bash
npm install
npx expo start
```

Puis scanner le QR code avec Expo Go (iOS/Android).

## Palettes de couleurs

| Nom | Hex |
|-----|-----|
| Crème | `#FAF7F2` |
| Vert forêt | `#3D6B4F` |
| Vert foncé | `#2A4E38` |
| Or | `#D4A853` |
| Texte principal | `#2A2A2A` |
| Texte secondaire | `#666666` |

## Règles de sécurité

- Tokens de session : SecureStore uniquement
- Préférences (langue, devise, favoris) : AsyncStorage uniquement
- Aucun paiement réel — mention obligatoire : "Paiement manuel / test — aucun débit réel."
- Analytics : désactivé par défaut (`ANALYTICS_ENABLED = false`)
- Notifications : aucune permission demandée au lancement

## Deep linking

Schema : `shalify://`

Exemple : `shalify://creator/xyz`

## Non inclus (à configurer manuellement)

- Compte Apple Developer (iOS build)
- Compte Google Play (Android build)
- Stripe / Payoneer live (paiement réel)
- Expo Push Notifications token
- Soumission App Store / Google Play

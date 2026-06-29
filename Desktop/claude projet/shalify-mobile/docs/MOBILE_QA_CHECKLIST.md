# SHALIFY MOBILE — QA CHECKLIST

Source de vérité : AGENTS.md > CLAUDE.md > ce fichier.
Mise à jour : 2026-06-29

---

## 1. LANCER EXPO

```bash
cd shalify-mobile
npx expo start
# ou pour tunnel (hors Wi-Fi commun)
npx expo start --tunnel
```

Inès, sur iPhone :
1. Télécharger **Expo Go** depuis l'App Store.
2. Scanner le QR code affiché dans le terminal.
3. Si le scan ne fonctionne pas, saisir l'URL `exp://...` manuellement dans Expo Go.
4. Si l'app reste bloquée sur "Loading…", secouer le téléphone → "Reload".

---

## 2. TESTER LE LOGIN OTP

Protocole exact pour Inès :

1. L'écran de connexion s'ouvre.
2. Saisir l'adresse email (ex. inesbenhamida658@gmail.com).
3. Appuyer sur **Recevoir mon code**.
4. Vérifier l'email — le code à 6 chiffres arrive.
5. Saisir le code dans l'app.
6. Appuyer sur **Confirmer**.
7. L'app navigue vers l'Accueil → **succès**.
8. Si erreur : copier le message d'erreur rouge et l'envoyer à Claude.

Points à signaler si problème :
- "Erreur réseau" → réseau ou CORS
- "Session expirée" → SecureStore ou backend
- Pas d'email reçu → Resend / backend

---

## 3. LISTE DES ÉCRANS

| Écran | Route | Requis auth |
|---|---|---|
| Login | AuthStack > Login | NON |
| Signup | AuthStack > Signup | NON |
| ForgotPassword | AuthStack > ForgotPassword | NON |
| Accueil | MainTabs > Accueil | NON (dégradé) |
| Recherche | MainTabs > Recherche | NON |
| Créateurs | MainTabs > CreateursTab > CreateursList | NON |
| Détail créateur | MainTabs > CreateursTab > CreatorDetail | NON |
| Favoris | MainTabs > Favoris | NON (liste vide si déconnecté) |
| Messages | MainTabs > Messages | OUI (empty state sinon) |
| Profil | MainTabs > Profil | OUI (message sinon) |

---

## 4. LISTE DES BOUTONS / ACTIONS

| Fichier | Bouton | Destination | Statut |
|---|---|---|---|
| LoginScreen | Recevoir mon code | requestOTP → /api/auth/login | OK |
| LoginScreen | Confirmer (OTP) | verifyOTP → /api/auth/verify → accueil | OK |
| LoginScreen | Retour | step → 'email' | OK |
| LoginScreen | Créer un compte | navigate Signup | OK |
| LoginScreen | Mot de passe oublié | navigate ForgotPassword | OK |
| HomeScreen | Voir tout | navigate CreateursTab (tab) | CORRIGÉ |
| CreatorsScreen | Carte créateur | navigate CreatorDetail | OK |
| FavoritesScreen | ✕ retirer | removeFavorite() | OK |
| MessagesScreen | Envoyer | envoyer() local MVP | OK |
| ProfileScreen | FR / EN / AR | changeLang() | OK |
| ProfileScreen | Devise (TND / EUR …) | saveCurrency() | OK |
| ProfileScreen | Se déconnecter | Alert → logout() → AuthStack | OK |
| CreatorDetailScreen | Réserver une séance | vide MVP — paiement non activé | NOTE |

---

## 5. TEST DES LANGUES

| Langue | Chargée | Crash | RTL |
|---|---|---|---|
| FR | OUI — défaut | NON | N/A |
| EN | OUI | NON | N/A |
| AR | OUI | NON | RTL actif (isRTL flag) |

Pour tester : Profil → bouton FR / EN / AR → vérifier que l'interface change de langue.

---

## 6. TEST DES ERREURS

Erreurs à déclencher manuellement :
- Réseau coupé → doit afficher `erreur_reseau`
- Email invalide → doit afficher "Email invalide"
- Code OTP erroné → doit afficher message d'erreur backend
- Créateur inexistant → doit afficher ErrorState avec bouton Retour

---

## 7. INTERDICTIONS ABSOLUES (rappel agent)

- Jamais `git add .` ou `git add -A`
- Jamais toucher aux images/vidéos/médias
- Jamais toucher au style, couleurs, polices
- Jamais installer de dépendance sans preuve
- Jamais créer EAS / CI/CD / Sentry / PostHog
- Jamais créer de paiement ou abonnement
- Jamais créer de fausses données en production
- Jamais toucher à `.env` ou aux secrets
- Jamais recréer l'app avec `npx create-expo-app`

---

## 8. CRITÈRES DE SORTIE (étape 1 mobile validée)

- [ ] App lance dans Expo Go sans crash
- [ ] Écran login s'affiche
- [ ] OTP envoyé et reçu par email
- [ ] OTP vérifié → token stocké dans SecureStore
- [ ] Accueil s'affiche après connexion
- [ ] Bouton "Voir tout" navigue vers l'onglet Créateurs
- [ ] Profil affiche email + prenom
- [ ] Logout fonctionne et retourne au login
- [ ] FR / EN / AR changeable sans crash

---

## 9. CE QU'INÈS DOIT FAIRE SUR IPHONE

1. Installer Expo Go depuis l'App Store.
2. Ouvrir l'app Shalify depuis le QR code.
3. Tester le login avec son email.
4. Signaler tout écran qui reste blanc / bloque / plante.
5. Prendre une capture ou copier le message d'erreur rouge.
6. Envoyer la capture ou le texte à Claude pour correction.

---

## 10. CE QU'ENVOYER À CLAUDE SI ERREUR

Si une erreur s'affiche dans Expo Go :
- Copier le message d'erreur exact (rouge ou blanc sur fond rouge).
- Préciser l'écran où l'erreur se produit.
- Préciser l'action effectuée juste avant.
- Si possible : ouvrir le terminal Expo et copier les lignes en rouge.

#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# BOUTON UNIQUE — « Mettre l'app Shalify à jour »
# Un seul geste : vérifie le code, fabrique l'app (Expo), donne le lien + QR.
# Usage : bash scripts/maj-app.sh
# (Inès n'a rien à taper : elle dit « mets l'app à jour » et l'agent lance ça.)
# ─────────────────────────────────────────────────────────────────────────────
set -o pipefail
cd "$(dirname "$0")/.." || exit 1

echo "════════════════════════════════════════════"
echo "  SHALIFY — Mise à jour de l'application"
echo "════════════════════════════════════════════"

# 1) Charger le token Expo (jamais affiché)
if [ ! -f .env.local ]; then echo "❌ .env.local introuvable."; exit 1; fi
EXPO_TOKEN="$(grep '^EXPO_TOKEN=' .env.local | cut -d= -f2-)"
if [ -z "$EXPO_TOKEN" ]; then echo "❌ EXPO_TOKEN absent de .env.local."; exit 1; fi
export EXPO_TOKEN
echo "✓ Token Expo chargé."

# 2) Vérifier le code (filet de sécurité : jamais de build cassé)
echo "→ Vérification du code (tsc)…"
if ! node node_modules/typescript/bin/tsc --noEmit --project tsconfig.check.json; then
  echo "❌ Le code a une erreur. Build annulé (rien de cassé n'est envoyé)."
  exit 1
fi
echo "✓ Code propre (0 erreur)."

# 3) Lancer la fabrication Android (profil preview = APK installable direct)
echo "→ Lancement de la fabrication Expo…"
OUT="$(npx eas build --platform android --profile preview --non-interactive --no-wait 2>&1)"
echo "$OUT" | grep -v '^EXPO_TOKEN' | tail -6

# Détecter le quota gratuit épuisé
if echo "$OUT" | grep -qi "used its Android builds from the Free plan"; then
  echo ""
  echo "⛔ Quota de builds GRATUITS épuisé ce mois-ci."
  echo "   → Réessaie le 1er du mois prochain, ou passe Expo en payant :"
  echo "   https://expo.dev/accounts/shalifyapp/settings/billing"
  exit 2
fi

# Récupérer l'ID du build
BUILD_ID="$(echo "$OUT" | grep -oE '/builds/[0-9a-f-]{36}' | head -1 | sed 's#/builds/##')"
if [ -z "$BUILD_ID" ]; then echo "❌ Impossible de récupérer l'ID du build."; exit 1; fi
echo "✓ Build lancé : $BUILD_ID"

# 4) Surveiller jusqu'à la fin (file gratuite : 10-90 min)
echo "→ Surveillance (ça finit tout seul sur les serveurs Expo)…"
APK=""
for i in $(seq 1 180); do
  J="$(npx eas build:view "$BUILD_ID" --json 2>/dev/null)"
  ST="$(printf '%s' "$J" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{console.log((JSON.parse(d).status||'?').toString().toLowerCase())}catch(e){console.log('wait')}})")"
  echo "   [$i] état = $ST"
  case "$ST" in
    finished) APK="$(printf '%s' "$J" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{console.log((JSON.parse(d).artifacts||{}).applicationArchiveUrl||'')}catch(e){console.log('')}})")"; break;;
    errored|canceled) echo "❌ Build échoué ($ST). Voir les logs Expo."; exit 1;;
  esac
  sleep 60
done

# 5) Livrer les liens (page d'installation fiable + lien direct)
echo ""
echo "════════════════════════════════════════════"
echo "  ✅ APP PRÊTE"
echo "  Page installation (fiable) :"
echo "  https://expo.dev/accounts/shalifyapp/projects/shalify-mobile/builds/$BUILD_ID"
[ -n "$APK" ] && echo "  Lien direct APK : $APK"
echo "════════════════════════════════════════════"

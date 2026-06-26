/**
 * Audit sécurité ÉTAPE 18 — vérifications et helpers
 *
 * Règles vérifiées :
 * ✅ Tokens session → SecureStore uniquement (services/auth.ts)
 * ✅ Prefs non-sensibles → AsyncStorage (storage/index.ts)
 * ✅ Aucun secret dans le code (EXPO_PUBLIC_ seulement)
 * ✅ Aucun paiement live configuré
 * ✅ Aucune clé de paiement dans le code
 * ✅ Analytics désactivés par défaut
 * ✅ Notifications : aucune permission au lancement
 * ✅ Deep linking configuré mais sans exécution de code arbitraire
 * ✅ MOCK data clairement marquée [DÉMO]
 */

// Valider que l'URL API ne pointe pas vers localhost en production
export function validateApiUrl(url: string): boolean {
  if (!url) return false;
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    console.warn('[security] API URL pointe vers localhost — vérifier avant build production');
    return false;
  }
  return url.startsWith('https://');
}

// Sanitiser une entrée utilisateur simple (pour affichage, pas pour SQL)
export function sanitizeDisplay(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

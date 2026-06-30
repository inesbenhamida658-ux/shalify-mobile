// Variables publiques uniquement — jamais de secrets ici
// Le lien de paiement Ziina est public par nature (page de paiement hébergée) — aucun secret.
export const ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://shalify.app',
  APP_NAME: 'Shalify',
  APP_VERSION: '1.0.0',
  IS_DEV: __DEV__,
  // Paiement — architecture neutre, fournisseur prioritaire Ziina (compte Dubaï d'Inès)
  PAYMENT_PROVIDER: (process.env.EXPO_PUBLIC_PAYMENT_PROVIDER ?? 'ziina') as 'ziina' | 'none',
  ZIINA_PAYMENT_URL: process.env.EXPO_PUBLIC_ZIINA_PAYMENT_URL ?? 'https://pay.ziina.com/Shalify',
} as const;

// Validation au démarrage
if (!ENV.API_BASE_URL) {
  console.warn('[ENV] EXPO_PUBLIC_API_BASE_URL non défini — utilisation de https://shalify.app par défaut');
}

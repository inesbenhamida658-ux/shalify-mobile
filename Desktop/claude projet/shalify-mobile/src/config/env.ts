// Variables publiques uniquement — jamais de secrets ici
export const ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://shalify.app',
  APP_NAME: 'Shalify',
  APP_VERSION: '1.0.0',
  IS_DEV: __DEV__,
} as const;

// Validation au démarrage
if (!ENV.API_BASE_URL) {
  console.warn('[ENV] EXPO_PUBLIC_API_BASE_URL non défini — utilisation de https://shalify.app par défaut');
}

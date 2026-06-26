// Analytics wrapper — désactivé par défaut, aucun SDK tiers chargé
const ANALYTICS_ENABLED = false;

type EventName = 'screen_view' | 'creator_view' | 'search' | 'reservation_intent' | 'login' | 'logout' | 'lang_change';

interface EventParams { [key: string]: string | number | boolean }

export function trackEvent(name: EventName, params?: EventParams): void {
  if (!ANALYTICS_ENABLED) return;
  // À implémenter avec Mixpanel, Segment, ou PostHog selon choix business
  console.log('[analytics]', name, params);
}

export function trackScreen(screenName: string): void {
  trackEvent('screen_view', { screen: screenName });
}

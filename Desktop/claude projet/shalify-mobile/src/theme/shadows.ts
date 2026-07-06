import { Platform } from 'react-native';

export const Shadows = {
  sm: Platform.select({
    ios: { shadowColor: '#0F1F17', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
    android: { elevation: 2 },
    default: {},
  }),
  md: Platform.select({
    ios: { shadowColor: '#0F1F17', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
    android: { elevation: 4 },
    default: {},
  }),
  lg: Platform.select({
    ios: { shadowColor: '#0F1F17', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 8 },
    android: { elevation: 8 },
    default: {},
  }),
  // Ombre marquée validée par la charte : 0 12px 34px rgba(15,31,23,.20)
  // Réservée aux blocs qui se détachent (cartes mises en avant, hero).
  marquee: Platform.select({
    ios: { shadowColor: '#0F1F17', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.2, shadowRadius: 17, elevation: 12 },
    android: { elevation: 12 },
    default: {},
  }),
} as const;

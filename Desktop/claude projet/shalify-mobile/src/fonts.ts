// Polices officielles Shalify : Cormorant (titres, 500) + Poppins (texte, 300/400).
// Chargées via expo-font au démarrage (voir App.tsx).
import {
  Cormorant_500Medium,
  Cormorant_600SemiBold,
  Cormorant_700Bold,
} from '@expo-google-fonts/cormorant';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

// Map passée à useFonts() — clé = nom de famille utilisé dans les styles.
export const FontMap = {
  Cormorant_500Medium,
  Cormorant_600SemiBold,
  Cormorant_700Bold,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
};

// Noms de familles réutilisables dans la typographie et les styles.
export const Fonts = {
  serifMedium: 'Cormorant_500Medium', // titres validés (500)
  serifSemi: 'Cormorant_600SemiBold',
  serifBold: 'Cormorant_700Bold',
  bodyLight: 'Poppins_300Light', // sous-titres doux
  bodyRegular: 'Poppins_400Regular',
  bodyMedium: 'Poppins_500Medium',
  bodySemi: 'Poppins_600SemiBold',
} as const;

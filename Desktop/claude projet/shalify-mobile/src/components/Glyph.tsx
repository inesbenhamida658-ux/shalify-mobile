import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

interface Props {
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

// Icône symbole / emoji. IMPORTANT : aucune police personnalisée ici.
// Cormorant/Poppins n'ont pas les emoji → Android afficherait des carrés vides.
// En laissant la police système, les symboles (œil, cœur, étoiles) s'affichent partout.
export function Glyph({ children, size = 18, color, style }: Props) {
  return <Text allowFontScaling={false} style={[{ fontSize: size, color }, style]}>{children}</Text>;
}

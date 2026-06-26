import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors, Typography } from '../theme';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption' | 'label' | 'labelSmall' | 'button';
type ColorVariant = 'primary' | 'secondary' | 'or' | 'error' | 'white' | 'muted';

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  color?: ColorVariant;
  style?: TextStyle;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}

const colorMap: Record<ColorVariant, string> = {
  primary: Colors.texte,
  secondary: Colors.texteSec,
  or: Colors.or,
  error: Colors.erreur,
  white: Colors.blanc,
  muted: Colors.gris,
};

export function AppText({ children, variant = 'body', color = 'primary', style, align, numberOfLines }: Props) {
  return (
    <Text
      style={[Typography[variant] as TextStyle, { color: colorMap[color] }, align ? { textAlign: align } : null, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

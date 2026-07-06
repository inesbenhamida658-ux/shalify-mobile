import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors, Typography } from '../theme';
import { useTextScale } from '../context/TextScaleContext';

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
  const { scale } = useTextScale();
  const base = Typography[variant] as TextStyle;
  // Applique la taille du texte choisie (accessibilité), interligne proportionnel.
  const scaled: TextStyle = scale === 1 ? {} : {
    fontSize: base.fontSize ? Math.round(base.fontSize * scale) : undefined,
    lineHeight: base.lineHeight ? Math.round(base.lineHeight * scale) : undefined,
  };
  return (
    <Text
      style={[base, scaled, { color: colorMap[color] }, align ? { textAlign: align } : null, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

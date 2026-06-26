import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../theme';

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: number;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.blanc,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...(Shadows.md as object),
  },
});

export function AppCard({ children, onPress, style, padding }: Props) {
  const cardStyle = [styles.card, padding !== undefined ? { padding } : null, style];
  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.85}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}

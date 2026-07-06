import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '../theme';
import { AppText } from './AppText';

interface Props {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

// Puce arrondie (catégorie / tag). Verte pleine quand active, contour crème sinon.
export function Chip({ label, active, onPress, style }: Props) {
  const inner = (
    <View style={[styles.chip, active ? styles.active : styles.idle, style]}>
      <AppText variant="labelSmall" color={active ? 'white' : 'secondary'} style={styles.text}>
        {label}
      </AppText>
    </View>
  );
  if (onPress) {
    return <TouchableOpacity onPress={onPress} activeOpacity={0.8}>{inner}</TouchableOpacity>;
  }
  return inner;
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  idle: { backgroundColor: Colors.blanc, borderColor: Colors.bordure },
  active: { backgroundColor: Colors.vert, borderColor: Colors.vert },
  text: { letterSpacing: 0.4 },
});

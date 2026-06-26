import React from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../theme';
import { AppText } from './AppText';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: 52,
  },
  primary: { backgroundColor: Colors.vert },
  secondary: { backgroundColor: Colors.vertTF },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.vert },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.5 },
  fullWidth: { width: '100%' as const },
});

const textColorMap: Record<Variant, 'white' | 'primary' | 'secondary'> = {
  primary: 'white',
  secondary: 'white',
  outline: 'primary',
  ghost: 'secondary',
};

export function AppButton({ label, onPress, variant = 'primary', loading, disabled, style, fullWidth }: Props) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], disabled && styles.disabled, fullWidth && styles.fullWidth, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? Colors.vert : Colors.blanc} />
      ) : (
        <AppText variant="button" color={textColorMap[variant]}>{label}</AppText>
      )}
    </TouchableOpacity>
  );
}

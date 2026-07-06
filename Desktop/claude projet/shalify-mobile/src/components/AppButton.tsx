import React, { useRef } from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle, StyleSheet, Animated } from 'react-native';
import { Colors, Radius, Spacing } from '../theme';
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
    borderRadius: Radius.pill, // boutons en pilule (charte validée)
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: 52,
  },
  primary: { backgroundColor: Colors.vert },
  secondary: { backgroundColor: Colors.vertTF },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.or },
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
  // Retour au toucher web-safe : légère pulsation à l'appui (équivalent haptique).
  const scale = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, tension: 140, useNativeDriver: true }),
    ]).start();
    onPress();
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[fullWidth && styles.fullWidth, style]}
    >
      <Animated.View style={[styles.base, styles[variant], disabled && styles.disabled, { transform: [{ scale }] }]}>
        {loading ? (
          <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? Colors.vert : Colors.blanc} />
        ) : (
          <AppText variant="button" color={textColorMap[variant]}>{label}</AppText>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

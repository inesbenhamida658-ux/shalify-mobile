import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../theme';
import { AppText } from './AppText';

interface Props {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  rtl?: boolean;
  maxLength?: number;
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  label: { marginBottom: Spacing.xs },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.bordure,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    backgroundColor: Colors.blanc,
    fontSize: 16,
    color: Colors.texte,
    minHeight: 52,
  },
  inputFocused: { borderColor: Colors.vert },
  inputError: { borderColor: Colors.erreur },
  error: { marginTop: Spacing.xs },
});

export function AppInput({ value, onChangeText, placeholder, label, error, secureTextEntry, keyboardType, autoCapitalize, style, rtl, maxLength }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.container, style]}>
      {label && <AppText variant="label" style={styles.label}>{label}</AppText>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.gris}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize ?? 'none'}
        style={[styles.input as TextStyle, focused && styles.inputFocused, error ? styles.inputError : null, rtl ? { textAlign: 'right' } : null]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
      />
      {error && <AppText variant="caption" color="error" style={styles.error}>{error}</AppText>}
    </View>
  );
}

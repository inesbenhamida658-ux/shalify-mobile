import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle, Pressable } from 'react-native';
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
  multiline?: boolean;
  numberOfLines?: number;
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  label: { marginBottom: Spacing.xs },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.or, // champ encadré or (charte validée série 2)
    borderRadius: Radius.md,
    backgroundColor: Colors.blanc,
    minHeight: 52,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    fontSize: 16,
    color: Colors.texte,
  },
  fieldFocused: { borderColor: Colors.or, borderWidth: 1.5 },
  fieldError: { borderColor: Colors.erreur },
  eye: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  error: { marginTop: Spacing.xs },
});

export function AppInput({ value, onChangeText, placeholder, label, error, secureTextEntry, keyboardType, autoCapitalize, style, rtl, maxLength, multiline, numberOfLines }: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  const isPassword = !!secureTextEntry;

  return (
    <View style={[styles.container, style]}>
      {label && <AppText variant="label" style={styles.label}>{label}</AppText>}
      <View style={[styles.field, focused && styles.fieldFocused, error ? styles.fieldError : null, multiline ? { minHeight: 108, alignItems: 'flex-start' } : null]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.gris}
          secureTextEntry={isPassword && hidden}
          keyboardType={keyboardType}
          autoCapitalize={isPassword ? 'none' : (autoCapitalize ?? 'none')}
          autoCorrect={isPassword ? false : undefined}
          spellCheck={isPassword ? false : undefined}
          textContentType={isPassword ? 'password' : 'none'}
          multiline={multiline}
          numberOfLines={multiline ? (numberOfLines ?? 4) : undefined}
          style={[styles.input as TextStyle, multiline ? { textAlignVertical: 'top', minHeight: 96 } : null, rtl ? { textAlign: 'right' } : null]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
        />
        {isPassword && (
          <Pressable onPress={() => setHidden(h => !h)} style={styles.eye} hitSlop={8} accessibilityRole="button" accessibilityLabel={hidden ? 'Afficher le mot de passe' : 'Masquer le mot de passe'}>
            <AppText variant="caption" color="or">{hidden ? 'Afficher' : 'Masquer'}</AppText>
          </Pressable>
        )}
      </View>
      {error && <AppText variant="caption" color="error" style={styles.error}>{error}</AppText>}
    </View>
  );
}

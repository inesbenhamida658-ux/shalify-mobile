import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '../theme';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

interface Props {
  titre: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
  desc: { marginTop: Spacing.sm, marginBottom: Spacing.lg },
});

export function EmptyState({ titre, description, ctaLabel, onCta }: Props) {
  return (
    <View style={styles.container}>
      <AppText variant="h3" align="center">{titre}</AppText>
      {description && <AppText variant="bodySmall" color="secondary" align="center" style={styles.desc}>{description}</AppText>}
      {ctaLabel && onCta && <AppButton label={ctaLabel} onPress={onCta} variant="outline" />}
    </View>
  );
}

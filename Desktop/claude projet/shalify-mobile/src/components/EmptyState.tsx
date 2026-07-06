import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '../theme';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

interface Props {
  titre: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl, paddingVertical: Spacing.xxl },
  // Emblème doux (cercle crème, fin anneau or, point doré) — dessiné en Views, zéro emoji.
  mark: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: Colors.cremeF,
    borderWidth: 1.5, borderColor: 'rgba(201,168,76,0.55)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  markRing: {
    width: 34, height: 34, borderRadius: Radius.full,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.45)',
    alignItems: 'center', justifyContent: 'center',
  },
  markDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.or, opacity: 0.8 },
  desc: { marginTop: Spacing.sm, marginBottom: Spacing.lg, maxWidth: 300 },
});

export function EmptyState({ titre, description, ctaLabel, onCta }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.mark}>
        <View style={styles.markRing}>
          <View style={styles.markDot} />
        </View>
      </View>
      {titre ? <AppText variant="h3" align="center">{titre}</AppText> : null}
      {description ? <AppText variant="bodySmall" color="secondary" align="center" style={styles.desc}>{description}</AppText> : null}
      {ctaLabel && onCta ? <AppButton label={ctaLabel} onPress={onCta} variant="outline" /> : null}
    </View>
  );
}

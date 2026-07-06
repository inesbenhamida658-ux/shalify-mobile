import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Spacing, Shadows } from '../theme';
import { AppText } from './AppText';

interface Props {
  eyebrow?: string;
  titre: string;
  sousTitre?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

// Bandeau d'accueil vert dégradé + filet or : rappelle l'identité du site.
export function GradientHero({ eyebrow, titre, sousTitre, children, style }: Props) {
  return (
    <LinearGradient
      colors={[Colors.vertTF, Colors.vertF, Colors.vert]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.hero, style]}
    >
      {eyebrow ? (
        <AppText variant="labelSmall" color="or" align="center">{eyebrow}</AppText>
      ) : null}
      <View style={styles.rule} />
      <AppText variant="h2" color="white" align="center" style={styles.titre}>{titre}</AppText>
      {sousTitre ? (
        <AppText variant="bodySmall" align="center" style={styles.sousTitre}>{sousTitre}</AppText>
      ) : null}
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: Radius.xl,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    ...(Shadows.lg as object),
  },
  rule: { width: 40, height: 2, backgroundColor: Colors.or, borderRadius: 2, marginVertical: Spacing.sm, alignSelf: 'center' },
  titre: { marginTop: Spacing.xs },
  sousTitre: { marginTop: Spacing.sm, color: 'rgba(255,255,255,0.82)', maxWidth: 300 },
});

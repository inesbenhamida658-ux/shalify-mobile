import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, Radius, Spacing } from '../theme';
import { AppCard } from './AppCard';

// Bloc gris doux qui respire (pulse) pendant le chargement.
export function SkeletonBlock({ width, height, radius = Radius.sm, style }: {
  width: number | `${number}%`;
  height: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const pulse = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  return (
    <Animated.View
      style={[{ width, height, borderRadius: radius, backgroundColor: Colors.cremeF, opacity: pulse }, style]}
    />
  );
}

// Squelette d'une carte créateur (avatar + deux lignes + pastille).
export function CreatorCardSkeleton() {
  return (
    <AppCard style={styles.card}>
      <View style={styles.row}>
        <SkeletonBlock width={56} height={56} radius={28} />
        <View style={styles.body}>
          <SkeletonBlock width="55%" height={16} />
          <SkeletonBlock width="35%" height={12} style={{ marginTop: Spacing.sm }} />
          <SkeletonBlock width={70} height={20} radius={Radius.full} style={{ marginTop: Spacing.sm }} />
        </View>
      </View>
      <SkeletonBlock width="90%" height={12} style={{ marginTop: Spacing.md }} />
    </AppCard>
  );
}

// Liste de squelettes (par défaut 4 cartes).
export function CreatorListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => <CreatorCardSkeleton key={i} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' },
  body: { flex: 1, marginLeft: Spacing.md },
});

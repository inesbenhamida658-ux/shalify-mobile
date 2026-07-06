import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';

const styles = StyleSheet.create({
  safe: { flex: 1 },
  fill: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  halo: {
    width: 220, height: 220, borderRadius: 110,
    borderWidth: 1.5, borderColor: 'rgba(201,168,76,0.5)',
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xxl,
  },
  core: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(201,168,76,0.22)' },
  phrase: { maxWidth: 320 },
});

// Salle calme : fond vert profond, halo d'or qui respire très lentement.
// Aucun effet gadget, juste un souffle doux pour se poser.
export function CalmRoomScreen() {
  const { t } = useLang();
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.08, duration: 5000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.9, duration: 5000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <LinearGradient colors={[Colors.vert, Colors.vertTF]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.fill}>
        <Animated.View style={[styles.halo, { transform: [{ scale }] }]}>
          <Animated.View style={[styles.core, { transform: [{ scale }] }]} />
        </Animated.View>
        <AppText variant="labelSmall" color="or" align="center" style={{ marginBottom: Spacing.md }}>{t('salle_titre').toUpperCase()}</AppText>
        <AppText variant="h2" color="white" align="center" style={styles.phrase}>{t('salle_phrase')}</AppText>
        <AppText variant="bodySmall" align="center" style={{ marginTop: Spacing.md, color: 'rgba(250,246,238,0.8)', maxWidth: 300 }}>{t('salle_sous')}</AppText>
      </LinearGradient>
    </SafeAreaView>
  );
}

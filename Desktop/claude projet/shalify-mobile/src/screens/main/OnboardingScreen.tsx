import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, AppButton, Glyph } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { markOnboardingSeen } from '../../services/douceur';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.fond },
  top: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: Spacing.md, paddingTop: Spacing.sm },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl },
  halo: {
    width: 150, height: 150, borderRadius: 75, alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.xl, overflow: 'hidden',
  },
  texte: { maxWidth: 320, marginTop: Spacing.md },
  dots: { flexDirection: 'row', gap: Spacing.sm, justifyContent: 'center', marginBottom: Spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.bordure },
  dotOn: { backgroundColor: Colors.or, width: 22 },
  footer: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xl },
});

const GLYPHS = ['✦', '❦', '☀'];

// Onboarding en trois écrans doux à la première ouverture.
export function OnboardingScreen({ navigation }: any) {
  const { t } = useLang();
  const [step, setStep] = useState(0);

  const slides = [
    { titre: t('onboarding_1_titre'), texte: t('onboarding_1_texte') },
    { titre: t('onboarding_2_titre'), texte: t('onboarding_2_texte') },
    { titre: t('onboarding_3_titre'), texte: t('onboarding_3_texte') },
  ];
  const last = step === slides.length - 1;

  const finish = async () => {
    await markOnboardingSeen().catch(() => {});
    navigation.replace('Tabs');
  };

  const next = () => { if (last) finish(); else setStep(step + 1); };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.top}>
        <TouchableOpacity onPress={finish} hitSlop={8} accessibilityRole="button">
          <AppText variant="label" color="secondary">{t('onboarding_passer')}</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.stage}>
        <LinearGradient colors={[Colors.vert, Colors.vertF]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.halo}>
          <LinearGradient
            colors={['rgba(201,168,76,0.35)', 'rgba(201,168,76,0)']}
            start={{ x: 0.9, y: 0 }} end={{ x: 0.2, y: 1 }}
            style={StyleSheet.absoluteFill} pointerEvents="none"
          />
          <Glyph size={44} color={Colors.orClair}>{GLYPHS[step]}</Glyph>
        </LinearGradient>
        <AppText variant="h2" align="center">{slides[step].titre}</AppText>
        <AppText variant="body" color="secondary" align="center" style={styles.texte}>{slides[step].texte}</AppText>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => <View key={i} style={[styles.dot, i === step && styles.dotOn]} />)}
        </View>
        <AppButton label={last ? t('onboarding_commencer') : t('onboarding_suivant')} onPress={next} fullWidth />
      </View>
    </SafeAreaView>
  );
}

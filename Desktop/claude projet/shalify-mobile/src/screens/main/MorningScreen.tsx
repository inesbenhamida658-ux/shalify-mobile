import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { ANCRAGE } from '../../data/experienceContent';

const styles = StyleSheet.create({
  progressRow: { flexDirection: 'row', gap: Spacing.xs, marginBottom: Spacing.lg },
  dot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: Colors.bordure },
  dotActive: { backgroundColor: Colors.or },
  card: { alignItems: 'center', paddingVertical: Spacing.xxl, marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.bordure },
  emblem: { width: 60, height: 60, borderRadius: Radius.lg, backgroundColor: Colors.creme2, borderWidth: 1, borderColor: Colors.or, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  doneEmblem: { width: 72, height: 72, borderRadius: 36, alignSelf: 'center', backgroundColor: Colors.vert, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
});

export function MorningScreen({ navigation }: any) {
  const { t, lang } = useLang();
  const data = ANCRAGE[lang] ?? ANCRAGE.fr;
  const [step, setStep] = useState(-1); // -1 = intro, then 0..n-1, then n = fin

  if (step === -1) {
    return (
      <ScreenContainer>
        <AppText variant="h2" style={{ marginBottom: Spacing.sm }}>{t('ancrage_titre')}</AppText>
        <AppText variant="body" color="secondary" style={{ marginBottom: Spacing.xl, lineHeight: 24 }}>{data.intro}</AppText>
        <AppButton label={t('ancrage_commencer')} onPress={() => setStep(0)} fullWidth />
      </ScreenContainer>
    );
  }

  if (step >= data.etapes.length) {
    return (
      <ScreenContainer>
        <View style={styles.doneEmblem}><Glyph size={28} color={Colors.blanc}>✓</Glyph></View>
        <AppText variant="h2" align="center" style={{ marginBottom: Spacing.sm }}>{t('ancrage_fin_titre')}</AppText>
        <AppText variant="body" color="secondary" align="center" style={{ marginBottom: Spacing.xl }}>{t('ancrage_fin_texte')}</AppText>
        <AppButton label={t('ancrage_recommencer')} onPress={() => setStep(-1)} variant="outline" fullWidth />
        <AppButton label={t('retour')} onPress={() => navigation.goBack()} variant="ghost" style={{ marginTop: Spacing.sm }} fullWidth />
      </ScreenContainer>
    );
  }

  const e = data.etapes[step];
  const last = step + 1 >= data.etapes.length;
  return (
    <ScreenContainer>
      <View style={styles.progressRow}>
        {data.etapes.map((_, i) => (
          <View key={i} style={[styles.dot, i <= step && styles.dotActive]} />
        ))}
      </View>
      <AppCard style={styles.card}>
        <View style={styles.emblem}><AppText variant="h3" color="or">{step + 1}</AppText></View>
        <AppText variant="h2" align="center" style={{ marginBottom: Spacing.md }}>{e.titre}</AppText>
        <AppText variant="body" color="secondary" align="center" style={{ paddingHorizontal: Spacing.md, lineHeight: 24 }}>{e.texte}</AppText>
      </AppCard>
      <AppButton label={last ? t('ancrage_terminer') : t('ancrage_suivant')} onPress={() => setStep(step + 1)} fullWidth />
    </ScreenContainer>
  );
}

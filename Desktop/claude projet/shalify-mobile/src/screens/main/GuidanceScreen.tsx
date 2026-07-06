import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, Glyph } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { guidanceDuMois } from '../../data/experienceContent';

const MOIS: Record<string, string[]> = {
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
};

const styles = StyleSheet.create({
  hero: { borderWidth: 1.5, borderColor: Colors.or, backgroundColor: Colors.creme, marginBottom: Spacing.lg, alignItems: 'center', paddingVertical: Spacing.xl },
  emblem: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.creme2, borderWidth: 1, borderColor: Colors.or, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  intentionCard: { backgroundColor: Colors.vert, marginBottom: Spacing.lg },
});

export function GuidanceScreen() {
  const { t, lang } = useLang();
  const now = new Date();
  const g = guidanceDuMois(lang, now);
  const moisLabel = (MOIS[lang] ?? MOIS.fr)[now.getMonth()];

  return (
    <ScreenContainer>
      <AppText variant="labelSmall" color="or" align="center" style={{ marginBottom: Spacing.xs }}>{moisLabel.toUpperCase()}</AppText>
      <AppText variant="h2" align="center" style={{ marginBottom: Spacing.lg }}>{t('guidance_titre')}</AppText>

      <AppCard style={styles.hero}>
        <View style={styles.emblem}><Glyph size={26} color={Colors.or}>✦</Glyph></View>
        <AppText variant="labelSmall" color="or">{t('guidance_theme').toUpperCase()}</AppText>
        <AppText variant="h2" align="center" style={{ marginTop: Spacing.xs }}>{g.theme}</AppText>
      </AppCard>

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="body" color="secondary" style={{ lineHeight: 24 }}>{g.texte}</AppText>
      </AppCard>

      <AppCard style={styles.intentionCard}>
        <AppText variant="labelSmall" color="or">{t('guidance_intention').toUpperCase()}</AppText>
        <AppText variant="h3" color="white" style={{ marginTop: Spacing.xs }}>{g.intention}</AppText>
      </AppCard>
    </ScreenContainer>
  );
}

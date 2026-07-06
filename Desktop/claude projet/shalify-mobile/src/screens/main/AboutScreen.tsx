import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, AppText, AppCard, AppButton } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { UNIVERS, universLabel, universSous } from '../../data/univers';

const styles = StyleSheet.create({
  label: { textAlign: 'center', letterSpacing: 1.2, marginBottom: Spacing.sm },
  intro: { marginBottom: Spacing.xl, marginTop: Spacing.xs },
  section: { marginBottom: Spacing.xl },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.md },
  stepNum: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: Colors.vert,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  stepBody: { flex: 1 },
  rubRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  rubRoman: {
    width: 30, marginRight: Spacing.md,
  },
});

export function AboutScreen() {
  const { t, lang } = useLang();
  const navigation = useNavigation<any>();

  const etapes = [
    { titre: t('about_etape1_titre'), texte: t('about_etape1_texte') },
    { titre: t('about_etape2_titre'), texte: t('about_etape2_texte') },
    { titre: t('about_etape3_titre'), texte: t('about_etape3_texte') },
  ];

  return (
    <ScreenContainer scrollable>
      <AppText variant="labelSmall" color="or" style={styles.label}>{t('home_titre').toUpperCase()}</AppText>
      <AppText variant="h2" align="center">{t('about_titre')}</AppText>
      <AppText variant="body" color="secondary" align="center" style={styles.intro}>{t('about_intro')}</AppText>

      <AppCard style={styles.section}>
        <AppText variant="h3" style={{ marginBottom: Spacing.xs }}>{t('about_concept_titre')}</AppText>
        <AppText variant="body" color="secondary">{t('about_concept_texte')}</AppText>
      </AppCard>

      <View style={styles.section}>
        <AppText variant="h3" style={{ marginBottom: Spacing.md }}>{t('about_etapes_titre')}</AppText>
        {etapes.map((e, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNum}>
              <AppText variant="button" color="white">{i + 1}</AppText>
            </View>
            <View style={styles.stepBody}>
              <AppText variant="label">{e.titre}</AppText>
              <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{e.texte}</AppText>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <AppText variant="h3" style={{ marginBottom: Spacing.md }}>{t('about_rubriques_titre')}</AppText>
        {UNIVERS.map(u => (
          <View key={u.id} style={styles.rubRow}>
            <AppText variant="h3" color="or" style={styles.rubRoman}>{u.roman}</AppText>
            <View style={{ flex: 1 }}>
              <AppText variant="label">{universLabel(u, lang)}</AppText>
              <AppText variant="caption" color="secondary" style={{ marginTop: 2 }}>{universSous(u, lang)}</AppText>
            </View>
          </View>
        ))}
      </View>

      <AppButton label={t('about_cta')} onPress={() => navigation.navigate('CreateursTab')} fullWidth style={{ marginBottom: Spacing.xl }} />
    </ScreenContainer>
  );
}

import React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard } from '../../components';
import { Colors, Spacing } from '../../theme';
import { Fonts } from '../../fonts';
import { useLang } from '../../context/LangContext';
import { CITATIONS, citationDuMois } from '../../data/douceurContent';

const styles = StyleSheet.create({
  hero: { backgroundColor: Colors.creme, borderWidth: 1.5, borderColor: Colors.or, marginBottom: Spacing.lg, paddingVertical: Spacing.xl },
  citation: { fontFamily: Fonts.serifMedium, fontSize: 24, lineHeight: 34 },
  item: { marginBottom: Spacing.sm },
});

// Citations du mois : la citation du mois en avant, puis la collection à faire défiler.
export function QuotesScreen() {
  const { t, lang } = useLang();
  const list = CITATIONS[lang] ?? CITATIONS.fr;
  const duMois = citationDuMois(lang);

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('citations_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('citations_sous')}</AppText>

      <AppCard style={styles.hero}>
        <AppText variant="labelSmall" color="or" style={{ marginBottom: Spacing.sm }}>{t('citations_titre').toUpperCase()}</AppText>
        <AppText variant="h2" style={styles.citation}>« {duMois} »</AppText>
      </AppCard>

      {list.map((c, i) => (
        <AppCard key={i} style={styles.item}>
          <AppText variant="body" color="secondary">« {c} »</AppText>
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

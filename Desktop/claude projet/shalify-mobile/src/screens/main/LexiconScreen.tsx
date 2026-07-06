import React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard } from '../../components';
import { Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { LEXIQUE } from '../../data/douceurContent';

const styles = StyleSheet.create({
  item: { marginBottom: Spacing.sm },
});

// Mini-lexique : les mots clés de la méthode, expliqués simplement.
export function LexiconScreen() {
  const { t, lang } = useLang();
  const list = LEXIQUE[lang] ?? LEXIQUE.fr;

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('lexique_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('lexique_sous')}</AppText>

      {list.map((item, i) => (
        <AppCard key={i} style={styles.item}>
          <AppText variant="h3" color="or">{item.mot}</AppText>
          <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.xs }}>{item.def}</AppText>
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

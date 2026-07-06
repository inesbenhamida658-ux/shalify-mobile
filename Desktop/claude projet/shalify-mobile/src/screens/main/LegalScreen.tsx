import React from 'react';
import { View, StyleSheet, Pressable, Linking } from 'react-native';
import { ScreenContainer, AppText, AppCard, Glyph } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';

const LIENS = [
  { key: 'legal_cgu', url: 'https://shalify.app/cgu' },
  { key: 'legal_cgv', url: 'https://shalify.app/cgv' },
  { key: 'legal_confidentialite', url: 'https://shalify.app/confidentialite' },
  { key: 'legal_mentions', url: 'https://shalify.app/mentions-legales' },
  { key: 'legal_cookies', url: 'https://shalify.app/politique-cookies' },
] as const;

const styles = StyleSheet.create({
  intro: { marginBottom: Spacing.xl, marginTop: Spacing.xs },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: 'rgba(201,168,76,0.22)',
  },
});

export function LegalScreen() {
  const { t } = useLang();

  return (
    <ScreenContainer scrollable>
      <AppText variant="h2">{t('legal_titre')}</AppText>
      <AppText variant="body" color="secondary" style={styles.intro}>{t('legal_intro')}</AppText>

      <AppCard>
        {LIENS.map(l => (
          <Pressable
            key={l.key}
            onPress={() => Linking.openURL(l.url)}
            style={styles.row}
            accessibilityRole="link"
            accessibilityLabel={t(l.key)}
          >
            <AppText variant="label">{t(l.key)}</AppText>
            <Glyph size={20} color={Colors.or}>›</Glyph>
          </Pressable>
        ))}
      </AppCard>
    </ScreenContainer>
  );
}

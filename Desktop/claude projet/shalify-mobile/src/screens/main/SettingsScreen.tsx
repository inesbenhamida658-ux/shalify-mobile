import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppButton, AppCard } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';

export function SettingsScreen() {
  const { t, lang, changeLang } = useLang();

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xl }}>{t('settings_titre')}</AppText>

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{t('settings_langue')}</AppText>
        <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
          {(['fr', 'en', 'ar'] as const).map(l => (
            <AppButton key={l} label={l.toUpperCase()} onPress={() => changeLang(l)} variant={lang === l ? 'primary' : 'outline'} style={{ flex: 1 }} />
          ))}
        </View>
      </AppCard>

      <AppCard>
        <AppText variant="h3" style={{ marginBottom: Spacing.xs }}>{t('settings_a_propos')}</AppText>
        <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.xs }}>Shalify Mobile v1.0.0</AppText>
        <AppText variant="caption" color="muted" style={{ marginTop: Spacing.xs }}>shalify.app</AppText>
      </AppCard>
    </ScreenContainer>
  );
}

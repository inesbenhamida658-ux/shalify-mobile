import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';

const LIEN = 'https://shalify.app/cercle';

const styles = StyleSheet.create({
  hero: { backgroundColor: Colors.vertTF, borderRadius: Radius.lg, padding: Spacing.xl, marginBottom: Spacing.lg, alignItems: 'center' },
  emblem: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(201,168,76,0.18)', borderWidth: 1, borderColor: Colors.or, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  avantage: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.md },
  check: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.vert, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm, marginTop: 2 },
  avantageText: { flex: 1 },
});

export function SubscriptionScreen() {
  const { t } = useLang();
  const avantages = [t('abo_avantage1'), t('abo_avantage2'), t('abo_avantage3'), t('abo_avantage4')];

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <View style={styles.emblem}><Glyph size={26} color={Colors.or}>✦</Glyph></View>
        <AppText variant="labelSmall" color="or">{t('abo_eyebrow').toUpperCase()}</AppText>
        <AppText variant="h1" color="white" align="center" style={{ marginTop: Spacing.xs }}>{t('abo_titre')}</AppText>
        <AppText variant="bodySmall" color="white" align="center" style={{ opacity: 0.85, marginTop: Spacing.sm, maxWidth: 320 }}>{t('abo_sous')}</AppText>
      </View>

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="h3" style={{ marginBottom: Spacing.md }}>{t('abo_inclus')}</AppText>
        {avantages.map((a, i) => (
          <View key={i} style={styles.avantage}>
            <View style={styles.check}><Glyph size={11} color={Colors.blanc}>✓</Glyph></View>
            <AppText variant="body" color="secondary" style={styles.avantageText}>{a}</AppText>
          </View>
        ))}
      </AppCard>

      <AppButton label={t('abo_rejoindre')} onPress={() => Linking.openURL(LIEN).catch(() => {})} fullWidth />
      <AppText variant="caption" color="muted" align="center" style={{ marginTop: Spacing.md }}>{t('abo_mention')}</AppText>
    </ScreenContainer>
  );
}

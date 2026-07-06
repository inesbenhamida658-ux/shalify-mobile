import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Chip, Glyph } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { VALUES } from '../../data/rituelContent';
import { resonance } from '../../data/experienceContent';

const styles = StyleSheet.create({
  section: { marginBottom: Spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.sm },
  resultCard: { borderWidth: 1.5, borderColor: Colors.or, backgroundColor: Colors.creme, alignItems: 'center', paddingVertical: Spacing.xl },
  emblem: { width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.creme2, borderWidth: 1, borderColor: Colors.or, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
});

export function CompatibilityScreen() {
  const { t, lang } = useLang();
  const [a, setA] = useState<string | null>(null);
  const [b, setB] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const label = (key: string) => {
    const v = VALUES.find(x => x.key === key);
    return v ? (v.label[lang] ?? v.label.fr) : key;
  };

  if (done && a && b) {
    const r = resonance(lang, a, b);
    return (
      <ScreenContainer>
        <AppText variant="h2" align="center" style={{ marginBottom: Spacing.lg }}>{t('compat_titre')}</AppText>
        <AppText variant="bodySmall" color="secondary" align="center" style={{ marginBottom: Spacing.lg }}>
          {label(a)} · {label(b)}
        </AppText>
        <AppCard style={styles.resultCard}>
          <View style={styles.emblem}><Glyph size={24} color={Colors.or}>♡</Glyph></View>
          <AppText variant="h2" align="center" style={{ marginBottom: Spacing.sm }}>{r.titre}</AppText>
          <AppText variant="body" color="secondary" align="center">{r.texte}</AppText>
        </AppCard>
        <AppButton label={t('compat_refaire')} onPress={() => { setDone(false); setA(null); setB(null); }} variant="outline" fullWidth style={{ marginTop: Spacing.lg }} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('compat_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('compat_sous')}</AppText>

      <View style={styles.section}>
        <AppText variant="label">{t('compat_personne1')}</AppText>
        <View style={styles.chips}>
          {VALUES.map(v => (
            <Chip key={v.key} label={v.label[lang] ?? v.label.fr} active={a === v.key} onPress={() => setA(v.key)} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="label">{t('compat_personne2')}</AppText>
        <View style={styles.chips}>
          {VALUES.map(v => (
            <Chip key={v.key} label={v.label[lang] ?? v.label.fr} active={b === v.key} onPress={() => setB(v.key)} />
          ))}
        </View>
      </View>

      <AppButton label={t('compat_reveler')} onPress={() => setDone(true)} disabled={!a || !b} fullWidth style={{ marginTop: Spacing.md }} />
    </ScreenContainer>
  );
}

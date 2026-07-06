import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { CIELS, type Ciel } from '../../data/douceurContent';
import { getCiel, saveCiel } from '../../services/douceur';
import { todayKey } from '../../services/rituel';

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.sm },
  tile: {
    width: '47%', backgroundColor: Colors.blanc, borderWidth: 1, borderColor: Colors.bordure,
    borderRadius: Radius.lg, paddingVertical: Spacing.lg, alignItems: 'center',
  },
  emblem: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.cremeF,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.45)', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm,
  },
  result: { alignItems: 'center', paddingVertical: Spacing.xl, borderWidth: 1.5, borderColor: Colors.or, marginBottom: Spacing.lg },
  bigEmblem: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.creme2,
    borderWidth: 1, borderColor: Colors.or, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md,
  },
});

// Météo intérieure : on choisit son ciel du jour, on reçoit une intention adaptée.
export function WeatherScreen() {
  const { t, lang } = useLang();
  const list = CIELS[lang] ?? CIELS.fr;
  const [chosen, setChosen] = useState<Ciel | null>(null);

  useEffect(() => {
    getCiel().then(saved => {
      if (saved && saved.date === todayKey()) {
        const found = list.find(c => c.key === saved.key);
        if (found) setChosen(found);
      }
    });
  }, [lang]);

  const pick = (c: Ciel) => { setChosen(c); saveCiel(c.key).catch(() => {}); };

  if (chosen) {
    return (
      <ScreenContainer>
        <AppText variant="h2" style={{ marginBottom: Spacing.lg }}>{t('meteo_titre')}</AppText>
        <AppCard style={styles.result}>
          <View style={styles.bigEmblem}><Glyph size={30} color={Colors.or}>{chosen.glyph}</Glyph></View>
          <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{chosen.label}</AppText>
          <AppText variant="labelSmall" color="or" style={{ marginTop: Spacing.sm, marginBottom: Spacing.xs }}>{t('meteo_intention').toUpperCase()}</AppText>
          <AppText variant="body" color="secondary" align="center" style={{ paddingHorizontal: Spacing.md }}>{chosen.intention}</AppText>
        </AppCard>
        <AppButton label={t('meteo_changer')} onPress={() => setChosen(null)} variant="outline" fullWidth />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('meteo_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary">{t('meteo_sous')}</AppText>
      <View style={styles.grid}>
        {list.map(c => (
          <TouchableOpacity key={c.key} style={styles.tile} activeOpacity={0.85} onPress={() => pick(c)} accessibilityRole="button" accessibilityLabel={c.label}>
            <View style={styles.emblem}><Glyph size={22} color={Colors.or}>{c.glyph}</Glyph></View>
            <AppText variant="label" align="center">{c.label}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
}

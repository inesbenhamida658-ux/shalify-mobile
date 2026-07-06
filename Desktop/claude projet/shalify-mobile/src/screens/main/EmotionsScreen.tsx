import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { EMOTIONS, type Emotion } from '../../data/douceurContent';

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
  inviteCard: { backgroundColor: Colors.cremeF, borderLeftWidth: 3, borderLeftColor: Colors.or, marginBottom: Spacing.lg },
});

// Roue des émotions : on nomme un ressenti, on reçoit un mot doux et une invitation.
export function EmotionsScreen() {
  const { t, lang } = useLang();
  const list = EMOTIONS[lang] ?? EMOTIONS.fr;
  const [chosen, setChosen] = useState<Emotion | null>(null);

  if (chosen) {
    return (
      <ScreenContainer>
        <AppText variant="h2" style={{ marginBottom: Spacing.lg }}>{t('emotions_titre')}</AppText>
        <AppCard style={styles.result}>
          <View style={styles.bigEmblem}><Glyph size={30} color={Colors.or}>{chosen.glyph}</Glyph></View>
          <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{chosen.label}</AppText>
          <AppText variant="body" color="secondary" align="center" style={{ paddingHorizontal: Spacing.md }}>{chosen.mot}</AppText>
        </AppCard>
        <AppCard style={styles.inviteCard}>
          <AppText variant="labelSmall" color="or">{t('emotions_invite').toUpperCase()}</AppText>
          <AppText variant="body" style={{ marginTop: Spacing.xs }}>{chosen.invite}</AppText>
        </AppCard>
        <AppButton label={t('emotions_autre')} onPress={() => setChosen(null)} variant="outline" fullWidth />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('emotions_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary">{t('emotions_sous')}</AppText>
      <View style={styles.grid}>
        {list.map(e => (
          <TouchableOpacity key={e.key} style={styles.tile} activeOpacity={0.85} onPress={() => setChosen(e)} accessibilityRole="button" accessibilityLabel={e.label}>
            <View style={styles.emblem}><Glyph size={22} color={Colors.or}>{e.glyph}</Glyph></View>
            <AppText variant="label">{e.label}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
}

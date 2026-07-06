import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, AppInput, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import {
  touchStreak, getGratitude, addGratitude, removeGratitude,
  type GratitudeEntry,
} from '../../services/rituel';
import { mantraDuJour, defiDuMois, PARCOURS } from '../../data/rituelContent';

const styles = StyleSheet.create({
  mantraCard: { borderWidth: 1.5, borderColor: Colors.or, marginBottom: Spacing.lg, backgroundColor: Colors.creme },
  streakRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  streakBadge: {
    minWidth: 56, height: 56, borderRadius: 28, backgroundColor: Colors.vert,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.sm,
  },
  section: { marginBottom: Spacing.lg },
  jourRow: { flexDirection: 'row', marginBottom: Spacing.sm },
  entry: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.bordure },
  entryText: { flex: 1 },
  del: { paddingHorizontal: Spacing.sm },
});

export function RitualScreen() {
  const { t, lang } = useLang();
  const now = new Date();
  const [streak, setStreak] = useState(0);
  const [gratitudes, setGratitudes] = useState<GratitudeEntry[]>([]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    touchStreak().then(s => setStreak(s.count)).catch(() => setStreak(0));
    getGratitude().then(setGratitudes).catch(() => setGratitudes([]));
  }, []);

  const submitGratitude = async () => {
    const updated = await addGratitude(draft);
    setGratitudes(updated);
    setDraft('');
  };

  const del = async (index: number) => {
    setGratitudes(await removeGratitude(index));
  };

  const streakLabel = `${streak} ${streak > 1 ? t('rituel_jours') : t('rituel_jour')}`;
  const parcours = PARCOURS[lang] ?? PARCOURS.fr;

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.lg }}>{t('rituel_titre')}</AppText>

      <AppCard style={styles.mantraCard}>
        <AppText variant="labelSmall" color="or">{t('rituel_mantra').toUpperCase()}</AppText>
        <AppText variant="h3" style={{ marginTop: Spacing.xs }}>{mantraDuJour(lang, now)}</AppText>
      </AppCard>

      <AppCard style={styles.section}>
        <View style={styles.streakRow}>
          <View style={{ flex: 1, marginRight: Spacing.md }}>
            <AppText variant="h3">{t('rituel_streak')}</AppText>
            <AppText variant="bodySmall" color="secondary">{streakLabel}</AppText>
          </View>
          <View style={styles.streakBadge}>
            <AppText variant="h3" color="white">{streak}</AppText>
          </View>
        </View>
      </AppCard>

      <AppCard style={styles.section}>
        <AppText variant="labelSmall" color="secondary">{t('rituel_defi').toUpperCase()}</AppText>
        <AppText variant="body" style={{ marginTop: Spacing.xs }}>{defiDuMois(lang, now)}</AppText>
      </AppCard>

      <AppCard style={styles.section}>
        <AppText variant="labelSmall" color="secondary">{t('rituel_parcours').toUpperCase()}</AppText>
        <AppText variant="h3" style={{ marginTop: Spacing.xs, marginBottom: Spacing.sm }}>{parcours.titre}</AppText>
        {parcours.jours.map((j, i) => (
          <View key={i} style={styles.jourRow}>
            <AppText variant="bodySmall" color="secondary">{j}</AppText>
          </View>
        ))}
      </AppCard>

      <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{t('rituel_gratitude')}</AppText>
      <AppInput
        value={draft}
        onChangeText={setDraft}
        placeholder={t('rituel_gratitude_ph')}
        autoCapitalize="sentences"
        rtl={lang === 'ar'}
        maxLength={140}
      />
      <AppButton label={t('rituel_gratitude_add')} onPress={submitGratitude} disabled={!draft.trim()} fullWidth style={{ marginBottom: Spacing.lg }} />

      {gratitudes.length === 0 ? (
        <AppText variant="bodySmall" color="muted">{t('rituel_gratitude_vide')}</AppText>
      ) : (
        <AppCard>
          {gratitudes.map((g, i) => (
            <View key={`${g.date}-${i}`} style={[styles.entry, i === gratitudes.length - 1 ? { borderBottomWidth: 0 } : null]}>
              <View style={styles.entryText}>
                <AppText variant="caption" color="muted">{g.date}</AppText>
                <AppText variant="body">{g.text}</AppText>
              </View>
              <TouchableOpacity style={styles.del} onPress={() => del(i)} hitSlop={8} accessibilityRole="button">
                <Glyph size={16} color={Colors.gris}>✕</Glyph>
              </TouchableOpacity>
            </View>
          ))}
        </AppCard>
      )}
    </ScreenContainer>
  );
}

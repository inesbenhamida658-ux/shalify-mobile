import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard } from '../../components';
import { Colors, Spacing } from '../../theme';
import { Fonts } from '../../fonts';
import { useLang } from '../../context/LangContext';
import { getStreak, getGratitude } from '../../services/rituel';
import { getVictoires, getParcours21 } from '../../services/douceur';
import { PARCOURS_21 } from '../../data/douceurContent';

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm },
  stat: { flex: 1, backgroundColor: Colors.blanc, borderWidth: 1, borderColor: Colors.bordure, borderRadius: 16, paddingVertical: Spacing.lg, alignItems: 'center' },
  num: { fontFamily: Fonts.serifMedium, fontSize: 34, color: Colors.vert, lineHeight: 38 },
  label: { marginTop: Spacing.xs, textAlign: 'center', fontSize: 11, letterSpacing: 0.4 },
});

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <View style={styles.stat}>
      <AppText variant="h1" style={styles.num}>{n}</AppText>
      <AppText variant="caption" color="secondary" style={styles.label}>{label}</AppText>
    </View>
  );
}

// Ma progression : série, gratitudes, victoires, parcours 21 jours, en douceur.
export function ProgressScreen() {
  const { t, lang } = useLang();
  const [streak, setStreak] = useState(0);
  const [gratitudes, setGratitudes] = useState(0);
  const [victoires, setVictoires] = useState(0);
  const [parcours, setParcours] = useState(0);

  useEffect(() => {
    getStreak().then(s => setStreak(s.count)).catch(() => {});
    getGratitude().then(g => setGratitudes(g.length)).catch(() => {});
    getVictoires().then(v => setVictoires(v.length)).catch(() => {});
    getParcours21().then(p => setParcours(p.length)).catch(() => {});
  }, []);

  const total21 = (PARCOURS_21[lang] ?? PARCOURS_21.fr).jours.length;
  const vide = streak === 0 && gratitudes === 0 && victoires === 0 && parcours === 0;

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('progression_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('progression_sous')}</AppText>

      <View style={styles.row}>
        <Stat n={streak} label={t('progression_serie')} />
        <Stat n={gratitudes} label={t('progression_gratitudes')} />
      </View>
      <View style={styles.row}>
        <Stat n={victoires} label={t('progression_victoires')} />
        <Stat n={parcours} label={`${t('progression_parcours')} (${parcours}/${total21})`} />
      </View>

      {vide ? (
        <AppCard style={{ marginTop: Spacing.md }}>
          <AppText variant="body" color="secondary" align="center">{t('progression_vide')}</AppText>
        </AppCard>
      ) : null}
    </ScreenContainer>
  );
}

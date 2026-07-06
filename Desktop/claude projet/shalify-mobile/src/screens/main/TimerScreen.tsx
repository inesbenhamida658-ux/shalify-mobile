import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';

const DUREES = [3, 5, 10]; // minutes

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', gap: Spacing.sm, justifyContent: 'center', marginBottom: Spacing.xl },
  chip: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.bordure, backgroundColor: Colors.blanc,
  },
  chipOn: { backgroundColor: Colors.vert, borderColor: Colors.vert },
  clock: {
    width: 200, height: 200, borderRadius: 100, alignSelf: 'center',
    borderWidth: 2, borderColor: Colors.or, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.creme, marginBottom: Spacing.xl,
  },
  time: { fontSize: 48, lineHeight: 56 },
});

// Minuteur de présence : cinq minutes de calme. Zéro son embarqué, juste un minuteur doux.
export function TimerScreen() {
  const { t } = useLang();
  const [minutes, setMinutes] = useState(5);
  const [remaining, setRemaining] = useState(5 * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => { if (timer.current) { clearInterval(timer.current); timer.current = null; } };

  useEffect(() => () => clear(), []);

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) { clear(); setRunning(false); setDone(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clear();
  }, [running]);

  const pick = (m: number) => { setMinutes(m); setRemaining(m * 60); setDone(false); setRunning(false); clear(); };
  const start = () => { setDone(false); setRemaining(minutes * 60); setRunning(true); };
  const stop = () => { setRunning(false); clear(); setRemaining(minutes * 60); };

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('minuteur_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.xl }}>{t('minuteur_sous')}</AppText>

      <View style={styles.chips}>
        {DUREES.map(m => (
          <TouchableOpacity key={m} style={[styles.chip, minutes === m && styles.chipOn]} onPress={() => pick(m)} disabled={running} activeOpacity={0.8}>
            <AppText variant="label" color={minutes === m ? 'white' : 'secondary'}>{m} min</AppText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.clock}>
        {done ? (
          <Glyph size={44} color={Colors.vert}>✓</Glyph>
        ) : (
          <AppText variant="h1" style={styles.time}>{mm}:{ss}</AppText>
        )}
      </View>

      {done ? (
        <AppCard style={{ borderWidth: 1.5, borderColor: Colors.or, marginBottom: Spacing.lg }}>
          <AppText variant="body" align="center">{t('minuteur_fin')}</AppText>
        </AppCard>
      ) : null}

      {running ? (
        <AppButton label={t('minuteur_arreter')} onPress={stop} variant="outline" fullWidth />
      ) : (
        <AppButton label={t('minuteur_demarrer')} onPress={start} fullWidth />
      )}
    </ScreenContainer>
  );
}

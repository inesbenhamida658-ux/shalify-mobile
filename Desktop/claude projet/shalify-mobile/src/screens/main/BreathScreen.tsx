import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { ScreenContainer, AppText, AppButton, Glyph } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { SOUFFLE_JOUR, SOUFFLE_SOIR, type Souffle } from '../../data/douceurContent';

type Phase = 'inspire' | 'pause' | 'expire';

const styles = StyleSheet.create({
  stage: { height: 300, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  circle: {
    width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(201,168,76,0.22)',
    borderWidth: 2, borderColor: Colors.or, alignItems: 'center', justifyContent: 'center',
  },
  phaseLabel: { position: 'absolute', bottom: 0 },
  doneEmblem: {
    width: 72, height: 72, borderRadius: 36, alignSelf: 'center', backgroundColor: Colors.vert,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md,
  },
});

// Respiration guidée animée : un cercle d'or qui grandit (inspire), se pose (retiens)
// et se rétracte (souffle). Animation de contenu, pas un gadget.
export function BreathScreen({ route }: any) {
  const { t } = useLang();
  const soir: boolean = route?.params?.soir === true;
  const rythme: Souffle = soir ? SOUFFLE_SOIR : SOUFFLE_JOUR;

  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState<Phase>('inspire');
  const [cycle, setCycle] = useState(1);
  const scale = useRef(new Animated.Value(0.7)).current;
  const cycleRef = useRef(1);
  const stopRef = useRef(false);

  useEffect(() => () => { stopRef.current = true; }, []);

  const runPhase = (p: Phase) => {
    if (stopRef.current) return;
    setPhase(p);
    if (p === 'inspire') {
      Animated.timing(scale, { toValue: 1.25, duration: rythme.inspire * 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
        .start(({ finished }) => { if (finished && !stopRef.current) runPhase('pause'); });
    } else if (p === 'pause') {
      setTimeout(() => { if (!stopRef.current) runPhase('expire'); }, rythme.pause * 1000);
    } else {
      Animated.timing(scale, { toValue: 0.7, duration: rythme.expire * 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
        .start(({ finished }) => {
          if (!finished || stopRef.current) return;
          if (cycleRef.current >= rythme.cycles) { setDone(true); setStarted(false); return; }
          cycleRef.current += 1;
          setCycle(cycleRef.current);
          runPhase('inspire');
        });
    }
  };

  const start = () => {
    stopRef.current = false;
    cycleRef.current = 1;
    setCycle(1); setDone(false); setStarted(true);
    scale.setValue(0.7);
    runPhase('inspire');
  };

  const titre = soir ? t('respire_soir_titre') : t('respire_titre');
  const sous = soir ? t('respire_soir_sous') : t('respire_sous');
  const phaseLabel = phase === 'inspire' ? t('respire_inspire') : phase === 'pause' ? t('respire_pause') : t('respire_expire');

  if (done) {
    return (
      <ScreenContainer>
        <View style={styles.doneEmblem}><Glyph size={28} color={Colors.blanc}>✓</Glyph></View>
        <AppText variant="h2" align="center" style={{ marginBottom: Spacing.sm }}>{titre}</AppText>
        <AppText variant="body" color="secondary" align="center" style={{ marginBottom: Spacing.xl }}>{t('respire_fin')}</AppText>
        <AppButton label={t('respire_commencer')} onPress={start} variant="outline" fullWidth />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{titre}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{sous}</AppText>

      <View style={styles.stage}>
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
          {started ? <AppText variant="label" color="or">{phaseLabel}</AppText> : null}
        </Animated.View>
        {started ? (
          <AppText variant="caption" color="muted" style={styles.phaseLabel}>
            {t('respire_cycle').replace('{n}', String(cycle)).replace('{total}', String(rythme.cycles))}
          </AppText>
        ) : null}
      </View>

      {started ? null : (
        <>
          <AppText variant="body" color="secondary" align="center" style={{ marginBottom: Spacing.lg }}>{t('respire_pret')}</AppText>
          <AppButton label={t('respire_commencer')} onPress={start} fullWidth />
        </>
      )}
    </ScreenContainer>
  );
}

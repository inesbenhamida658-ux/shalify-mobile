import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { PARCOURS_21 } from '../../data/douceurContent';
import { getParcours21, toggleParcours21 } from '../../services/douceur';

const styles = StyleSheet.create({
  progressCard: { borderWidth: 1.5, borderColor: Colors.or, marginBottom: Spacing.lg, alignItems: 'center', paddingVertical: Spacing.lg },
  petals: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: Spacing.md, maxWidth: 280 },
  petal: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.bordure },
  petalOn: { backgroundColor: Colors.or },
  jour: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.bordure },
  check: {
    width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: Colors.or,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  checkOn: { backgroundColor: Colors.vert, borderColor: Colors.vert },
});

// Parcours 21 jours : un rituel plus long, progression visuelle en pétales d'or.
export function Journey21Screen() {
  const { t, lang } = useLang();
  const parcours = PARCOURS_21[lang] ?? PARCOURS_21.fr;
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => { getParcours21().then(setDone); }, []);

  const toggle = async (i: number) => { setDone(await toggleParcours21(i)); };
  const count = done.length;

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('parcours21_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('parcours21_sous')}</AppText>

      <AppCard style={styles.progressCard}>
        <AppText variant="h3">{parcours.titre}</AppText>
        <AppText variant="label" color="or" style={{ marginTop: Spacing.sm }}>{t('parcours21_progress').replace('{n}', String(count))}</AppText>
        <View style={styles.petals}>
          {parcours.jours.map((_, i) => (
            <View key={i} style={[styles.petal, done.includes(i) && styles.petalOn]} />
          ))}
        </View>
      </AppCard>

      <AppCard>
        {parcours.jours.map((j, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.jour, i === parcours.jours.length - 1 ? { borderBottomWidth: 0 } : null]}
            onPress={() => toggle(i)}
            activeOpacity={0.8}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: done.includes(i) }}
          >
            <View style={[styles.check, done.includes(i) && styles.checkOn]}>
              {done.includes(i) ? <Glyph size={13} color={Colors.blanc}>✓</Glyph> : null}
            </View>
            <AppText variant="bodySmall" color={done.includes(i) ? 'secondary' : 'primary'} style={{ flex: 1 }}>{j}</AppText>
          </TouchableOpacity>
        ))}
      </AppCard>
    </ScreenContainer>
  );
}

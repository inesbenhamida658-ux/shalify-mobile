import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Glyph } from '../../components';
import { Colors, Spacing } from '../../theme';
import { Fonts } from '../../fonts';
import { useLang } from '../../context/LangContext';
import { MANTRAS, mantraDuJour } from '../../data/rituelContent';

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5, borderColor: Colors.or, backgroundColor: Colors.creme,
    alignItems: 'center', paddingVertical: Spacing.xxl, marginBottom: Spacing.lg,
  },
  emblem: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.creme2, borderWidth: 1, borderColor: Colors.or, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  rule: { width: 40, height: 1, backgroundColor: Colors.or, marginVertical: Spacing.md },
  mantra: { fontFamily: Fonts.serifMedium, fontSize: 26, lineHeight: 36, color: Colors.vert, textAlign: 'center', paddingHorizontal: Spacing.md },
});

export function MantraScreen() {
  const { t, lang } = useLang();
  const list = MANTRAS[lang] ?? MANTRAS.fr;
  const [texte, setTexte] = useState(() => mantraDuJour(lang, new Date()));

  const autre = () => {
    let next = texte;
    while (next === texte && list.length > 1) next = list[Math.floor(Math.random() * list.length)];
    setTexte(next);
  };

  return (
    <ScreenContainer>
      <AppText variant="h2" align="center" style={{ marginBottom: Spacing.xs }}>{t('mantra_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" align="center" style={{ marginBottom: Spacing.lg }}>{t('mantra_sous')}</AppText>

      <AppCard style={styles.card}>
        <View style={styles.emblem}><Glyph size={24} color={Colors.or}>❝</Glyph></View>
        <AppText variant="labelSmall" color="or">{t('mantra_du_jour').toUpperCase()}</AppText>
        <View style={styles.rule} />
        <AppText style={styles.mantra}>{texte}</AppText>
      </AppCard>

      <AppButton label={t('mantra_autre')} onPress={autre} variant="outline" fullWidth />
    </ScreenContainer>
  );
}

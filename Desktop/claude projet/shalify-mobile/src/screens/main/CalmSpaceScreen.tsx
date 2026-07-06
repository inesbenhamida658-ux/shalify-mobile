import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm, flexDirection: 'row', alignItems: 'center' },
  emblem: {
    width: 44, height: 44, borderRadius: 22, marginRight: Spacing.md,
    backgroundColor: Colors.cremeF, borderWidth: 1, borderColor: 'rgba(201,168,76,0.45)',
    alignItems: 'center', justifyContent: 'center',
  },
  body: { flex: 1 },
});

function Row({ glyph, titre, sous, onPress }: { glyph: string; titre: string; sous: string; onPress: () => void }) {
  return (
    <AppCard style={styles.card} onPress={onPress}>
      <View style={styles.emblem}><Glyph size={20} color={Colors.or}>{glyph}</Glyph></View>
      <View style={styles.body}>
        <AppText variant="h3">{titre}</AppText>
        <AppText variant="caption" color="secondary" style={{ marginTop: 2 }}>{sous}</AppText>
      </View>
      <Glyph size={22} color={Colors.or}>›</Glyph>
    </AppCard>
  );
}

// Espace calme : le hub des expériences douces, toutes locales et gratuites.
export function CalmSpaceScreen({ navigation }: any) {
  const { t } = useLang();
  const go = (screen: string, params?: object) => navigation.navigate(screen, params);

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('calme_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('calme_sous')}</AppText>

      <Row glyph="✿" titre={t('carte_titre')} sous={t('carte_sous')} onPress={() => go('CardOfDay')} />
      <Row glyph="◐" titre={t('respire_titre')} sous={t('respire_sous')} onPress={() => go('Breath')} />
      <Row glyph="☾" titre={t('respire_soir_titre')} sous={t('respire_soir_sous')} onPress={() => go('Breath', { soir: true })} />
      <Row glyph="❦" titre={t('emotions_titre')} sous={t('emotions_sous')} onPress={() => go('Emotions')} />
      <Row glyph="☁" titre={t('meteo_titre')} sous={t('meteo_sous')} onPress={() => go('Weather')} />
      <Row glyph="❝" titre={t('affirmation_titre')} sous={t('affirmation_sous')} onPress={() => go('Affirmation')} />
      <Row glyph="✦" titre={t('victoires_titre')} sous={t('victoires_sous')} onPress={() => go('Victories')} />
      <Row glyph="◷" titre={t('minuteur_titre')} sous={t('minuteur_sous')} onPress={() => go('Timer')} />
      <Row glyph="✸" titre={t('parcours21_titre')} sous={t('parcours21_sous')} onPress={() => go('Journey21')} />
      <Row glyph="❞" titre={t('citations_titre')} sous={t('citations_sous')} onPress={() => go('Quotes')} />
      <Row glyph="✎" titre={t('lexique_titre')} sous={t('lexique_sous')} onPress={() => go('Lexicon')} />
      <Row glyph="❋" titre={t('salle_titre')} sous={t('salle_sous')} onPress={() => go('CalmRoom')} />
      <Row glyph="◇" titre={t('progression_titre')} sous={t('progression_sous')} onPress={() => go('Progress')} />
    </ScreenContainer>
  );
}

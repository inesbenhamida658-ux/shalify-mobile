import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton } from '../../components';
import { Spacing } from '../../theme';

const LIEN = 'https://shalify.app/packs';

const PACKS = [
  { titre: 'Trois créations réunies', texte: 'Un ensemble de créations complémentaires, rassemblées à un tarif doux.' },
  { titre: 'Un parcours cohérent', texte: 'Chaque pack suit un fil clair pour vous accompagner pas à pas.' },
  { titre: 'La valeur en avantage', texte: 'Vous profitez de plus, réuni dans une seule offre pensée pour vous.' },
];

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  cta: { marginTop: Spacing.lg },
});

export function PacksScreen() {
  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.sm }}>Les Packs Shalify</AppText>
      <AppText variant="body" color="secondary" style={{ marginBottom: Spacing.lg }}>
        Plusieurs créations réunies dans une seule offre, pensées pour aller ensemble et vous apporter plus.
      </AppText>

      {PACKS.map((p, i) => (
        <AppCard key={i} style={styles.card}>
          <AppText variant="label" style={{ marginBottom: Spacing.sm }}>{p.titre}</AppText>
          <AppText variant="bodySmall" color="secondary">{p.texte}</AppText>
        </AppCard>
      ))}

      <View style={styles.cta}>
        <AppButton label="Voir les packs" onPress={() => Linking.openURL(LIEN)} />
      </View>
    </ScreenContainer>
  );
}

import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton } from '../../components';
import { Spacing } from '../../theme';

const LIEN = 'https://shalify.app/offrir';

const ETAPES = [
  { titre: 'Choisissez une expérience', texte: 'Une création, une séance ou un moment Shalify qui fera plaisir à la personne que vous aimez.' },
  { titre: 'Ajoutez un mot doux', texte: 'Un message personnel accompagne votre cadeau et rend l’attention encore plus belle.' },
  { titre: 'La personne en profite', texte: 'Elle reçoit son accès et vit l’expérience quand elle le souhaite, à son rythme.' },
];

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  num: { marginBottom: Spacing.xs },
  cta: { marginTop: Spacing.lg },
});

export function OffrirScreen() {
  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.sm }}>Offrir une expérience</AppText>
      <AppText variant="body" color="secondary" style={{ marginBottom: Spacing.lg }}>
        Fais vivre un moment Shalify à quelqu’un qui compte. Un geste simple qui met de la lumière dans sa journée.
      </AppText>

      {ETAPES.map((e, i) => (
        <AppCard key={i} style={styles.card}>
          <AppText variant="label" color="or" style={styles.num}>0{i + 1}</AppText>
          <AppText variant="label" style={{ marginBottom: Spacing.xs }}>{e.titre}</AppText>
          <AppText variant="bodySmall" color="secondary">{e.texte}</AppText>
        </AppCard>
      ))}

      <View style={styles.cta}>
        <AppButton label="Offrir maintenant" onPress={() => Linking.openURL(LIEN)} />
      </View>
    </ScreenContainer>
  );
}

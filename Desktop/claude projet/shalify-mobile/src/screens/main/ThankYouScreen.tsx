import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppButton, Glyph } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.xxl },
  emblem: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: Colors.vert,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg,
  },
  texte: { maxWidth: 320, marginBottom: Spacing.xl },
});

// Écran de remerciement après une réservation, chaleureux et rassurant.
export function ThankYouScreen({ navigation }: any) {
  const { t } = useLang();
  return (
    <ScreenContainer>
      <View style={styles.center}>
        <View style={styles.emblem}><Glyph size={34} color={Colors.blanc}>✓</Glyph></View>
        <AppText variant="h2" align="center" style={{ marginBottom: Spacing.md }}>{t('merci_titre')}</AppText>
        <AppText variant="body" color="secondary" align="center" style={styles.texte}>{t('merci_texte')}</AppText>
        <AppButton label={t('merci_retour')} onPress={() => navigation.navigate('Tabs')} fullWidth style={{ maxWidth: 320 }} />
      </View>
    </ScreenContainer>
  );
}

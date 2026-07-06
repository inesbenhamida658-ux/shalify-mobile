import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { Fonts } from '../../fonts';
import { useLang } from '../../context/LangContext';
import { mantraDuJour } from '../../data/mantras';
import { citationDuMois } from '../../data/douceurContent';
import { dayOfYear } from '../../data/rituelContent';

// Images florales de la banque d'Inès (aucun visage), servies par le site.
const IMAGES = [
  'https://shalify.app/creation-ancrage-lever-soleil.jpg',
  'https://shalify.app/creation-boussole-valeurs.jpg',
  'https://shalify.app/creation-empreinte-lumiere.jpg',
  'https://shalify.app/creation-miroir-rond.jpg',
  'https://shalify.app/creation-numerologie-etoiles.jpg',
  'https://shalify.app/creation-voyage-chemin-lumiere.jpg',
];

const styles = StyleSheet.create({
  card: { padding: 0, overflow: 'hidden', borderWidth: 1.5, borderColor: Colors.or, marginBottom: Spacing.lg },
  image: { width: '100%', height: 220, backgroundColor: Colors.cremeF },
  body: { padding: Spacing.lg, alignItems: 'center' },
  phrase: { fontFamily: Fonts.serifMedium, fontSize: 22, lineHeight: 30 },
});

// Carte du jour : une carte inspirante tirée pour la journée, image florale.
export function CardOfDayScreen() {
  const { t, lang } = useLang();
  const [drawn, setDrawn] = useState(false);
  const now = new Date();

  const { image, phrase } = useMemo(() => {
    const idx = dayOfYear(now) % IMAGES.length;
    // Alterne mantra du jour / citation du mois selon la parité du jour.
    const p = dayOfYear(now) % 2 === 0 ? mantraDuJour(lang, now) : citationDuMois(lang, now);
    return { image: IMAGES[idx], phrase: p };
  }, [lang]);

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('carte_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('carte_sous')}</AppText>

      {drawn ? (
        <AppCard style={styles.card}>
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
          <View style={styles.body}>
            <AppText variant="h2" align="center" style={styles.phrase}>« {phrase} »</AppText>
          </View>
        </AppCard>
      ) : (
        <AppButton label={t('carte_tirer')} onPress={() => setDrawn(true)} fullWidth style={{ marginTop: Spacing.xl }} />
      )}
    </ScreenContainer>
  );
}

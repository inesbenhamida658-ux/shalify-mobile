import React from 'react';
import { View, ImageBackground, StyleSheet, Linking } from 'react-native';
import { ScreenContainer } from './ScreenContainer';
import { AppText } from './AppText';
import { AppCard } from './AppCard';
import { AppButton } from './AppButton';
import { Glyph } from './Glyph';
import { Colors, Spacing, Radius, Shadows } from '../theme';
import { Fonts } from '../fonts';
import { ENV } from '../config/env';

// Bloc réutilisable pour les écrans de contenu riche (fidèles aux pages du site).
// Un point d'entrée : titre, intro, sections (titre + texte + puces), citation, action.

export interface ContentBloc {
  titre: string;
  texte?: string;
  puces?: string[];
}

export interface ContentData {
  eyebrow: string;
  titre: string;
  intro: string;
  blocs: ContentBloc[];
  citation?: string;
  actionLabel?: string;
  actionUrl?: string; // ouvre shalify.app pour les fonctions serveur
}

const styles = StyleSheet.create({
  hero: { height: 190, borderRadius: Radius.lg, overflow: 'hidden', marginBottom: Spacing.lg, justifyContent: 'flex-end', ...(Shadows.md as object) },
  heroImg: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.overlay },
  heroBody: { padding: Spacing.lg },
  section: { marginBottom: Spacing.lg },
  puceRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: Spacing.sm },
  puceDot: { color: Colors.or, marginRight: Spacing.sm, marginTop: 1 },
  puceBody: { flex: 1 },
  citation: { borderWidth: 1.5, borderColor: Colors.or, backgroundColor: Colors.creme },
  citationText: { fontFamily: Fonts.serifMedium, fontSize: 19, lineHeight: 29, color: Colors.encre, marginTop: Spacing.xs },
});

export function ContentScreen({ data, image }: { data: ContentData; image?: string }) {
  const openAction = () => {
    if (data.actionUrl) Linking.openURL(data.actionUrl).catch(() => {});
  };

  return (
    <ScreenContainer>
      {image ? (
        <ImageBackground source={{ uri: `${ENV.API_BASE_URL}${image}` }} style={styles.hero} imageStyle={styles.heroImg}>
          <View style={styles.overlay} />
          <View style={styles.heroBody}>
            <AppText variant="labelSmall" color="or">{data.eyebrow}</AppText>
            <AppText variant="h2" color="white" style={{ marginTop: Spacing.xs }}>{data.titre}</AppText>
          </View>
        </ImageBackground>
      ) : (
        <View style={{ marginBottom: Spacing.lg }}>
          <AppText variant="labelSmall" color="or">{data.eyebrow}</AppText>
          <AppText variant="h2" style={{ marginTop: Spacing.xs }}>{data.titre}</AppText>
        </View>
      )}

      <AppText variant="body" color="secondary" style={styles.section}>{data.intro}</AppText>

      {data.blocs.map((b, i) => (
        <AppCard key={i} style={styles.section}>
          <AppText variant="h3" style={{ marginBottom: b.texte ? Spacing.xs : 0 }}>{b.titre}</AppText>
          {b.texte ? <AppText variant="body" color="secondary">{b.texte}</AppText> : null}
          {b.puces?.map((p, j) => (
            <View key={j} style={styles.puceRow}>
              <Glyph size={14} style={styles.puceDot}>✦</Glyph>
              <View style={styles.puceBody}>
                <AppText variant="bodySmall" color="secondary">{p}</AppText>
              </View>
            </View>
          ))}
        </AppCard>
      ))}

      {data.citation ? (
        <AppCard style={{ ...styles.section, ...styles.citation }}>
          <AppText variant="labelSmall" color="or">{data.eyebrow}</AppText>
          <AppText style={styles.citationText}>{data.citation}</AppText>
        </AppCard>
      ) : null}

      {data.actionLabel && data.actionUrl ? (
        <AppButton label={data.actionLabel} onPress={openAction} variant="primary" style={{ marginBottom: Spacing.md }} />
      ) : null}
    </ScreenContainer>
  );
}

import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText } from '../../components';
import { Colors, Spacing, Radius, Shadows } from '../../theme';
import { ENV } from '../../config/env';

// Les 7 rubriques — MÊMES médias que le site live shalify.app (images sujet, claires).
// image = chemin exact servi par le site (même domaine que l'appli-web => se charge direct).
// video (Shalify Connect) : shalify-connexion-video.mp4 sur le site, poster affiché ici en attendant le lecteur vidéo.
type Rubrique = { nom: string; rubrique: string; image: string; exemples: string; accroche: string };

const RUBRIQUES: Rubrique[] = [
  { nom: 'Compétences', rubrique: 'Compétences', image: '/rubrique-competences.jpg', exemples: 'Avocats · Experts · Architectes · Ingénieurs · Consultants', accroche: 'Ton savoir atteint les personnes qui en ont besoin, partout dans le monde.' },
  { nom: 'Artisanat & Création', rubrique: 'Artisanat & Création', image: '/rubrique-artisanat.jpg', exemples: 'Cuisiniers · Artistes · Couturiers · Musiciens · Photographes', accroche: 'Tes créations uniques atteignent ceux qui les cherchent vraiment.' },
  { nom: 'Transformation', rubrique: 'Transformation', image: '/rubrique-transformation.jpg', exemples: 'Accompagnants certifiés · Praticiens · Yoga · Méditation · Évolution personnelle', accroche: 'Un accompagnement existe pour exactement là où tu en es.' },
  { nom: 'Savoirs', rubrique: 'Savoirs', image: '/rubrique-savoirs.jpg', exemples: 'Formations · Audios · Livres · Masterclasses · Programmes', accroche: 'Tu enregistres une fois. Des centaines de personnes vivent la transformation.' },
  { nom: 'Lives', rubrique: 'Lives', image: '/rubrique-lives.jpg', exemples: 'Sessions collectives · Ateliers · Conférences · Cercles', accroche: 'Le vivant est irremplaçable. Sois là où tout se passe en ce moment.' },
  { nom: 'Shalify Connect', rubrique: 'Résonance', image: '/rubrique-connexion.jpg', exemples: 'Matching par valeurs · Profils vérifiés · Connexions sincères', accroche: 'La connexion sincère commence ici. Le matching se fait sur qui tu es vraiment.' },
  { nom: 'Autres talents & savoir-faire', rubrique: 'Autres talents & savoir-faire', image: '/rubrique-autres.jpg', exemples: 'Mères · Retraités · Jardiniers · Mécaniciens · Autodidactes · Passionnés', accroche: 'Ton expérience vécue est ta plus grande qualification. Partage ce que tu maîtrises vraiment.' },
];

const styles = StyleSheet.create({
  intro: { marginBottom: Spacing.lg, marginTop: Spacing.sm },
  label: { letterSpacing: 3, marginBottom: Spacing.xs },
  card: {
    backgroundColor: Colors.blanc,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...(Shadows.md as object),
  },
  image: { height: 150, justifyContent: 'flex-end' },
  imageInner: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.overlay },
  titleOnImage: { padding: Spacing.md },
  body: { padding: Spacing.md, borderLeftWidth: 3, borderLeftColor: Colors.or },
  accroche: { marginTop: Spacing.xs },
});

export function RubriquesScreen({ navigation }: any) {
  return (
    <ScreenContainer>
      <View style={styles.intro}>
        <AppText variant="caption" color="or" style={styles.label}>TROUVE TA PLACE</AppText>
        <AppText variant="h2">Sept rubriques. Un talent comme le tien.</AppText>
      </View>

      {RUBRIQUES.map((r) => (
        <TouchableOpacity
          key={r.rubrique}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => navigation?.navigate?.('CreateursList', { rubrique: r.rubrique })}
        >
          <ImageBackground
            source={{ uri: `${ENV.API_BASE_URL}${r.image}` }}
            style={styles.image}
            imageStyle={styles.imageInner}
          >
            <View style={styles.overlay} />
            <View style={styles.titleOnImage}>
              <AppText variant="h2" color="white">{r.nom}</AppText>
            </View>
          </ImageBackground>
          <View style={styles.body}>
            <AppText variant="caption" color="or">{r.exemples}</AppText>
            <AppText variant="bodySmall" color="secondary" style={styles.accroche}>{r.accroche}</AppText>
          </View>
        </TouchableOpacity>
      ))}
    </ScreenContainer>
  );
}

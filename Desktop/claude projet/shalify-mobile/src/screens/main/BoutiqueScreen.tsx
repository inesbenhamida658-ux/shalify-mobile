import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, AppText, AppCard, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';

// La Boutique de l'appli : la même vitrine que le site, rangée en quatre univers.
// Chaque carte pousse vers un écran déjà présent (Compatibilité, Guidance,
// Abonnement, Parrainage, Test offert). Style luxe crème, liseré or, aucune image.

interface Carte {
  titre: string;
  resume: string;
  prix: string;
  route: string;
  offert?: boolean;
}
interface Univers {
  cle: string;
  titre: string;
  phrase: string;
  cartes: Carte[];
}

const UNIVERS: Univers[] = [
  {
    cle: 'se-reveler',
    titre: 'Se révéler',
    phrase: 'Les portraits vivants qui mettent des mots justes sur toi.',
    cartes: [
      { titre: 'Compatibilité', resume: 'La résonance entre deux prénoms, deux élans.', prix: '19', route: 'Compatibility' },
      { titre: 'Guidance du Mois', resume: 'Ton éclairage renouvelé chaque mois.', prix: '19 par mois', route: 'Guidance' },
    ],
  },
  {
    cle: 'se-relier',
    titre: 'Se relier',
    phrase: 'Le Cercle Shalify : le pass qui ouvre toutes les créations.',
    cartes: [
      { titre: 'Cercle Shalify', resume: 'Un seul accès ouvre tout. Premier mois à prix doux.', prix: '25 par mois', route: 'Subscription' },
    ],
  },
  {
    cle: 'transmettre',
    titre: 'Transmettre',
    phrase: 'Les leviers qui mettent ton talent sous la plus belle lumière.',
    cartes: [
      { titre: 'Packs créateur', resume: 'Trois créations réunies à prix doux.', prix: 'Plusieurs formules', route: 'Packs' },
    ],
  },
  {
    cle: 'offert',
    titre: 'Offert',
    phrase: 'Ton premier pas, en cadeau, pour goûter la magie.',
    cartes: [
      { titre: 'Ton test découverte', resume: 'Un premier portrait vivant t\'attend, offert.', prix: 'Offert', route: 'Quiz', offert: true },
    ],
  },
];

const styles = StyleSheet.create({
  entete: { alignItems: 'center', marginBottom: Spacing.lg },
  filet: { height: 2, alignSelf: 'stretch', backgroundColor: Colors.or, opacity: 0.4, marginBottom: Spacing.lg },
  univers: { marginBottom: Spacing.xl },
  universEntete: { alignItems: 'center', marginBottom: Spacing.md },
  carte: { marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.orClair },
  banniereOr: { height: 68, borderTopLeftRadius: Radius.md, borderTopRightRadius: Radius.md, backgroundColor: 'rgba(201,168,76,0.22)', justifyContent: 'center', paddingHorizontal: Spacing.md },
  badge: { alignSelf: 'flex-start', backgroundColor: Colors.vertF, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  ligneBas: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.sm },
});

export function BoutiqueScreen() {
  const navigation = useNavigation<{ navigate: (r: string) => void }>();
  useLang();

  return (
    <ScreenContainer>
      <View style={styles.filet} />
      <View style={styles.entete}>
        <AppText variant="labelSmall" color="or">LA BOUTIQUE</AppText>
        <AppText variant="h1" align="center" style={{ marginTop: Spacing.xs }}>Tout Shalify, réuni</AppText>
        <AppText variant="bodySmall" color="secondary" align="center" style={{ marginTop: Spacing.sm, maxWidth: 320 }}>
          Choisis l&apos;univers qui t&apos;appelle aujourd&apos;hui.
        </AppText>
      </View>

      {UNIVERS.map((u) => (
        <View key={u.cle} style={styles.univers}>
          <View style={styles.universEntete}>
            <AppText variant="h3" align="center">{u.titre}</AppText>
            <AppText variant="caption" color="secondary" align="center" style={{ marginTop: 4, maxWidth: 300 }}>{u.phrase}</AppText>
          </View>

          {u.cartes.map((c) => (
            <AppCard key={c.titre} style={styles.carte} padding={0} onPress={() => navigation.navigate(c.route)}>
              <View style={styles.banniereOr}>
                {c.offert && (
                  <View style={styles.badge}><AppText variant="caption" color="or">OFFERT</AppText></View>
                )}
              </View>
              <View style={{ padding: Spacing.md }}>
                <AppText variant="h3">{c.titre}</AppText>
                <AppText variant="bodySmall" color="secondary" style={{ marginTop: 4 }}>{c.resume}</AppText>
                <View style={styles.ligneBas}>
                  <AppText variant="body" color="or" style={{ fontWeight: '700' }}>{c.prix}</AppText>
                  <Glyph size={16} color={Colors.vert}>→</Glyph>
                </View>
              </View>
            </AppCard>
          ))}
        </View>
      ))}
    </ScreenContainer>
  );
}

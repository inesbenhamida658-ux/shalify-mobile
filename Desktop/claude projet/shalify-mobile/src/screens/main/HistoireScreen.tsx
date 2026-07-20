import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, Glyph } from '../../components';
import { Colors, Spacing, Radius, Shadows } from '../../theme';
import { Fonts } from '../../fonts';
import { useLang } from '../../context/LangContext';
import { ENV } from '../../config/env';

// Page « Notre histoire » riche, dans le style du site.
// Image d'ambiance servie par shalify.app (banque d'Inès, sans visage).
const HERO_IMAGE = '/rituel-matin-lever.jpg';

interface Contenu {
  eyebrow: string;
  titre: string;
  intro: string;
  histoireTitre: string;
  histoire: string;
  valeursTitre: string;
  valeurs: { titre: string; texte: string }[];
  visionTitre: string;
  vision: string;
}

const TXT: Record<string, Contenu> = {
  fr: {
    eyebrow: 'NOTRE HISTOIRE',
    titre: 'Shalify est née d’une conviction douce.',
    intro: 'Chaque personne porte une valeur réelle à partager. Shalify existe pour que ce talent rencontre celles et ceux qui en ont besoin, avec sincérité.',
    histoireTitre: 'Le point de départ',
    histoire: 'Tout a commencé par une idée simple : offrir à chaque savoir-faire un lieu digne, clair, apaisant. Un espace où l’humain passe avant la vitrine, où l’on avance à son rythme, où la confiance se construit pas à pas.',
    valeursTitre: 'Nos valeurs fondatrices',
    valeurs: [
      { titre: 'Sincérité', texte: 'Des profils vrais, des connexions qui reposent sur qui l’on est vraiment.' },
      { titre: 'Douceur', texte: 'Une expérience qui apaise, jamais pressante, toujours respectueuse de votre rythme.' },
      { titre: 'Valeur partagée', texte: 'Le créateur reste au cœur : sa juste part lui revient, son savoir circule.' },
      { titre: 'Ancrage', texte: 'Tout reste chez vous, en local, sans dépendance. Votre tranquillité d’abord.' },
    ],
    visionTitre: 'Là où nous allons',
    vision: 'Faire de Shalify un lieu qui grandit avec ses membres, où chaque talent trouve sa place et où la rencontre garde toute sa chaleur.',
  },
  en: {
    eyebrow: 'OUR STORY',
    titre: 'Shalify was born from a gentle belief.',
    intro: 'Every person carries a real value to share. Shalify exists so that talent meets those who need it, with sincerity.',
    histoireTitre: 'The starting point',
    histoire: 'It all began with a simple idea: give every skill a worthy, clear, soothing place. A space where the human comes before the showcase, where you move at your own pace, where trust is built step by step.',
    valeursTitre: 'Our founding values',
    valeurs: [
      { titre: 'Sincerity', texte: 'Real profiles, connections that rest on who we truly are.' },
      { titre: 'Gentleness', texte: 'An experience that soothes, never pressing, always respectful of your pace.' },
      { titre: 'Shared value', texte: 'The creator stays at the heart: their fair share returns to them, their knowledge flows.' },
      { titre: 'Grounding', texte: 'Everything stays with you, local, without dependency. Your peace first.' },
    ],
    visionTitre: 'Where we are going',
    vision: 'To make Shalify a place that grows with its members, where every talent finds its place and the meeting keeps all its warmth.',
  },
  ar: {
    eyebrow: 'قصّتنا',
    titre: 'وُلدت شاليفاي من قناعة لطيفة.',
    intro: 'كلّ إنسان يحمل قيمة حقيقية ليشاركها. شاليفاي موجودة كي يلتقي هذا الموهبة بمن يحتاجها، بصدق.',
    histoireTitre: 'نقطة البداية',
    histoire: 'بدأ كلّ شيء بفكرة بسيطة: أن نمنح كلّ مهارة مكاناً لائقاً وواضحاً ومطمئناً. فضاء يسبق فيه الإنسانُ الواجهةَ، وتتقدّم فيه على إيقاعك، وتُبنى فيه الثقة خطوة بخطوة.',
    valeursTitre: 'قيمنا المؤسِّسة',
    valeurs: [
      { titre: 'الصدق', texte: 'ملفّات حقيقية، وروابط تقوم على من نحن فعلاً.' },
      { titre: 'اللّطف', texte: 'تجربة تُهدّئ، بلا ضغط، وتحترم إيقاعك دائماً.' },
      { titre: 'القيمة المشتركة', texte: 'المبدع في القلب: نصيبه العادل يعود إليه، ومعرفته تسري.' },
      { titre: 'التجذّر', texte: 'كلّ شيء يبقى عندك، محلياً، بلا تبعية. راحتك أولاً.' },
    ],
    visionTitre: 'إلى أين نمضي',
    vision: 'أن نجعل شاليفاي مكاناً ينمو مع أعضائه، حيث تجد كلّ موهبة مكانها ويحتفظ اللقاء بكلّ دفئه.',
  },
};

const styles = StyleSheet.create({
  hero: { height: 200, borderRadius: Radius.lg, overflow: 'hidden', marginBottom: Spacing.lg, justifyContent: 'flex-end', ...(Shadows.md as object) },
  heroImg: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.overlay },
  heroBody: { padding: Spacing.lg },
  section: { marginBottom: Spacing.lg },
  valeurRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.md },
  valeurEmblem: {
    width: 40, height: 40, borderRadius: Radius.full, marginRight: Spacing.md,
    backgroundColor: Colors.cremeF, borderWidth: 1, borderColor: 'rgba(201,168,76,0.45)',
    alignItems: 'center', justifyContent: 'center',
  },
  valeurBody: { flex: 1 },
  vision: { borderWidth: 1.5, borderColor: Colors.or, backgroundColor: Colors.creme },
  visionText: { fontFamily: Fonts.serifMedium, fontSize: 20, lineHeight: 30, color: Colors.encre, marginTop: Spacing.xs },
});

export function HistoireScreen() {
  const { lang } = useLang();
  const c = TXT[lang] ?? TXT.fr;

  return (
    <ScreenContainer>
      <ImageBackground
        source={{ uri: `${ENV.API_BASE_URL}${HERO_IMAGE}` }}
        style={styles.hero}
        imageStyle={styles.heroImg}
      >
        <View style={styles.overlay} />
        <View style={styles.heroBody}>
          <AppText variant="labelSmall" color="or">{c.eyebrow}</AppText>
          <AppText variant="h2" color="white" style={{ marginTop: Spacing.xs }}>{c.titre}</AppText>
        </View>
      </ImageBackground>

      <AppText variant="body" color="secondary" style={styles.section}>{c.intro}</AppText>

      <AppCard style={styles.section}>
        <AppText variant="h3" style={{ marginBottom: Spacing.xs }}>{c.histoireTitre}</AppText>
        <AppText variant="body" color="secondary">{c.histoire}</AppText>
      </AppCard>

      <View style={styles.section}>
        <AppText variant="h3" style={{ marginBottom: Spacing.md }}>{c.valeursTitre}</AppText>
        {c.valeurs.map((v, i) => (
          <View key={i} style={styles.valeurRow}>
            <View style={styles.valeurEmblem}><Glyph size={16} color={Colors.or}>❋</Glyph></View>
            <View style={styles.valeurBody}>
              <AppText variant="label">{v.titre}</AppText>
              <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{v.texte}</AppText>
            </View>
          </View>
        ))}
      </View>

      <AppCard style={styles.vision}>
        <AppText variant="labelSmall" color="or">{c.visionTitre.toUpperCase()}</AppText>
        <AppText style={styles.visionText}>{c.vision}</AppText>
      </AppCard>
    </ScreenContainer>
  );
}

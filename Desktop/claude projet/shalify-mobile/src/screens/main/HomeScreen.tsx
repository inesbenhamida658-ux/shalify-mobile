import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenContainer, AppText, AppCard, AppButton, Avatar, Glyph, ErrorState, CreatorListSkeleton, SkeletonBlock } from '../../components';
import { Colors, Spacing, Radius, Shadows, Typography } from '../../theme';
import { Fonts } from '../../fonts';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreators, creatorOfWeek } from '../../services/creators';
import { getFormations } from '../../services/formations';
import { getUpcomingLives } from '../../services/lives';
import { getTestResult, shouldShowRappel } from '../../services/douceur';
import { TEST_PROFILS } from '../../data/experienceContent';
import { mantraDuJour } from '../../data/mantras';
import { UNIVERS, universLabel, universSous, type Univers } from '../../data/univers';
import type { Creator, Formation, Live } from '../../types';
import type { MainTabParamList } from '../../navigation/MainTabs';

const styles = StyleSheet.create({
  // Hero validé : dégradé vert profond + halo doré (charte DESIGN-SHALIFY-VALIDE)
  hero: {
    borderRadius: Radius.xl,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'center',
    overflow: 'hidden',
    ...(Shadows.lg as object),
  },
  heroRule: { width: 44, height: 1, backgroundColor: Colors.or, marginVertical: Spacing.md },
  heroTitle: { marginTop: 2 },
  heroSub: {
    fontFamily: Fonts.bodyLight,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    color: 'rgba(250,246,238,0.92)',
    marginTop: Spacing.md,
    maxWidth: 340,
  },
  heroCta: {
    backgroundColor: Colors.or,
    borderRadius: Radius.pill,
    paddingVertical: 14,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
  },
  heroCtaText: { color: Colors.encre, letterSpacing: 1.4 },
  mantraLine: { marginTop: Spacing.md, marginBottom: Spacing.sm, paddingHorizontal: Spacing.lg },
  // Bande chiffres animés (comme le site : montent + pourcentage)
  statsWrap: { marginTop: Spacing.md, marginBottom: Spacing.sm },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  statCard: { flex: 1, backgroundColor: Colors.blanc, borderWidth: 1, borderColor: Colors.bordure, borderRadius: Radius.md, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xs, alignItems: 'center' },
  statNum: { fontFamily: Fonts.serifMedium, fontSize: 30, color: Colors.vert, lineHeight: 34 },
  statLabel: { marginTop: Spacing.xs, textTransform: 'uppercase', letterSpacing: 0.4, fontSize: 10 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md, marginTop: Spacing.lg },
  card: { marginBottom: Spacing.md },
  // Carte créateur : avatar + infos
  creatorRow: { flexDirection: 'row', alignItems: 'center' },
  creatorBody: { flex: 1, marginLeft: Spacing.md },
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  badge: { backgroundColor: Colors.vert, width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginLeft: Spacing.xs },
  tarifPill: { backgroundColor: Colors.cremeF, borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 3, alignSelf: 'flex-start', marginTop: Spacing.xs },
  // Créateur du jour (mise en avant)
  featured: { borderWidth: 1.5, borderColor: Colors.or, padding: Spacing.lg, marginBottom: Spacing.sm, ...(Shadows.lg as object) },
  featuredTop: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  featuredEyebrow: { flex: 1, marginLeft: Spacing.md },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.xs },
  mantra: { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(212,168,83,0.35)', width: '100%' },
  resourceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  // Les 7 univers (cartes blanches, chiffre d'or, fin trait or) — comme le site
  universCard: { marginBottom: Spacing.md, borderRadius: Radius.lg, overflow: 'hidden', ...(Shadows.md as object) },
  universBanner: { height: 132, justifyContent: 'flex-end' },
  universRomanBadge: {
    position: 'absolute', top: Spacing.sm, left: Spacing.sm, width: 34, height: 34, borderRadius: 10,
    borderWidth: 1, borderColor: 'rgba(231,206,130,0.85)', backgroundColor: 'rgba(20,40,29,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  universRomanText: { fontFamily: Fonts.serifMedium, fontSize: 18, color: Colors.orClair, letterSpacing: 1 },
  universBannerText: { padding: Spacing.md },
  // Bande expériences (mantra, guidance, ancrage, compatibilité) — accessible à tous
  expRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.sm },
  expCard: {
    flexGrow: 1, flexBasis: '18%', minWidth: 68, backgroundColor: Colors.blanc, borderWidth: 1, borderColor: Colors.bordure,
    borderRadius: Radius.md, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xs, alignItems: 'center',
  },
  expEmblem: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.cremeF,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.45)', alignItems: 'center', justifyContent: 'center',
  },
});

function TarifPill({ tarif, devise }: { tarif?: number; devise?: string }) {
  if (typeof tarif !== 'number') return null;
  return (
    <View style={styles.tarifPill}>
      <AppText variant="caption" color="secondary">{`${tarif} ${devise ?? ''}`.trim()}</AppText>
    </View>
  );
}

function VerifiedBadge() {
  return <View style={styles.badge}><Glyph size={10} color={Colors.blanc}>✓</Glyph></View>;
}

function CreatorCard({ creator, onPress }: { creator: Creator; onPress?: () => void }) {
  return (
    <AppCard style={styles.card} onPress={onPress}>
      <View style={styles.creatorRow}>
        <Avatar uri={creator.photoUrl} prenom={creator.prenom} nom={creator.nom} size={56} />
        <View style={styles.creatorBody}>
          <View style={styles.nameRow}>
            <AppText variant="h3">{creator.prenom} {creator.nom}</AppText>
            {creator.verified && <VerifiedBadge />}
          </View>
          <AppText variant="bodySmall" color="secondary">{creator.rubrique}</AppText>
          {creator.specialite ? <AppText variant="caption" color="or" style={{ marginTop: 2 }}>{creator.specialite}</AppText> : null}
          <TarifPill tarif={creator.tarif} devise={creator.devise} />
        </View>
      </View>
      {creator.bio ? <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.md }} numberOfLines={2}>{creator.bio}</AppText> : null}
    </AppCard>
  );
}

function FeaturedCard({ creator, label, cta, onPress }: { creator: Creator; label: string; cta: string; onPress?: () => void }) {
  return (
    <AppCard style={styles.featured} onPress={onPress}>
      <View style={styles.featuredTop}>
        <Avatar uri={creator.photoUrl} prenom={creator.prenom} nom={creator.nom} size={64} />
        <View style={styles.featuredEyebrow}>
          <AppText variant="labelSmall" color="or">{label.toUpperCase()}</AppText>
          <View style={styles.nameRow}>
            <AppText variant="h3">{creator.prenom} {creator.nom}</AppText>
            {creator.verified && <VerifiedBadge />}
          </View>
          <AppText variant="bodySmall" color="secondary">{creator.specialite ?? creator.rubrique}</AppText>
        </View>
      </View>
      {creator.bio ? <AppText variant="body" color="secondary" numberOfLines={3}>{creator.bio}</AppText> : null}
      <AppButton label={cta} onPress={onPress ?? (() => {})} variant="outline" style={{ marginTop: Spacing.md }} fullWidth />
    </AppCard>
  );
}

function UniversCard({ u, lang, onPress }: { u: Univers; lang: string; onPress?: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.universCard} accessibilityRole="button">
      <ImageBackground source={{ uri: u.image }} style={styles.universBanner} imageStyle={{ borderRadius: Radius.lg }}>
        <LinearGradient
          colors={['rgba(20,40,29,0.12)', 'rgba(20,40,29,0.82)']}
          start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill} pointerEvents="none"
        />
        <View style={styles.universRomanBadge}><Text style={styles.universRomanText}>{u.roman}</Text></View>
        <View style={styles.universBannerText}>
          <AppText variant="h3" color="white">{universLabel(u, lang)}</AppText>
          <AppText variant="caption" color="white" style={{ marginTop: 2, opacity: 0.9 }}>{universSous(u, lang)}</AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function ResourceCard({ titre, sous, prix, devise }: { titre: string; sous: string; prix?: number; devise?: string }) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.resourceRow}>
        <AppText variant="label" style={{ flex: 1, marginRight: Spacing.sm }}>{titre}</AppText>
        {typeof prix === 'number' ? <AppText variant="label" color="or">{prix} {devise}</AppText> : null}
      </View>
      <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{sous}</AppText>
    </AppCard>
  );
}

// Titre du hero avec le mot accent (« valeur ») en or clair.
function HeroTitle({ titre, accent }: { titre: string; accent: string }) {
  const idx = accent ? titre.indexOf(accent) : -1;
  if (idx < 0) {
    return <AppText variant="h1" color="white" align="center" style={styles.heroTitle}>{titre}</AppText>;
  }
  const before = titre.slice(0, idx);
  const after = titre.slice(idx + accent.length);
  return (
    <Text style={[Typography.h1 as object, { color: Colors.creme, textAlign: 'center' }, styles.heroTitle]}>
      {before}
      <Text style={{ color: Colors.orClair }}>{accent}</Text>
      {after}
    </Text>
  );
}

// Hero validé : fond vert profond + halo doré, titre crème, sous-titre, bouton.
function HomeHero({ label, titre, accent, sousTitre, cta, onCta }:
  { label: string; titre: string; accent: string; sousTitre: string; cta: string; onCta: () => void }) {
  return (
    <LinearGradient
      colors={[Colors.vert, Colors.vertF]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <LinearGradient
        colors={['rgba(201,168,76,0.30)', 'rgba(201,168,76,0)']}
        start={{ x: 0.92, y: 0 }}
        end={{ x: 0.35, y: 0.8 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <AppText variant="labelSmall" color="or" align="center">{label.toUpperCase()}</AppText>
      <View style={styles.heroRule} />
      <HeroTitle titre={titre} accent={accent} />
      <Text style={styles.heroSub}>{sousTitre}</Text>
      <TouchableOpacity style={styles.heroCta} onPress={onCta} activeOpacity={0.85} accessibilityRole="button" accessibilityLabel={cta}>
        <AppText variant="button" style={styles.heroCtaText}>{cta}</AppText>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// Chiffres animés (mêmes valeurs que le site : 500+, 75 %, 7). Les nombres montent au montage.
const STATS = [
  { target: 500, suffix: '+' },
  { target: 75, suffix: ' %' },
  { target: 7, suffix: '' },
];
const STATS_LABELS: Record<string, string[]> = {
  fr: ['Fondateurs rejoints', 'Reversés au créateur', 'Espaces Shalify'],
  en: ['Founders joined', 'Paid to the creator', 'Shalify spaces'],
  ar: ['مؤسّسون انضمّوا', 'يُحوّل للمبدع', 'فضاءات شاليفاي'],
};
const STATS_TITRE: Record<string, string> = { fr: 'CONSTRUIT AVEC INTENTION', en: 'BUILT WITH INTENTION', ar: 'بُنِي بنيّة' };

function useCountUp(target: number, duration = 1400): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cur = 0;
    const stepMs = 16;
    const steps = Math.ceil(duration / stepMs);
    const inc = target / steps;
    const timer = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setVal(Math.round(cur));
      if (cur >= target) clearInterval(timer);
    }, stepMs);
    return () => clearInterval(timer);
  }, [target, duration]);
  return val;
}

function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const val = useCountUp(target);
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNum}>{val}{suffix}</Text>
      <AppText variant="caption" color="secondary" align="center" style={styles.statLabel}>{label}</AppText>
    </View>
  );
}

function StatsBand({ lang }: { lang: string }) {
  const labels = STATS_LABELS[lang] ?? STATS_LABELS.fr;
  return (
    <View style={styles.statsWrap}>
      <AppText variant="labelSmall" color="or" align="center">{STATS_TITRE[lang] ?? STATS_TITRE.fr}</AppText>
      <View style={styles.statsRow}>
        {STATS.map((s, i) => <StatCard key={`${s.target}${s.suffix}`} target={s.target} suffix={s.suffix} label={labels[i]} />)}
      </View>
    </View>
  );
}

export function HomeScreen() {
  const { t, lang } = useLang();
  const { token } = useAuth();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [lives, setLives] = useState<Live[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [testProfil, setTestProfil] = useState<string | null>(null);
  const [rappel, setRappel] = useState(false);

  useEffect(() => { getTestResult().then(setTestProfil).catch(() => setTestProfil(null)); }, []);
  useEffect(() => { shouldShowRappel().then(setRappel).catch(() => setRappel(false)); }, []);

  // Message doux du rappel (opt-in). Change chaque jour, jamais pressant.
  const RAPPEL_MSG: Record<string, string[]> = {
    fr: ['Ravie de vous revoir. Prenez un instant pour vous aujourd’hui.', 'Votre présence compte. Respirez, tout doucement.', 'Un petit pas suffit. Vous êtes exactement là où il faut.'],
    en: ['Glad to see you again. Take a moment for yourself today.', 'Your presence matters. Breathe, very gently.', 'One small step is enough. You are exactly where you need to be.'],
    ar: ['سعيدة برؤيتك من جديد. خذ لحظة لنفسك اليوم.', 'حضورك مهمّ. تنفّس بلطف شديد.', 'خطوة صغيرة تكفي. أنت تماماً حيث يجب أن تكون.'],
  };
  const rappelTexte = (RAPPEL_MSG[lang] ?? RAPPEL_MSG.fr)[new Date().getDate() % 3];

  const load = (): Promise<void> => {
    setLoading(true); setError('');
    getFormations(token ?? undefined).then(list => setFormations(list.slice(0, 3))).catch(() => setFormations([]));
    getUpcomingLives(token ?? undefined).then(list => setLives(list.slice(0, 3))).catch(() => setLives([]));
    return getCreators(token ?? undefined)
      .then(list => setCreators(list))
      .catch(() => setError(t('erreur_reseau')))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [token]);

  if (loading) return (
    <ScreenContainer>
      <SkeletonBlock width="100%" height={190} radius={Radius.xl} />
      <View style={{ marginTop: Spacing.lg }}>
        <CreatorListSkeleton count={4} />
      </View>
    </ScreenContainer>
  );
  if (error) return <ErrorState message={error} onRetry={load} />;

  const featured = creatorOfWeek(creators) ?? creators[0];
  const rest = creators.filter(c => c.id !== featured?.id).slice(0, 5);
  const profilRappel = testProfil ? (TEST_PROFILS[lang] ?? TEST_PROFILS.fr).find(p => p.key === testProfil) : null;
  const goCreateurs = () => navigation.navigate('CreateursTab');
  const goFormations = () => (navigation as any).navigate('Formations');
  const goLives = () => (navigation as any).navigate('Lives');

  return (
    <ScreenContainer onRefresh={load}>
      <HomeHero
        label={t('home_titre')}
        titre={t('home_hero_titre')}
        accent={t('home_hero_valeur')}
        sousTitre={t('home_hero_soustitre')}
        cta={t('home_hero_cta')}
        onCta={goCreateurs}
      />
      <View style={styles.mantraLine}>
        <AppText variant="bodySmall" color="secondary" align="center" style={{ fontFamily: Fonts.serifMedium, fontSize: 17 }}>
          « {mantraDuJour(lang)} »
        </AppText>
      </View>

      {rappel && (
        <AppCard style={{ marginTop: Spacing.md, borderLeftWidth: 3, borderLeftColor: Colors.or, backgroundColor: Colors.creme }}>
          <AppText variant="labelSmall" color="or">{(lang === 'en' ? 'Gentle reminder' : lang === 'ar' ? 'تذكير لطيف' : 'Rappel doux').toUpperCase()}</AppText>
          <AppText variant="body" color="secondary" style={{ marginTop: Spacing.xs }}>{rappelTexte}</AppText>
        </AppCard>
      )}

      <StatsBand lang={lang} />

      {/* Bannière À découvrir : la Boutique (même esprit que le site) */}
      <AppCard
        style={{ marginTop: Spacing.md, borderWidth: 1, borderColor: Colors.or, backgroundColor: Colors.creme }}
        onPress={() => (navigation as any).navigate('Boutique')}
      >
        <AppText variant="labelSmall" color="or">
          {(lang === 'en' ? 'To discover' : lang === 'ar' ? 'لتكتشف' : 'À découvrir').toUpperCase()}
        </AppText>
        <AppText variant="h3" style={{ marginTop: Spacing.xs }}>
          {lang === 'en' ? 'The Shop, all of Shalify' : lang === 'ar' ? 'المتجر، كل شاليفاي' : 'La Boutique, tout Shalify'}
        </AppText>
        <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>
          {lang === 'en' ? 'Living portraits, the Circle, and your first step offered.' : lang === 'ar' ? 'صور حيّة، والدائرة، وخطوتك الأولى هدية.' : 'Les portraits vivants, le Cercle, et votre premier pas offert.'}
        </AppText>
      </AppCard>

      {/* Bannière Ensemble : les onze façons de se relier, chaque jour */}
      <AppCard
        style={{ marginTop: Spacing.md, borderWidth: 1, borderColor: Colors.or, backgroundColor: Colors.creme }}
        onPress={() => (navigation as any).navigate('Ensemble')}
      >
        <AppText variant="labelSmall" color="or">
          {(lang === 'en' ? 'Together' : lang === 'ar' ? 'معًا' : 'Ensemble').toUpperCase()}
        </AppText>
        <AppText variant="h3" style={{ marginTop: Spacing.xs }}>
          {lang === 'en' ? 'Connect, every day' : lang === 'ar' ? 'ترابط، كل يوم' : 'Se relier, chaque jour'}
        </AppText>
        <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>
          {lang === 'en' ? 'Your feeling, the evening ritual, the anchor duo, and more.' : lang === 'ar' ? 'شعورك، طقس المساء، ثنائي الأيام، والمزيد.' : 'Votre ressenti, le rituel du soir, le duo d’ancrage, et plus.'}
        </AppText>
      </AppCard>

      {/* Bannière Agenda : réserver un créneau avec un créateur (même backend que le site) */}
      <AppCard
        style={{ marginTop: Spacing.md, borderWidth: 1, borderColor: Colors.or, backgroundColor: Colors.creme }}
        onPress={() => (navigation as any).navigate('Agenda')}
      >
        <AppText variant="labelSmall" color="or">
          {(lang === 'en' ? 'Agenda' : lang === 'ar' ? 'الأجندة' : 'Agenda').toUpperCase()}
        </AppText>
        <AppText variant="h3" style={{ marginTop: Spacing.xs }}>
          {lang === 'en' ? 'Book your slot' : lang === 'ar' ? 'احجز خانتك' : 'Réservez votre créneau'}
        </AppText>
        <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>
          {lang === 'en' ? 'Pick a creator, choose a free slot, confirmation by email.' : lang === 'ar' ? 'اختر مبدعًا، اختر خانة متاحة، التأكيد عبر البريد.' : 'Choisissez un créateur, un créneau libre, confirmation par email.'}
        </AppText>
      </AppCard>

      {profilRappel && (
        <AppCard style={{ marginTop: Spacing.md, borderWidth: 1.5, borderColor: Colors.or }} onPress={() => (navigation as any).navigate('Test')}>
          <AppText variant="labelSmall" color="or">{t('home_test_rappel').toUpperCase()}</AppText>
          <AppText variant="h3" style={{ marginTop: Spacing.xs }}>{profilRappel.titre}</AppText>
          <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }} numberOfLines={2}>{profilRappel.texte}</AppText>
        </AppCard>
      )}

      <AppText variant="labelSmall" color="secondary" style={{ marginTop: Spacing.md }}>{t('home_experiences').toUpperCase()}</AppText>
      <View style={styles.expRow}>
        {[
          { key: 'Actualites', label: t('actus_titre'), glyph: '✧' },
          { key: 'CalmSpace', label: t('calme_titre'), glyph: '❋' },
          { key: 'Mantra', label: t('mantra_titre'), glyph: '❝' },
          { key: 'Guidance', label: t('guidance_titre'), glyph: '✦' },
          { key: 'Morning', label: t('ancrage_titre'), glyph: '☀' },
        ].map(e => (
          <TouchableOpacity key={e.key} style={styles.expCard} activeOpacity={0.85} onPress={() => (navigation as any).navigate(e.key)} accessibilityRole="button" accessibilityLabel={e.label}>
            <View style={styles.expEmblem}><Glyph size={18} color={Colors.or}>{e.glyph}</Glyph></View>
            <AppText variant="caption" color="secondary" align="center" style={{ marginTop: Spacing.xs }}>{e.label}</AppText>
          </TouchableOpacity>
        ))}
      </View>

      <AppText variant="labelSmall" color="secondary" style={{ marginTop: Spacing.lg }}>{t('home_categories').toUpperCase()}</AppText>
      <View style={{ marginTop: Spacing.sm }}>
        {UNIVERS.map(u => <UniversCard key={u.id} u={u} lang={lang} onPress={goCreateurs} />)}
      </View>

      {featured && (
        <View style={{ marginTop: Spacing.lg }}>
          <FeaturedCard creator={featured} label={t('createur_semaine')} cta={t('home_decouvrir')} onPress={goCreateurs} />
        </View>
      )}

      {rest.length > 0 && (
        <>
          <View style={styles.sectionRow}>
            <AppText variant="h3">{t('home_section_createurs')}</AppText>
            <AppButton label={t('home_voir_tout')} onPress={goCreateurs} variant="ghost" style={{ padding: 0 }} />
          </View>
          {rest.map(c => <CreatorCard key={c.id} creator={c} onPress={goCreateurs} />)}
        </>
      )}

      {formations.length > 0 && (
        <>
          <View style={styles.sectionRow}>
            <AppText variant="h3">{t('home_section_formations')}</AppText>
            <AppButton label={t('home_voir_tout')} onPress={goFormations} variant="ghost" style={{ padding: 0 }} />
          </View>
          {formations.map(f => (
            <ResourceCard key={f.id} titre={f.titre} sous={`${f.createurPrenom} ${f.createurNom}`} prix={f.prix} devise={f.devise} />
          ))}
        </>
      )}

      {lives.length > 0 && (
        <>
          <View style={styles.sectionRow}>
            <AppText variant="h3">{t('home_section_lives')}</AppText>
            <AppButton label={t('home_voir_tout')} onPress={goLives} variant="ghost" style={{ padding: 0 }} />
          </View>
          {lives.map(l => (
            <ResourceCard key={l.id} titre={l.titre} sous={`${l.date} · ${l.heure} · ${l.createurPrenom} ${l.createurNom}`} prix={l.prix} devise={l.devise} />
          ))}
        </>
      )}
    </ScreenContainer>
  );
}

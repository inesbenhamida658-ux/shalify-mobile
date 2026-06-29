import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenContainer, AppText, AppCard, AppButton, LoadingState, ErrorState } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreators } from '../../services/creators';
import { getFormations } from '../../services/formations';
import { getUpcomingLives } from '../../services/lives';
import type { Creator, Formation, Live } from '../../types';
import type { MainTabParamList } from '../../navigation/MainTabs';

const styles = StyleSheet.create({
  header: { paddingTop: Spacing.lg, paddingBottom: Spacing.xl, borderBottomWidth: 1, borderBottomColor: Colors.bordure, marginBottom: Spacing.lg },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md, marginTop: Spacing.md },
  card: { marginBottom: Spacing.md },
  badge: { backgroundColor: Colors.vert, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 4 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
});

function CreatorCard({ creator, onPress }: { creator: Creator; onPress?: () => void }) {
  return (
    <AppCard style={styles.card} onPress={onPress}>
      <View style={styles.cardTop}>
        <View style={{ flex: 1 }}>
          <AppText variant="h3">{creator.prenom} {creator.nom}</AppText>
          <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{creator.rubrique}</AppText>
        </View>
        {creator.verified && (
          <View style={styles.badge}><AppText variant="caption" color="white">✓</AppText></View>
        )}
      </View>
      {creator.bio && <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.sm }} numberOfLines={2}>{creator.bio}</AppText>}
    </AppCard>
  );
}

function FormationCard({ formation }: { formation: Formation }) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.cardTop}>
        <AppText variant="label" style={{ flex: 1 }}>{formation.titre}</AppText>
        <AppText variant="label" color="or">{formation.prix} {formation.devise}</AppText>
      </View>
      <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{formation.createurPrenom} {formation.createurNom}</AppText>
    </AppCard>
  );
}

function LiveCard({ live }: { live: Live }) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.cardTop}>
        <AppText variant="label" style={{ flex: 1 }}>{live.titre}</AppText>
        <AppText variant="label" color="or">{live.prix} {live.devise}</AppText>
      </View>
      <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{live.date} · {live.heure} · {live.createurPrenom} {live.createurNom}</AppText>
    </AppCard>
  );
}

export function HomeScreen() {
  const { t } = useLang();
  const { token } = useAuth();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [lives, setLives] = useState<Live[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = (): Promise<void> => {
    setLoading(true); setError('');
    // Créateurs = requis. Formations / lives = best-effort (ne bloquent jamais l'accueil).
    getFormations(token ?? undefined).then(list => setFormations(list.slice(0, 3))).catch(() => setFormations([]));
    getUpcomingLives(token ?? undefined).then(list => setLives(list.slice(0, 3))).catch(() => setLives([]));
    return getCreators(token ?? undefined)
      .then(list => setCreators(list.slice(0, 3)))
      .catch(() => setError(t('erreur_reseau')))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [token]);

  if (loading) return <LoadingState message={t('chargement')} />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <ScreenContainer onRefresh={load}>
      <View style={styles.header}>
        <AppText variant="labelSmall" color="or" align="center">SHALIFY</AppText>
        <AppText variant="h2" align="center" style={{ marginTop: Spacing.sm }}>{t('home_titre')}</AppText>
        <AppText variant="bodySmall" color="secondary" align="center" style={{ marginTop: Spacing.xs }}>{t('home_sous_titre')}</AppText>
      </View>

      <View style={styles.sectionRow}>
        <AppText variant="h3">{t('home_section_createurs')}</AppText>
        <AppButton label={t('home_voir_tout')} onPress={() => navigation.navigate('CreateursTab')} variant="ghost" style={{ padding: 0 }} />
      </View>
      {creators.map(c => (
        <CreatorCard key={c.id} creator={c} onPress={() => navigation.navigate('CreateursTab')} />
      ))}

      {formations.length > 0 && (
        <>
          <View style={styles.sectionRow}>
            <AppText variant="h3">{t('home_section_formations')}</AppText>
          </View>
          {formations.map(f => <FormationCard key={f.id} formation={f} />)}
        </>
      )}

      {lives.length > 0 && (
        <>
          <View style={styles.sectionRow}>
            <AppText variant="h3">{t('home_section_lives')}</AppText>
          </View>
          {lives.map(l => <LiveCard key={l.id} live={l} />)}
        </>
      )}
    </ScreenContainer>
  );
}

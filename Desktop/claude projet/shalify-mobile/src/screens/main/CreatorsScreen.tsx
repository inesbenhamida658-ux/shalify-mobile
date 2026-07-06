import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, Avatar, Chip, Glyph, CreatorListSkeleton, EmptyState, ErrorState, CreatorVideoPreview } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreatorsByRubrique, isNewCreator } from '../../services/creators';
import { getRecents, type RecentCreator } from '../../services/douceur';
import { getQuizValues } from '../../services/rituel';
import { VALUES } from '../../data/rituelContent';
import type { Creator } from '../../types';

// Vraies rubriques du site (valeurs exactes attendues par /api/profils?rubrique=...)
const RUBRIQUES = [
  'Toutes',
  'Compétences',
  'Artisanat & Création',
  'Transformation',
  'Savoirs',
  'Autres talents & savoir-faire',
];

const styles = StyleSheet.create({
  chipsRow: { marginBottom: Spacing.md },
  chipsContent: { gap: Spacing.sm, paddingRight: Spacing.md },
  card: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' },
  body: { flex: 1, marginLeft: Spacing.md },
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  badge: { backgroundColor: Colors.vert, width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginLeft: Spacing.xs },
  newBadge: { backgroundColor: Colors.or, paddingHorizontal: Spacing.sm, paddingVertical: 1, borderRadius: Radius.full, marginLeft: Spacing.xs },
  tarifPill: { backgroundColor: Colors.cremeF, borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 3, alignSelf: 'flex-start', marginTop: Spacing.sm },
  recentTitle: { marginTop: Spacing.xs, marginBottom: Spacing.sm },
  recentChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.blanc, borderWidth: 1, borderColor: Colors.bordure, borderRadius: Radius.full, paddingRight: Spacing.md, paddingVertical: 4, paddingLeft: 4, marginRight: Spacing.sm },
  toggleRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md, flexWrap: 'wrap' },
});

// Trie les créateurs pour rapprocher ceux qui correspondent aux valeurs choisies (boussole).
function sortByValues(list: Creator[], valueKeys: string[]): Creator[] {
  if (valueKeys.length === 0) return list;
  const keywords = VALUES.filter(v => valueKeys.includes(v.key)).flatMap(v => v.keywords.map(k => k.toLowerCase()));
  const score = (c: Creator): number => {
    const hay = `${c.rubrique} ${c.specialite ?? ''} ${c.bio ?? ''} ${(c.tags ?? []).join(' ')}`.toLowerCase();
    return keywords.reduce((n, kw) => (hay.includes(kw) ? n + 1 : n), 0);
  };
  return [...list].sort((a, b) => score(b) - score(a));
}

export function CreatorsScreen({ navigation, route }: any) {
  const { t } = useLang();
  const { token } = useAuth();
  const rubriqueParam: string | undefined = route?.params?.rubrique;
  const [selected, setSelected] = useState(rubriqueParam ?? 'Toutes');
  const chips = rubriqueParam && !RUBRIQUES.includes(rubriqueParam) ? [rubriqueParam, ...RUBRIQUES] : RUBRIQUES;
  const [creators, setCreators] = useState<Creator[]>([]);
  const [recents, setRecents] = useState<RecentCreator[]>([]);
  const [ville, setVille] = useState<string | null>(null);
  const [triValeurs, setTriValeurs] = useState(false);
  const [valueKeys, setValueKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      setCreators(await getCreatorsByRubrique(selected, token ?? undefined));
    } catch { setError(t('erreur_reseau')); }
    finally { setLoading(false); }
  }, [selected, token, t]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    getRecents().then(setRecents).catch(() => setRecents([]));
    getQuizValues().then(setValueKeys).catch(() => setValueKeys([]));
  }, []);

  // Villes présentes dans la liste réelle (aucune ville inventée).
  const villes = Array.from(new Set(creators.map(c => c.ville).filter((v): v is string => !!v))).slice(0, 12);
  let shown = ville ? creators.filter(c => c.ville === ville) : creators;
  if (triValeurs) shown = sortByValues(shown, valueKeys);

  return (
    <ScreenContainer onRefresh={load}>
      <AppText variant="h2" style={{ marginBottom: Spacing.md }}>{t('creators_titre')}</AppText>

      {recents.length > 0 && (
        <>
          <AppText variant="labelSmall" color="secondary" style={styles.recentTitle}>{t('recents_titre').toUpperCase()}</AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.md }} contentContainerStyle={{ paddingRight: Spacing.md }}>
            {recents.map(r => (
              <TouchableOpacity key={r.id} style={styles.recentChip} activeOpacity={0.85} onPress={() => navigation?.navigate?.('CreatorDetail', { creatorId: r.id })}>
                <Avatar uri={r.photoUrl} prenom={r.nom} size={28} />
                <AppText variant="caption" style={{ marginLeft: Spacing.sm }}>{r.nom}</AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow} contentContainerStyle={styles.chipsContent}>
        {chips.map(r => (
          <Chip key={r} label={r} active={selected === r} onPress={() => setSelected(r)} />
        ))}
      </ScrollView>

      <View style={styles.toggleRow}>
        {valueKeys.length > 0 && (
          <Chip label={t('tri_valeurs')} active={triValeurs} onPress={() => setTriValeurs(v => !v)} />
        )}
        {villes.length > 0 && (
          <Chip label={t('filtre_tous_lieux')} active={ville === null} onPress={() => setVille(null)} />
        )}
        {villes.map(v => (
          <Chip key={v} label={v} active={ville === v} onPress={() => setVille(ville === v ? null : v)} />
        ))}
      </View>

      {loading && <CreatorListSkeleton count={5} />}
      {!loading && error !== '' && <ErrorState message={error} onRetry={load} />}
      {!loading && error === '' && shown.length === 0 && <EmptyState titre={t('creators_vide')} />}
      {!loading && error === '' && shown.map(c => (
        <AppCard key={c.id} style={styles.card} onPress={() => navigation?.navigate?.('CreatorDetail', { creatorId: c.id })}>
          <View style={styles.row}>
            <Avatar uri={c.photoUrl} prenom={c.prenom} nom={c.nom} size={56} />
            <View style={styles.body}>
              <View style={styles.nameRow}>
                <AppText variant="h3">{c.prenom} {c.nom}</AppText>
                {c.verified && <View style={styles.badge}><Glyph size={10} color={Colors.blanc}>✓</Glyph></View>}
                {isNewCreator(c) && <View style={styles.newBadge}><AppText variant="caption" color="white">{t('createur_nouveau')}</AppText></View>}
              </View>
              <AppText variant="bodySmall" color="secondary">{c.rubrique}{c.ville ? ` · ${c.ville}` : ''}</AppText>
              {c.specialite ? <AppText variant="caption" color="or" style={{ marginTop: 2 }}>{c.specialite}</AppText> : null}
            </View>
          </View>
          {c.bio ? <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.md }} numberOfLines={2}>{c.bio}</AppText> : null}
          <CreatorVideoPreview videoUrl={c.videoUrl} />
          {typeof c.tarif === 'number' ? (
            <View style={styles.tarifPill}><AppText variant="caption" color="secondary">{c.tarif} {c.devise ?? 'TND'}</AppText></View>
          ) : null}
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Linking, ScrollView } from 'react-native';
import { ScreenContainer, AppText, AppCard, EmptyState, ErrorState, CreatorListSkeleton, Chip } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getFeed, type FeedItem } from '../../services/feed';
import { ENV } from '../../config/env';

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  tag: { alignSelf: 'flex-start', backgroundColor: Colors.cremeF, borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 3, marginBottom: Spacing.xs },
  meta: { marginTop: Spacing.xs },
  filterRow: { flexDirection: 'row', paddingBottom: Spacing.sm },
  lien: { marginTop: Spacing.sm },
});

// Étiquette lisible du type d'actualité (données réelles Shalify).
function typeLabel(type: FeedItem['type'], lang: string): string {
  const map: Record<string, Record<FeedItem['type'], string>> = {
    fr: { createur: 'Nouveau créateur', live: 'Live à venir', formation: 'Nouvelle formation', post: 'Actualité' },
    en: { createur: 'New creator', live: 'Upcoming live', formation: 'New course', post: 'Update' },
    ar: { createur: 'مبدع جديد', live: 'بث قادم', formation: 'دورة جديدة', post: 'جديد' },
  };
  return (map[lang] ?? map.fr)[type];
}

function ctaLabel(type: FeedItem['type'], lang: string): string {
  const map: Record<string, Record<FeedItem['type'], string>> = {
    fr: { createur: 'Voir la fiche', live: 'Voir le live', formation: 'Voir la formation', post: 'En savoir plus' },
    en: { createur: 'View profile', live: 'View live', formation: 'View course', post: 'Learn more' },
    ar: { createur: 'عرض الملف', live: 'عرض البث', formation: 'عرض الدورة', post: 'اعرف المزيد' },
  };
  return (map[lang] ?? map.fr)[type];
}

function ActualiteCard({ item, lang }: { item: FeedItem; lang: string }) {
  const url = item.lien.startsWith('http') ? item.lien : `${ENV.API_BASE_URL}${item.lien}`;
  const open = () => Linking.openURL(url);
  return (
    <AppCard style={styles.card} onPress={open}>
      <View style={styles.tag}><AppText variant="caption" color="or">{typeLabel(item.type, lang)}</AppText></View>
      <View style={styles.rowTop}>
        <AppText variant="label" style={{ flex: 1, marginRight: Spacing.sm }}>{item.titre}</AppText>
        {typeof item.prix === 'number' && item.prix > 0 ? (
          <AppText variant="label" color="or">{item.prix} {item.devise ?? 'TND'}</AppText>
        ) : null}
      </View>
      <AppText variant="bodySmall" color="secondary" style={styles.meta}>
        {item.dateLabel ? item.dateLabel : item.auteur}
        {item.dateLabel && item.auteur ? ` · ${item.auteur}` : ''}
        {item.rubrique ? ` · ${item.rubrique}` : ''}
      </AppText>
      {item.texte ? (
        <AppText variant="bodySmall" color="muted" style={{ marginTop: Spacing.xs }} numberOfLines={3}>{item.texte}</AppText>
      ) : null}
      <AppText variant="labelSmall" color="or" style={styles.lien}>{ctaLabel(item.type, lang)} →</AppText>
    </AppCard>
  );
}

const RUBRIQUES = ['Toutes', 'Compétences', 'Artisanat & Création', 'Transformation', 'Savoirs', 'Lives', 'Shalify Connect', 'Autres talents'];

export function ActualitesScreen() {
  const { t, lang } = useLang();
  const { token } = useAuth();
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtre, setFiltre] = useState('Toutes');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setItems(await getFeed(token ?? undefined)); }
    catch { setError(t('erreur_reseau')); }
    finally { setLoading(false); }
  }, [token, t]);

  useEffect(() => { load(); }, [load]);

  const visibles = filtre === 'Toutes' ? items : items.filter(i => i.rubrique === filtre);

  return (
    <ScreenContainer onRefresh={load}>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('actus_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.md }}>{t('actus_sous')}</AppText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {RUBRIQUES.map(r => (
          <Chip key={r} label={r} active={filtre === r} onPress={() => setFiltre(r)} style={{ marginRight: Spacing.xs }} />
        ))}
      </ScrollView>

      {loading && <CreatorListSkeleton count={3} />}
      {!loading && error !== '' && <ErrorState message={error} onRetry={load} />}
      {!loading && error === '' && visibles.length === 0 && (
        <EmptyState titre={t('actus_titre')} description={t('actus_vide')} />
      )}
      {!loading && error === '' && visibles.map(it => <ActualiteCard key={it.id} item={it} lang={lang} />)}
    </ScreenContainer>
  );
}

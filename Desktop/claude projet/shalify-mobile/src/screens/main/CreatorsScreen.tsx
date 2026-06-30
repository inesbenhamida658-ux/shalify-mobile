import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ScreenContainer, AppText, AppCard, LoadingState, EmptyState, ErrorState } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreatorsByRubrique } from '../../services/creators';
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
  chipsRow: { flexDirection: 'row', marginBottom: Spacing.lg },
  chip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.bordure,
    marginRight: Spacing.sm,
  },
  chipActive: { borderColor: Colors.vert, backgroundColor: Colors.vert },
  cardPhoto: { width: '100%', height: 150, borderRadius: Radius.md, marginBottom: Spacing.sm, backgroundColor: Colors.cremeF },
});

export function CreatorsScreen({ navigation }: any) {
  const { t } = useLang();
  const { token } = useAuth();
  const [selected, setSelected] = useState('Toutes');
  const [creators, setCreators] = useState<Creator[]>([]);
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

  return (
    <ScreenContainer onRefresh={load}>
      <AppText variant="h2" style={{ marginBottom: Spacing.md }}>{t('creators_titre')}</AppText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
        {RUBRIQUES.map(r => {
          const active = selected === r;
          return (
            <TouchableOpacity key={r} onPress={() => setSelected(r)} style={[styles.chip, active && styles.chipActive]}>
              <AppText variant="caption" color={active ? 'white' : 'secondary'}>{r}</AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {loading && <LoadingState message={t('chargement')} />}
      {!loading && error !== '' && <ErrorState message={error} onRetry={load} />}
      {!loading && error === '' && creators.length === 0 && <EmptyState titre={t('creators_vide')} />}
      {!loading && error === '' && creators.map(c => (
        <AppCard key={c.id} style={{ marginBottom: Spacing.md }} onPress={() => navigation?.navigate?.('CreatorDetail', { creatorId: c.id })}>
          {c.photoUrl ? <Image source={{ uri: c.photoUrl }} style={styles.cardPhoto} resizeMode="cover" /> : null}
          <AppText variant="h3">{c.prenom} {c.nom}</AppText>
          <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{c.rubrique}</AppText>
          {c.specialite ? <AppText variant="caption" color="or" style={{ marginTop: 2 }}>{c.specialite}</AppText> : null}
          {c.bio && <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.sm }} numberOfLines={2}>{c.bio}</AppText>}
          {c.tarif && <AppText variant="label" color="or" style={{ marginTop: Spacing.sm }}>{c.tarif} {c.devise ?? 'TND'}</AppText>}
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

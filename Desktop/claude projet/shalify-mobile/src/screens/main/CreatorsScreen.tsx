import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, LoadingState, EmptyState, ErrorState } from '../../components';
import { Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreators } from '../../services/creators';
import type { Creator } from '../../types';

export function CreatorsScreen({ navigation }: any) {
  const { t } = useLang();
  const { token } = useAuth();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      setCreators(await getCreators(token ?? undefined));
    } catch { setError(t('erreur_reseau')); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [token]);

  if (loading) return <LoadingState message={t('chargement')} />;
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (creators.length === 0) return <EmptyState titre={t('creators_vide')} />;

  return (
    <ScreenContainer onRefresh={load}>
      <AppText variant="h2" style={{ marginBottom: Spacing.lg }}>{t('creators_titre')}</AppText>
      {creators.map(c => (
        <AppCard key={c.id} style={{ marginBottom: Spacing.md }} onPress={() => navigation?.navigate?.('CreatorDetail', { creatorId: c.id })}>
          <AppText variant="h3">{c.prenom} {c.nom}</AppText>
          <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{c.rubrique}</AppText>
          {c.bio && <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.sm }} numberOfLines={2}>{c.bio}</AppText>}
          {c.tarif && <AppText variant="label" color="or" style={{ marginTop: Spacing.sm }}>{c.tarif} {c.devise ?? 'EUR'}</AppText>}
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

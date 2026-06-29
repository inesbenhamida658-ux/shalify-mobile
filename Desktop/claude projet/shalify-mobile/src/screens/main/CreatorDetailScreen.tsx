import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, LoadingState, ErrorState, CheckoutButton } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreatorById } from '../../services/creators';
import type { Creator } from '../../types';

const styles = StyleSheet.create({
  header: { backgroundColor: Colors.vertTF, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.lg },
  badge: { backgroundColor: Colors.or, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: Spacing.xs },
  serviceCard: { marginBottom: Spacing.sm },
  paymentNotice: {
    backgroundColor: Colors.cremeF,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.or,
  },
});

export function CreatorDetailScreen({ route, navigation }: any) {
  const { creatorId } = route.params ?? {};
  const { t } = useLang();
  const { token } = useAuth();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!creatorId) { setError('Créateur introuvable'); setLoading(false); return; }
    getCreatorById(creatorId, token ?? undefined)
      .then(c => { setCreator(c ?? null); if (!c) setError('Créateur introuvable'); })
      .catch(() => setError(t('erreur_reseau')))
      .finally(() => setLoading(false));
  }, [creatorId, token]);

  if (loading) return <LoadingState />;
  if (error || !creator) return <ErrorState message={error} onRetry={() => navigation.goBack()} retryLabel={t('retour')} />;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <AppText variant="h2" color="white">{creator.prenom} {creator.nom}</AppText>
        <AppText variant="bodySmall" color="white" style={{ opacity: 0.7, marginTop: 2 }}>{creator.rubrique}</AppText>
        {creator.verified && (
          <View style={styles.badge}>
            <AppText variant="caption" color="white">✓ {t('creator_verifie')}</AppText>
          </View>
        )}
      </View>

      {creator.bio && (
        <AppCard style={{ marginBottom: Spacing.lg }}>
          <AppText variant="label">{t('creator_bio')}</AppText>
          <AppText variant="body" color="secondary" style={{ marginTop: Spacing.xs }}>{creator.bio}</AppText>
        </AppCard>
      )}

      {creator.services && creator.services.length > 0 && (
        <>
          <AppText variant="h3" style={{ marginBottom: Spacing.md }}>{t('creator_services')}</AppText>
          {creator.services.map(s => (
            <AppCard key={s.id} style={styles.serviceCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <AppText variant="label" style={{ flex: 1 }}>{s.nom}</AppText>
                {s.prix && <AppText variant="label" color="or">{s.prix} {s.devise ?? 'EUR'}</AppText>}
              </View>
              {s.description && <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.xs }}>{s.description}</AppText>}
              <CheckoutButton creator={creator} service={s} style={{ marginTop: Spacing.md }} />
            </AppCard>
          ))}
          <View style={styles.paymentNotice}>
            <AppText variant="caption" color="secondary">{t('booking_paiement_info')}</AppText>
          </View>
        </>
      )}

      {creator.tags?.length > 0 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: Spacing.lg, gap: Spacing.xs }}>
          {creator.tags.map(tag => (
            <View key={tag} style={{ backgroundColor: Colors.cremeF, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 20 }}>
              <AppText variant="caption" color="secondary">{tag}</AppText>
            </View>
          ))}
        </View>
      )}
    </ScreenContainer>
  );
}

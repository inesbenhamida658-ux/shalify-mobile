import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Share, Alert } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, LoadingState, ErrorState, CheckoutButton, FavoriteButton } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreatorById } from '../../services/creators';
import { getAvisForProfil, type Avis } from '../../services/avis';
import { signalerProfil } from '../../services/signalements';
import type { Creator } from '../../types';

const styles = StyleSheet.create({
  photo: { width: '100%', height: 240, borderRadius: Radius.lg, marginBottom: Spacing.md, backgroundColor: Colors.cremeF },
  header: { backgroundColor: Colors.vertTF, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.lg },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  actionsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  badge: { backgroundColor: Colors.or, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: Spacing.xs },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.sm },
  serviceCard: { marginBottom: Spacing.sm },
  serviceMetaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.xs, flexWrap: 'wrap' },
  typeBadge: { backgroundColor: Colors.cremeF, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radius.full },
  avisCard: { marginBottom: Spacing.sm },
  paymentNotice: {
    backgroundColor: Colors.cremeF,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.or,
  },
});

const TYPE_LABEL: Record<string, string> = {
  seance: 'Séance',
  formation: 'Formation',
  live: 'Live',
  ressource: 'Ressource',
};

function Stars({ note }: { note: number }) {
  const full = Math.round(note);
  return <AppText variant="label" color="or">{'★'.repeat(full)}{'☆'.repeat(Math.max(0, 5 - full))}</AppText>;
}

export function CreatorDetailScreen({ route, navigation }: any) {
  const { creatorId } = route.params ?? {};
  const { t } = useLang();
  const { token, user } = useAuth();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [avis, setAvis] = useState<Avis[]>([]);
  const [moyenne, setMoyenne] = useState(0);
  const [totalAvis, setTotalAvis] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!creatorId) { setError(t('creator_introuvable')); setLoading(false); return; }
    // Avis = best-effort, ne bloque jamais l'affichage de la fiche
    getAvisForProfil(creatorId, token ?? undefined)
      .then(r => { setAvis(r.avis); setMoyenne(r.moyenne); setTotalAvis(r.total); })
      .catch(() => { setAvis([]); setMoyenne(0); setTotalAvis(0); });
    getCreatorById(creatorId, token ?? undefined)
      .then(c => { setCreator(c ?? null); if (!c) setError(t('creator_introuvable')); })
      .catch(() => setError(t('erreur_reseau')))
      .finally(() => setLoading(false));
  }, [creatorId, token]);

  if (loading) return <LoadingState />;
  if (error || !creator) return <ErrorState message={error} onRetry={() => navigation.goBack()} retryLabel={t('retour')} />;

  const nomComplet = `${creator.prenom} ${creator.nom}`.trim();
  const handleShare = () => {
    Share.share({ message: `${t('partage_message')} : ${nomComplet}\nhttps://shalify.app/profils/${creator.id}` }).catch(() => {});
  };
  const doSignal = async (raison: string) => {
    try { await signalerProfil(creator.id, nomComplet, raison, user?.email); } catch { /* non bloquant */ }
    Alert.alert(t('signaler_envoye'));
  };
  const handleSignaler = () => {
    Alert.alert(t('signaler_titre'), t('signaler_question'), [
      { text: t('signaler_raison_contenu'), onPress: () => doSignal(t('signaler_raison_contenu')) },
      { text: t('signaler_raison_arnaque'), onPress: () => doSignal(t('signaler_raison_arnaque')) },
      { text: t('annuler'), style: 'cancel' },
    ]);
  };

  return (
    <ScreenContainer>
      {creator.photoUrl ? (
        <Image source={{ uri: creator.photoUrl }} style={styles.photo} resizeMode="cover" />
      ) : null}

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <AppText variant="h2" color="white">{creator.prenom} {creator.nom}</AppText>
            <AppText variant="bodySmall" color="white" style={{ opacity: 0.7, marginTop: 2 }}>{creator.rubrique}</AppText>
            {creator.specialite ? (
              <AppText variant="bodySmall" color="or" style={{ marginTop: 2 }}>{creator.specialite}</AppText>
            ) : null}
          </View>
          <FavoriteButton creatorId={creator.id} />
        </View>
        {totalAvis > 0 ? (
          <View style={styles.ratingRow}>
            <Stars note={moyenne} />
            <AppText variant="bodySmall" color="white" style={{ marginLeft: Spacing.sm, opacity: 0.85 }}>
              {moyenne} · {totalAvis} {totalAvis > 1 ? 'avis' : 'avis'}
            </AppText>
          </View>
        ) : null}
        {creator.verified && (
          <View style={styles.badge}>
            <AppText variant="caption" color="white">✓ {t('creator_verifie')}</AppText>
          </View>
        )}
      </View>

      <View style={styles.actionsRow}>
        <AppButton label={t('profil_partager')} onPress={handleShare} variant="outline" style={{ flex: 1 }} />
        <AppButton label={t('profil_signaler')} onPress={handleSignaler} variant="ghost" style={{ flex: 1 }} />
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
                {s.prix ? <AppText variant="label" color="or">{s.prix} {s.devise ?? 'TND'}</AppText> : null}
              </View>
              <View style={styles.serviceMetaRow}>
                <View style={styles.typeBadge}>
                  <AppText variant="caption" color="secondary">{TYPE_LABEL[s.type] ?? s.type}</AppText>
                </View>
                {s.duree ? <AppText variant="caption" color="muted">⏱ {s.duree}</AppText> : null}
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

      {avis.length > 0 && (
        <>
          <AppText variant="h3" style={{ marginTop: Spacing.lg, marginBottom: Spacing.md }}>{t('creator_avis')}</AppText>
          {avis.slice(0, 5).map(a => (
            <AppCard key={a.id} style={styles.avisCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <AppText variant="label">{a.auteurPrenom}</AppText>
                <Stars note={a.note} />
              </View>
              {a.commentaire ? <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.xs }}>{a.commentaire}</AppText> : null}
            </AppCard>
          ))}
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

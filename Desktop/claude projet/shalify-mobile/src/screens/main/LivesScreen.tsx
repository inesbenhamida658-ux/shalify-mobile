import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, EmptyState, ErrorState, CreatorListSkeleton } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getLives } from '../../services/lives';
import type { Live } from '../../types';

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  meta: { marginTop: Spacing.xs },
  badge: { alignSelf: 'flex-start', backgroundColor: Colors.cremeF, borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 3, marginTop: Spacing.sm },
  section: { marginTop: Spacing.lg, marginBottom: Spacing.sm },
});

function LiveCard({ live, t }: { live: Live; t: (k: any) => string }) {
  const places = Math.max(0, (live.placesTotal ?? 0) - (live.placesReservees ?? 0));
  return (
    <AppCard style={styles.card}>
      <View style={styles.rowTop}>
        <AppText variant="label" style={{ flex: 1, marginRight: Spacing.sm }}>{live.titre}</AppText>
        {typeof live.prix === 'number' ? <AppText variant="label" color="or">{live.prix} {live.devise ?? 'TND'}</AppText> : null}
      </View>
      <AppText variant="bodySmall" color="secondary" style={styles.meta}>
        {live.date} · {live.heure} · {live.createurPrenom} {live.createurNom}
      </AppText>
      {live.description ? (
        <AppText variant="bodySmall" color="muted" style={{ marginTop: Spacing.xs }} numberOfLines={2}>{live.description}</AppText>
      ) : null}
      {live.placesTotal ? (
        <View style={styles.badge}><AppText variant="caption" color="secondary">{places} {t('lives_places')}</AppText></View>
      ) : null}
    </AppCard>
  );
}

export function LivesScreen() {
  const { t } = useLang();
  const { token } = useAuth();
  const [lives, setLives] = useState<Live[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setLives(await getLives(token ?? undefined)); }
    catch { setError(t('erreur_reseau')); }
    finally { setLoading(false); }
  }, [token, t]);

  useEffect(() => { load(); }, [load]);

  const aVenir = lives.filter(l => l.statut === 'a_venir' || l.statut === 'en_cours');
  const passes = lives.filter(l => l.statut === 'termine');

  return (
    <ScreenContainer onRefresh={load}>
      <AppText variant="h2" style={{ marginBottom: Spacing.md }}>{t('lives_titre')}</AppText>
      {loading && <CreatorListSkeleton count={3} />}
      {!loading && error !== '' && <ErrorState message={error} onRetry={load} />}
      {!loading && error === '' && lives.length === 0 && <EmptyState titre={t('lives_titre')} description={t('lives_vide')} />}
      {!loading && error === '' && aVenir.length > 0 && (
        <>
          <AppText variant="labelSmall" color="or" style={styles.section}>{t('lives_a_venir').toUpperCase()}</AppText>
          {aVenir.map(l => <LiveCard key={l.id} live={l} t={t} />)}
        </>
      )}
      {!loading && error === '' && passes.length > 0 && (
        <>
          <AppText variant="labelSmall" color="secondary" style={styles.section}>{t('lives_passes').toUpperCase()}</AppText>
          {passes.map(l => <LiveCard key={l.id} live={l} t={t} />)}
        </>
      )}
    </ScreenContainer>
  );
}

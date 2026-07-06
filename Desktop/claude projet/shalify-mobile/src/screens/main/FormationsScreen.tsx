import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, EmptyState, ErrorState, CreatorListSkeleton, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getFormations } from '../../services/formations';
import {
  getBookmarks, toggleBookmark, getReadingProgress, setReadingStep,
  type FormationMarquee, type ReadingProgress,
} from '../../services/douceur';
import type { Formation } from '../../types';

// Cinq points d'or : jalons de lecture, remplis en douceur au rythme de chacun.
const READING_STEPS = 5;

const TXT: Record<string, { marquer: string; marquee: string; progression: string; }> = {
  fr: { marquer: 'Marquer', marquee: 'Marquée', progression: 'Ma lecture' },
  en: { marquer: 'Bookmark', marquee: 'Saved', progression: 'My reading' },
  ar: { marquer: 'حفظ', marquee: 'محفوظة', progression: 'قراءتي' },
};

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm, flexWrap: 'wrap' },
  pill: { backgroundColor: Colors.cremeF, borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 3 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.bordure, paddingTop: Spacing.md },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: Colors.or },
  bookmark: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});

function FormationCard({
  f, t, tx, marked, step, onToggle, onStep,
}: {
  f: Formation; t: (k: any) => string; tx: { marquer: string; marquee: string; progression: string };
  marked: boolean; step: number; onToggle: () => void; onStep: (n: number) => void;
}) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.rowTop}>
        <AppText variant="label" style={{ flex: 1, marginRight: Spacing.sm }}>{f.titre}</AppText>
        {typeof f.prix === 'number' ? <AppText variant="label" color="or">{f.prix} {f.devise ?? 'TND'}</AppText> : null}
      </View>
      <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.xs }}>{f.createurPrenom} {f.createurNom}</AppText>
      {f.description ? (
        <AppText variant="bodySmall" color="muted" style={{ marginTop: Spacing.xs }} numberOfLines={2}>{f.description}</AppText>
      ) : null}
      <View style={styles.metaRow}>
        {f.dureeTotal ? <View style={styles.pill}><AppText variant="caption" color="secondary">{f.dureeTotal}</AppText></View> : null}
        {f.niveauRequis ? <View style={styles.pill}><AppText variant="caption" color="secondary">{t('formations_niveau')} : {f.niveauRequis}</AppText></View> : null}
      </View>

      <View style={styles.actionsRow}>
        <View>
          <AppText variant="caption" color="secondary" style={{ marginBottom: 4 }}>{tx.progression}</AppText>
          <View style={styles.dots}>
            {Array.from({ length: READING_STEPS }).map((_, i) => {
              const filled = i < step;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => onStep(step === i + 1 ? i : i + 1)}
                  hitSlop={6}
                  accessibilityRole="button"
                  accessibilityLabel={`${tx.progression} ${i + 1}`}
                >
                  <View style={[styles.dot, filled ? { backgroundColor: Colors.or } : null]} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity style={styles.bookmark} onPress={onToggle} hitSlop={6} accessibilityRole="button">
          <Glyph size={18} color={Colors.or}>{marked ? '❤' : '♡'}</Glyph>
          <AppText variant="labelSmall" color={marked ? 'or' : 'secondary'}>{marked ? tx.marquee : tx.marquer}</AppText>
        </TouchableOpacity>
      </View>
    </AppCard>
  );
}

export function FormationsScreen() {
  const { t, lang } = useLang();
  const tx = TXT[lang] ?? TXT.fr;
  const { token } = useAuth();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookmarks, setBookmarks] = useState<FormationMarquee[]>([]);
  const [progress, setProgress] = useState<ReadingProgress>({});

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setFormations(await getFormations(token ?? undefined)); }
    catch { setError(t('erreur_reseau')); }
    finally { setLoading(false); }
  }, [token, t]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    getBookmarks().then(setBookmarks).catch(() => setBookmarks([]));
    getReadingProgress().then(setProgress).catch(() => setProgress({}));
  }, []);

  const onToggle = async (f: Formation) => {
    setBookmarks(await toggleBookmark({ id: f.id, titre: f.titre, auteur: `${f.createurPrenom} ${f.createurNom}`.trim() }));
  };
  const onStep = async (f: Formation, n: number) => {
    setProgress(await setReadingStep(f.id, n));
  };

  return (
    <ScreenContainer onRefresh={load}>
      <AppText variant="h2" style={{ marginBottom: Spacing.md }}>{t('formations_titre')}</AppText>
      {loading && <CreatorListSkeleton count={3} />}
      {!loading && error !== '' && <ErrorState message={error} onRetry={load} />}
      {!loading && error === '' && formations.length === 0 && <EmptyState titre={t('formations_titre')} description={t('formations_vide')} />}
      {!loading && error === '' && formations.map(f => (
        <FormationCard
          key={f.id}
          f={f}
          t={t}
          tx={tx}
          marked={bookmarks.some(b => b.id === f.id)}
          step={progress[f.id] ?? 0}
          onToggle={() => onToggle(f)}
          onStep={(n) => onStep(f, n)}
        />
      ))}
    </ScreenContainer>
  );
}

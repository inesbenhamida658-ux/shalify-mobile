import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Share, Alert, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Avatar, Glyph, LoadingState, ErrorState, CheckoutButton, FavoriteButton, VideoPlayer, PhotoGallery } from '../../components';
import { Fonts } from '../../fonts';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreatorById, getCreatorsByRubrique, isNewCreator } from '../../services/creators';
import { getAvisForProfil, type Avis } from '../../services/avis';
import { signalerProfil } from '../../services/signalements';
import { blockCreator } from '../../storage/blocked';
import { pushRecent } from '../../services/douceur';
import type { Creator } from '../../types';

const styles = StyleSheet.create({
  photo: { width: '100%', height: 240, borderRadius: Radius.lg, marginBottom: Spacing.md, backgroundColor: Colors.cremeF },
  header: { backgroundColor: Colors.vertTF, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.lg },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  headerIdentity: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  actionsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  badge: { backgroundColor: Colors.or, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: Spacing.xs },
  newBadge: { backgroundColor: Colors.or, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radius.full, marginLeft: Spacing.sm },
  suggRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm },
  suggBody: { flex: 1, marginLeft: Spacing.md },
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
  shareCard: {
    backgroundColor: Colors.vertTF,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    marginTop: Spacing.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.or,
  },
  shareRule: { width: 44, height: 1, backgroundColor: Colors.or, marginVertical: Spacing.md },
  shareName: { fontFamily: Fonts.serifMedium, fontSize: 26, color: Colors.creme, textAlign: 'center' },
  shareUrl: { marginTop: Spacing.md, letterSpacing: 1, opacity: 0.8 },
});

const SHARE_TXT: Record<string, { montrer: string; cacher: string; eyebrow: string; astuce: string }> = {
  fr: { montrer: 'Créer une belle carte', cacher: 'Fermer la carte', eyebrow: 'À DÉCOUVRIR SUR SHALIFY', astuce: 'Fais une capture d’écran pour partager cette carte.' },
  en: { montrer: 'Create a lovely card', cacher: 'Close the card', eyebrow: 'DISCOVER ON SHALIFY', astuce: 'Take a screenshot to share this card.' },
  ar: { montrer: 'أنشئ بطاقة جميلة', cacher: 'إغلاق البطاقة', eyebrow: 'اكتشف على شاليفاي', astuce: 'التقط صورة للشاشة لمشاركة هذه البطاقة.' },
};

const TYPE_KEY: Record<string, 'type_seance' | 'type_formation' | 'type_live' | 'type_ressource'> = {
  seance: 'type_seance',
  formation: 'type_formation',
  live: 'type_live',
  ressource: 'type_ressource',
};

function Stars({ note }: { note: number }) {
  const full = Math.round(note);
  return <Glyph size={15} color={Colors.or}>{'★'.repeat(full)}{'☆'.repeat(Math.max(0, 5 - full))}</Glyph>;
}

export function CreatorDetailScreen({ route, navigation }: any) {
  const { creatorId } = route.params ?? {};
  const { t, lang } = useLang();
  const { token, user } = useAuth();
  const [showCard, setShowCard] = useState(false);
  const [creator, setCreator] = useState<Creator | null>(null);
  const [avis, setAvis] = useState<Avis[]>([]);
  const [moyenne, setMoyenne] = useState(0);
  const [totalAvis, setTotalAvis] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<Creator[]>([]);

  useEffect(() => {
    if (!creatorId) { setError(t('creator_introuvable')); setLoading(false); return; }
    // Avis = best-effort, ne bloque jamais l'affichage de la fiche
    getAvisForProfil(creatorId, token ?? undefined)
      .then(r => { setAvis(r.avis); setMoyenne(r.moyenne); setTotalAvis(r.total); })
      .catch(() => { setAvis([]); setMoyenne(0); setTotalAvis(0); });
    getCreatorById(creatorId, token ?? undefined)
      .then(c => {
        setCreator(c ?? null);
        if (!c) { setError(t('creator_introuvable')); return; }
        // Garde la fiche en « vus récemment » (local).
        pushRecent({ id: c.id, nom: `${c.prenom} ${c.nom}`.trim(), rubrique: c.rubrique, photoUrl: c.photoUrl }).catch(() => {});
        // Suggestions « même univers » : autres créateurs de la même rubrique.
        getCreatorsByRubrique(c.rubrique, token ?? undefined)
          .then(list => setSuggestions(list.filter(x => x.id !== c.id).slice(0, 4)))
          .catch(() => setSuggestions([]));
      })
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
  const handleBlock = async () => {
    await blockCreator(creator.id);
    Alert.alert(t('bloque_confirme'));
    navigation.goBack();
  };
  const handleSignaler = () => {
    Alert.alert(t('signaler_titre'), t('signaler_question'), [
      { text: t('signaler_raison_contenu'), onPress: () => doSignal(t('signaler_raison_contenu')) },
      { text: t('signaler_raison_arnaque'), onPress: () => doSignal(t('signaler_raison_arnaque')) },
      { text: t('creator_bloquer'), style: 'destructive', onPress: handleBlock },
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
          <View style={styles.headerIdentity}>
            {!creator.photoUrl ? (
              <Avatar prenom={creator.prenom} nom={creator.nom} size={64} style={{ marginRight: Spacing.md }} />
            ) : null}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <AppText variant="h2" color="white">{creator.prenom} {creator.nom}</AppText>
                {isNewCreator(creator) ? (
                  <View style={styles.newBadge}>
                    <AppText variant="caption" color="white">{t('createur_nouveau')}</AppText>
                  </View>
                ) : null}
              </View>
              <AppText variant="bodySmall" color="white" style={{ opacity: 0.7, marginTop: 2 }}>{creator.rubrique}</AppText>
              {creator.specialite ? (
                <AppText variant="bodySmall" color="or" style={{ marginTop: 2 }}>{creator.specialite}</AppText>
              ) : null}
            </View>
          </View>
          <FavoriteButton creatorId={creator.id} />
        </View>
        {totalAvis > 0 ? (
          <View style={styles.ratingRow}>
            <Stars note={moyenne} />
            <AppText variant="bodySmall" color="white" style={{ marginLeft: Spacing.sm, opacity: 0.85 }}>
              {moyenne} · {totalAvis} {t('avis_un')}
            </AppText>
          </View>
        ) : null}
        {creator.verified && (
          <View style={styles.badge}>
            <AppText variant="caption" color="white"><Glyph size={12} color={Colors.blanc}>✓</Glyph> {t('creator_verifie')}</AppText>
          </View>
        )}
      </View>

      {creator.videoUrl ? (
        <>
          <AppText variant="label" color="or" style={{ marginBottom: Spacing.sm }}>{t('creator_video')}</AppText>
          <VideoPlayer src={creator.videoUrl} titre={`${t('creator_video')} · ${nomComplet}`} label={t('creator_video_ouvrir')} />
        </>
      ) : null}

      {creator.galerie && creator.galerie.length > 0 ? (
        <>
          <AppText variant="label" color="or" style={{ marginBottom: Spacing.sm }}>{t('creator_galerie')}</AppText>
          <PhotoGallery photos={creator.galerie} />
        </>
      ) : null}

      <View style={styles.actionsRow}>
        <AppButton label={t('profil_partager')} onPress={handleShare} variant="outline" style={{ flex: 1 }} />
        <AppButton label={t('profil_signaler')} onPress={handleSignaler} variant="ghost" style={{ flex: 1 }} />
      </View>

      {(() => { const st = SHARE_TXT[lang] ?? SHARE_TXT.fr; return (
        <>
          <AppButton
            label={showCard ? st.cacher : st.montrer}
            onPress={() => setShowCard(v => !v)}
            variant="ghost"
            style={{ marginBottom: Spacing.md }}
          />
          {showCard && (
            <View style={styles.shareCard}>
              <AppText variant="labelSmall" color="or">{st.eyebrow}</AppText>
              <View style={styles.shareRule} />
              <AppText style={styles.shareName}>{nomComplet}</AppText>
              {creator.specialite ? <AppText variant="bodySmall" color="or" style={{ marginTop: Spacing.xs }}>{creator.specialite}</AppText> : null}
              <AppText variant="caption" color="white" style={styles.shareUrl}>shalify.app</AppText>
              <AppText variant="caption" color="white" style={{ opacity: 0.55, marginTop: Spacing.md }}>{st.astuce}</AppText>
            </View>
          )}
        </>
      ); })()}

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
                  <AppText variant="caption" color="secondary">{TYPE_KEY[s.type] ? t(TYPE_KEY[s.type]) : s.type}</AppText>
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

      {suggestions.length > 0 && (
        <>
          <AppText variant="h3" style={{ marginTop: Spacing.lg, marginBottom: Spacing.sm }}>{t('createur_meme_univers')}</AppText>
          <AppCard>
            {suggestions.map((s, i) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.suggRow, i === suggestions.length - 1 ? null : { borderBottomWidth: 1, borderBottomColor: Colors.bordure }]}
                onPress={() => navigation.push('CreatorDetail', { creatorId: s.id })}
                activeOpacity={0.85}
              >
                <Avatar uri={s.photoUrl} prenom={s.prenom} nom={s.nom} size={44} />
                <View style={styles.suggBody}>
                  <AppText variant="label">{s.prenom} {s.nom}</AppText>
                  {s.specialite ? <AppText variant="caption" color="or">{s.specialite}</AppText> : null}
                </View>
                <Glyph size={20} color={Colors.or}>›</Glyph>
              </TouchableOpacity>
            ))}
          </AppCard>
        </>
      )}
    </ScreenContainer>
  );
}

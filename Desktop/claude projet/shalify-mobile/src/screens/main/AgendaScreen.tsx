import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  ScreenContainer, AppText, AppCard, AppButton, AppInput, Avatar, Chip,
  CreatorListSkeleton, EmptyState, ErrorState,
} from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreators } from '../../services/creators';
import {
  getCreneaux, reserverCreneau, getMesReservations, annulerReservation,
  type Creneau, type MaReservation,
} from '../../services/agenda';
import type { Creator } from '../../types';

const styles = StyleSheet.create({
  head: { marginBottom: Spacing.lg },
  card: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' },
  body: { flex: 1, marginLeft: Spacing.md },
  slot: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.cremeF, borderRadius: Radius.md,
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, marginBottom: Spacing.sm,
  },
  slotBtn: {
    backgroundColor: Colors.vert, borderRadius: Radius.full,
    paddingVertical: 6, paddingHorizontal: Spacing.md,
  },
  form: { marginTop: Spacing.sm },
  back: { marginBottom: Spacing.md },
  tabs: { flexDirection: 'row', marginBottom: Spacing.lg, gap: Spacing.sm },
  tab: {
    flex: 1, alignItems: 'center', paddingVertical: Spacing.sm,
    borderRadius: Radius.full, backgroundColor: Colors.cremeF,
  },
  tabOn: { backgroundColor: Colors.vert },
  resaHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resaActions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
});

type Lang3 = 'fr' | 'en' | 'ar';

const TXT: Record<Lang3, {
  surtitre: string; titre: string; sous: string;
  voir: string; retour: string; vide: string; videSub: string;
  slotsVide: string; individuel: string; groupe: string; reserver: string;
  nom: string; email: string; message: string; confirmer: string; annuler: string;
  ok: string; okSub: string; champs: string; erreur: string;
  visio: string; presentiel: string; telephone: string;
  ongletReserver: string; ongletMes: string; mesVide: string; mesVideSub: string;
  statutConfirmee: string; statutAttente: string; statutAnnulee: string; statutReportee: string;
  ref: string; annulerRdv: string; reporterRdv: string; confirmAnnuler: string;
  favoriAjoute: string; favoriRetire: string; listeAttente: string;
}> = {
  fr: {
    surtitre: 'AGENDA', titre: 'Réservez votre créneau',
    sous: 'Choisissez une personne, puis un créneau libre. La confirmation arrive par email.',
    voir: 'Voir les créneaux', retour: '← Choisir une autre personne',
    vide: 'Les créateurs ouvrent leurs premiers créneaux.',
    videSub: 'Revenez bientôt pour réserver votre rendez-vous.',
    slotsVide: 'Aucun créneau libre cette semaine. Revenez bientôt.',
    individuel: 'Séance individuelle', groupe: 'Session groupe', reserver: 'Réserver',
    nom: 'Votre prénom', email: 'Votre email', message: 'Un message (optionnel)',
    confirmer: 'Confirmer la réservation', annuler: 'Annuler',
    ok: 'Réservation confirmée', okSub: 'Référence : ', champs: 'Renseignez votre prénom et votre email.',
    erreur: 'Réservation impossible pour le moment.',
    visio: 'Visio', presentiel: 'Présentiel', telephone: 'Téléphone',
    ongletReserver: 'Réserver', ongletMes: 'Mes réservations',
    mesVide: 'Vos rendez-vous apparaîtront ici.', mesVideSub: 'Réservez un créneau pour commencer.',
    statutConfirmee: 'Confirmée', statutAttente: 'En attente', statutAnnulee: 'Annulée', statutReportee: 'Reportée',
    ref: 'Réf.', annulerRdv: 'Annuler', reporterRdv: 'Reporter',
    confirmAnnuler: 'Annuler cette réservation ?',
    favoriAjoute: 'Ajouté à vos favoris', favoriRetire: 'Retiré de vos favoris',
    listeAttente: 'Vous êtes sur la liste d’attente. On vous prévient dès qu’une place se libère.',
  },
  en: {
    surtitre: 'AGENDA', titre: 'Book your slot',
    sous: 'Pick a person, then a free slot. Confirmation arrives by email.',
    voir: 'See slots', retour: '← Choose another person',
    vide: 'Creators are opening their first slots.',
    videSub: 'Come back soon to book your appointment.',
    slotsVide: 'No free slot this week. Come back soon.',
    individuel: 'One-to-one session', groupe: 'Group session', reserver: 'Book',
    nom: 'Your first name', email: 'Your email', message: 'A message (optional)',
    confirmer: 'Confirm booking', annuler: 'Cancel',
    ok: 'Booking confirmed', okSub: 'Reference: ', champs: 'Please enter your first name and email.',
    erreur: 'Booking is not possible right now.',
    visio: 'Video', presentiel: 'In person', telephone: 'Phone',
    ongletReserver: 'Book', ongletMes: 'My bookings',
    mesVide: 'Your appointments will appear here.', mesVideSub: 'Book a slot to get started.',
    statutConfirmee: 'Confirmed', statutAttente: 'Pending', statutAnnulee: 'Cancelled', statutReportee: 'Rescheduled',
    ref: 'Ref.', annulerRdv: 'Cancel', reporterRdv: 'Reschedule',
    confirmAnnuler: 'Cancel this booking?',
    favoriAjoute: 'Added to your favourites', favoriRetire: 'Removed from your favourites',
    listeAttente: 'You are on the waiting list. We will let you know as soon as a spot opens.',
  },
  ar: {
    surtitre: 'الأجندة', titre: 'احجز خانتك',
    sous: 'اختر شخصًا، ثم خانة متاحة. يصلك التأكيد عبر البريد.',
    voir: 'عرض الخانات', retour: '← اختر شخصًا آخر',
    vide: 'يفتح المبدعون خاناتهم الأولى.',
    videSub: 'عد قريبًا لحجز موعدك.',
    slotsVide: 'لا توجد خانة متاحة هذا الأسبوع. عد قريبًا.',
    individuel: 'جلسة فردية', groupe: 'جلسة جماعية', reserver: 'احجز',
    nom: 'اسمك', email: 'بريدك', message: 'رسالة (اختياري)',
    confirmer: 'تأكيد الحجز', annuler: 'إلغاء',
    ok: 'تأكّد الحجز', okSub: 'المرجع: ', champs: 'يرجى إدخال اسمك وبريدك.',
    erreur: 'الحجز غير ممكن حاليًا.',
    visio: 'مرئي', presentiel: 'حضوري', telephone: 'هاتف',
    ongletReserver: 'احجز', ongletMes: 'حجوزاتي',
    mesVide: 'ستظهر مواعيدك هنا.', mesVideSub: 'احجز خانة للبدء.',
    statutConfirmee: 'مؤكّد', statutAttente: 'قيد الانتظار', statutAnnulee: 'ملغى', statutReportee: 'مؤجّل',
    ref: 'المرجع', annulerRdv: 'إلغاء', reporterRdv: 'تأجيل',
    confirmAnnuler: 'إلغاء هذا الحجز؟',
    favoriAjoute: 'أُضيف إلى المفضّلة', favoriRetire: 'أُزيل من المفضّلة',
    listeAttente: 'أنت على قائمة الانتظار. سنعلمك حالما تتوفّر خانة.',
  },
};

const STATUT_TXT = (t: (typeof TXT)['fr'], s: MaReservation['statut']) =>
  s === 'confirmee' ? t.statutConfirmee
  : s === 'annulee' ? t.statutAnnulee
  : s === 'reportee' ? t.statutReportee
  : s === 'liste_attente' ? t.listeAttente.split('.')[0]
  : t.statutAttente;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AgendaScreen({ navigation }: any) {
  const { lang } = useLang();
  const { token, user } = useAuth();
  const t = TXT[(['fr', 'en', 'ar'].includes(lang) ? lang : 'fr') as Lang3];

  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selected, setSelected] = useState<Creator | null>(null);
  const [creneaux, setCreneaux] = useState<Creneau[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [booking, setBooking] = useState<Creneau | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [nom, setNom] = useState((user as any)?.prenom ?? '');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [email, setEmail] = useState((user as any)?.email ?? '');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const [onglet, setOnglet] = useState<'reserver' | 'mes'>('reserver');
  const [mes, setMes] = useState<MaReservation[]>([]);
  const [mesLoading, setMesLoading] = useState(false);

  const chargerMes = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const em = ((user as any)?.email ?? email).trim();
    if (!em) { setMes([]); return; }
    setMesLoading(true);
    try {
      const r = await getMesReservations(em, token ?? undefined);
      setMes(r.reservations);
    } catch { setMes([]); }
    finally { setMesLoading(false); }
  }, [user, email, token]);

  useEffect(() => { if (onglet === 'mes') chargerMes(); }, [onglet, chargerMes]);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setCreators(await getCreators(token ?? undefined)); }
    catch { setError(t.erreur); }
    finally { setLoading(false); }
  }, [token, t.erreur]);

  useEffect(() => { load(); }, [load]);

  const ouvrirCreneaux = useCallback(async (c: Creator) => {
    setSelected(c); setBooking(null); setSlotsLoading(true); setCreneaux([]);
    try { setCreneaux(await getCreneaux(c.id, token ?? undefined)); }
    catch { setCreneaux([]); }
    finally { setSlotsLoading(false); }
  }, [token]);

  const confirmer = useCallback(async () => {
    if (!booking || !selected) return;
    if (!nom.trim() || !email.trim()) { Alert.alert(t.champs); return; }
    setSending(true);
    try {
      const res = await reserverCreneau({
        creneauId: booking.id, profilId: selected.id,
        nomClient: nom.trim(), emailClient: email.trim(), message: message.trim() || undefined,
      }, token ?? undefined);
      if (res.reference || res.confirmation || res.success) {
        const msg = res.listeAttente
          ? t.listeAttente
          : res.reference ? `${t.okSub}${res.reference}` : undefined;
        Alert.alert(t.ok, msg);
        setBooking(null); setMessage('');
        await ouvrirCreneaux(selected);
      } else { Alert.alert(t.erreur); }
    } catch { Alert.alert(t.erreur); }
    finally { setSending(false); }
  }, [booking, selected, nom, email, message, token, t, ouvrirCreneaux]);

  const annuler = useCallback((r: MaReservation) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const em = ((user as any)?.email ?? email).trim();
    Alert.alert(t.confirmAnnuler, undefined, [
      { text: t.annuler, style: 'cancel' },
      {
        text: t.annulerRdv, style: 'destructive',
        onPress: async () => {
          try {
            await annulerReservation({ profilId: r.profilId, reference: r.reference, emailClient: em }, token ?? undefined);
            await chargerMes();
          } catch { Alert.alert(t.erreur); }
        },
      },
    ]);
  }, [user, email, token, t, chargerMes]);

  const modaliteLabel = (m?: string) =>
    m === 'visio' ? t.visio : m === 'presentiel' ? t.presentiel : m === 'telephone' ? t.telephone : '';

  const jour = (iso: string) => {
    const loc = lang === 'ar' ? 'ar' : lang === 'en' ? 'en-US' : 'fr-FR';
    try { return new Date(iso + 'T00:00:00').toLocaleDateString(loc, { weekday: 'short', day: 'numeric', month: 'short' }); }
    catch { return iso; }
  };

  // Vue détail d'un créateur : ses créneaux + le formulaire de réservation.
  if (selected) {
    return (
      <ScreenContainer onRefresh={() => ouvrirCreneaux(selected)}>
        <TouchableOpacity style={styles.back} onPress={() => setSelected(null)} activeOpacity={0.7}>
          <AppText variant="body" color="or">{t.retour}</AppText>
        </TouchableOpacity>

        <View style={styles.head}>
          <AppText variant="h2">{selected.prenom} {selected.nom}</AppText>
          {!!selected.specialite && <AppText variant="body" color="secondary">{selected.specialite}</AppText>}
        </View>

        {slotsLoading ? (
          <CreatorListSkeleton />
        ) : creneaux.length === 0 ? (
          <EmptyState titre={t.slotsVide} />
        ) : (
          creneaux.map(c => (
            <View key={c.id}>
              <View style={styles.slot}>
                <View style={{ flex: 1 }}>
                  <AppText variant="body">{jour(c.date)} · {c.heureDebut}–{c.heureFin}</AppText>
                  <AppText variant="caption" color="secondary">
                    {c.type === 'groupe' ? t.groupe : t.individuel}
                    {modaliteLabel(c.modalite) ? ` · ${modaliteLabel(c.modalite)}` : ''}
                  </AppText>
                </View>
                {booking?.id !== c.id && (
                  <TouchableOpacity style={styles.slotBtn} onPress={() => setBooking(c)} activeOpacity={0.85}>
                    <AppText variant="caption" color="white">{t.reserver}</AppText>
                  </TouchableOpacity>
                )}
              </View>

              {booking?.id === c.id && (
                <AppCard style={styles.form}>
                  <AppInput value={nom} onChangeText={setNom} label={t.nom} placeholder={t.nom} />
                  <AppInput value={email} onChangeText={setEmail} label={t.email} placeholder={t.email}
                    keyboardType="email-address" autoCapitalize="none" />
                  <AppInput value={message} onChangeText={setMessage} label={t.message} placeholder={t.message}
                    multiline numberOfLines={3} />
                  <AppButton label={t.confirmer} onPress={confirmer} loading={sending} fullWidth />
                  <AppButton label={t.annuler} onPress={() => setBooking(null)} variant="ghost" fullWidth />
                </AppCard>
              )}
            </View>
          ))
        )}
      </ScreenContainer>
    );
  }

  // Carte d'une réservation de la cliente (onglet "Mes réservations").
  const renderResa = (r: MaReservation) => (
    <AppCard key={r.reference} style={styles.card}>
      <View style={styles.resaHead}>
        <AppText variant="body">{jour(r.date)} · {r.heureDebut}</AppText>
        <Chip label={STATUT_TXT(t, r.statut)} active={r.statut === 'confirmee'} />
      </View>
      <AppText variant="caption" color="secondary">{t.ref} {r.reference}</AppText>
      {r.statut !== 'annulee' && (
        <View style={styles.resaActions}>
          <AppButton label={t.annulerRdv} variant="ghost" onPress={() => annuler(r)} />
        </View>
      )}
    </AppCard>
  );

  // Vue liste : tous les créateurs réservables + onglet Mes réservations.
  return (
    <ScreenContainer onRefresh={onglet === 'mes' ? chargerMes : load}>
      <View style={styles.head}>
        <AppText variant="label" color="or">{t.surtitre}</AppText>
        <AppText variant="h1">{t.titre}</AppText>
        <AppText variant="body" color="secondary">{t.sous}</AppText>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, onglet === 'reserver' && styles.tabOn]}
          onPress={() => setOnglet('reserver')} activeOpacity={0.85}>
          <AppText variant="caption" color={onglet === 'reserver' ? 'white' : 'secondary'}>{t.ongletReserver}</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, onglet === 'mes' && styles.tabOn]}
          onPress={() => setOnglet('mes')} activeOpacity={0.85}>
          <AppText variant="caption" color={onglet === 'mes' ? 'white' : 'secondary'}>{t.ongletMes}</AppText>
        </TouchableOpacity>
      </View>

      {onglet === 'mes' ? (
        mesLoading ? (
          <CreatorListSkeleton />
        ) : mes.length === 0 ? (
          <EmptyState titre={t.mesVide} description={t.mesVideSub} />
        ) : (
          mes.map(renderResa)
        )
      ) : loading ? (
        <CreatorListSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : creators.length === 0 ? (
        <EmptyState titre={t.vide} description={t.videSub} />
      ) : (
        creators.map(c => (
          <AppCard key={c.id} style={styles.card} onPress={() => ouvrirCreneaux(c)}>
            <View style={styles.row}>
              <Avatar uri={c.photoUrl} prenom={c.prenom} nom={c.nom} />
              <View style={styles.body}>
                <AppText variant="h3">{c.prenom} {c.nom}</AppText>
                {!!c.specialite && <AppText variant="caption" color="secondary">{c.specialite}</AppText>}
                <View style={{ marginTop: Spacing.sm }}>
                  <Chip label={t.voir} active onPress={() => ouvrirCreneaux(c)} />
                </View>
              </View>
            </View>
          </AppCard>
        ))
      )}
    </ScreenContainer>
  );
}

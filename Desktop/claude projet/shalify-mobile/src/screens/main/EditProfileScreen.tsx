import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Linking } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, AppInput } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { UNIVERS } from '../../data/univers';
import {
  getMyProfile, saveMyProfile, getEditToken, emptyProfile,
  type EditableProfile, type EditableService,
} from '../../services/profile';

// Rubriques qu'une créatrice choisit pour sa fiche (Lives et Résonance sont des sections spéciales).
const RUBRIQUES = UNIVERS.filter(u => u.id !== 'lives' && u.id !== 'resonance');

const styles = StyleSheet.create({
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md },
  chip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.bordure,
  },
  chipActive: { borderColor: Colors.or, backgroundColor: Colors.or },
  serviceCard: { marginBottom: Spacing.md },
  removeRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: Spacing.xs },
  hint: { marginBottom: Spacing.md },
});

export function EditProfileScreen() {
  const { t, lang } = useLang();
  const { user, token } = useAuth();
  const navigation = useNavigation<any>();

  const [profile, setProfile] = useState<EditableProfile>(emptyProfile(user?.email ?? ''));
  const [editToken, setEditTokenState] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const email = user?.email ?? '';
      const [p, tok] = await Promise.all([getMyProfile(email, user?.id, token || undefined), getEditToken()]);
      if (!alive) return;
      setProfile(p);
      setEditTokenState(tok);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [user?.email, user?.id, token]);

  const set = <K extends keyof EditableProfile>(key: K, value: EditableProfile[K]) =>
    setProfile(prev => ({ ...prev, [key]: value }));

  const setService = (index: number, key: keyof EditableService, value: string) =>
    setProfile(prev => ({
      ...prev,
      services: prev.services.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    }));

  const addService = () =>
    setProfile(prev => ({
      ...prev,
      services: [...prev.services, { titre: '', description: '', duree: '', prix: '' }],
    }));

  const removeService = (index: number) =>
    setProfile(prev => ({ ...prev, services: prev.services.filter((_, i) => i !== index) }));

  const rubriqueLabel = (rub: string) => {
    const u = RUBRIQUES.find(x => x.rubrique === rub);
    return u ? (lang === 'en' ? u.en : lang === 'ar' ? u.ar : u.fr) : rub;
  };

  const onSave = async () => {
    if (!profile.prenom.trim() || !profile.nom.trim() || profile.bio.trim().length < 3) {
      Alert.alert(t('edit_profil_titre'), t('edit_profil_requis'));
      return;
    }
    if (!token && !editToken.trim()) {
      setTokenError(true);
      Alert.alert(t('edit_profil_titre'), t('edit_profil_code_requis'));
      return;
    }
    setSaving(true);
    setTokenError(false);
    try {
      await saveMyProfile(profile, editToken, token || undefined);
      Alert.alert(t('edit_profil_titre'), t('edit_profil_ok'), [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      const codeSouci = /token|édition|edition|401|403/i.test(msg);
      if (codeSouci) setTokenError(true);
      Alert.alert(t('edit_profil_titre'), codeSouci ? t('edit_profil_code_invalide') : (msg || t('edit_profil_erreur')));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer>
        <AppText variant="body" color="secondary">{t('chargement')}</AppText>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('edit_profil_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={styles.hint}>{t('edit_profil_intro')}</AppText>

      <AppInput label={t('edit_profil_prenom')} value={profile.prenom} onChangeText={v => set('prenom', v)} autoCapitalize="words" />
      <AppInput label={t('edit_profil_nom')} value={profile.nom} onChangeText={v => set('nom', v)} autoCapitalize="words" />
      <AppInput label={t('edit_profil_specialite')} value={profile.specialite} onChangeText={v => set('specialite', v)} placeholder={t('edit_profil_specialite_ph')} autoCapitalize="sentences" />
      <AppInput label={t('edit_profil_bio')} value={profile.bio} onChangeText={v => set('bio', v)} placeholder={t('edit_profil_bio_ph')} multiline numberOfLines={5} autoCapitalize="sentences" />

      <AppText variant="label" style={{ marginBottom: Spacing.sm }}>{t('edit_profil_rubrique')}</AppText>
      <View style={styles.chipRow}>
        {RUBRIQUES.map(u => {
          const active = profile.rubrique === u.rubrique;
          return (
            <Pressable key={u.id} onPress={() => set('rubrique', u.rubrique)} style={[styles.chip, active && styles.chipActive]} accessibilityRole="button">
              <AppText variant="bodySmall" color={active ? 'white' : 'secondary'}>{rubriqueLabel(u.rubrique)}</AppText>
            </Pressable>
          );
        })}
      </View>

      <AppInput label={t('edit_profil_ville')} value={profile.ville} onChangeText={v => set('ville', v)} autoCapitalize="words" />
      <AppInput label={t('edit_profil_pays')} value={profile.pays} onChangeText={v => set('pays', v)} autoCapitalize="words" />
      <AppInput label={t('edit_profil_photo')} value={profile.photoUrl} onChangeText={v => set('photoUrl', v)} placeholder="https://..." keyboardType="default" />
      <AppText variant="caption" color="muted" style={styles.hint}>{t('edit_profil_photo_aide')}</AppText>

      <AppText variant="h3" style={{ marginTop: Spacing.sm, marginBottom: Spacing.xs }}>{t('edit_profil_services')}</AppText>
      <AppText variant="caption" color="muted" style={styles.hint}>{t('edit_profil_services_aide')}</AppText>
      {profile.services.map((s, i) => (
        <AppCard key={i} style={styles.serviceCard}>
          <AppInput label={t('edit_profil_service_titre')} value={s.titre} onChangeText={v => setService(i, 'titre', v)} autoCapitalize="sentences" />
          <AppInput label={t('edit_profil_service_desc')} value={s.description} onChangeText={v => setService(i, 'description', v)} multiline numberOfLines={4} autoCapitalize="sentences" />
          <AppInput label={t('edit_profil_service_duree')} value={s.duree} onChangeText={v => setService(i, 'duree', v)} placeholder={t('edit_profil_service_duree_ph')} />
          <AppInput label={t('edit_profil_service_prix')} value={s.prix} onChangeText={v => setService(i, 'prix', v)} keyboardType="numeric" />
          <View style={styles.removeRow}>
            <AppButton label={t('edit_profil_service_retirer')} onPress={() => removeService(i)} variant="ghost" style={{ paddingVertical: 4 }} />
          </View>
        </AppCard>
      ))}
      <AppButton label={t('edit_profil_service_ajouter')} onPress={addService} variant="outline" style={{ marginBottom: Spacing.xl }} />

      <AppInput
        label={t('edit_profil_code')}
        value={editToken}
        onChangeText={setEditTokenState}
        placeholder={t('edit_profil_code_ph')}
        error={tokenError ? t('edit_profil_code_invalide') : undefined}
        autoCapitalize="none"
      />
      <Pressable onPress={() => Linking.openURL('https://shalify.app/creer-profil')} accessibilityRole="link">
        <AppText variant="caption" color="secondary" style={styles.hint}>{t('edit_profil_code_aide')}</AppText>
      </Pressable>

      <AppButton label={t('apercu_bouton')} onPress={() => navigation.navigate('ProfilePreview', { profile })} variant="outline" fullWidth style={{ marginBottom: Spacing.sm }} />
      <AppButton label={t('edit_profil_enregistrer')} onPress={onSave} loading={saving} fullWidth style={{ marginBottom: Spacing.xl }} />
    </ScreenContainer>
  );
}

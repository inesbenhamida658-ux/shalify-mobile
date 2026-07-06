import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Avatar, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { UNIVERS } from '../../data/univers';
import type { EditableProfile } from '../../services/profile';

const styles = StyleSheet.create({
  notice: { backgroundColor: Colors.creme2, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.lg, borderLeftWidth: 3, borderLeftColor: Colors.or },
  photo: { width: '100%', height: 220, borderRadius: Radius.lg, marginBottom: Spacing.md, backgroundColor: Colors.cremeF },
  header: { backgroundColor: Colors.vertTF, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.lg },
  serviceCard: { marginBottom: Spacing.sm },
  serviceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
});

export function ProfilePreviewScreen({ route, navigation }: any) {
  const { t, lang } = useLang();
  const profile = (route.params?.profile ?? null) as EditableProfile | null;

  if (!profile) {
    return (
      <ScreenContainer>
        <AppText variant="body" color="secondary">{t('apercu_indispo')}</AppText>
        <AppButton label={t('retour')} onPress={() => navigation.goBack()} style={{ marginTop: Spacing.lg }} />
      </ScreenContainer>
    );
  }

  const nomComplet = `${profile.prenom} ${profile.nom}`.trim() || t('apercu_nom_vide');
  const u = UNIVERS.find(x => x.rubrique === profile.rubrique);
  const rubriqueLabel = u ? (lang === 'en' ? u.en : lang === 'ar' ? u.ar : u.fr) : profile.rubrique;
  const services = profile.services.filter(s => s.titre.trim());

  return (
    <ScreenContainer>
      <View style={styles.notice}>
        <AppText variant="caption" color="secondary">{t('apercu_notice')}</AppText>
      </View>

      {profile.photoUrl ? (
        <Image source={{ uri: profile.photoUrl }} style={styles.photo} resizeMode="cover" />
      ) : null}

      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!profile.photoUrl ? (
            <Avatar prenom={profile.prenom} nom={profile.nom} size={60} style={{ marginRight: Spacing.md }} />
          ) : null}
          <View style={{ flex: 1 }}>
            <AppText variant="h2" color="white">{nomComplet}</AppText>
            {rubriqueLabel ? <AppText variant="bodySmall" color="white" style={{ opacity: 0.75, marginTop: 2 }}>{rubriqueLabel}</AppText> : null}
            {profile.specialite ? <AppText variant="bodySmall" color="or" style={{ marginTop: 2 }}>{profile.specialite}</AppText> : null}
            {(profile.ville || profile.pays) ? (
              <AppText variant="caption" color="white" style={{ opacity: 0.7, marginTop: 4 }}>
                {[profile.ville, profile.pays].filter(Boolean).join(' · ')}
              </AppText>
            ) : null}
          </View>
        </View>
      </View>

      {profile.bio ? (
        <AppCard style={{ marginBottom: Spacing.lg }}>
          <AppText variant="label">{t('creator_bio')}</AppText>
          <AppText variant="body" color="secondary" style={{ marginTop: Spacing.xs }}>{profile.bio}</AppText>
        </AppCard>
      ) : null}

      {services.length > 0 ? (
        <>
          <AppText variant="h3" style={{ marginBottom: Spacing.md }}>{t('creator_services')}</AppText>
          {services.map((s, i) => (
            <AppCard key={i} style={styles.serviceCard}>
              <View style={styles.serviceTop}>
                <AppText variant="label" style={{ flex: 1 }}>{s.titre}</AppText>
                {s.prix ? <AppText variant="label" color="or">{s.prix}</AppText> : null}
              </View>
              {s.duree ? <AppText variant="caption" color="muted" style={{ marginTop: Spacing.xs }}>⏱ {s.duree}</AppText> : null}
              {s.description ? <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.xs }}>{s.description}</AppText> : null}
            </AppCard>
          ))}
        </>
      ) : null}

      <AppButton label={t('apercu_continuer')} onPress={() => navigation.goBack()} fullWidth style={{ marginTop: Spacing.lg }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Spacing.md }}>
        <Glyph size={14} color={Colors.or}>✦</Glyph>
        <AppText variant="caption" color="muted" style={{ marginLeft: Spacing.xs }}>{t('apercu_pied')}</AppText>
      </View>
    </ScreenContainer>
  );
}

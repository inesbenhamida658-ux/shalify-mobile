import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, AppInput } from '../../components';
import { GradientHero } from '../../components/GradientHero';
import { Colors, Spacing, Radius } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCurrency, saveCurrency } from '../../storage';
import { CURRENCIES, getCurrencyLabel } from '../../utils/currency';
import type { Currency } from '../../types';

const styles = StyleSheet.create({
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: Colors.vert, justifyContent: 'center', alignItems: 'center',
    alignSelf: 'center', marginBottom: Spacing.md,
  },
  section: { marginBottom: Spacing.xl },
  currencyRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.sm },
  currencyChip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.bordure,
  },
  currencyChipActive: { borderColor: Colors.vert, backgroundColor: Colors.vert },
});

export function ProfileScreen() {
  const { t, lang, changeLang } = useLang();
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();
  const [currency, setCurrency] = React.useState<Currency>('EUR');
  const [loadedCurrency, setLoadedCurrency] = React.useState(false);

  React.useEffect(() => {
    getCurrency().then(c => { setCurrency(c as Currency); setLoadedCurrency(true); });
  }, []);

  const selectCurrency = async (c: Currency) => {
    await saveCurrency(c);
    setCurrency(c);
  };

  const handleLogout = () => {
    Alert.alert(t('profil_deconnexion'), t('profil_deconnexion_confirm'), [
      { text: t('annuler'), style: 'cancel' },
      { text: t('profil_deconnexion'), style: 'destructive', onPress: logout },
    ]);
  };

  if (!user) {
    return (
      <ScreenContainer>
        <GradientHero eyebrow="SHALIFY" titre={t('profil_titre')} sousTitre={t('profil_non_connecte')} />
        <AppButton label={t('signup_connexion')} onPress={() => navigation.navigate('Auth')} fullWidth />
        <AppButton label={t('login_signup')} onPress={() => navigation.navigate('Auth')} variant="outline" style={{ marginTop: Spacing.sm }} />
        <AppButton label={t('settings_titre')} onPress={() => navigation.navigate('Settings')} variant="outline" style={{ marginTop: Spacing.sm }} />
        <AppButton label={t('about_carte_bouton')} onPress={() => navigation.navigate('About')} variant="ghost" style={{ marginTop: Spacing.sm }} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.avatar}>
        <AppText variant="h2" color="white">{user.prenom?.[0] ?? user.email?.[0]?.toUpperCase() ?? '?'}</AppText>
      </View>
      <AppText variant="h2" align="center">{user.prenom}</AppText>
      <AppText variant="bodySmall" color="secondary" align="center" style={{ marginBottom: Spacing.xl }}>{user.email}</AppText>

      <View style={styles.section}>
        <AppText variant="h3" style={{ marginBottom: Spacing.xs }}>{t('edit_profil_carte_titre')}</AppText>
        <AppText variant="caption" color="muted" style={{ marginBottom: Spacing.sm }}>{t('edit_profil_carte_sous')}</AppText>
        <AppButton label={t('edit_profil_carte_bouton')} onPress={() => navigation.navigate('EditProfile')} fullWidth />
      </View>

      <View style={styles.section}>
        <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{t('settings_langue')}</AppText>
        <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
          {(['fr', 'en', 'ar'] as const).map(l => (
            <AppButton key={l} label={l.toUpperCase()} onPress={() => changeLang(l)} variant={lang === l ? 'primary' : 'outline'} style={{ flex: 1 }} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="h3" style={{ marginBottom: Spacing.xs }}>{t('settings_devise')}</AppText>
        <AppText variant="caption" color="muted">{t('settings_devise_notice')}</AppText>
        <View style={styles.currencyRow}>
          {CURRENCIES.map(c => (
            <View key={c} style={[styles.currencyChip, currency === c && styles.currencyChipActive]}>
              <AppButton label={getCurrencyLabel(c)} onPress={() => selectCurrency(c)} variant="ghost" style={{ padding: 0 }} />
            </View>
          ))}
        </View>
      </View>

      <AppButton label={t('settings_titre')} onPress={() => navigation.navigate('Settings')} variant="outline" style={{ marginBottom: Spacing.sm }} />
      <AppButton label={t('about_carte_bouton')} onPress={() => navigation.navigate('About')} variant="ghost" style={{ marginBottom: Spacing.sm }} />
      <AppButton label={t('legal_carte_bouton')} onPress={() => navigation.navigate('Legal')} variant="ghost" style={{ marginBottom: Spacing.sm }} />
      <AppButton label={t('profil_deconnexion')} onPress={handleLogout} variant="outline" style={{ borderColor: Colors.erreur }} />
    </ScreenContainer>
  );
}

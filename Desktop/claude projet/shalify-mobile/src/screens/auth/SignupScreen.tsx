import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppInput, AppButton } from '../../components';
import { Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { requestOTP, verifyOTP } from '../../services/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export function SignupScreen({ navigation }: Props) {
  const { t, isRTL } = useLang();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');
    if (!prenom.trim()) { setError(t('err_prenom')); return; }
    if (!email.includes('@')) { setError(t('err_email')); return; }
    setLoading(true);
    try {
      // Inscription via OTP — même flux que connexion
      await requestOTP(email);
      navigation.navigate('Login');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t('erreur_generique'));
    } finally { setLoading(false); }
  };

  return (
    <ScreenContainer scrollable>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('signup_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.xl }}>{t('signup_sous_titre')}</AppText>

      <AppInput label={t('signup_prenom')} value={prenom} onChangeText={setPrenom} placeholder={t('signup_prenom_ph')} rtl={isRTL} />
      <AppInput label={t('signup_email')} value={email} onChangeText={setEmail} placeholder={t('login_email_ph')} keyboardType="email-address" error={error} rtl={isRTL} />

      <AppButton label={t('signup_cta')} onPress={handleSignup} loading={loading} fullWidth />
      <AppButton label={t('signup_connexion')} onPress={() => navigation.navigate('Login')} variant="ghost" style={{ marginTop: Spacing.sm }} />
    </ScreenContainer>
  );
}

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppInput, AppButton } from '../../components';
import { Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { registerWithPassword } from '../../services/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export function SignupScreen({ navigation }: Props) {
  const { t, isRTL } = useLang();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');
    if (!prenom.trim()) { setError(t('err_prenom')); return; }
    if (!email.includes('@')) { setError(t('err_email')); return; }
    if (password.length < 8) { setError(t('signup_password_error')); return; }
    if (password !== confirm) { setError(t('signup_confirm_error')); return; }
    setLoading(true);
    try {
      const auth = await registerWithPassword(prenom.trim(), email.trim().toLowerCase(), password);
      await setAuth(auth.token, auth.user);
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
      <AppInput label={t('signup_password')} value={password} onChangeText={setPassword} placeholder={t('signup_password_ph')} secureTextEntry rtl={isRTL} />
      <AppText variant="caption" color={password.length >= 8 ? 'or' : 'secondary'} style={{ marginTop: -Spacing.sm, marginBottom: Spacing.md }}>
        {password.length >= 8 ? t('signup_password_ok') : `${password.length}/8`}
      </AppText>
      <AppInput label={t('signup_confirm')} value={confirm} onChangeText={setConfirm} placeholder={t('signup_confirm_ph')} secureTextEntry rtl={isRTL} />

      <AppButton label={t('signup_cta')} onPress={handleSignup} loading={loading} fullWidth />
      <AppButton label={t('signup_connexion')} onPress={() => navigation.navigate('Login')} variant="ghost" style={{ marginTop: Spacing.sm }} />
    </ScreenContainer>
  );
}

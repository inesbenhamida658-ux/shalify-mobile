import React, { useState } from 'react';
import { ScreenContainer, AppText, AppInput, AppButton } from '../../components';
import { Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { forgotPassword } from '../../services/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const { t, isRTL } = useLang();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [succes, setSucces] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!email.includes('@')) { setError('Email invalide'); return; }
    setLoading(true);
    try {
      await forgotPassword(email);
      setSucces(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t('erreur_generique'));
    } finally { setLoading(false); }
  };

  if (succes) {
    return (
      <ScreenContainer scrollable>
        <AppText variant="h2" style={{ marginBottom: Spacing.md }}>{t('forgot_succes')}</AppText>
        <AppButton label={t('forgot_retour')} onPress={() => navigation.goBack()} variant="outline" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('forgot_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.xl }}>{t('forgot_sous_titre')}</AppText>
      <AppInput label={t('login_email')} value={email} onChangeText={setEmail} placeholder="ton@email.com" keyboardType="email-address" error={error} rtl={isRTL} />
      <AppButton label={t('forgot_cta')} onPress={handleSubmit} loading={loading} fullWidth />
      <AppButton label={t('forgot_retour')} onPress={() => navigation.goBack()} variant="ghost" style={{ marginTop: Spacing.sm }} />
    </ScreenContainer>
  );
}

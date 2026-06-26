import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenContainer, AppText, AppInput, AppButton } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { requestOTP, verifyOTP } from '../../services/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const styles = StyleSheet.create({
  logo: { marginBottom: Spacing.xl, marginTop: Spacing.lg },
  orDivider: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.lg },
  orLine: { flex: 1, height: 1, backgroundColor: Colors.bordure },
  orText: { marginHorizontal: Spacing.md },
  links: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.md },
});

export function LoginScreen({ navigation }: Props) {
  const { t, isRTL } = useLang();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendOTP = async () => {
    setError('');
    if (!email.includes('@')) { setError('Email invalide'); return; }
    setLoading(true);
    try {
      await requestOTP(email);
      setStep('otp');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t('erreur_generique'));
    } finally { setLoading(false); }
  };

  const confirmOTP = async () => {
    setError('');
    if (otp.length < 4) { setError('Code invalide'); return; }
    setLoading(true);
    try {
      const { token, user } = await verifyOTP(email, otp);
      await setAuth(token, user);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t('erreur_generique'));
    } finally { setLoading(false); }
  };

  return (
    <ScreenContainer scrollable>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.logo}>
          <AppText variant="labelSmall" color="or" align="center">SHALIFY</AppText>
          <AppText variant="h2" align="center" style={{ marginTop: Spacing.sm }}>{t('login_titre')}</AppText>
          <AppText variant="bodySmall" color="secondary" align="center" style={{ marginTop: Spacing.xs }}>{t('login_sous_titre')}</AppText>
        </View>

        {step === 'email' ? (
          <>
            <AppInput
              label={t('login_email')}
              value={email}
              onChangeText={setEmail}
              placeholder={t('login_email_ph')}
              keyboardType="email-address"
              error={error}
              rtl={isRTL}
            />
            <AppButton label={loading ? t('login_loading') : t('login_cta')} onPress={sendOTP} loading={loading} fullWidth />
          </>
        ) : (
          <>
            <AppText variant="h3" align="center">{t('login_otp_titre')}</AppText>
            <AppText variant="bodySmall" color="secondary" align="center" style={{ marginBottom: Spacing.lg, marginTop: Spacing.xs }}>{t('login_otp_sous_titre')}</AppText>
            <AppInput
              label="Code"
              value={otp}
              onChangeText={setOtp}
              placeholder={t('login_otp_ph')}
              keyboardType="number-pad"
              maxLength={6}
              error={error}
              rtl={isRTL}
            />
            <AppButton label={t('login_otp_cta')} onPress={confirmOTP} loading={loading} fullWidth />
            <AppButton label={t('retour')} onPress={() => setStep('email')} variant="ghost" style={{ marginTop: Spacing.sm }} />
          </>
        )}

        {step === 'email' && (
          <View style={styles.links}>
            <AppButton label={t('login_signup')} onPress={() => navigation.navigate('Signup')} variant="ghost" />
            <AppButton label={t('login_forgot')} onPress={() => navigation.navigate('ForgotPassword')} variant="ghost" />
          </View>
        )}
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

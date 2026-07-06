import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppInput, AppButton } from '../../components';
import { Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { requestOTP, verifyOTP, loginWithPassword } from '../../services/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const styles = StyleSheet.create({
  logo: { marginBottom: Spacing.xl, marginTop: Spacing.lg },
  links: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.md },
});

export function LoginScreen({ navigation }: Props) {
  const { t, isRTL } = useLang();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendOTP = async () => {
    setError('');
    if (!email.includes('@')) { setError(t('err_email')); return; }
    setLoading(true);
    try {
      await requestOTP(email);
      setStep('otp');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t('erreur_generique'));
    } finally { setLoading(false); }
  };

  const signInWithPassword = async () => {
    setError('');
    if (!email.includes('@')) { setError(t('err_email')); return; }
    if (password.length < 1) { setError(t('login_password_ph')); return; }
    setLoading(true);
    try {
      const { token, user } = await loginWithPassword(email, password);
      await setAuth(token, user);
      navigation.getParent()?.goBack();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t('erreur_generique'));
    } finally { setLoading(false); }
  };

  const confirmOTP = async () => {
    setError('');
    if (otp.length < 4) { setError(t('err_code')); return; }
    setLoading(true);
    try {
      const { token, user } = await verifyOTP(email, otp);
      await setAuth(token, user);
      navigation.getParent()?.goBack();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t('erreur_generique'));
    } finally { setLoading(false); }
  };

  return (
    <ScreenContainer scrollable>
      <View>
        <View style={{ alignItems: isRTL ? 'flex-start' : 'flex-end', marginBottom: Spacing.sm }}>
          <AppButton label={t('login_sans_compte')} onPress={() => navigation.getParent()?.goBack()} variant="ghost" />
        </View>
        <View style={styles.logo}>
          <AppText variant="labelSmall" color="or" align="center">SHALIFY</AppText>
          <AppText variant="h2" align="center" style={{ marginTop: Spacing.sm }}>{t('login_titre')}</AppText>
          <AppText variant="bodySmall" color="secondary" align="center" style={{ marginTop: Spacing.xs }}>{t('login_sous_titre')}</AppText>
        </View>

        {step === 'form' ? (
          <>
            <AppInput
              label={t('login_email')}
              value={email}
              onChangeText={setEmail}
              placeholder={t('login_email_ph')}
              keyboardType="email-address"
              rtl={isRTL}
            />
            <AppInput
              label={t('login_password')}
              value={password}
              onChangeText={setPassword}
              placeholder={t('login_password_ph')}
              secureTextEntry
              error={error}
              rtl={isRTL}
            />
            <AppButton label={loading ? t('login_loading') : t('login_password_cta')} onPress={signInWithPassword} loading={loading} fullWidth />
            <AppButton label={t('login_use_code')} onPress={sendOTP} variant="outline" style={{ marginTop: Spacing.sm }} fullWidth />
            <View style={styles.links}>
              <AppButton label={t('login_signup')} onPress={() => navigation.navigate('Signup')} variant="ghost" />
              <AppButton label={t('login_forgot')} onPress={() => navigation.navigate('ForgotPassword')} variant="ghost" />
            </View>
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
            <AppButton label={t('retour')} onPress={() => setStep('form')} variant="ghost" style={{ marginTop: Spacing.sm }} />
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

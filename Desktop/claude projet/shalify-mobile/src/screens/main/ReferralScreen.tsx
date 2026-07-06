import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Share } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getReferralCode } from '../../services/rituel';

const styles = StyleSheet.create({
  codeBox: {
    borderWidth: 1.5, borderColor: Colors.or, borderRadius: Radius.md,
    backgroundColor: Colors.creme, paddingVertical: Spacing.lg,
    alignItems: 'center', marginVertical: Spacing.lg,
  },
});

export function ReferralScreen() {
  const { t } = useLang();
  const { user } = useAuth();
  const [code, setCode] = useState('');

  useEffect(() => {
    getReferralCode(user?.email ?? user?.prenom ?? undefined).then(setCode).catch(() => setCode(''));
  }, [user?.email, user?.prenom]);

  const share = async () => {
    if (!code) return;
    const message = `${t('referral_share_intro')} ${code} : shalify.app`;
    try { await Share.share({ message }); } catch { /* ignore */ }
  };

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.sm }}>{t('referral_titre')}</AppText>
      <AppText variant="body" color="secondary">{t('referral_sous')}</AppText>

      <AppCard style={{ marginTop: Spacing.lg }}>
        <AppText variant="labelSmall" color="secondary">{t('referral_code').toUpperCase()}</AppText>
        <View style={styles.codeBox}>
          <AppText variant="h2" color="or">{code || '···'}</AppText>
        </View>
        <AppButton label={t('referral_partager')} onPress={share} disabled={!code} fullWidth />
      </AppCard>
    </ScreenContainer>
  );
}

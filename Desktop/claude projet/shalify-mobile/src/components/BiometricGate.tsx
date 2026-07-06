import React, { useEffect, useState, ReactNode, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import { Colors } from '../theme';
import { Fonts } from '../fonts';

// Verrou Face ID / Touch ID pour le compte connecte.
// Regle de securite : un membre connecte deverrouille l'app par biometrie a l'ouverture.
// Toujours ouvert si l'appareil n'a pas de biometrie (pour ne jamais bloquer un membre).

export function BiometricGate({ children }: { children: ReactNode }) {
  const { token, loading } = useAuth();
  const { t } = useLang();
  const needLock = !!token; // seuls les membres connectes sont proteges
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  const authenticate = useCallback(async () => {
    setChecking(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!hasHardware || !enrolled) { setUnlocked(true); setChecking(false); return; }
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: t('biometrie_prompt'),
        fallbackLabel: t('biometrie_fallback'),
        cancelLabel: t('annuler'),
      });
      if (res.success) setUnlocked(true);
    } catch {
      setUnlocked(true); // en cas de souci technique, on laisse entrer
    }
    setChecking(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!needLock) { setUnlocked(true); setChecking(false); return; }
    authenticate();
  }, [loading, needLock, authenticate]);

  if (loading || !needLock || unlocked) return <>{children}</>;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.creme, alignItems: 'center', justifyContent: 'center', padding: 28 }}>
      <Text style={{ fontFamily: Fonts.serifSemi, fontSize: 34, color: Colors.vert, marginBottom: 10, letterSpacing: 1 }}>Shalify</Text>
      <Text style={{ fontFamily: Fonts.bodyRegular, color: Colors.brume, marginBottom: 30, textAlign: 'center', fontSize: 15, lineHeight: 22 }}>
        {t('biometrie_titre')}
      </Text>
      {checking ? (
        <ActivityIndicator color={Colors.or} />
      ) : (
        <TouchableOpacity onPress={authenticate} accessibilityRole="button" accessibilityLabel={t('biometrie_cta')} style={{ borderWidth: 1, borderColor: Colors.or, paddingVertical: 15, paddingHorizontal: 42, borderRadius: 999 }}>
          <Text style={{ fontFamily: Fonts.bodySemi, color: Colors.vert, letterSpacing: 3, fontSize: 12 }}>{t('biometrie_cta')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

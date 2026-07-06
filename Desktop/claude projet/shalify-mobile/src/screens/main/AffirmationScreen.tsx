import React, { useEffect, useState } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppInput, AppButton } from '../../components';
import { Colors, Spacing } from '../../theme';
import { Fonts } from '../../fonts';
import { useLang } from '../../context/LangContext';
import { getAffirmation, saveAffirmation } from '../../services/douceur';

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.creme, borderWidth: 1.5, borderColor: Colors.or, marginBottom: Spacing.lg, paddingVertical: Spacing.xl },
  phrase: { fontFamily: Fonts.serifMedium, fontSize: 24, lineHeight: 34 },
});

// Affirmation à personnaliser : l'utilisatrice écrit sa propre phrase du jour.
export function AffirmationScreen() {
  const { t, lang } = useLang();
  const [draft, setDraft] = useState('');
  const [saved, setSaved] = useState('');

  useEffect(() => { getAffirmation().then(v => { setSaved(v); setDraft(v); }); }, []);

  const save = async () => {
    const v = draft.trim();
    await saveAffirmation(v);
    setSaved(v);
    Keyboard.dismiss();
  };

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('affirmation_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('affirmation_sous')}</AppText>

      <AppCard style={styles.card}>
        <AppText variant="h2" align="center" style={styles.phrase}>
          « {saved || t('affirmation_vide')} »
        </AppText>
      </AppCard>

      <AppInput
        value={draft}
        onChangeText={setDraft}
        placeholder={t('affirmation_ph')}
        autoCapitalize="sentences"
        rtl={lang === 'ar'}
        maxLength={120}
        style={{ marginBottom: Spacing.sm }}
      />
      <AppButton label={t('affirmation_save')} onPress={save} disabled={!draft.trim()} fullWidth />
    </ScreenContainer>
  );
}

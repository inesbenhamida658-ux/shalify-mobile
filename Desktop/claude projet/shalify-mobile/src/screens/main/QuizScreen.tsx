import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, AppText, AppButton, Chip } from '../../components';
import { Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { VALUES } from '../../data/rituelContent';
import { getQuizValues, saveQuizValues } from '../../services/rituel';

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.lg, marginBottom: Spacing.xl },
});

export function QuizScreen() {
  const { t, lang } = useLang();
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => { getQuizValues().then(setSelected).catch(() => setSelected([])); }, []);

  const toggle = (key: string) => {
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const validate = async () => {
    await saveQuizValues(selected);
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.sm }}>{t('quiz_boussole')}</AppText>
      <AppText variant="body" color="secondary">{t('quiz_sous')}</AppText>

      <View style={styles.chips}>
        {VALUES.map(v => (
          <Chip
            key={v.key}
            label={v.label[lang] ?? v.label.fr}
            active={selected.includes(v.key)}
            onPress={() => toggle(v.key)}
          />
        ))}
      </View>

      <AppButton label={t('quiz_valider')} onPress={validate} disabled={selected.length === 0} fullWidth />
      <AppButton label={t('quiz_passer')} onPress={() => navigation.goBack()} variant="ghost" style={{ marginTop: Spacing.sm }} fullWidth />
    </ScreenContainer>
  );
}

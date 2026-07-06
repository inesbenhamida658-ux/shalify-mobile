import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { TEST_QUESTIONS, profilGagnant, type QuizProfil } from '../../data/experienceContent';
import { saveTestResult } from '../../services/douceur';

const styles = StyleSheet.create({
  progressRow: { flexDirection: 'row', gap: Spacing.xs, marginBottom: Spacing.lg },
  dot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: Colors.bordure },
  dotActive: { backgroundColor: Colors.or },
  option: {
    borderWidth: 1.5, borderColor: Colors.bordure, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.sm, backgroundColor: Colors.blanc,
  },
  optionRow: { flexDirection: 'row', alignItems: 'center' },
  resultEmblem: {
    width: 72, height: 72, borderRadius: 36, alignSelf: 'center', marginBottom: Spacing.md,
    backgroundColor: Colors.creme2, borderWidth: 1.5, borderColor: Colors.or,
    alignItems: 'center', justifyContent: 'center',
  },
});

export function TestScreen({ navigation }: any) {
  const { t, lang } = useLang();
  const questions = TEST_QUESTIONS[lang] ?? TEST_QUESTIONS.fr;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizProfil | null>(null);

  const choose = (profil: string) => {
    const next = [...answers, profil];
    setAnswers(next);
    if (step + 1 >= questions.length) {
      const gagnant = profilGagnant(lang, next);
      setResult(gagnant);
      saveTestResult(gagnant.key).catch(() => {});
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => { setStep(0); setAnswers([]); setResult(null); };

  if (result) {
    return (
      <ScreenContainer>
        <AppText variant="labelSmall" color="or" align="center" style={{ marginBottom: Spacing.sm }}>{t('test_resultat').toUpperCase()}</AppText>
        <View style={styles.resultEmblem}><Glyph size={28} color={Colors.or}>✦</Glyph></View>
        <AppText variant="h2" align="center" style={{ marginBottom: Spacing.sm }}>{result.titre}</AppText>
        <AppCard style={{ marginBottom: Spacing.lg }}>
          <AppText variant="body" color="secondary" align="center">{result.texte}</AppText>
        </AppCard>
        <AppButton label={t('test_explorer')} onPress={() => navigation.navigate('Tabs', { screen: 'CreateursTab' })} fullWidth />
        <AppButton label={t('test_refaire')} onPress={restart} variant="outline" style={{ marginTop: Spacing.sm }} fullWidth />
      </ScreenContainer>
    );
  }

  const question = questions[step];
  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.sm }}>{t('test_titre')}</AppText>
      <View style={styles.progressRow}>
        {questions.map((_, i) => (
          <View key={i} style={[styles.dot, i <= step && styles.dotActive]} />
        ))}
      </View>
      <AppText variant="h3" style={{ marginBottom: Spacing.lg }}>{question.q}</AppText>
      {question.options.map((o, i) => (
        <Pressable key={i} onPress={() => choose(o.profil)} style={styles.option} accessibilityRole="button">
          <View style={styles.optionRow}>
            <AppText variant="body" style={{ flex: 1 }}>{o.texte}</AppText>
            <Glyph size={18} color={Colors.or}>›</Glyph>
          </View>
        </Pressable>
      ))}
      <AppText variant="caption" color="muted" align="center" style={{ marginTop: Spacing.md }}>
        {t('test_progression').replace('{n}', String(step + 1)).replace('{total}', String(questions.length))}
      </AppText>
    </ScreenContainer>
  );
}

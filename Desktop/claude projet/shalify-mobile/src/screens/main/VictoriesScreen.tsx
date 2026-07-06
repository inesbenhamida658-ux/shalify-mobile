import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppInput, AppButton, Glyph } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { getVictoires, addVictoire, removeVictoire, type VictoireEntry } from '../../services/douceur';

const styles = StyleSheet.create({
  entry: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.bordure },
  entryText: { flex: 1 },
  del: { paddingHorizontal: Spacing.sm },
});

// Petites victoires : noter une réussite du jour, avec archive en cartes.
export function VictoriesScreen() {
  const { t, lang } = useLang();
  const [draft, setDraft] = useState('');
  const [list, setList] = useState<VictoireEntry[]>([]);

  useEffect(() => { getVictoires().then(setList); }, []);

  const add = async () => {
    setList(await addVictoire(draft));
    setDraft('');
  };
  const del = async (i: number) => { setList(await removeVictoire(i)); };

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('victoires_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.md }}>{t('victoires_sous')}</AppText>

      <AppInput
        value={draft}
        onChangeText={setDraft}
        placeholder={t('victoires_ph')}
        autoCapitalize="sentences"
        rtl={lang === 'ar'}
        maxLength={140}
      />
      <AppButton label={t('victoires_add')} onPress={add} disabled={!draft.trim()} fullWidth style={{ marginBottom: Spacing.lg }} />

      {list.length === 0 ? (
        <AppText variant="bodySmall" color="muted">{t('victoires_vide')}</AppText>
      ) : (
        <AppCard>
          {list.map((v, i) => (
            <View key={`${v.date}-${i}`} style={[styles.entry, i === list.length - 1 ? { borderBottomWidth: 0 } : null]}>
              <View style={styles.entryText}>
                <AppText variant="caption" color="muted">{v.date}</AppText>
                <AppText variant="body">{v.text}</AppText>
              </View>
              <TouchableOpacity style={styles.del} onPress={() => del(i)} hitSlop={8} accessibilityRole="button">
                <Glyph size={16} color={Colors.gris}>✕</Glyph>
              </TouchableOpacity>
            </View>
          ))}
        </AppCard>
      )}
    </ScreenContainer>
  );
}

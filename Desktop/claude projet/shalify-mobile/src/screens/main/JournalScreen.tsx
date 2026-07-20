import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenContainer, AppText, AppInput, AppButton, AppCard, EmptyState } from '../../components';
import { Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';

const KEY = 'shalify_journal';

interface Entry { id: string; texte: string; date: string; }

// Textes en ligne (zéro dépendance i18n → aucun conflit avec les autres agents).
const TXT: Record<string, { titre: string; sous: string; ph: string; save: string; vide: string }> = {
  fr: { titre: 'Mon journal', sous: 'Notez ce qui compte pour vous aujourd’hui', ph: 'Aujourd’hui, je ressens…', save: 'Enregistrer', vide: 'Vos notes apparaîtront ici' },
  en: { titre: 'My journal', sous: 'Write what matters to you today', ph: 'Today, I feel…', save: 'Save', vide: 'Your notes will appear here' },
  ar: { titre: 'مذكراتي', sous: 'اكتب ما يهمّك اليوم', ph: '…اليوم، أشعر', save: 'حفظ', vide: 'ستظهر ملاحظاتك هنا' },
};

export function JournalScreen() {
  const { lang } = useLang();
  const tx = TXT[lang] ?? TXT.fr;
  const [texte, setTexte] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(r => {
      if (r) { try { setEntries(JSON.parse(r) as Entry[]); } catch { /* ignore */ } }
    });
  }, []);

  const persist = async (list: Entry[]) => {
    setEntries(list);
    await AsyncStorage.setItem(KEY, JSON.stringify(list)).catch(() => {});
  };

  const save = async () => {
    const v = texte.trim();
    if (!v) return;
    const d = new Date();
    const dateLabel = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
    const entry: Entry = { id: `${d.getTime()}`, texte: v, date: dateLabel };
    await persist([entry, ...entries]);
    setTexte('');
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{tx.titre}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.md }}>{tx.sous}</AppText>
      <AppInput value={texte} onChangeText={setTexte} placeholder={tx.ph} style={{ marginBottom: Spacing.sm }} />
      <AppButton label={tx.save} onPress={save} fullWidth style={{ marginBottom: Spacing.lg }} />
      <FlatList
        data={entries}
        keyExtractor={e => e.id}
        style={{ flex: 1 }}
        ListEmptyComponent={<EmptyState titre="" description={tx.vide} />}
        renderItem={({ item }) => (
          <AppCard style={{ marginBottom: Spacing.sm }}>
            <AppText variant="labelSmall" color="or">{item.date}</AppText>
            <AppText variant="body" color="secondary" style={{ marginTop: 2 }}>{item.texte}</AppText>
          </AppCard>
        )}
      />
    </ScreenContainer>
  );
}

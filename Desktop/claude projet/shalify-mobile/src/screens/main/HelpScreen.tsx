import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, Glyph } from '../../components';
import { Spacing, Colors } from '../../theme';
import { useLang } from '../../context/LangContext';
import { FAQ } from '../../data/rituelContent';

const styles = StyleSheet.create({
  item: { marginBottom: Spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  q: { flex: 1, marginRight: Spacing.sm },
});

export function HelpScreen() {
  const { t, lang } = useLang();
  const items = FAQ[lang] ?? FAQ.fr;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.sm }}>{t('help_titre')}</AppText>
      <AppText variant="body" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('help_sous')}</AppText>

      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <AppCard key={i} style={styles.item} onPress={() => setOpen(expanded ? null : i)}>
            <View style={styles.head}>
              <AppText variant="label" style={styles.q}>{item.q}</AppText>
              <Glyph size={18} color={Colors.or}>{expanded ? '−' : '+'}</Glyph>
            </View>
            {expanded && (
              <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.sm }}>{item.a}</AppText>
            )}
          </AppCard>
        );
      })}
    </ScreenContainer>
  );
}

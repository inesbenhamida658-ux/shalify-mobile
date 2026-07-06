import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, EmptyState, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { Fonts } from '../../fonts';
import { useLang } from '../../context/LangContext';
import { getGratitude, type GratitudeEntry } from '../../services/rituel';

// Boîte à gratitudes : relire ses plus belles gratitudes en grand format.
// Le journal de gratitude est déjà tenu dans le rituel : ici on le relit,
// en douceur, chaque note posée comme une carte à savourer.
const TXT: Record<string, { titre: string; sous: string; vide: string; label: string }> = {
  fr: { titre: 'Ma boîte à gratitudes', sous: 'Relis ce qui a réchauffé ton cœur.', vide: 'Tes gratitudes t’attendront ici, dès la première.', label: 'GRATITUDE' },
  en: { titre: 'My gratitude box', sous: 'Read again what warmed your heart.', vide: 'Your gratitudes will wait here, from the very first.', label: 'GRATITUDE' },
  ar: { titre: 'صندوق امتناني', sous: 'أعد قراءة ما أدفأ قلبك.', vide: 'ستنتظرك امتنانَاتُك هنا، من الأولى.', label: 'امتنان' },
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.or,
    backgroundColor: Colors.creme,
  },
  quote: {
    fontFamily: Fonts.serifMedium,
    fontSize: 22,
    lineHeight: 32,
    color: Colors.encre,
    marginTop: Spacing.sm,
  },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  emblem: {
    width: 34, height: 34, borderRadius: Radius.full,
    backgroundColor: Colors.cremeF, borderWidth: 1, borderColor: 'rgba(201,168,76,0.45)',
    alignItems: 'center', justifyContent: 'center',
  },
});

export function GratitudesScreen() {
  const { lang } = useLang();
  const tx = TXT[lang] ?? TXT.fr;
  const [list, setList] = useState<GratitudeEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getGratitude().then(setList).catch(() => setList([])).finally(() => setLoaded(true));
  }, []);

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{tx.titre}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{tx.sous}</AppText>

      {loaded && list.length === 0 && <EmptyState titre="" description={tx.vide} />}

      {list.map((g, i) => (
        <AppCard key={`${g.date}-${i}`} style={styles.card}>
          <View style={styles.head}>
            <AppText variant="labelSmall" color="or">{tx.label}</AppText>
            <View style={styles.emblem}><Glyph size={16} color={Colors.or}>♥</Glyph></View>
          </View>
          <AppText style={styles.quote}>{g.text}</AppText>
          <AppText variant="caption" color="muted" style={{ marginTop: Spacing.sm }}>{g.date}</AppText>
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

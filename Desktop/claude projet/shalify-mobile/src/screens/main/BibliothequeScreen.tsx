import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenContainer, AppText, AppCard, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { getBookmarks, type FormationMarquee } from '../../services/douceur';

const TXT: Record<string, { marquees: string; vide: string }> = {
  fr: { marquees: 'Mes formations marquées', vide: 'Marque une formation pour la retrouver ici.' },
  en: { marquees: 'My bookmarked courses', vide: 'Bookmark a course to find it here.' },
  ar: { marquees: 'تكويناتي المحفوظة', vide: 'احفظ تكويناً لتجده هنا.' },
};

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md, flexDirection: 'row', alignItems: 'center' },
  emblem: {
    width: 48, height: 48, borderRadius: Radius.md, marginRight: Spacing.md,
    backgroundColor: Colors.cremeF, borderWidth: 1, borderColor: 'rgba(201,168,76,0.45)',
    alignItems: 'center', justifyContent: 'center',
  },
  emblemDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: Colors.or, opacity: 0.8 },
  body: { flex: 1 },
  marqueeCard: { marginBottom: Spacing.sm, borderLeftWidth: 3, borderLeftColor: Colors.or },
});

function HubCard({ titre, sous, onPress }: { titre: string; sous: string; onPress: () => void }) {
  return (
    <AppCard style={styles.card} onPress={onPress}>
      <View style={styles.emblem}><View style={styles.emblemDot} /></View>
      <View style={styles.body}>
        <AppText variant="h3">{titre}</AppText>
        <AppText variant="caption" color="secondary" style={{ marginTop: 2 }}>{sous}</AppText>
      </View>
      <Glyph size={22} color={Colors.or}>›</Glyph>
    </AppCard>
  );
}

export function BibliothequeScreen({ navigation }: any) {
  const { t, lang } = useLang();
  const tx = TXT[lang] ?? TXT.fr;
  const [marquees, setMarquees] = useState<FormationMarquee[]>([]);

  useFocusEffect(
    useCallback(() => {
      getBookmarks().then(setMarquees).catch(() => setMarquees([]));
    }, [])
  );

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('biblio_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('biblio_sous')}</AppText>
      <HubCard titre={t('biblio_formations')} sous={t('biblio_formations_sous')} onPress={() => navigation.navigate('Formations')} />
      <HubCard titre={t('biblio_lives')} sous={t('biblio_lives_sous')} onPress={() => navigation.navigate('Lives')} />
      <HubCard titre={t('biblio_audios')} sous={t('biblio_audios_sous')} onPress={() => navigation.navigate('Audios')} />
      <HubCard titre={t('biblio_test')} sous={t('biblio_test_sous')} onPress={() => navigation.navigate('Test')} />
      <HubCard titre={t('achats_titre')} sous={t('achats_sous')} onPress={() => navigation.navigate('Purchases')} />

      <AppText variant="h3" style={{ marginTop: Spacing.lg, marginBottom: Spacing.sm }}>{tx.marquees}</AppText>
      {marquees.length === 0 ? (
        <AppText variant="bodySmall" color="muted">{tx.vide}</AppText>
      ) : (
        marquees.map(m => (
          <AppCard key={m.id} style={styles.marqueeCard} onPress={() => navigation.navigate('Formations')}>
            <AppText variant="label">{m.titre}</AppText>
            {m.auteur ? <AppText variant="caption" color="secondary" style={{ marginTop: 2 }}>{m.auteur}</AppText> : null}
          </AppCard>
        ))
      )}
    </ScreenContainer>
  );
}

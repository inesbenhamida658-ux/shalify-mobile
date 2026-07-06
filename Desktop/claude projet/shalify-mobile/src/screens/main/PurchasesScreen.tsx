import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, EmptyState, Glyph } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { getPurchases, type PurchaseEntry } from '../../storage/purchases';

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.creme2, borderRadius: 999, paddingHorizontal: Spacing.sm, paddingVertical: 3, alignSelf: 'flex-start', marginTop: Spacing.sm },
});

export function PurchasesScreen() {
  const { t } = useLang();
  const [items, setItems] = useState<PurchaseEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPurchases().then(setItems).catch(() => setItems([])).finally(() => setLoaded(true));
  }, []);

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('achats_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('achats_sous')}</AppText>

      {loaded && items.length === 0 ? (
        <EmptyState titre={t('achats_vide_titre')} description={t('achats_vide')} />
      ) : (
        items.map(p => (
          <AppCard key={p.id} style={styles.card}>
            <View style={styles.top}>
              <View style={{ flex: 1, marginRight: Spacing.sm }}>
                <AppText variant="label">{p.serviceTitre}</AppText>
                <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{p.creatorNom}</AppText>
              </View>
              {p.prix ? <AppText variant="label" color="or">{p.prix}</AppText> : null}
            </View>
            <View style={styles.statusPill}>
              <Glyph size={11} color={Colors.or}>✦</Glyph>
              <AppText variant="caption" color="secondary" style={{ marginLeft: 4 }}>{t('achats_statut')} · {p.date}</AppText>
            </View>
          </AppCard>
        ))
      )}
    </ScreenContainer>
  );
}

import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenContainer, AppText, AppCard, Avatar, Glyph, EmptyState, LoadingState } from '../../components';
import { Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getFavorites, removeFavorite } from '../../storage';
import { getCreatorById } from '../../services/creators';
import type { Creator } from '../../types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Colors, Radius } from '../../theme';

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  removeBtn: { padding: Spacing.xs, borderRadius: Radius.sm },
});

export function FavoritesScreen() {
  const { t } = useLang();
  const { token } = useAuth();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const ids = await getFavorites();
      // allSettled : un créateur qui échoue à charger ne casse plus tout l'écran
      const settled = await Promise.allSettled(ids.map(id => getCreatorById(id, token ?? undefined)));
      const ok = settled
        .filter((r): r is PromiseFulfilledResult<Creator | null> => r.status === 'fulfilled')
        .map(r => r.value)
        .filter((c): c is Creator => !!c);
      setCreators(ok);
    } finally { setLoading(false); }
  }, [token]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleRemove = async (id: string) => {
    await removeFavorite(id);
    setCreators(prev => prev.filter(c => c.id !== id));
  };

  if (loading) return <LoadingState />;
  if (creators.length === 0) return (
    <ScreenContainer>
      <EmptyState titre={t('favoris_vide')} description={t('favoris_vide_desc')} />
    </ScreenContainer>
  );

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.lg }}>{t('favoris_titre')}</AppText>
      {creators.map(c => (
        <AppCard key={c.id} style={{ marginBottom: Spacing.md }}>
          <View style={styles.row}>
            <Avatar uri={c.photoUrl} prenom={c.prenom} nom={c.nom} size={48} />
            <View style={{ flex: 1, marginLeft: Spacing.md }}>
              <AppText variant="h3">{c.prenom} {c.nom}</AppText>
              <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{c.rubrique}</AppText>
              {c.specialite ? <AppText variant="caption" color="or" style={{ marginTop: 2 }}>{c.specialite}</AppText> : null}
            </View>
            <TouchableOpacity onPress={() => handleRemove(c.id)} style={styles.removeBtn} hitSlop={8} accessibilityRole="button" accessibilityLabel={t('favoris_retirer')}>
              <Glyph size={16} color={Colors.erreur}>✕</Glyph>
            </TouchableOpacity>
          </View>
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

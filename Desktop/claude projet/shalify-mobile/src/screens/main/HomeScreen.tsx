import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenContainer, AppText, AppCard, AppButton, LoadingState } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getCreators } from '../../services/creators';
import type { Creator } from '../../types';
import type { MainTabParamList } from '../../navigation/MainTabs';

const styles = StyleSheet.create({
  header: { paddingTop: Spacing.lg, paddingBottom: Spacing.xl, borderBottomWidth: 1, borderBottomColor: Colors.bordure, marginBottom: Spacing.lg },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  creatorCard: { marginBottom: Spacing.md },
  badge: { backgroundColor: Colors.vert, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 4 },
});

function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <AppCard style={styles.creatorCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <AppText variant="h3">{creator.prenom} {creator.nom}</AppText>
          <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{creator.rubrique}</AppText>
        </View>
        {creator.verified && (
          <View style={styles.badge}>
            <AppText variant="caption" color="white">✓</AppText>
          </View>
        )}
      </View>
      {creator.bio && <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.sm }} numberOfLines={2}>{creator.bio}</AppText>}
    </AppCard>
  );
}

export function HomeScreen() {
  const { t } = useLang();
  const { token } = useAuth();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCreators(token ?? undefined).then(list => { setCreators(list.slice(0, 3)); setLoading(false); });
  }, [token]);

  if (loading) return <LoadingState message={t('chargement')} />;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <AppText variant="labelSmall" color="or" align="center">SHALIFY</AppText>
        <AppText variant="h2" align="center" style={{ marginTop: Spacing.sm }}>{t('home_titre')}</AppText>
        <AppText variant="bodySmall" color="secondary" align="center" style={{ marginTop: Spacing.xs }}>{t('home_sous_titre')}</AppText>
      </View>

      <View style={styles.sectionRow}>
        <AppText variant="h3">{t('home_section_createurs')}</AppText>
        <AppButton label={t('home_voir_tout')} onPress={() => navigation.navigate('CreateursTab')} variant="ghost" style={{ padding: 0 }} />
      </View>

      {creators.map(c => <CreatorCard key={c.id} creator={c} />)}
    </ScreenContainer>
  );
}

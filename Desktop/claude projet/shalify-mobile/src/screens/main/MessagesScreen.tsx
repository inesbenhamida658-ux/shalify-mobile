import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, LoadingState, EmptyState } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { getConversations, type Conversation } from '../../services/messages';

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  avatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.vertF,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  card: { marginBottom: Spacing.md },
});

export function MessagesScreen() {
  const { t } = useLang();
  const { user, token } = useAuth();
  const navigation = useNavigation<any>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    let actif = true;
    setLoading(true);
    getConversations(user.email, token ?? undefined)
      .then((list) => { if (actif) setConversations(list); })
      .catch(() => { if (actif) setConversations([]); })
      .finally(() => { if (actif) setLoading(false); });
    return () => { actif = false; };
  }, [user?.email, token]);

  if (!user) {
    return (
      <ScreenContainer>
        <EmptyState titre={t('messages_login')} description={t('messages_login_desc')} />
        <AppButton label={t('signup_connexion')} onPress={() => navigation.navigate('Auth')} fullWidth style={{ marginTop: Spacing.lg }} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable={false}>
      <AppText variant="h2" style={{ marginBottom: Spacing.md }}>{t('messages_titre')}</AppText>

      {loading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(c) => c.id}
          style={{ flex: 1 }}
          ListEmptyComponent={<EmptyState titre={t('messages_vide')} description={t('messages_login_desc')} />}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.85} onPress={() => Linking.openURL(item.webUrl)} accessibilityRole="button">
              <AppCard style={styles.card}>
                <View style={styles.row}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={styles.avatar}>
                      <AppText variant="h3" color="or">{(item.prenom || '?').charAt(0).toUpperCase()}</AppText>
                    </View>
                    <AppText variant="label">{item.prenom || 'Contact'}</AppText>
                  </View>
                  <AppText variant="label" color="or">→</AppText>
                </View>
              </AppCard>
            </TouchableOpacity>
          )}
        />
      )}
    </ScreenContainer>
  );
}

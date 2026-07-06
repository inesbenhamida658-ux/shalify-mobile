import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppInput, AppButton, LoadingState, EmptyState } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';

// MVP Messages — aucun backend réel, fil local uniquement
interface MessageLocal { id: string; texte: string; auteur: 'moi' | 'autre'; ts: number }

const styles = StyleSheet.create({
  bubbleMoi: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.vert,
    borderRadius: Radius.lg,
    borderBottomRightRadius: 4,
    padding: Spacing.md,
    maxWidth: '80%',
    marginBottom: Spacing.sm,
  },
  bubbleAutre: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.blanc,
    borderRadius: Radius.lg,
    borderBottomLeftRadius: 4,
    padding: Spacing.md,
    maxWidth: '80%',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.bordure,
  },
  inputRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center', paddingTop: Spacing.sm },
  notice: { backgroundColor: Colors.cremeF, borderRadius: Radius.sm, padding: Spacing.sm, marginBottom: Spacing.md },
});

export function MessagesScreen() {
  const { t } = useLang();
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [messages, setMessages] = useState<MessageLocal[]>([]);
  const [texte, setTexte] = useState('');

  if (!user) {
    return (
      <ScreenContainer>
        <EmptyState titre={t('messages_login')} description={t('messages_login_desc')} />
        <AppButton label={t('signup_connexion')} onPress={() => navigation.navigate('Auth')} fullWidth style={{ marginTop: Spacing.lg }} />
      </ScreenContainer>
    );
  }

  const envoyer = () => {
    if (!texte.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), texte: texte.trim(), auteur: 'moi', ts: Date.now() }]);
    setTexte('');
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppText variant="h2" style={{ marginBottom: Spacing.md }}>{t('messages_titre')}</AppText>
      <View style={styles.notice}>
        <AppText variant="caption" color="secondary">{t('messages_mvp_notice')}</AppText>
      </View>

      <FlatList
        data={messages}
        keyExtractor={m => m.id}
        style={{ flex: 1 }}
        ListEmptyComponent={<EmptyState titre={t('messages_vide')} />}
        renderItem={({ item }) => (
          <View style={item.auteur === 'moi' ? styles.bubbleMoi : styles.bubbleAutre}>
            <AppText variant="bodySmall" color={item.auteur === 'moi' ? 'white' : 'primary'}>{item.texte}</AppText>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <AppInput value={texte} onChangeText={setTexte} placeholder={t('messages_ph')} style={{ flex: 1, marginBottom: 0 }} />
        <AppButton label={t('messages_envoyer')} onPress={envoyer} style={{ marginBottom: 0 }} />
      </View>
    </ScreenContainer>
  );
}

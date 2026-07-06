import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, AppText, AppInput, AppCard, Avatar, Chip, EmptyState, LoadingState, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { searchCreators, getCreatorsByRubrique } from '../../services/creators';
import { UNIVERS, universLabel } from '../../data/univers';
import { isSpeechAvailable, startDictation, type SpeechHandle } from '../../utils/speech';
import type { Creator } from '../../types';

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  body: { flex: 1, marginLeft: Spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  mic: {
    width: 48, height: 48, borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: Colors.or, backgroundColor: Colors.blanc,
  },
  micActive: { backgroundColor: Colors.vert, borderColor: Colors.vert },
  tagsLabel: { marginTop: Spacing.sm, marginBottom: Spacing.xs, letterSpacing: 1 },
});

// Tags rapides — mots-clés doux qui remplissent la barre en un tape.
const QUICK_TAGS: Record<string, string[]> = {
  fr: ['Méditation', 'Yoga', 'Coaching', 'Bien-être', 'Formation', 'Créativité', 'Écriture', 'Sérénité'],
  en: ['Meditation', 'Yoga', 'Coaching', 'Well-being', 'Course', 'Creativity', 'Writing', 'Serenity'],
  ar: ['تأمّل', 'يوغا', 'مرافقة', 'عافية', 'تكوين', 'إبداع', 'كتابة', 'صفاء'],
};

export function SearchScreen() {
  const { t, isRTL, lang } = useLang();
  const { token } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const openCreator = (id: string) => navigation.navigate('CreateursTab', { screen: 'CreatorDetail', params: { creatorId: id } });
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [results, setResults] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [listening, setListening] = useState(false);
  const speechRef = useRef<SpeechHandle | null>(null);
  const voiceOn = isSpeechAvailable();

  useEffect(() => () => { speechRef.current?.stop(); }, []);

  const runSearch = async (q: string) => {
    setQuery(q); setFilter(null);
    if (q.length < 2) { setResults([]); setSearched(false); return; }
    setLoading(true);
    try {
      setResults(await searchCreators(q, token ?? undefined));
      setSearched(true);
    } catch {
      setResults([]); setSearched(true);
    } finally { setLoading(false); }
  };

  const applyFilter = async (rubrique: string) => {
    const next = filter === rubrique ? null : rubrique;
    setFilter(next); setQuery('');
    if (!next) { setResults([]); setSearched(false); return; }
    setLoading(true);
    try {
      setResults(await getCreatorsByRubrique(next, token ?? undefined));
      setSearched(true);
    } catch {
      setResults([]); setSearched(true);
    } finally { setLoading(false); }
  };

  const toggleVoice = () => {
    if (listening) { speechRef.current?.stop(); setListening(false); return; }
    const handle = startDictation(lang, (text) => { setListening(false); runSearch(text); }, () => setListening(false));
    if (handle) { speechRef.current = handle; setListening(true); }
  };

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.md }}>{t('search_ph').split('...')[0]}</AppText>

      <View style={styles.inputRow}>
        <View style={{ flex: 1 }}>
          <AppInput value={query} onChangeText={runSearch} placeholder={t('search_ph')} rtl={isRTL} />
        </View>
        {voiceOn ? (
          <TouchableOpacity
            style={[styles.mic, listening ? styles.micActive : null]}
            onPress={toggleVoice}
            accessibilityRole="button"
            accessibilityLabel="Recherche vocale"
          >
            <Glyph size={20} color={listening ? Colors.blanc : Colors.or}>◎</Glyph>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Tags rapides (puces cliquables) sous la barre de recherche */}
      <AppText variant="labelSmall" color="secondary" style={styles.tagsLabel}>{t('search_ph').split('...')[0].toUpperCase()}</AppText>
      <View style={styles.chips}>
        {(QUICK_TAGS[lang] ?? QUICK_TAGS.fr).map(tag => (
          <Chip key={tag} label={tag} active={query.toLowerCase() === tag.toLowerCase()} onPress={() => runSearch(tag)} />
        ))}
      </View>

      <View style={styles.chips}>
        {UNIVERS.map(u => (
          <Chip key={u.id} label={universLabel(u, lang)} active={filter === u.rubrique} onPress={() => applyFilter(u.rubrique)} />
        ))}
      </View>

      {loading && <LoadingState />}
      {!loading && !searched && <EmptyState titre="" description={t('search_vide')} />}
      {!loading && searched && results.length === 0 && <EmptyState titre={t('search_aucun')} />}
      {results.map(c => (
        <AppCard key={c.id} style={{ marginBottom: Spacing.md }} onPress={() => openCreator(c.id)}>
          <View style={styles.row}>
            <Avatar uri={c.photoUrl} prenom={c.prenom} nom={c.nom} size={48} />
            <View style={styles.body}>
              <AppText variant="h3">{c.prenom} {c.nom}</AppText>
              <AppText variant="bodySmall" color="secondary">{c.rubrique}</AppText>
              {c.specialite ? <AppText variant="caption" color="or" style={{ marginTop: 2 }}>{c.specialite}</AppText> : null}
            </View>
          </View>
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

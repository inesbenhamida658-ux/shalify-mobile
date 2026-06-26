import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppInput, AppCard, EmptyState, LoadingState } from '../../components';
import { Colors, Spacing } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { searchCreators } from '../../services/creators';
import type { Creator } from '../../types';

export function SearchScreen() {
  const { t, isRTL } = useLang();
  const { token } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (q.length < 2) { setResults([]); setSearched(false); return; }
    setLoading(true);
    try {
      const res = await searchCreators(q, token ?? undefined);
      setResults(res);
      setSearched(true);
    } finally { setLoading(false); }
  };

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.md }}>{t('search_ph').split('...')[0]}</AppText>
      <AppInput value={query} onChangeText={handleSearch} placeholder={t('search_ph')} rtl={isRTL} />
      {loading && <LoadingState />}
      {!loading && !searched && <EmptyState titre="" description={t('search_vide')} />}
      {!loading && searched && results.length === 0 && <EmptyState titre={t('search_aucun')} />}
      {results.map(c => (
        <AppCard key={c.id} style={{ marginBottom: Spacing.md }}>
          <AppText variant="h3">{c.prenom} {c.nom}</AppText>
          <AppText variant="bodySmall" color="secondary">{c.rubrique}</AppText>
          {c.tags?.length > 0 && <AppText variant="caption" color="muted" style={{ marginTop: 4 }}>{c.tags.join(' · ')}</AppText>}
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

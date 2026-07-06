import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppText, AppCard, AppButton, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { AUDIOS, audioTitre, audioSous, audioEtapes } from '../../data/audiosContent';

// Textes en ligne (auto-suffisant, zéro conflit i18n).
const TXT: Record<string, {
  transcription: string; playlist: string; playlistSous: string; lire: string; suivant: string; fin: string; refermer: string; sur: string;
}> = {
  fr: { transcription: 'Transcription douce', playlist: 'Liste de lecture', playlistSous: 'Enchaîne trois guides à la suite, en douceur.', lire: 'Écouter à la suite', suivant: 'Guide suivant', fin: 'Terminer', refermer: 'Fermer la liste', sur: 'sur' },
  en: { transcription: 'Gentle transcript', playlist: 'Playlist', playlistSous: 'Chain three guides in a row, gently.', lire: 'Listen in a row', suivant: 'Next guide', fin: 'Finish', refermer: 'Close the list', sur: 'of' },
  ar: { transcription: 'نصّ لطيف', playlist: 'قائمة الاستماع', playlistSous: 'اربط ثلاثة أدلّة تباعاً، بلطف.', lire: 'استمع تباعاً', suivant: 'الدليل التالي', fin: 'إنهاء', refermer: 'إغلاق القائمة', sur: 'من' },
};

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  head: { flexDirection: 'row', alignItems: 'center' },
  emblem: {
    width: 46, height: 46, borderRadius: Radius.md, marginRight: Spacing.md,
    backgroundColor: Colors.cremeF, borderWidth: 1, borderColor: 'rgba(201,168,76,0.45)',
    alignItems: 'center', justifyContent: 'center',
  },
  body: { flex: 1 },
  dureePill: { backgroundColor: Colors.cremeF, borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 3, alignSelf: 'flex-start', marginTop: Spacing.xs },
  step: { flexDirection: 'row', alignItems: 'flex-start', marginTop: Spacing.sm },
  stepDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.or, marginTop: 8, marginRight: Spacing.sm },
  stepText: { flex: 1 },
  sep: { height: 1, backgroundColor: Colors.bordure, marginTop: Spacing.md },
  playlistCard: { marginBottom: Spacing.lg, borderWidth: 1.5, borderColor: Colors.or, backgroundColor: Colors.creme },
  progressRow: { flexDirection: 'row', gap: 6, marginTop: Spacing.sm, marginBottom: Spacing.sm },
  progressDot: { width: 10, height: 10, borderRadius: 5, borderWidth: 1, borderColor: Colors.or },
});

// La liste de lecture enchaîne les trois premiers guides.
const PLAYLIST = AUDIOS.slice(0, 3);

export function AudiosScreen() {
  const { t, lang } = useLang();
  const tx = TXT[lang] ?? TXT.fr;
  const [open, setOpen] = useState<string | null>(AUDIOS[0]?.id ?? null);
  // Index du guide en cours dans la liste de lecture ; -1 = liste fermée.
  const [plIndex, setPlIndex] = useState(-1);

  const startPlaylist = () => setPlIndex(0);
  const nextPlaylist = () => {
    if (plIndex + 1 >= PLAYLIST.length) { setPlIndex(-1); return; }
    setPlIndex(plIndex + 1);
  };

  const current = plIndex >= 0 ? PLAYLIST[plIndex] : null;

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{t('audios_titre')}</AppText>
      <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.lg }}>{t('audios_sous')}</AppText>

      {/* Liste de lecture : enchaîner deux ou trois guides à la suite */}
      <AppCard style={styles.playlistCard}>
        <AppText variant="labelSmall" color="or">{tx.playlist.toUpperCase()}</AppText>
        <AppText variant="bodySmall" color="secondary" style={{ marginTop: 2 }}>{tx.playlistSous}</AppText>
        <View style={styles.progressRow}>
          {PLAYLIST.map((a, i) => (
            <View key={a.id} style={[styles.progressDot, i <= plIndex ? { backgroundColor: Colors.or } : null]} />
          ))}
        </View>
        {current ? (
          <View>
            <AppText variant="h3" style={{ marginTop: Spacing.xs }}>{audioTitre(current, lang)}</AppText>
            <AppText variant="caption" color="secondary">{plIndex + 1} {tx.sur} {PLAYLIST.length} · {current.duree}</AppText>
            {audioEtapes(current, lang).map((e, i) => (
              <View key={i} style={styles.step}>
                <View style={styles.stepDot} />
                <AppText variant="bodySmall" color="secondary" style={styles.stepText}>{e}</AppText>
              </View>
            ))}
            <AppButton
              label={plIndex + 1 >= PLAYLIST.length ? tx.fin : tx.suivant}
              onPress={nextPlaylist}
              fullWidth
              style={{ marginTop: Spacing.md }}
            />
            <AppButton label={tx.refermer} onPress={() => setPlIndex(-1)} variant="ghost" fullWidth />
          </View>
        ) : (
          <AppButton label={tx.lire} onPress={startPlaylist} fullWidth style={{ marginTop: Spacing.sm }} />
        )}
      </AppCard>

      {AUDIOS.map(a => {
        const expanded = open === a.id;
        return (
          <AppCard key={a.id} style={styles.card} onPress={() => setOpen(expanded ? null : a.id)}>
            <View style={styles.head}>
              <View style={styles.emblem}><Glyph size={18} color={Colors.or}>♪</Glyph></View>
              <View style={styles.body}>
                <AppText variant="h3">{audioTitre(a, lang)}</AppText>
                <AppText variant="caption" color="secondary" style={{ marginTop: 2 }}>{audioSous(a, lang)}</AppText>
                <View style={styles.dureePill}>
                  <AppText variant="caption" color="secondary">{a.duree}</AppText>
                </View>
              </View>
              <Glyph size={18} color={Colors.or}>{expanded ? '−' : '+'}</Glyph>
            </View>

            {expanded && (
              <View>
                <View style={styles.sep} />
                <AppText variant="labelSmall" color="or" style={{ marginTop: Spacing.md }}>{tx.transcription.toUpperCase()}</AppText>
                {audioEtapes(a, lang).map((e, i) => (
                  <View key={i} style={styles.step}>
                    <View style={styles.stepDot} />
                    <AppText variant="bodySmall" color="secondary" style={styles.stepText}>{e}</AppText>
                  </View>
                ))}
              </View>
            )}
          </AppCard>
        );
      })}
    </ScreenContainer>
  );
}

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { ScreenContainer, AppText, Glyph } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';

// Ensemble : le fil des fonctions de connexion vivante de Shalify.
// Chaque carte ouvre la page correspondante (meme backend que le site, shalify.app).
// Textes en local (fr/en/ar) pour rester independant de l'i18n type.

const BASE = 'https://shalify.app';

interface Item { path: string; glyph: string; titre: Record<Lang3, string>; sous: Record<Lang3, string> }
type Lang3 = 'fr' | 'en' | 'ar';

const ITEMS: Item[] = [
  { path: 'ressenti-du-jour', glyph: '❋',
    titre: { fr: 'Votre ressenti du jour', en: 'Your feeling today', ar: 'شعورك اليوم' },
    sous: { fr: 'Partagez une émotion, recevez un mot doux.', en: 'Share an emotion, receive a kind word.', ar: 'شارك عاطفة، تلقّى كلمة لطيفة.' } },
  { path: 'meteo-interieure', glyph: '☀',
    titre: { fr: 'Météo intérieure', en: 'Inner weather', ar: 'الطقس الداخلي' },
    sous: { fr: 'Posez votre météo, tendez la main aux autres.', en: 'Set your weather, reach out to others.', ar: 'ضع طقسك، ومُدّ يدك للآخرين.' } },
  { path: 'rituel-du-soir', glyph: '☾',
    titre: { fr: 'Rituel du soir ensemble', en: 'Evening ritual together', ar: 'طقس المساء معًا' },
    sous: { fr: 'À 21 h, respirez avec toute la communauté.', en: 'At 9 pm, breathe with the whole community.', ar: 'الساعة 21، تنفّس مع كل المجتمع.' } },
  { path: 'duo-ancrage', glyph: '∞',
    titre: { fr: 'Duo d’ancrage 7 jours', en: '7-day anchor duo', ar: 'ثنائي 7 أيام' },
    sous: { fr: 'Une personne vous accompagne chaque matin.', en: 'A person walks with you each morning.', ar: 'شخص يرافقك كل صباح.' } },
  { path: 'gratitude-a-deux', glyph: '✦',
    titre: { fr: 'Gratitude à deux', en: 'Gratitude for two', ar: 'امتنان لاثنين' },
    sous: { fr: 'Gardez une flamme allumée avec un proche.', en: 'Keep a flame alight with a loved one.', ar: 'أبقِ شعلة مضيئة مع شخص عزيز.' } },
  { path: 'cercle-audio', glyph: '◉',
    titre: { fr: 'Cercle audio', en: 'Audio circle', ar: 'دائرة صوتية' },
    sous: { fr: 'Un moment vocal partagé autour d’un thème.', en: 'A shared voice moment around a theme.', ar: 'لحظة صوتية مشتركة حول موضوع.' } },
  { path: 'micro-live', glyph: '◐',
    titre: { fr: 'Micro-live respiration', en: 'Breathing micro-live', ar: 'بث تنفّس قصير' },
    sous: { fr: 'Trois minutes en direct pour respirer.', en: 'Three live minutes to breathe.', ar: 'ثلاث دقائق مباشرة للتنفّس.' } },
  { path: 'carte-je-pense-a-toi', glyph: '♡',
    titre: { fr: 'Je pense à vous', en: 'Thinking of you', ar: 'أفكّر فيك' },
    sous: { fr: 'Envoyez une carte douce à un membre.', en: 'Send a gentle card to a member.', ar: 'أرسل بطاقة لطيفة لعضو.' } },
  { path: 'journal-vocal', glyph: '✒',
    titre: { fr: 'Journal vocal', en: 'Voice journal', ar: 'يوميات صوتية' },
    sous: { fr: 'Dictez votre journal, il s’écrit tout seul.', en: 'Dictate your journal, it writes itself.', ar: 'أملِ يومياتك، تُكتب وحدها.' } },
  { path: 'traduction-du-coeur', glyph: '❤',
    titre: { fr: 'Écrire avec le coeur', en: 'Write with heart', ar: 'اكتب بقلبك' },
    sous: { fr: 'Adoucissez un message avant de l’envoyer.', en: 'Soften a message before you send it.', ar: 'لطّف رسالة قبل إرسالها.' } },
  { path: 'ange-gardien', glyph: '✧',
    titre: { fr: 'Les anges gardiens', en: 'The guardian angels', ar: 'الملائكة الحارسة' },
    sous: { fr: 'Celles et ceux qui veillent sur la communauté.', en: 'Those who watch over the community.', ar: 'من يسهرون على المجتمع.' } },
];

const HEAD: Record<Lang3, { surtitre: string; titre: string; sous: string }> = {
  fr: { surtitre: 'ENSEMBLE', titre: 'Se relier, chaque jour', sous: 'Onze façons douces de vous sentir accompagné, avec toute la communauté Shalify.' },
  en: { surtitre: 'TOGETHER', titre: 'Connect, every day', sous: 'Eleven gentle ways to feel accompanied, with the whole Shalify community.' },
  ar: { surtitre: 'معًا', titre: 'ترابط، كل يوم', sous: 'إحدى عشرة طريقة لطيفة لتشعر بالمرافقة، مع كل مجتمع شاليفي.' },
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.blanc, borderWidth: 1, borderColor: Colors.bordure,
    borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm,
  },
  emblem: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: Colors.creme2,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.45)', alignItems: 'center', justifyContent: 'center',
  },
});

export function EnsembleScreen() {
  const { lang } = useLang();
  const l: Lang3 = (lang === 'en' || lang === 'ar') ? lang : 'fr';
  const h = HEAD[l];

  const open = (path: string) => { Linking.openURL(`${BASE}/${path}`).catch(() => {}); };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText variant="labelSmall" color="or" style={{ marginBottom: Spacing.xs, letterSpacing: 2 }}>{h.surtitre}</AppText>
        <AppText variant="h2" style={{ marginBottom: Spacing.xs }}>{h.titre}</AppText>
        <AppText variant="body" color="secondary" style={{ marginBottom: Spacing.lg }}>{h.sous}</AppText>

        {ITEMS.map(item => (
          <TouchableOpacity key={item.path} activeOpacity={0.85} onPress={() => open(item.path)} accessibilityRole="button" style={styles.card}>
            <View style={styles.emblem}><Glyph size={22} color={Colors.or}>{item.glyph}</Glyph></View>
            <View style={{ flex: 1 }}>
              <AppText variant="h3" style={{ marginBottom: 2 }}>{item.titre[l]}</AppText>
              <AppText variant="labelSmall" color="secondary">{item.sous[l]}</AppText>
            </View>
            <Glyph size={18} color={Colors.brume}>›</Glyph>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

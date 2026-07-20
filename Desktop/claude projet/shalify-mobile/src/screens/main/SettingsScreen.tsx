import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, AppText, AppButton, AppCard } from '../../components';
import { Colors, Spacing, Radius } from '../../theme';
import { useLang } from '../../context/LangContext';
import { useTextScale } from '../../context/TextScaleContext';
import { getRappelActif, setRappelActif, type TextScale } from '../../services/douceur';
import { exportLocalData } from '../../utils/exportData';

// Textes en ligne (auto-suffisant).
const DOUCEUR_TXT: Record<string, {
  titre: string; rappelTitre: string; rappelSous: string; actif: string; inactif: string;
  exportTitre: string; exportSous: string; exportBtn: string;
  okDl: string; okCopy: string; okShare: string; err: string;
}> = {
  fr: {
    titre: 'Douceur',
    rappelTitre: 'Rappel doux du jour', rappelSous: 'Un mot tendre à l’ouverture, une fois par jour.',
    actif: 'Activé', inactif: 'Activer',
    exportTitre: 'Ma sauvegarde', exportSous: 'Gardez vos gratitudes et victoires en un fichier.',
    exportBtn: 'Télécharger ma sauvegarde',
    okDl: 'Votre sauvegarde est téléchargée.', okCopy: 'Votre sauvegarde est copiée.', okShare: 'Votre sauvegarde est prête à partager.', err: 'Réessayez dans un instant.',
  },
  en: {
    titre: 'Gentleness',
    rappelTitre: 'Gentle daily reminder', rappelSous: 'A tender word at opening, once a day.',
    actif: 'On', inactif: 'Turn on',
    exportTitre: 'My backup', exportSous: 'Keep your gratitudes and wins in one file.',
    exportBtn: 'Download my backup',
    okDl: 'Your backup is downloaded.', okCopy: 'Your backup is copied.', okShare: 'Your backup is ready to share.', err: 'Try again in a moment.',
  },
  ar: {
    titre: 'لُطف',
    rappelTitre: 'تذكير لطيف يومي', rappelSous: 'كلمة حانية عند الفتح، مرّة في اليوم.',
    actif: 'مُفعّل', inactif: 'تفعيل',
    exportTitre: 'نسختي', exportSous: 'احتفظ بامتنانك وانتصاراتك في ملفّ واحد.',
    exportBtn: 'تنزيل نسختي',
    okDl: 'تمّ تنزيل نسختك.', okCopy: 'تمّ نسخ نسختك.', okShare: 'نسختك جاهزة للمشاركة.', err: 'أعد المحاولة بعد لحظة.',
  },
};

const SCALES: { value: TextScale; key: 'texte_taille_petit' | 'texte_taille_normal' | 'texte_taille_grand' | 'texte_taille_tres_grand' }[] = [
  { value: 0.9, key: 'texte_taille_petit' },
  { value: 1, key: 'texte_taille_normal' },
  { value: 1.15, key: 'texte_taille_grand' },
  { value: 1.3, key: 'texte_taille_tres_grand' },
];

export function SettingsScreen() {
  const { t, lang, changeLang } = useLang();
  const { scale, setScale } = useTextScale();
  const navigation = useNavigation<any>();
  const dt = DOUCEUR_TXT[lang] ?? DOUCEUR_TXT.fr;
  const [rappel, setRappel] = useState(false);

  useEffect(() => { getRappelActif().then(setRappel).catch(() => setRappel(false)); }, []);

  const toggleRappel = async () => {
    const next = !rappel;
    setRappel(next);
    await setRappelActif(next);
  };

  const doExport = async () => {
    const r = await exportLocalData();
    const msg = r === 'downloaded' ? dt.okDl : r === 'copied' ? dt.okCopy : r === 'shared' ? dt.okShare : dt.err;
    Alert.alert(msg);
  };

  const open = (path: string) => { Linking.openURL(`https://shalify.app/${path}`).catch(() => {}); };
  const journalLabel = lang === 'en' ? 'My journal' : lang === 'ar' ? 'مذكراتي' : 'Mon journal';

  // Libellés trilingues des nouveaux espaces (fidèles aux pages du site).
  const L = (fr: string, en: string, ar: string) => (lang === 'en' ? en : lang === 'ar' ? ar : fr);

  const groupeGagner: [string, string][] = [
    ['GagnerSurShalify', L('Gagner sur Shalify', 'Earn on Shalify', 'اكسب على شاليفي')],
    ['MesRevenus', L('Mes revenus', 'My earnings', 'أرباحي')],
    ['MesRecus', L('Mes reçus', 'My receipts', 'إيصالاتي')],
    ['SuggestionPrix', L('Suggestion de prix', 'Price suggestion', 'اقتراح السعر')],
    ['ReformulerOffre', L('Reformuler mon offre', 'Rephrase my offer', 'إعادة صياغة عرضي')],
    ['BoosterProfil', L('Booster mon profil', 'Boost my profile', 'تعزيز ملفّي')],
    ['PremiumCreateur', L('Premium créateur', 'Creator premium', 'بريميوم للمبدع')],
    ['VivreEtVendre', L('Vivre et vendre', 'Live and sell', 'أن تعيش وتبيع')],
  ];
  const groupeCommunaute: [string, string][] = [
    ['Feed', L('Le feed', 'The feed', 'الخلاصة')],
    ['Stories', L('Stories du jour', 'Today’s stories', 'قصص اليوم')],
    ['Communaute', L('La communauté', 'The community', 'المجتمع')],
    ['SalonVocal', L('Salon vocal', 'Voice room', 'صالون صوتي')],
    ['CercleAudio', L('Cercle audio', 'Audio circle', 'دائرة صوتية')],
    ['MicroLive', L('Micro-live', 'Micro-live', 'بثّ قصير')],
    ['Ambassadeurs', L('Ambassadeurs', 'Ambassadors', 'السفراء')],
    ['Mentorat', L('Mentorat', 'Mentoring', 'الإرشاد')],
    ['Equipes', L('Créer une équipe', 'Create a team', 'إنشاء فريق')],
  ];
  const groupeRituels: [string, string][] = [
    ['Annee2026', L('Mon année 2026', 'My year 2026', 'عامي 2026')],
    ['LettreAuFutur', L('Lettre à mon futur moi', 'Letter to my future self', 'رسالة إلى ذاتي المستقبلية')],
    ['VisionBoard', L('Mon tableau de vision', 'My vision board', 'لوحة رؤيتي')],
    ['MurIntentions', L('Le mur d’intentions', 'The intention wall', 'جدار النيّات')],
    ['MiroirDuJour', L('Le miroir du jour', 'The mirror of the day', 'مرآة اليوم')],
    ['MeteoInterieure', L('Ma météo intérieure', 'My inner weather', 'طقسي الداخلي')],
    ['Numerologie', L('Numérologie', 'Numerology', 'علم الأعداد')],
    ['VibrationPrenom', L('Vibration du prénom', 'Name vibration', 'اهتزاز الاسم')],
    ['Chronotype', L('Mon chronotype', 'My chronotype', 'نمطي الزمني')],
    ['BoussoleValeurs', L('Ma boussole des valeurs', 'My values compass', 'بوصلة قيمي')],
    ['VoyageInterieur', L('Voyage intérieur', 'Inner journey', 'رحلة داخلية')],
    ['Refuge', L('Mon refuge', 'My refuge', 'ملاذي')],
    ['AutoHypnose', L('Auto-hypnose', 'Self-hypnosis', 'التنويم الذاتي')],
    ['JournalVocal', L('Mon journal vocal', 'My voice journal', 'يومياتي الصوتية')],
  ];
  const groupeRelier: [string, string][] = [
    ['ShalifyConnect', L('Shalify Connect', 'Shalify Connect', 'شاليفي كونكت')],
    ['ResonanceProfonde', L('Résonance profonde', 'Deep resonance', 'رنين عميق')],
    ['BriseGlace', L('Brise-glace', 'Icebreaker', 'كاسر الجليد')],
    ['Duo21Jours', L('Duo 21 jours', 'Duo 21 days', 'ثنائي 21 يومًا')],
    ['DuoAncrage', L('Duo ancrage', 'Anchor duo', 'ثنائي التجذّر')],
    ['GratitudeADeux', L('Gratitude à deux', 'Gratitude for two', 'امتنان لاثنين')],
  ];
  const groupeAide: [string, string][] = [
    ['CommentCaMarche', L('Comment ça marche', 'How it works', 'كيف يعمل')],
    ['PremiersPas', L('Mes premiers pas', 'My first steps', 'خطواتي الأولى')],
    ['Faq', L('Questions fréquentes', 'Frequent questions', 'أسئلة متكرّرة')],
    ['Contact', L('Nous contacter', 'Contact us', 'اتصل بنا')],
    ['PlanDuSite', L('Plan du site', 'Site map', 'خريطة الموقع')],
  ];
  const renderGroup = (titre: string, items: [string, string][]) => (
    <AppCard style={{ marginBottom: Spacing.lg }}>
      <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{titre}</AppText>
      {items.map(([route, label], i) => (
        <AppButton
          key={route}
          label={label}
          onPress={() => navigation.navigate(route)}
          variant="outline"
          style={i < items.length - 1 ? { marginBottom: Spacing.sm } : undefined}
        />
      ))}
    </AppCard>
  );

  return (
    <ScreenContainer>
      <AppText variant="h2" style={{ marginBottom: Spacing.xl }}>{t('settings_titre')}</AppText>

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{t('settings_experiences')}</AppText>
        <AppButton label={t('calme_titre')} onPress={() => navigation.navigate('CalmSpace')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('progression_titre')} onPress={() => navigation.navigate('Progress')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('mantra_titre')} onPress={() => navigation.navigate('Mantra')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('guidance_titre')} onPress={() => navigation.navigate('Guidance')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('ancrage_titre')} onPress={() => navigation.navigate('Morning')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('compat_titre')} onPress={() => navigation.navigate('Compatibility')} variant="outline" />
      </AppCard>

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="h3" style={{ marginBottom: Spacing.xs }}>{t('texte_taille_titre')}</AppText>
        <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.sm }}>{t('texte_taille_sous')}</AppText>
        <View style={{ flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' }}>
          {SCALES.map(s => (
            <AppButton
              key={s.value}
              label={t(s.key)}
              onPress={() => setScale(s.value)}
              variant={scale === s.value ? 'primary' : 'outline'}
              style={{ flexGrow: 1, minWidth: '46%' }}
            />
          ))}
        </View>
      </AppCard>

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="h3" style={{ marginBottom: Spacing.xs }}>{dt.titre}</AppText>

        <AppText variant="label" style={{ marginTop: Spacing.xs }}>{dt.rappelTitre}</AppText>
        <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.sm }}>{dt.rappelSous}</AppText>
        <AppButton label={rappel ? dt.actif : dt.inactif} onPress={toggleRappel} variant={rappel ? 'primary' : 'outline'} style={{ marginBottom: Spacing.lg }} />

        <AppText variant="label">{dt.exportTitre}</AppText>
        <AppText variant="bodySmall" color="secondary" style={{ marginBottom: Spacing.sm }}>{dt.exportSous}</AppText>
        <AppButton label={dt.exportBtn} onPress={doExport} variant="outline" />
      </AppCard>

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{t('settings_perso')}</AppText>
        <AppButton label={t('settings_rituel')} onPress={() => navigation.navigate('Ritual')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={journalLabel} onPress={() => navigation.navigate('Journal')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={lang === 'en' ? 'My gratitude box' : lang === 'ar' ? 'صندوق امتناني' : 'Ma boîte à gratitudes'} onPress={() => navigation.navigate('Gratitudes')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('quiz_boussole')} onPress={() => navigation.navigate('Quiz')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('settings_parrainage')} onPress={() => navigation.navigate('Referral')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('settings_aide')} onPress={() => navigation.navigate('Help')} variant="outline" />
      </AppCard>

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{t('settings_explorer')}</AppText>
        <AppButton label={lang === 'en' ? 'Our story' : lang === 'ar' ? 'قصّتنا' : 'Notre histoire'} onPress={() => navigation.navigate('Histoire')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('biblio_titre')} onPress={() => navigation.navigate('Bibliotheque')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('abo_titre')} onPress={() => navigation.navigate('Subscription')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('achats_titre')} onPress={() => navigation.navigate('Purchases')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('settings_offrir')} onPress={() => navigation.navigate('Offrir')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('settings_packs')} onPress={() => navigation.navigate('Packs')} variant="outline" />
      </AppCard>

      {renderGroup(L('Gagner sur Shalify', 'Earn on Shalify', 'اكسب على شاليفي'), groupeGagner)}
      {renderGroup(L('Communauté & lives', 'Community & lives', 'المجتمع والبثوث'), groupeCommunaute)}
      {renderGroup(L('Mes rituels', 'My rituals', 'طقوسي'), groupeRituels)}
      {renderGroup(L('Se relier', 'Connect', 'التواصل'), groupeRelier)}
      {renderGroup(L('Aide', 'Help', 'مساعدة'), groupeAide)}

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{t('settings_langue')}</AppText>
        <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
          {(['fr', 'en', 'ar'] as const).map(l => (
            <AppButton key={l} label={l.toUpperCase()} onPress={() => changeLang(l)} variant={lang === l ? 'primary' : 'outline'} style={{ flex: 1 }} />
          ))}
        </View>
      </AppCard>

      <AppCard style={{ marginBottom: Spacing.lg }}>
        <AppText variant="h3" style={{ marginBottom: Spacing.sm }}>{t('settings_confidentialite')}</AppText>
        <AppButton label={t('settings_cgu')} onPress={() => open('cgu')} variant="outline" style={{ marginBottom: Spacing.sm }} />
        <AppButton label={t('settings_confidentialite')} onPress={() => open('confidentialite')} variant="outline" />
      </AppCard>

      <AppCard>
        <AppText variant="h3" style={{ marginBottom: Spacing.xs }}>{t('settings_a_propos')}</AppText>
        <AppText variant="bodySmall" color="secondary" style={{ marginTop: Spacing.xs }}>Shalify Mobile v1.0.0</AppText>
        <AppText variant="caption" color="muted" style={{ marginTop: Spacing.xs }}>shalify.app</AppText>
        <AppText variant="caption" color="muted" style={{ marginTop: Spacing.sm }}>© 2026 Shalify</AppText>
      </AppCard>
    </ScreenContainer>
  );
}

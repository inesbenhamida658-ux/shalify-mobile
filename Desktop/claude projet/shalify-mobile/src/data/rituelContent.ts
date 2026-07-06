// Contenu local du rituel Shalify (mantras, défis, parcours, aide, valeurs).
// 100% embarqué : fonctionne hors connexion, zéro dépendance externe.
// Règle de style : textes visibles positifs, polices Cormorant/Poppins gérées par AppText.
import type { Lang } from '../types';

// --- Mantra du jour ------------------------------------------------------
export const MANTRAS: Record<Lang, string[]> = {
  fr: [
    'Aujourd’hui, je choisis la douceur envers moi.',
    'Ma valeur grandit à chaque petit pas.',
    'Je respire, je ralentis, je reviens à moi.',
    'Ce que je cultive aujourd’hui fleurira demain.',
    'Je mérite le calme et la joie.',
    'Chaque émotion porte un message pour moi.',
    'Je m’autorise à avancer à mon rythme.',
    'Ma présence est un cadeau pour les autres.',
    'Je nourris ce qui me fait du bien.',
    'Ma confiance se construit jour après jour.',
    'Je suis exactement là où je dois apprendre.',
    'Mon cœur reconnaît la beauté simple.',
  ],
  en: [
    'Today, I choose gentleness toward myself.',
    'My worth grows with every small step.',
    'I breathe, I slow down, I return to myself.',
    'What I nurture today will bloom tomorrow.',
    'I deserve calm and joy.',
    'Every emotion carries a message for me.',
    'I allow myself to move at my own pace.',
    'My presence is a gift to others.',
    'I feed what makes me feel good.',
    'My confidence builds day after day.',
    'I am right where I am meant to learn.',
    'My heart knows how to notice simple beauty.',
  ],
  ar: [
    'اليوم أختار اللطف مع نفسي.',
    'قيمتي تنمو مع كل خطوة صغيرة.',
    'أتنفّس، أتمهّل، أعود إلى ذاتي.',
    'ما أرعاه اليوم سيزهر غداً.',
    'أستحقّ الهدوء والفرح.',
    'كل شعور يحمل رسالة لي.',
    'أسمح لنفسي بالتقدّم على إيقاعي.',
    'حضوري هدية للآخرين.',
    'أغذّي ما يمنحني الخير.',
    'ثقتي تُبنى يوماً بعد يوم.',
    'أنا حيث يجب أن أتعلّم.',
    'قلبي يعرف جمال البساطة.',
  ],
};

// --- Défi du mois (12, un par mois) --------------------------------------
export const DEFIS: Record<Lang, string[]> = {
  fr: [
    'Note trois gratitudes chaque soir.',
    'Partage un sourire sincère chaque jour.',
    'Prends dix minutes de respiration calme par jour.',
    'Écris un mot doux à une personne que tu aimes.',
    'Marche vingt minutes en pleine conscience.',
    'Range un petit espace qui t’apaise.',
    'Apprends une idée nouvelle chaque semaine.',
    'Bois plus d’eau et écoute ton corps.',
    'Coupe les écrans une heure avant de dormir.',
    'Dis oui à une activité qui te fait vibrer.',
    'Remercie une personne qui t’a aidée.',
    'Repose-toi vraiment un jour cette semaine.',
  ],
  en: [
    'Write three gratitudes every evening.',
    'Share a sincere smile every day.',
    'Take ten minutes of calm breathing each day.',
    'Write a kind note to someone you love.',
    'Walk twenty minutes mindfully.',
    'Tidy a small space that soothes you.',
    'Learn one new idea every week.',
    'Drink more water and listen to your body.',
    'Turn off screens one hour before sleep.',
    'Say yes to an activity that lights you up.',
    'Thank a person who helped you.',
    'Truly rest one day this week.',
  ],
  ar: [
    'اكتب ثلاث نِعَم كل مساء.',
    'شارك ابتسامة صادقة كل يوم.',
    'خذ عشر دقائق من التنفّس الهادئ يومياً.',
    'اكتب كلمة لطيفة لمن تحبّ.',
    'امشِ عشرين دقيقة بوعي وحضور.',
    'رتّب مساحة صغيرة تمنحك الطمأنينة.',
    'تعلّم فكرة جديدة كل أسبوع.',
    'اشرب ماءً أكثر وأنصت لجسدك.',
    'أطفئ الشاشات قبل النوم بساعة.',
    'قل نعم لنشاط يُشعل حماسك.',
    'اشكر شخصاً ساعدك.',
    'امنح نفسك يوم راحة حقيقياً هذا الأسبوع.',
  ],
};

// --- Parcours guidé jour par jour (7 jours) ------------------------------
export interface Parcours { titre: string; jours: string[]; }
export const PARCOURS: Record<Lang, Parcours> = {
  fr: {
    titre: 'Sept jours vers plus de calme',
    jours: [
      'Jour 1 · Trois respirations profondes au réveil.',
      'Jour 2 · Une pause de cinq minutes en pleine conscience.',
      'Jour 3 · Note une petite victoire de la journée.',
      'Jour 4 · Marche dehors et observe la nature.',
      'Jour 5 · Envoie un message bienveillant à quelqu’un.',
      'Jour 6 · Range un coin qui te pèse.',
      'Jour 7 · Célèbre le chemin parcouru cette semaine.',
    ],
  },
  en: {
    titre: 'Seven days toward more calm',
    jours: [
      'Day 1 · Three deep breaths when you wake up.',
      'Day 2 · A five-minute mindful pause.',
      'Day 3 · Write down one small win of the day.',
      'Day 4 · Walk outside and notice nature.',
      'Day 5 · Send a kind message to someone.',
      'Day 6 · Tidy a corner that weighs on you.',
      'Day 7 · Celebrate the path you walked this week.',
    ],
  },
  ar: {
    titre: 'سبعة أيام نحو هدوء أعمق',
    jours: [
      'اليوم 1 · ثلاثة أنفاس عميقة عند الاستيقاظ.',
      'اليوم 2 · وقفة واعية لخمس دقائق.',
      'اليوم 3 · دوّن إنجازاً صغيراً في يومك.',
      'اليوم 4 · امشِ في الخارج وتأمّل الطبيعة.',
      'اليوم 5 · أرسل رسالة طيبة لشخص ما.',
      'اليوم 6 · رتّب ركناً يثقل عليك.',
      'اليوم 7 · احتفِ بالطريق الذي قطعته هذا الأسبوع.',
    ],
  },
};

// --- Aide / questions fréquentes -----------------------------------------
export interface FaqItem { q: string; a: string; }
export const FAQ: Record<Lang, FaqItem[]> = {
  fr: [
    { q: 'Comment réserver une séance ?', a: 'Ouvre le profil d’un créateur, choisis un service, puis confirme ta demande. L’équipe Shalify te contacte pour finaliser.' },
    { q: 'Comment se passe le paiement ?', a: 'Le paiement se fait en TND via l’équipe Shalify. Rien ne se débite tout seul.' },
    { q: 'Mes données sont-elles protégées ?', a: 'Oui. Tes informations restent privées et servent uniquement à ton expérience Shalify.' },
    { q: 'Comment contacter un créateur ?', a: 'Depuis son profil ou l’onglet Messages, une fois connectée.' },
    { q: 'Comment devenir créateur ?', a: 'Écris à l’équipe depuis shalify.app. Ton profil est ensuite vérifié.' },
    { q: 'Puis-je changer de langue ?', a: 'Oui, dans Réglages, choisis Français, English ou العربية.' },
    { q: 'Comment signaler un profil ?', a: 'Ouvre le profil, touche Signaler, puis choisis une raison.' },
    { q: 'Où retrouver mes favoris ?', a: 'Dans l’onglet Favoris, tu retrouves les créateurs que tu as aimés.' },
    { q: 'Comment écouter les audios ?', a: 'Ouvre Bibliothèque puis Audios. Chaque méditation se déroule en douceur, étape par étape.' },
    { q: 'Où retrouver mes demandes ?', a: 'Dans Réglages, ouvre Mes demandes. Tu y retrouves les séances que tu as réservées.' },
    { q: 'Qu’est-ce que le Cercle Shalify ?', a: 'Un espace mensuel pour avancer entourée et inspirée. Tu le rejoins depuis Réglages, quand tu le souhaites.' },
    { q: 'Comment offrir une expérience ?', a: 'Depuis Réglages, ouvre Offrir. Choisis une expérience, ajoute un mot doux, et la personne en profite à son rythme.' },
  ],
  en: [
    { q: 'How do I book a session?', a: 'Open a creator profile, choose a service, then confirm your request. The Shalify team contacts you to finalize.' },
    { q: 'How does payment work?', a: 'Payment is made in TND through the Shalify team. Nothing is charged on its own.' },
    { q: 'Is my data protected?', a: 'Yes. Your information stays private and serves only your Shalify experience.' },
    { q: 'How do I contact a creator?', a: 'From their profile or the Messages tab, once you are signed in.' },
    { q: 'How do I become a creator?', a: 'Write to the team from shalify.app. Your profile is then verified.' },
    { q: 'Can I change the language?', a: 'Yes, in Settings, choose Français, English or العربية.' },
    { q: 'How do I report a profile?', a: 'Open the profile, tap Report, then choose a reason.' },
    { q: 'Where do I find my favorites?', a: 'In the Favorites tab, you find the creators you liked.' },
    { q: 'How do I listen to the audios?', a: 'Open Library then Audios. Each meditation unfolds gently, step by step.' },
    { q: 'Where do I find my requests?', a: 'In Settings, open My requests. You find the sessions you have booked.' },
    { q: 'What is the Shalify Circle?', a: 'A monthly space to move forward surrounded and inspired. You join it from Settings, whenever you wish.' },
    { q: 'How do I offer an experience?', a: 'From Settings, open Offer. Choose an experience, add a kind note, and the person enjoys it at their pace.' },
  ],
  ar: [
    { q: 'كيف أحجز جلسة؟', a: 'افتح ملف المبدع، اختر خدمة، ثم أكّد طلبك. يتواصل معك فريق شاليفاي لإتمام الحجز.' },
    { q: 'كيف يتم الدفع؟', a: 'يتم الدفع بالدينار التونسي عبر فريق شاليفاي. يبقى كل خصم بموافقتك.' },
    { q: 'هل بياناتي محميّة؟', a: 'نعم. معلوماتك تبقى خاصة وتخدم تجربتك على شاليفاي فقط.' },
    { q: 'كيف أتواصل مع مبدع؟', a: 'من ملفه أو من تبويب الرسائل بعد تسجيل الدخول.' },
    { q: 'كيف أصبح مبدعاً؟', a: 'راسل الفريق عبر shalify.app. يتم بعدها توثيق ملفك.' },
    { q: 'هل يمكنني تغيير اللغة؟', a: 'نعم، من الإعدادات اختر Français أو English أو العربية.' },
    { q: 'كيف أبلّغ عن ملف؟', a: 'افتح الملف، المس إبلاغ، ثم اختر سبباً.' },
    { q: 'أين أجد مفضّلتي؟', a: 'في تبويب المفضّلة تجد المبدعين الذين أعجبوك.' },
    { q: 'كيف أستمع إلى الصوتيات؟', a: 'افتح المكتبة ثم الصوتيات. كل تأمّل يسير بلطف، خطوة بخطوة.' },
    { q: 'أين أجد طلباتي؟', a: 'من الإعدادات، افتح طلباتي. تجد الجلسات التي حجزتها.' },
    { q: 'ما هي دائرة شاليفاي؟', a: 'فضاء شهري للتقدّم محاطاً وملهَماً. تنضمّ إليه من الإعدادات متى شئت.' },
    { q: 'كيف أُهدي تجربة؟', a: 'من الإعدادات، افتح إهداء. اختر تجربة، أضف كلمة لطيفة، ويستمتع بها الشخص على إيقاعه.' },
  ],
};

// --- Valeurs (quiz d’accueil + personnalisation) ----------------------
export interface ValueOption { key: string; label: Record<Lang, string>; keywords: string[]; }
export const VALUES: ValueOption[] = [
  { key: 'serenite', label: { fr: 'Sérénité', en: 'Serenity', ar: 'الطمأنينة' }, keywords: ['bien-être', 'bien être', 'méditation', 'relaxation', 'yoga', 'sophrologie', 'calme', 'stress', 'sommeil'] },
  { key: 'apprentissage', label: { fr: 'Apprentissage', en: 'Learning', ar: 'التعلّم' }, keywords: ['formation', 'coaching', 'développement', 'langue', 'cours', 'apprendre', 'mentor'] },
  { key: 'amour', label: { fr: 'Amour & liens', en: 'Love & bonds', ar: 'الحبّ والعلاقات' }, keywords: ['relation', 'couple', 'famille', 'amour', 'communication'] },
  { key: 'creation', label: { fr: 'Création', en: 'Creation', ar: 'الإبداع' }, keywords: ['art', 'musique', 'écriture', 'photo', 'création', 'design', 'créatif'] },
  { key: 'confiance', label: { fr: 'Confiance', en: 'Confidence', ar: 'الثقة' }, keywords: ['confiance', 'estime', 'pnl', 'hypnose', 'thérapie', 'therapie'] },
  { key: 'energie', label: { fr: 'Énergie & corps', en: 'Energy & body', ar: 'الطاقة والجسد' }, keywords: ['sport', 'nutrition', 'fitness', 'énergie', 'massage', 'corps', 'danse'] },
];

// --- Sélecteurs déterministes (index stable selon la date) ---------------
export function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export function mantraDuJour(lang: Lang, d: Date): string {
  const list = MANTRAS[lang] ?? MANTRAS.fr;
  return list[dayOfYear(d) % list.length];
}

export function defiDuMois(lang: Lang, d: Date): string {
  const list = DEFIS[lang] ?? DEFIS.fr;
  return list[d.getMonth() % list.length];
}

// Contenu local des « expériences douces » Shalify (roue des émotions, météo
// intérieure, citations, mini-lexique, parcours 21 jours, respiration du soir,
// affirmations). 100% embarqué : fonctionne hors connexion, zéro dépendance.
// Règle de style : textes positifs, zéro tiret long, zéro mot négatif.
import type { Lang } from '../types';
import { dayOfYear } from './rituelContent';

// --- Roue des émotions ---------------------------------------------------
// On nomme un ressenti, on reçoit un mot doux et une petite invitation.
export interface Emotion { key: string; label: string; glyph: string; mot: string; invite: string; }
export const EMOTIONS: Record<Lang, Emotion[]> = {
  fr: [
    { key: 'joie', label: 'Joie', glyph: '☀', mot: 'Belle nouvelle. Ta joie est une lumière.', invite: 'Savoure ce moment, laisse-le durer un peu plus.' },
    { key: 'calme', label: 'Calme', glyph: '☾', mot: 'Le calme est un trésor. Tu y es.', invite: 'Prends trois respirations lentes pour l’ancrer.' },
    { key: 'gratitude', label: 'Gratitude', glyph: '✿', mot: 'La reconnaissance ouvre le cœur.', invite: 'Nomme une chose belle de ta journée.' },
    { key: 'espoir', label: 'Espoir', glyph: '✦', mot: 'L’espoir trace déjà ton chemin.', invite: 'Choisis un tout petit pas pour aujourd’hui.' },
    { key: 'fatigue', label: 'Fatigue', glyph: '❦', mot: 'Ton corps demande de la douceur. Écoute-le.', invite: 'Offre-toi une pause, même courte.' },
    { key: 'tristesse', label: 'Tristesse', glyph: '❀', mot: 'Ce que tu ressens a le droit d’exister.', invite: 'Pose une main sur ton cœur, respire doucement.' },
    { key: 'tension', label: 'Tension', glyph: '❈', mot: 'Une vague passe. Elle passera.', invite: 'Relâche les épaules, desserre la mâchoire.' },
    { key: 'elan', label: 'Élan', glyph: '➶', mot: 'Ton énergie cherche à créer.', invite: 'Note une envie qui t’anime en ce moment.' },
  ],
  en: [
    { key: 'joie', label: 'Joy', glyph: '☀', mot: 'Lovely. Your joy is a light.', invite: 'Savor this moment, let it last a little longer.' },
    { key: 'calme', label: 'Calm', glyph: '☾', mot: 'Calm is a treasure. You are in it.', invite: 'Take three slow breaths to anchor it.' },
    { key: 'gratitude', label: 'Gratitude', glyph: '✿', mot: 'Gratitude opens the heart.', invite: 'Name one beautiful thing from your day.' },
    { key: 'espoir', label: 'Hope', glyph: '✦', mot: 'Hope already traces your path.', invite: 'Choose one tiny step for today.' },
    { key: 'fatigue', label: 'Tiredness', glyph: '❦', mot: 'Your body asks for gentleness. Listen to it.', invite: 'Offer yourself a pause, even a short one.' },
    { key: 'tristesse', label: 'Sadness', glyph: '❀', mot: 'What you feel has the right to exist.', invite: 'Place a hand on your heart, breathe softly.' },
    { key: 'tension', label: 'Tension', glyph: '❈', mot: 'A wave passes. It will pass.', invite: 'Loosen your shoulders, soften your jaw.' },
    { key: 'elan', label: 'Drive', glyph: '➶', mot: 'Your energy seeks to create.', invite: 'Note one wish that lights you up right now.' },
  ],
  ar: [
    { key: 'joie', label: 'فرح', glyph: '☀', mot: 'جميل. فرحك نور.', invite: 'تذوّق هذه اللحظة، ودعها تدوم أطول قليلاً.' },
    { key: 'calme', label: 'هدوء', glyph: '☾', mot: 'الهدوء كنز. أنت فيه.', invite: 'خذ ثلاثة أنفاس بطيئة لترسيخه.' },
    { key: 'gratitude', label: 'امتنان', glyph: '✿', mot: 'الامتنان يفتح القلب.', invite: 'سمِّ شيئاً جميلاً في يومك.' },
    { key: 'espoir', label: 'أمل', glyph: '✦', mot: 'الأمل يرسم طريقك من الآن.', invite: 'اختر خطوة صغيرة جداً لليوم.' },
    { key: 'fatigue', label: 'تعب', glyph: '❦', mot: 'جسدك يطلب اللطف. أنصت إليه.', invite: 'امنح نفسك وقفة، ولو قصيرة.' },
    { key: 'tristesse', label: 'حزن', glyph: '❀', mot: 'ما تشعر به له الحق في الوجود.', invite: 'ضع يدك على قلبك، وتنفّس بلطف.' },
    { key: 'tension', label: 'توتر', glyph: '❈', mot: 'موجة تمرّ. وستمرّ.', invite: 'أرخِ كتفيك، وليّن فكّك.' },
    { key: 'elan', label: 'اندفاع', glyph: '➶', mot: 'طاقتك تسعى للإبداع.', invite: 'دوّن رغبة تُلهمك الآن.' },
  ],
};

// --- Météo intérieure ----------------------------------------------------
// On choisit son « ciel du jour », on reçoit une intention adaptée.
export interface Ciel { key: string; label: string; glyph: string; intention: string; }
export const CIELS: Record<Lang, Ciel[]> = {
  fr: [
    { key: 'soleil', label: 'Grand soleil', glyph: '☀', intention: 'Je laisse ma lumière rayonner autour de moi.' },
    { key: 'nuage', label: 'Ciel voilé', glyph: '☁', intention: 'Je vais à mon rythme, avec douceur pour moi.' },
    { key: 'pluie', label: 'Petite pluie', glyph: '☂', intention: 'J’accueille ce qui passe, la pluie nourrit aussi.' },
    { key: 'brise', label: 'Brise légère', glyph: '❋', intention: 'Je reste souple, je me laisse porter.' },
    { key: 'etoiles', label: 'Ciel étoilé', glyph: '✦', intention: 'Je fais confiance au calme qui grandit en moi.' },
    { key: 'aube', label: 'Aube naissante', glyph: '☼', intention: 'Un nouveau départ commence, à petits pas.' },
  ],
  en: [
    { key: 'soleil', label: 'Full sun', glyph: '☀', intention: 'I let my light shine around me.' },
    { key: 'nuage', label: 'Soft clouds', glyph: '☁', intention: 'I go at my pace, gentle with myself.' },
    { key: 'pluie', label: 'Light rain', glyph: '☂', intention: 'I welcome what passes, rain nourishes too.' },
    { key: 'brise', label: 'Light breeze', glyph: '❋', intention: 'I stay supple, I let myself be carried.' },
    { key: 'etoiles', label: 'Starry sky', glyph: '✦', intention: 'I trust the calm growing within me.' },
    { key: 'aube', label: 'Rising dawn', glyph: '☼', intention: 'A new beginning starts, in small steps.' },
  ],
  ar: [
    { key: 'soleil', label: 'شمس ساطعة', glyph: '☀', intention: 'أدع نوري يشعّ من حولي.' },
    { key: 'nuage', label: 'سماء رقيقة', glyph: '☁', intention: 'أسير بإيقاعي، بلطف مع نفسي.' },
    { key: 'pluie', label: 'مطر خفيف', glyph: '☂', intention: 'أرحّب بما يمرّ، فالمطر يُغذّي أيضاً.' },
    { key: 'brise', label: 'نسيم عليل', glyph: '❋', intention: 'أبقى ليّناً، وأترك نفسي أُحمَل.' },
    { key: 'etoiles', label: 'سماء مرصّعة', glyph: '✦', intention: 'أثق بالهدوء الذي ينمو في داخلي.' },
    { key: 'aube', label: 'فجر جديد', glyph: '☼', intention: 'بداية جديدة تبدأ، بخطوات صغيرة.' },
  ],
};

// --- Citations du mois (12, une par mois, déterministe) ------------------
export const CITATIONS: Record<Lang, string[]> = {
  fr: [
    'La douceur est une force tranquille.',
    'Ce que tu arroses grandit. Choisis bien.',
    'Ton rythme est le bon rythme.',
    'Chaque respiration est un nouveau départ.',
    'La beauté se cache dans les petites choses.',
    'Prendre soin de soi, c’est déjà avancer.',
    'Tu es la première personne à mériter ta bienveillance.',
    'Un petit pas répété devient un chemin.',
    'La gratitude transforme ce que l’on a en assez.',
    'Le calme se cultive comme un jardin.',
    'Ta valeur ne dépend pas de ce que tu fais.',
    'Repose-toi. Le repos fait partie du chemin.',
  ],
  en: [
    'Gentleness is a quiet strength.',
    'What you water grows. Choose well.',
    'Your pace is the right pace.',
    'Every breath is a new beginning.',
    'Beauty hides in small things.',
    'Caring for yourself is already moving forward.',
    'You are the first person to deserve your kindness.',
    'A small step repeated becomes a path.',
    'Gratitude turns what we have into enough.',
    'Calm is grown like a garden.',
    'Your worth does not depend on what you do.',
    'Rest. Rest is part of the path.',
  ],
  ar: [
    'اللطف قوّة هادئة.',
    'ما تسقيه ينمو. فاختر بعناية.',
    'إيقاعك هو الإيقاع الصحيح.',
    'كل نَفَس بداية جديدة.',
    'الجمال يختبئ في الأشياء الصغيرة.',
    'العناية بنفسك هي تقدّم بالفعل.',
    'أنت أول من يستحقّ لطفك.',
    'خطوة صغيرة متكرّرة تصبح طريقاً.',
    'الامتنان يحوّل ما لديك إلى ما يكفي.',
    'الهدوء يُزرع كالحديقة.',
    'قيمتك لا تعتمد على ما تفعله.',
    'استرح. الراحة جزء من الطريق.',
  ],
};

export function citationDuMois(lang: Lang, d: Date = new Date()): string {
  const list = CITATIONS[lang] ?? CITATIONS.fr;
  return list[d.getMonth() % list.length];
}

// --- Mini-lexique Shalify ------------------------------------------------
export interface LexiqueItem { mot: string; def: string; }
export const LEXIQUE: Record<Lang, LexiqueItem[]> = {
  fr: [
    { mot: 'Ancrage', def: 'Un moment doux pour revenir à soi et se sentir présent, ici et maintenant.' },
    { mot: 'Intention', def: 'Une direction claire que l’on choisit pour sa journée, en un mot ou une phrase.' },
    { mot: 'Gratitude', def: 'Reconnaître ce qui est beau dans sa vie, pour en accueillir davantage.' },
    { mot: 'Mantra', def: 'Une phrase courte et positive que l’on garde avec soi tout au long du jour.' },
    { mot: 'Résonance', def: 'La façon dont deux valeurs se répondent et s’enrichissent l’une l’autre.' },
    { mot: 'Guidance', def: 'Un thème inspirant pour le mois, avec une intention à cultiver.' },
    { mot: 'Boussole', def: 'Tes valeurs profondes, qui orientent tes choix en douceur.' },
    { mot: 'Présence', def: 'Être pleinement là, dans l’instant, sans se presser.' },
  ],
  en: [
    { mot: 'Grounding', def: 'A gentle moment to return to yourself and feel present, here and now.' },
    { mot: 'Intention', def: 'A clear direction you choose for your day, in one word or one sentence.' },
    { mot: 'Gratitude', def: 'Recognizing what is beautiful in your life, to welcome more of it.' },
    { mot: 'Mantra', def: 'A short, positive sentence you keep with you throughout the day.' },
    { mot: 'Resonance', def: 'The way two values answer and enrich one another.' },
    { mot: 'Guidance', def: 'An inspiring theme for the month, with an intention to nurture.' },
    { mot: 'Compass', def: 'Your deep values, gently guiding your choices.' },
    { mot: 'Presence', def: 'Being fully here, in the moment, without rushing.' },
  ],
  ar: [
    { mot: 'التجذّر', def: 'لحظة لطيفة للعودة إلى الذات والشعور بالحضور، هنا والآن.' },
    { mot: 'النيّة', def: 'اتجاه واضح تختاره ليومك، بكلمة أو جملة.' },
    { mot: 'الامتنان', def: 'الاعتراف بما هو جميل في حياتك، لاستقبال المزيد منه.' },
    { mot: 'المانترا', def: 'جملة قصيرة إيجابية تبقيها معك طوال اليوم.' },
    { mot: 'التناغم', def: 'الطريقة التي تتجاوب بها قيمتان وتُثري إحداهما الأخرى.' },
    { mot: 'الإرشاد', def: 'موضوع مُلهم للشهر، مع نيّة تعتني بها.' },
    { mot: 'البوصلة', def: 'قيمك العميقة التي توجّه خياراتك بلطف.' },
    { mot: 'الحضور', def: 'أن تكون حاضراً تماماً في اللحظة، دون عجلة.' },
  ],
};

// --- Parcours 21 jours ---------------------------------------------------
export interface Parcours21 { titre: string; jours: string[]; }
export const PARCOURS_21: Record<Lang, Parcours21> = {
  fr: {
    titre: 'Vingt et un jours vers plus de douceur',
    jours: [
      'Jour 1 · Trois respirations profondes au réveil.',
      'Jour 2 · Note une gratitude ce soir.',
      'Jour 3 · Offre-toi cinq minutes de calme.',
      'Jour 4 · Bois un verre d’eau en pleine conscience.',
      'Jour 5 · Marche dehors et observe la nature.',
      'Jour 6 · Écris un mot doux à une personne aimée.',
      'Jour 7 · Célèbre une petite victoire de ta semaine.',
      'Jour 8 · Coupe les écrans une heure avant de dormir.',
      'Jour 9 · Choisis une intention pour ta journée.',
      'Jour 10 · Range un petit coin qui t’apaise.',
      'Jour 11 · Étire-toi doucement au réveil.',
      'Jour 12 · Souris à ton reflet ce matin.',
      'Jour 13 · Écoute un audio doux et respire.',
      'Jour 14 · Dis merci à une personne qui compte.',
      'Jour 15 · Fais une chose qui te fait vibrer.',
      'Jour 16 · Prends une pause sans rien faire.',
      'Jour 17 · Note trois qualités que tu aimes en toi.',
      'Jour 18 · Prépare-toi une boisson chaude, savoure-la.',
      'Jour 19 · Envoie un message bienveillant.',
      'Jour 20 · Repose-toi vraiment aujourd’hui.',
      'Jour 21 · Regarde le chemin parcouru et remercie-toi.',
    ],
  },
  en: {
    titre: 'Twenty-one days toward more gentleness',
    jours: [
      'Day 1 · Three deep breaths when you wake up.',
      'Day 2 · Write one gratitude tonight.',
      'Day 3 · Offer yourself five minutes of calm.',
      'Day 4 · Drink a glass of water mindfully.',
      'Day 5 · Walk outside and notice nature.',
      'Day 6 · Write a kind note to someone you love.',
      'Day 7 · Celebrate one small win of your week.',
      'Day 8 · Turn off screens one hour before sleep.',
      'Day 9 · Choose one intention for your day.',
      'Day 10 · Tidy a small corner that soothes you.',
      'Day 11 · Stretch gently when you wake up.',
      'Day 12 · Smile at your reflection this morning.',
      'Day 13 · Listen to a soft audio and breathe.',
      'Day 14 · Thank someone who matters to you.',
      'Day 15 · Do one thing that lights you up.',
      'Day 16 · Take a pause doing nothing.',
      'Day 17 · Note three qualities you like in yourself.',
      'Day 18 · Make yourself a warm drink, savor it.',
      'Day 19 · Send a kind message.',
      'Day 20 · Truly rest today.',
      'Day 21 · Look at the path you walked and thank yourself.',
    ],
  },
  ar: {
    titre: 'واحد وعشرون يوماً نحو لطف أعمق',
    jours: [
      'اليوم 1 · ثلاثة أنفاس عميقة عند الاستيقاظ.',
      'اليوم 2 · دوّن امتناناً هذا المساء.',
      'اليوم 3 · امنح نفسك خمس دقائق من الهدوء.',
      'اليوم 4 · اشرب كوب ماء بحضور ووعي.',
      'اليوم 5 · امشِ في الخارج وتأمّل الطبيعة.',
      'اليوم 6 · اكتب كلمة لطيفة لمن تحبّ.',
      'اليوم 7 · احتفِ بإنجاز صغير في أسبوعك.',
      'اليوم 8 · أطفئ الشاشات قبل النوم بساعة.',
      'اليوم 9 · اختر نيّة ليومك.',
      'اليوم 10 · رتّب ركناً صغيراً يمنحك الطمأنينة.',
      'اليوم 11 · تمدّد بلطف عند الاستيقاظ.',
      'اليوم 12 · ابتسم لانعكاسك هذا الصباح.',
      'اليوم 13 · استمع إلى صوت لطيف وتنفّس.',
      'اليوم 14 · اشكر شخصاً يهمّك.',
      'اليوم 15 · افعل شيئاً يُشعل حماسك.',
      'اليوم 16 · خذ وقفة دون أن تفعل شيئاً.',
      'اليوم 17 · دوّن ثلاث صفات تحبّها في نفسك.',
      'اليوم 18 · حضّر مشروباً دافئاً، وتذوّقه.',
      'اليوم 19 · أرسل رسالة طيبة.',
      'اليوم 20 · استرح حقاً اليوم.',
      'اليوم 21 · انظر إلى الطريق الذي قطعته واشكر نفسك.',
    ],
  },
};

// --- Respiration guidée (rythmes) ----------------------------------------
// Deux ambiances : jour (équilibre) et soir (souffle plus long pour apaiser).
export interface Souffle {
  inspire: number; // secondes
  pause: number;
  expire: number;
  cycles: number;
}
export const SOUFFLE_JOUR: Souffle = { inspire: 4, pause: 2, expire: 4, cycles: 6 };
export const SOUFFLE_SOIR: Souffle = { inspire: 4, pause: 2, expire: 6, cycles: 6 };

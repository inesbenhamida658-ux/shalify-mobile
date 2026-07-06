// Contenu local des expériences Shalify (guidance, ancrage, compatibilité, test).
// 100% embarqué : fonctionne hors connexion, zéro dépendance externe.
// Règle de style : textes visibles positifs, zéro tiret long, zéro mot négatif.
import type { Lang } from '../types';
import { dayOfYear } from './rituelContent';

// --- Guidance du mois (12, une par mois) ---------------------------------
export interface Guidance { theme: string; texte: string; intention: string; }
export const GUIDANCE: Record<Lang, Guidance[]> = {
  fr: [
    { theme: 'Nouveaux départs', texte: 'Ce mois invite à poser une première pierre. Une intention claire suffit pour ouvrir le chemin.', intention: 'Je commence, même à petits pas.' },
    { theme: 'Ancrage', texte: 'Reviens à l’essentiel. Ce qui te nourrit vraiment mérite ta présence pleine.', intention: 'Je choisis ce qui me fait du bien.' },
    { theme: 'Élan', texte: 'Une énergie douce te porte. Suis ce qui te fait vibrer, avec confiance.', intention: 'J’avance vers ce qui m’allume.' },
    { theme: 'Ouverture', texte: 'Le cœur s’ouvre aux belles rencontres. Reste disponible à la surprise.', intention: 'Je reçois avec gratitude.' },
    { theme: 'Clarté', texte: 'La lumière révèle tes priorités. Simplifie, allège, respire.', intention: 'Je garde ce qui compte.' },
    { theme: 'Créativité', texte: 'Ton imagination cherche à s’exprimer. Offre-lui un espace pour naître.', intention: 'Je laisse ma création vivre.' },
    { theme: 'Récolte', texte: 'Ce que tu as semé prend forme. Savoure chaque petit fruit du chemin.', intention: 'Je célèbre mes pas.' },
    { theme: 'Transformation', texte: 'Un renouveau se prépare en douceur. Fais confiance à ton rythme.', intention: 'Je grandis avec patience.' },
    { theme: 'Équilibre', texte: 'Trouve ta juste mesure entre l’action et le repos. Les deux te construisent.', intention: 'J’honore mon équilibre.' },
    { theme: 'Reliance', texte: 'Les liens sincères te portent. Partage ta présence, offre ton écoute.', intention: 'Je cultive mes liens vrais.' },
    { theme: 'Gratitude', texte: 'Regarde le chemin parcouru. La reconnaissance ouvre encore plus de beauté.', intention: 'Je dis merci à la vie.' },
    { theme: 'Repos', texte: 'Accorde-toi une pause profonde. Le calme prépare tes prochains élans.', intention: 'Je me repose pleinement.' },
  ],
  en: [
    { theme: 'New beginnings', texte: 'This month invites a first step. A clear intention is enough to open the way.', intention: 'I begin, even in small steps.' },
    { theme: 'Grounding', texte: 'Return to what matters. What truly nourishes you deserves your full presence.', intention: 'I choose what feels good.' },
    { theme: 'Momentum', texte: 'A gentle energy carries you. Follow what lights you up, with confidence.', intention: 'I move toward what excites me.' },
    { theme: 'Openness', texte: 'The heart opens to lovely encounters. Stay available to surprise.', intention: 'I receive with gratitude.' },
    { theme: 'Clarity', texte: 'Light reveals your priorities. Simplify, lighten, breathe.', intention: 'I keep what matters.' },
    { theme: 'Creativity', texte: 'Your imagination seeks to express itself. Give it space to be born.', intention: 'I let my creation live.' },
    { theme: 'Harvest', texte: 'What you have sown takes shape. Savor every small fruit of the path.', intention: 'I celebrate my steps.' },
    { theme: 'Transformation', texte: 'A gentle renewal is preparing. Trust your own pace.', intention: 'I grow with patience.' },
    { theme: 'Balance', texte: 'Find your measure between action and rest. Both shape you.', intention: 'I honor my balance.' },
    { theme: 'Connection', texte: 'Sincere bonds carry you. Share your presence, offer your listening.', intention: 'I nurture my true bonds.' },
    { theme: 'Gratitude', texte: 'Look at the path you walked. Gratitude opens even more beauty.', intention: 'I thank life.' },
    { theme: 'Rest', texte: 'Grant yourself a deep pause. Calm prepares your next surge.', intention: 'I rest fully.' },
  ],
  ar: [
    { theme: 'بدايات جديدة', texte: 'يدعوك هذا الشهر لخطوة أولى. نيّة واضحة تكفي لفتح الطريق.', intention: 'أبدأ، ولو بخطوات صغيرة.' },
    { theme: 'التجذّر', texte: 'عُد إلى الأساس. ما يغذّيك حقاً يستحقّ حضورك الكامل.', intention: 'أختار ما يمنحني الخير.' },
    { theme: 'الاندفاع', texte: 'طاقة لطيفة تحملك. اتبع ما يُشعل حماسك بثقة.', intention: 'أتقدّم نحو ما يُلهمني.' },
    { theme: 'الانفتاح', texte: 'ينفتح القلب على لقاءات جميلة. ابقَ متاحاً للمفاجأة.', intention: 'أستقبل بامتنان.' },
    { theme: 'الوضوح', texte: 'يكشف النور أولوياتك. بسّط، خفّف، تنفّس.', intention: 'أحتفظ بما يهمّ.' },
    { theme: 'الإبداع', texte: 'يبحث خيالك عن تعبير. امنحه مساحة ليولد.', intention: 'أترك إبداعي يعيش.' },
    { theme: 'الحصاد', texte: 'ما زرعته يأخذ شكله. تذوّق كل ثمرة صغيرة في الطريق.', intention: 'أحتفي بخطواتي.' },
    { theme: 'التحوّل', texte: 'تجدّد لطيف يتهيّأ. ثِق بإيقاعك.', intention: 'أنمو بصبر.' },
    { theme: 'التوازن', texte: 'جد قياسك بين الفعل والراحة. كلاهما يبنيك.', intention: 'أكرّم توازني.' },
    { theme: 'التواصل', texte: 'الروابط الصادقة تحملك. شارك حضورك، وامنح إنصاتك.', intention: 'أرعى روابطي الحقيقية.' },
    { theme: 'الامتنان', texte: 'انظر إلى الطريق الذي قطعته. الامتنان يفتح مزيداً من الجمال.', intention: 'أشكر الحياة.' },
    { theme: 'الراحة', texte: 'امنح نفسك وقفة عميقة. الهدوء يهيّئ اندفاعك القادم.', intention: 'أرتاح تماماً.' },
  ],
};

export function guidanceDuMois(lang: Lang, d: Date): Guidance {
  const list = GUIDANCE[lang] ?? GUIDANCE.fr;
  return list[d.getMonth() % list.length];
}

// --- Ancrage du matin (rituel guidé en 5 temps) --------------------------
export interface AncrageEtape { titre: string; texte: string; }
export const ANCRAGE: Record<Lang, { intro: string; etapes: AncrageEtape[] }> = {
  fr: {
    intro: 'Cinq temps doux pour commencer la journée en présence. Prends ton temps à chaque étape.',
    etapes: [
      { titre: 'Respire', texte: 'Trois respirations lentes. Inspire par le nez, souffle longuement par la bouche.' },
      { titre: 'Ressens', texte: 'Pose une main sur ton cœur. Accueille ce qui est là, avec douceur.' },
      { titre: 'Remercie', texte: 'Nomme une chose belle de ta vie en ce moment. Laisse la gratitude monter.' },
      { titre: 'Choisis', texte: 'Choisis une intention simple pour ta journée. Un seul mot suffit.' },
      { titre: 'Souris', texte: 'Offre-toi un sourire. Tu es prête à avancer, à ton rythme.' },
    ],
  },
  en: {
    intro: 'Five gentle steps to begin the day in presence. Take your time at each step.',
    etapes: [
      { titre: 'Breathe', texte: 'Three slow breaths. Inhale through the nose, exhale long through the mouth.' },
      { titre: 'Feel', texte: 'Place a hand on your heart. Welcome what is here, gently.' },
      { titre: 'Thank', texte: 'Name one beautiful thing in your life right now. Let gratitude rise.' },
      { titre: 'Choose', texte: 'Choose one simple intention for your day. One word is enough.' },
      { titre: 'Smile', texte: 'Offer yourself a smile. You are ready to move, at your own pace.' },
    ],
  },
  ar: {
    intro: 'خمس خطوات لطيفة لبدء اليوم بحضور. خذ وقتك في كل خطوة.',
    etapes: [
      { titre: 'تنفّس', texte: 'ثلاثة أنفاس بطيئة. شهيق من الأنف، وزفير طويل من الفم.' },
      { titre: 'اشعر', texte: 'ضع يدك على قلبك. رحّب بما هو حاضر، بلطف.' },
      { titre: 'اشكر', texte: 'سمِّ شيئاً جميلاً في حياتك الآن. دع الامتنان يعلو.' },
      { titre: 'اختر', texte: 'اختر نيّة بسيطة ليومك. كلمة واحدة تكفي.' },
      { titre: 'ابتسم', texte: 'امنح نفسك ابتسامة. أنت جاهز للتقدّم على إيقاعك.' },
    ],
  },
};

// --- Compatibilité / Connexion profonde ----------------------------------
// Deux personnes choisissent une valeur chacune ; on lit leur résonance.
export interface Resonance { titre: string; texte: string; }
export function resonance(lang: Lang, a: string, b: string): Resonance {
  const same = a === b;
  const R: Record<Lang, { meme: Resonance; complement: Resonance }> = {
    fr: {
      meme: { titre: 'Un même souffle', texte: 'Vous partagez la même valeur au cœur. Votre lien avance dans la même direction, avec naturel.' },
      complement: { titre: 'Beaux compléments', texte: 'Vos valeurs se répondent et s’enrichissent. L’une éclaire ce que l’autre approfondit.' },
    },
    en: {
      meme: { titre: 'One same breath', texte: 'You share the same core value. Your bond moves in one direction, with ease.' },
      complement: { titre: 'Lovely complements', texte: 'Your values answer and enrich each other. One lights what the other deepens.' },
    },
    ar: {
      meme: { titre: 'نَفَسٌ واحد', texte: 'تتشاركان القيمة ذاتها في القلب. رابطكما يسير في الاتجاه نفسه بسلاسة.' },
      complement: { titre: 'تكاملٌ جميل', texte: 'تتجاوب قيمكما وتُثري إحداها الأخرى. واحدة تُنير ما تعمّقه الأخرى.' },
    },
  };
  const set = R[lang] ?? R.fr;
  return same ? set.meme : set.complement;
}

// --- Test / quiz de découverte (bibliothèque) ----------------------------
export interface QuizQuestion { q: string; options: { texte: string; profil: string }[]; }
export interface QuizProfil { key: string; titre: string; texte: string; }
export const TEST_QUESTIONS: Record<Lang, QuizQuestion[]> = {
  fr: [
    { q: 'Le matin, ton élan naturel te porte vers…', options: [
      { texte: 'Un moment de calme', profil: 'serenite' },
      { texte: 'Une idée à créer', profil: 'creation' },
      { texte: 'Un échange avec les autres', profil: 'lien' },
      { texte: 'Un défi à relever', profil: 'elan' },
    ] },
    { q: 'Ce qui te ressource le plus, c’est…', options: [
      { texte: 'Le silence et la nature', profil: 'serenite' },
      { texte: 'Fabriquer de tes mains', profil: 'creation' },
      { texte: 'Un moment partagé', profil: 'lien' },
      { texte: 'Apprendre du neuf', profil: 'elan' },
    ] },
    { q: 'Ta plus belle fierté vient de…', options: [
      { texte: 'Ta paix intérieure', profil: 'serenite' },
      { texte: 'Ce que tu as créé', profil: 'creation' },
      { texte: 'Les liens que tu tisses', profil: 'lien' },
      { texte: 'Le chemin que tu traces', profil: 'elan' },
    ] },
    { q: 'Quand tu avances, tu aimes surtout…', options: [
      { texte: 'Prendre le temps de sentir', profil: 'serenite' },
      { texte: 'Essayer et façonner', profil: 'creation' },
      { texte: 'Cheminer à plusieurs', profil: 'lien' },
      { texte: 'Explorer de nouvelles voies', profil: 'elan' },
    ] },
    { q: 'Le soir, ce qui t’apaise le plus…', options: [
      { texte: 'Un instant de silence', profil: 'serenite' },
      { texte: 'Créer quelque chose de tes mains', profil: 'creation' },
      { texte: 'Un moment avec ceux que tu aimes', profil: 'lien' },
      { texte: 'Imaginer le pas de demain', profil: 'elan' },
    ] },
  ],
  en: [
    { q: 'In the morning, your natural drive leads you toward…', options: [
      { texte: 'A quiet moment', profil: 'serenite' },
      { texte: 'An idea to create', profil: 'creation' },
      { texte: 'A talk with others', profil: 'lien' },
      { texte: 'A challenge to meet', profil: 'elan' },
    ] },
    { q: 'What restores you most is…', options: [
      { texte: 'Silence and nature', profil: 'serenite' },
      { texte: 'Making with your hands', profil: 'creation' },
      { texte: 'A shared moment', profil: 'lien' },
      { texte: 'Learning something new', profil: 'elan' },
    ] },
    { q: 'Your proudest joy comes from…', options: [
      { texte: 'Your inner peace', profil: 'serenite' },
      { texte: 'What you have created', profil: 'creation' },
      { texte: 'The bonds you weave', profil: 'lien' },
      { texte: 'The path you trace', profil: 'elan' },
    ] },
    { q: 'When you move forward, you most enjoy…', options: [
      { texte: 'Taking time to feel', profil: 'serenite' },
      { texte: 'Trying and shaping', profil: 'creation' },
      { texte: 'Walking with others', profil: 'lien' },
      { texte: 'Exploring new ways', profil: 'elan' },
    ] },
    { q: 'In the evening, what soothes you most…', options: [
      { texte: 'A moment of silence', profil: 'serenite' },
      { texte: 'Making something by hand', profil: 'creation' },
      { texte: 'A moment with loved ones', profil: 'lien' },
      { texte: 'Imagining tomorrow’s step', profil: 'elan' },
    ] },
  ],
  ar: [
    { q: 'في الصباح، يقودك اندفاعك الطبيعي نحو…', options: [
      { texte: 'لحظة هدوء', profil: 'serenite' },
      { texte: 'فكرة لإبداعها', profil: 'creation' },
      { texte: 'حديث مع الآخرين', profil: 'lien' },
      { texte: 'تحدٍّ لمواجهته', profil: 'elan' },
    ] },
    { q: 'أكثر ما يجدّد طاقتك هو…', options: [
      { texte: 'الصمت والطبيعة', profil: 'serenite' },
      { texte: 'الصنع بيديك', profil: 'creation' },
      { texte: 'لحظة مشتركة', profil: 'lien' },
      { texte: 'تعلّم شيء جديد', profil: 'elan' },
    ] },
    { q: 'أجمل فخر لديك يأتي من…', options: [
      { texte: 'سلامك الداخلي', profil: 'serenite' },
      { texte: 'ما أبدعته', profil: 'creation' },
      { texte: 'الروابط التي تنسجها', profil: 'lien' },
      { texte: 'الطريق الذي ترسمه', profil: 'elan' },
    ] },
    { q: 'حين تتقدّم، تحبّ أكثر…', options: [
      { texte: 'أن تأخذ وقتك لتشعر', profil: 'serenite' },
      { texte: 'أن تجرّب وتُشكّل', profil: 'creation' },
      { texte: 'أن تسير مع الآخرين', profil: 'lien' },
      { texte: 'أن تستكشف طرقاً جديدة', profil: 'elan' },
    ] },
    { q: 'في المساء، أكثر ما يهدّئك…', options: [
      { texte: 'لحظة صمت', profil: 'serenite' },
      { texte: 'صنع شيء بيديك', profil: 'creation' },
      { texte: 'لحظة مع من تحبّ', profil: 'lien' },
      { texte: 'تخيّل خطوة الغد', profil: 'elan' },
    ] },
  ],
};

export const TEST_PROFILS: Record<Lang, QuizProfil[]> = {
  fr: [
    { key: 'serenite', titre: 'L’Âme sereine', texte: 'Tu cherches la paix et la présence. Les rubriques Transformation et Savoirs te parleront.' },
    { key: 'creation', titre: 'L’Esprit créatif', texte: 'Tu aimes fabriquer et imaginer. Les rubriques Artisanat & Création et Autres talents te correspondent.' },
    { key: 'lien', titre: 'Le Cœur relié', texte: 'Tu grandis dans le lien vrai. Résonance et Lives te feront du bien.' },
    { key: 'elan', titre: 'L’Élan curieux', texte: 'Tu avances par l’apprentissage. Compétences et Savoirs sont faits pour toi.' },
  ],
  en: [
    { key: 'serenite', titre: 'The Serene Soul', texte: 'You seek peace and presence. The Transformation and Knowledge sections will speak to you.' },
    { key: 'creation', titre: 'The Creative Mind', texte: 'You love making and imagining. Craft & Creation and Other talents match you.' },
    { key: 'lien', titre: 'The Connected Heart', texte: 'You grow through true bonds. Resonance and Lives will feel good.' },
    { key: 'elan', titre: 'The Curious Drive', texte: 'You move forward by learning. Skills and Knowledge are made for you.' },
  ],
  ar: [
    { key: 'serenite', titre: 'الروح الهادئة', texte: 'تبحث عن السلام والحضور. سيناديك قسما التحوّل والمعارف.' },
    { key: 'creation', titre: 'العقل المبدع', texte: 'تحبّ الصنع والتخيّل. يناسبك قسما الحِرف والإبداع ومواهب أخرى.' },
    { key: 'lien', titre: 'القلب المتّصل', texte: 'تنمو في الرابط الصادق. سيمنحك التناغم والبث المباشر خيراً.' },
    { key: 'elan', titre: 'الاندفاع الفضولي', texte: 'تتقدّم بالتعلّم. المهارات والمعارف صُنعت لك.' },
  ],
};

// Sélecteur du profil majoritaire à partir des réponses.
export function profilGagnant(lang: Lang, reponses: string[]): QuizProfil {
  const list = TEST_PROFILS[lang] ?? TEST_PROFILS.fr;
  const compte: Record<string, number> = {};
  reponses.forEach(r => { compte[r] = (compte[r] ?? 0) + 1; });
  let best = list[0].key;
  let max = -1;
  list.forEach(p => { const n = compte[p.key] ?? 0; if (n > max) { max = n; best = p.key; } });
  return list.find(p => p.key === best) ?? list[0];
}

// Mantra du jour long (pour l'écran dédié) : réutilise la logique dayOfYear.
export { dayOfYear };

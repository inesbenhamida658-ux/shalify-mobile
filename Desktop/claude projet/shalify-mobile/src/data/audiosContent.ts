// Audios et méditations guidées Shalify (contenu local, textes de séance).
// Zéro dépendance externe : chaque audio est un guide écrit à lire en douceur.
// Quand un vrai fichier son existera, on ajoutera un champ url et un lecteur.
import type { Lang } from '../types';

export interface AudioItem {
  id: string;
  duree: string;
  titre: Record<Lang, string>;
  sous: Record<Lang, string>;
  etapes: Record<Lang, string[]>;
}

export const AUDIOS: AudioItem[] = [
  {
    id: 'souffle',
    duree: '3 min',
    titre: { fr: 'Le souffle qui apaise', en: 'The calming breath', ar: 'النَّفَس المهدّئ' },
    sous: { fr: 'Trois minutes pour revenir au calme.', en: 'Three minutes to return to calm.', ar: 'ثلاث دقائق للعودة إلى الهدوء.' },
    etapes: {
      fr: [
        'Installe-toi confortablement, les épaules relâchées.',
        'Inspire par le nez en comptant jusqu’à quatre.',
        'Garde l’air un instant, tout doucement.',
        'Souffle par la bouche en comptant jusqu’à six.',
        'Recommence cinq fois, à ton rythme.',
      ],
      en: [
        'Settle comfortably, shoulders relaxed.',
        'Inhale through the nose counting to four.',
        'Hold the air a moment, very gently.',
        'Exhale through the mouth counting to six.',
        'Repeat five times, at your own pace.',
      ],
      ar: [
        'استقرّ بارتياح، والكتفان مرتخيان.',
        'شهيق من الأنف مع العدّ إلى أربعة.',
        'احبس الهواء لحظة، بلطف شديد.',
        'زفير من الفم مع العدّ إلى ستة.',
        'كرّر خمس مرات على إيقاعك.',
      ],
    },
  },
  {
    id: 'ancrage',
    duree: '5 min',
    titre: { fr: 'Ancrage du corps', en: 'Body grounding', ar: 'تجذّر الجسد' },
    sous: { fr: 'Retrouve ta stabilité intérieure.', en: 'Find your inner stability.', ar: 'استعد ثباتك الداخلي.' },
    etapes: {
      fr: [
        'Sens tes pieds bien posés sur le sol.',
        'Imagine des racines douces qui descendent.',
        'À chaque souffle, tu deviens plus stable.',
        'Ton corps est calme, présent, entier.',
        'Reste là aussi longtemps qu’il te plaît.',
      ],
      en: [
        'Feel your feet well planted on the ground.',
        'Imagine soft roots going down.',
        'With each breath, you become more stable.',
        'Your body is calm, present, whole.',
        'Stay there as long as you wish.',
      ],
      ar: [
        'اشعر بقدميك ثابتتين على الأرض.',
        'تخيّل جذوراً لطيفة تنزل للأسفل.',
        'مع كل نَفَس تصبح أكثر ثباتاً.',
        'جسدك هادئ، حاضر، متكامل.',
        'ابقَ هناك ما شئت.',
      ],
    },
  },
  {
    id: 'gratitude',
    duree: '4 min',
    titre: { fr: 'Méditation gratitude', en: 'Gratitude meditation', ar: 'تأمّل الامتنان' },
    sous: { fr: 'Ouvre ton cœur à ce qui est beau.', en: 'Open your heart to what is beautiful.', ar: 'افتح قلبك لما هو جميل.' },
    etapes: {
      fr: [
        'Ferme les yeux et respire calmement.',
        'Pense à une personne qui te fait du bien.',
        'Pense à un moment doux de ta semaine.',
        'Pense à une qualité que tu aimes en toi.',
        'Laisse la chaleur de la gratitude t’envelopper.',
      ],
      en: [
        'Close your eyes and breathe calmly.',
        'Think of a person who makes you feel good.',
        'Think of a soft moment of your week.',
        'Think of a quality you love in yourself.',
        'Let the warmth of gratitude wrap around you.',
      ],
      ar: [
        'أغمض عينيك وتنفّس بهدوء.',
        'فكّر في شخص يمنحك الخير.',
        'فكّر في لحظة لطيفة من أسبوعك.',
        'فكّر في صفة تحبّها في نفسك.',
        'دع دفء الامتنان يحيط بك.',
      ],
    },
  },
  {
    id: 'sommeil',
    duree: '6 min',
    titre: { fr: 'Vers un sommeil doux', en: 'Toward gentle sleep', ar: 'نحو نوم هادئ' },
    sous: { fr: 'Un guide pour relâcher la journée.', en: 'A guide to release the day.', ar: 'دليل لإفلات اليوم.' },
    etapes: {
      fr: [
        'Allonge-toi et sens le poids de ton corps.',
        'Relâche le front, la mâchoire, les épaules.',
        'Laisse tes pensées passer comme des nuages.',
        'Ralentis ton souffle, encore un peu.',
        'Accueille le repos qui vient te trouver.',
      ],
      en: [
        'Lie down and feel the weight of your body.',
        'Release the forehead, jaw, shoulders.',
        'Let your thoughts pass like clouds.',
        'Slow your breath, a little more.',
        'Welcome the rest that comes to find you.',
      ],
      ar: [
        'استلقِ واشعر بثقل جسدك.',
        'أرخِ الجبين والفكّ والكتفين.',
        'دع أفكارك تمرّ كالغيوم.',
        'أبطئ نَفَسك قليلاً بعد.',
        'رحّب بالراحة التي تأتي إليك.',
      ],
    },
  },
];

export function audioTitre(a: AudioItem, lang: Lang): string { return a.titre[lang] ?? a.titre.fr; }
export function audioSous(a: AudioItem, lang: Lang): string { return a.sous[lang] ?? a.sous.fr; }
export function audioEtapes(a: AudioItem, lang: Lang): string[] { return a.etapes[lang] ?? a.etapes.fr; }

import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "LETTRE AU FUTUR",
    "titre": "Lettre à mon futur moi",
    "intro": "Écrivez à la personne que vous deviendrez et recevez ce message plus tard, comme un cadeau.",
    "blocs": [
      {
        "titre": "Un pont vers demain",
        "texte": "Confiez vos espoirs, vos promesses et votre tendresse à votre futur moi. Les mots traversent le temps."
      },
      {
        "titre": "Ce que la lettre garde",
        "puces": [
          "Vos intentions du moment",
          "Ce qui compte vraiment pour vous",
          "Les rêves que vous portez",
          "Un encouragement pour plus tard"
        ]
      },
      {
        "titre": "Une retrouvaille émouvante",
        "texte": "Le jour venu, relire ces lignes mesure le chemin parcouru et ravive votre élan."
      }
    ],
    "citation": "Écrire au futur, c’est déjà avancer vers lui.",
    "actionLabel": "Écrire ma lettre en ligne",
    "actionUrl": "https://shalify.app/lettre-au-futur"
  },
  "en": {
    "eyebrow": "LETTER TO THE FUTURE",
    "titre": "Letter to my future self",
    "intro": "Write to the person you will become and receive this message later, like a gift.",
    "blocs": [
      {
        "titre": "A bridge to tomorrow",
        "texte": "Entrust your hopes, promises and tenderness to your future self. Words travel through time."
      },
      {
        "titre": "What the letter keeps",
        "puces": [
          "Your intentions of the moment",
          "What truly matters to you",
          "The dreams you carry",
          "An encouragement for later"
        ]
      },
      {
        "titre": "A moving reunion",
        "texte": "When the day comes, rereading these lines measures the path traveled and revives your momentum."
      }
    ],
    "citation": "Writing to the future is already moving toward it.",
    "actionLabel": "Write my letter online",
    "actionUrl": "https://shalify.app/lettre-au-futur"
  },
  "ar": {
    "eyebrow": "رسالة إلى المستقبل",
    "titre": "رسالة إلى ذاتي المستقبلية",
    "intro": "اكتب إلى الشخص الذي ستصيره وتلقَّ هذه الرسالة لاحقًا، كهديّة.",
    "blocs": [
      {
        "titre": "جسر نحو الغد",
        "texte": "ائتمن ذاتك المستقبلية على آمالك ووعودك وحنانك. الكلمات تعبر الزمن."
      },
      {
        "titre": "ما تحفظه الرسالة",
        "puces": [
          "نيّاتك في اللحظة",
          "ما يهمّك حقًّا",
          "الأحلام التي تحملها",
          "تشجيع لِما بعد"
        ]
      },
      {
        "titre": "لقاء مؤثّر",
        "texte": "حين يأتي اليوم، تقيس إعادةُ قراءة هذه السطور الطريقَ المقطوع وتُحيي اندفاعك."
      }
    ],
    "citation": "الكتابة إلى المستقبل تقدّمٌ نحوه أصلًا.",
    "actionLabel": "اكتب رسالتي على الإنترنت",
    "actionUrl": "https://shalify.app/lettre-au-futur"
  }
};

export function LettreAuFuturScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

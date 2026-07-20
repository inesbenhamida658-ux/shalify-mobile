import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "MENTORAT",
    "titre": "Mentorat",
    "intro": "Avancez guidé par une main expérimentée, ou tendez la vôtre à celles et ceux qui commencent.",
    "blocs": [
      {
        "titre": "Un lien qui élève",
        "texte": "Le mentorat relie une expérience et un élan : l’un transmet, l’autre grandit, tous deux s’enrichissent."
      },
      {
        "titre": "Deux façons de vivre le lien",
        "puces": [
          "Recevez les conseils d’un mentor attentif",
          "Offrez votre savoir à un mentoré motivé",
          "Fixez un rythme qui vous convient",
          "Progressez avec un cap clair"
        ]
      },
      {
        "titre": "La transmission, un trésor",
        "texte": "Partager son expérience, c’est offrir ce que l’on a de plus précieux, et recevoir en retour."
      }
    ],
    "citation": "Transmettre, c’est faire grandir deux personnes à la fois.",
    "actionLabel": "Explorer le mentorat en ligne",
    "actionUrl": "https://shalify.app/mentorat"
  },
  "en": {
    "eyebrow": "MENTORING",
    "titre": "Mentoring",
    "intro": "Move forward guided by an experienced hand, or offer yours to those who are starting.",
    "blocs": [
      {
        "titre": "A link that lifts",
        "texte": "Mentoring links an experience and a momentum: one transmits, the other grows, both enrich themselves."
      },
      {
        "titre": "Two ways to live the link",
        "puces": [
          "Receive the advice of an attentive mentor",
          "Offer your knowledge to a motivated mentee",
          "Set a rhythm that suits you",
          "Progress with a clear course"
        ]
      },
      {
        "titre": "Transmission, a treasure",
        "texte": "Sharing your experience is offering what you hold most precious, and receiving in return."
      }
    ],
    "citation": "To transmit is to grow two people at once.",
    "actionLabel": "Explore mentoring online",
    "actionUrl": "https://shalify.app/mentorat"
  },
  "ar": {
    "eyebrow": "الإرشاد",
    "titre": "الإرشاد",
    "intro": "تقدّم موجَّهًا بيد ذات خبرة، أو مُدّ يدك لمن يبدؤون.",
    "blocs": [
      {
        "titre": "رابط يرفع",
        "texte": "يربط الإرشاد بين خبرة واندفاع: أحدهما ينقل، والآخر ينمو، وكلاهما يُثري نفسه."
      },
      {
        "titre": "طريقتان لعيش الرابط",
        "puces": [
          "تلقَّ نصائح مرشد مُصغٍ",
          "اعرض معرفتك على مسترشد متحمّس",
          "حدّد إيقاعًا يناسبك",
          "تقدّم بوجهة واضحة"
        ]
      },
      {
        "titre": "النقل، كنز",
        "texte": "مشاركة خبرتك تقديمٌ لأثمن ما لديك، وتلقٍّ في المقابل."
      }
    ],
    "citation": "أن تنقل يعني أن تُنمّي شخصين في آنٍ واحد.",
    "actionLabel": "استكشف الإرشاد على الإنترنت",
    "actionUrl": "https://shalify.app/mentorat"
  }
};

export function MentoratScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

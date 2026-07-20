import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "REFORMULER MON OFFRE",
    "titre": "Reformuler mon offre",
    "intro": "Donnez à votre offre des mots justes, chaleureux et clairs, qui inspirent confiance immédiatement.",
    "blocs": [
      {
        "titre": "Vos mots, sublimés",
        "texte": "À partir de votre description, une version plus limpide et engageante vous est proposée, fidèle à votre voix."
      },
      {
        "titre": "Ce qui rend une offre lumineuse",
        "puces": [
          "Un titre clair qui parle au cœur",
          "Le bénéfice ressenti mis en avant",
          "Un ton chaleureux et professionnel",
          "Un appel simple à réserver"
        ]
      },
      {
        "titre": "À vous le dernier mot",
        "texte": "Gardez ce qui vous ressemble, ajustez le reste. Votre offre reste profondément la vôtre."
      }
    ],
    "citation": "Les mots justes ouvrent les bonnes rencontres.",
    "actionLabel": "Reformuler en ligne",
    "actionUrl": "https://shalify.app/reformuler-mon-offre"
  },
  "en": {
    "eyebrow": "REPHRASE MY OFFER",
    "titre": "Rephrase my offer",
    "intro": "Give your offer words that are right, warm and clear, inspiring trust at once.",
    "blocs": [
      {
        "titre": "Your words, elevated",
        "texte": "From your description, a clearer, more engaging version is proposed, true to your voice."
      },
      {
        "titre": "What makes an offer shine",
        "puces": [
          "A clear title that speaks to the heart",
          "The felt benefit brought forward",
          "A warm and professional tone",
          "A simple call to book"
        ]
      },
      {
        "titre": "Yours is the last word",
        "texte": "Keep what feels like you, adjust the rest. Your offer stays deeply your own."
      }
    ],
    "citation": "The right words open the right encounters.",
    "actionLabel": "Rephrase online",
    "actionUrl": "https://shalify.app/reformuler-mon-offre"
  },
  "ar": {
    "eyebrow": "إعادة صياغة عرضي",
    "titre": "إعادة صياغة عرضي",
    "intro": "امنح عرضك كلمات صائبة ودافئة وواضحة تبعث الثقة فورًا.",
    "blocs": [
      {
        "titre": "كلماتك، بأبهى حُلّة",
        "texte": "انطلاقًا من وصفك، تُقترح عليك صيغة أوضح وأكثر جاذبية، وفيّة لصوتك."
      },
      {
        "titre": "ما يجعل العرض مشرقًا",
        "puces": [
          "عنوان واضح يخاطب القلب",
          "إبراز الفائدة المحسوسة",
          "نبرة دافئة ومهنية",
          "دعوة بسيطة للحجز"
        ]
      },
      {
        "titre": "الكلمة الأخيرة لك",
        "texte": "احتفظ بما يشبهك، واضبط الباقي. يبقى عرضك خاصًّا بك في العمق."
      }
    ],
    "citation": "الكلمات الصائبة تفتح اللقاءات الصحيحة.",
    "actionLabel": "أعد الصياغة على الإنترنت",
    "actionUrl": "https://shalify.app/reformuler-mon-offre"
  }
};

export function ReformulerOffreScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

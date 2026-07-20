import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "MÉTÉO INTÉRIEURE",
    "titre": "Ma météo intérieure",
    "intro": "Prenez le temps de nommer ce que vous ressentez et accueillez votre état du moment.",
    "blocs": [
      {
        "titre": "Nommer pour apaiser",
        "texte": "Poser un mot sur son ressenti éclaire l’instant et ouvre la voie à plus de sérénité."
      },
      {
        "titre": "Ce que la météo révèle",
        "puces": [
          "Votre climat intérieur du jour",
          "Une écoute de vos émotions",
          "Un pas vers l’équilibre",
          "Un suivi doux de vos jours"
        ]
      },
      {
        "titre": "Un geste bienveillant",
        "texte": "Chaque relevé est une attention offerte à vous-même, accueillante et pleine de tendresse."
      }
    ],
    "citation": "Accueillir son ressenti, c’est déjà prendre soin de soi.",
    "actionLabel": "Faire ma météo en ligne",
    "actionUrl": "https://shalify.app/meteo-interieure"
  },
  "en": {
    "eyebrow": "INNER WEATHER",
    "titre": "My inner weather",
    "intro": "Take time to name what you feel and welcome your state of the moment.",
    "blocs": [
      {
        "titre": "Name to soothe",
        "texte": "Putting a word on your feeling lights the moment and opens the way to more serenity."
      },
      {
        "titre": "What the weather reveals",
        "puces": [
          "Your inner climate of the day",
          "A listening to your emotions",
          "A step toward balance",
          "A gentle tracking of your days"
        ]
      },
      {
        "titre": "A kind gesture",
        "texte": "Each reading is an attention offered to yourself, without judgment, with tenderness."
      }
    ],
    "citation": "Welcoming your feeling is already caring for yourself.",
    "actionLabel": "Check my weather online",
    "actionUrl": "https://shalify.app/meteo-interieure"
  },
  "ar": {
    "eyebrow": "طقسي الداخلي",
    "titre": "طقسي الداخلي",
    "intro": "خذ وقتًا لتسمية ما تشعر به، ورحّب بحالتك في اللحظة.",
    "blocs": [
      {
        "titre": "التسمية للتهدئة",
        "texte": "وضع كلمة على شعورك يضيء اللحظة ويفتح الطريق لمزيد من الطمأنينة."
      },
      {
        "titre": "ما يكشفه الطقس",
        "puces": [
          "مناخك الداخلي لهذا اليوم",
          "إصغاء لمشاعرك",
          "خطوة نحو التوازن",
          "متابعة لطيفة لأيامك"
        ]
      },
      {
        "titre": "لفتة رحيمة",
        "texte": "كل قراءة عناية تُهديها لنفسك، بلا حكم، بحنان."
      }
    ],
    "citation": "الترحيب بشعورك عنايةٌ بنفسك أصلًا.",
    "actionLabel": "اطّلع على طقسي على الإنترنت",
    "actionUrl": "https://shalify.app/meteo-interieure"
  }
};

export function MeteoInterieureScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

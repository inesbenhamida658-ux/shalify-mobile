import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "DUO 21 JOURS",
    "titre": "Duo 21 jours",
    "intro": "Avancez à deux pendant vingt et un jours et cultivez une belle habitude, ensemble.",
    "blocs": [
      {
        "titre": "Le pouvoir du binôme",
        "texte": "À deux, l’engagement se renforce. Chaque jour, vous vous encouragez et progressez côte à côte."
      },
      {
        "titre": "Comment vit le duo",
        "puces": [
          "Un objectif choisi ensemble",
          "Un rendez-vous quotidien",
          "Des encouragements mutuels",
          "Une réussite partagée à la clé"
        ]
      },
      {
        "titre": "Vingt et un jours pour ancrer",
        "texte": "Le temps idéal pour installer une habitude. À deux, le chemin devient plus léger."
      }
    ],
    "citation": "À deux, chaque pas devient plus facile.",
    "actionLabel": "Lancer un duo en ligne",
    "actionUrl": "https://shalify.app/duo-21-jours"
  },
  "en": {
    "eyebrow": "DUO 21 DAYS",
    "titre": "Duo 21 days",
    "intro": "Move forward as a pair for twenty-one days and cultivate a beautiful habit, together.",
    "blocs": [
      {
        "titre": "The power of the pair",
        "texte": "As two, commitment strengthens. Each day, you encourage each other and progress side by side."
      },
      {
        "titre": "How the duo lives",
        "puces": [
          "A goal chosen together",
          "A daily rendezvous",
          "Mutual encouragements",
          "A shared success at the end"
        ]
      },
      {
        "titre": "Twenty-one days to anchor",
        "texte": "The ideal time to settle a habit. As two, the path becomes lighter."
      }
    ],
    "citation": "As two, every step becomes easier.",
    "actionLabel": "Start a duo online",
    "actionUrl": "https://shalify.app/duo-21-jours"
  },
  "ar": {
    "eyebrow": "ثنائي 21 يومًا",
    "titre": "ثنائي 21 يومًا",
    "intro": "تقدّما معًا لمدة واحد وعشرين يومًا ونمِّيا عادة جميلة، معًا.",
    "blocs": [
      {
        "titre": "قوة الثنائي",
        "texte": "باثنين، يقوى الالتزام. كل يوم، تشجّعان بعضكما وتتقدّمان جنبًا إلى جنب."
      },
      {
        "titre": "كيف يحيا الثنائي",
        "puces": [
          "هدف مختار معًا",
          "موعد يومي",
          "تشجيعات متبادلة",
          "نجاح مشترك في النهاية"
        ]
      },
      {
        "titre": "واحد وعشرون يومًا للترسيخ",
        "texte": "الوقت المثالي لترسيخ عادة. باثنين، يصبح الطريق أخفّ."
      }
    ],
    "citation": "باثنين، تصبح كل خطوة أسهل.",
    "actionLabel": "ابدأ ثنائيًّا على الإنترنت",
    "actionUrl": "https://shalify.app/duo-21-jours"
  }
};

export function Duo21JoursScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

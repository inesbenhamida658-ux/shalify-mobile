import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "VIBRATION DU PRÉNOM",
    "titre": "La vibration de mon prénom",
    "intro": "Explorez la résonance de votre prénom et les qualités qu’il met en lumière.",
    "blocs": [
      {
        "titre": "Un prénom, une couleur",
        "texte": "Chaque prénom porte une vibration, une teinte de personnalité à découvrir avec curiosité."
      },
      {
        "titre": "Ce que vous découvrez",
        "puces": [
          "La tonalité de votre prénom",
          "Des traits qui vous ressemblent",
          "Une inspiration à cultiver",
          "Un regard neuf sur vous"
        ]
      },
      {
        "titre": "Un jeu d’introspection",
        "texte": "À prendre avec légèreté : un miroir symbolique, pour mieux vous célébrer."
      }
    ],
    "citation": "Votre prénom porte déjà une part de votre lumière.",
    "actionLabel": "Explorer en ligne",
    "actionUrl": "https://shalify.app/vibration-prenom"
  },
  "en": {
    "eyebrow": "NAME VIBRATION",
    "titre": "The vibration of my name",
    "intro": "Explore the resonance of your first name and the qualities it highlights.",
    "blocs": [
      {
        "titre": "A name, a color",
        "texte": "Each name carries a vibration, a shade of personality to discover with curiosity."
      },
      {
        "titre": "What you discover",
        "puces": [
          "The tone of your name",
          "Traits that resemble you",
          "An inspiration to cultivate",
          "A fresh look at yourself"
        ]
      },
      {
        "titre": "A play of introspection",
        "texte": "Take it lightly: a symbolic mirror, to celebrate yourself better."
      }
    ],
    "citation": "Your name already carries a part of your light.",
    "actionLabel": "Explore online",
    "actionUrl": "https://shalify.app/vibration-prenom"
  },
  "ar": {
    "eyebrow": "اهتزاز الاسم",
    "titre": "اهتزاز اسمي",
    "intro": "استكشف رنين اسمك والصفات التي يُبرزها.",
    "blocs": [
      {
        "titre": "اسم، ولون",
        "texte": "يحمل كل اسم اهتزازًا، ظلًّا من الشخصية يُكتشَف بفضول."
      },
      {
        "titre": "ما تكتشفه",
        "puces": [
          "نبرة اسمك",
          "سمات تشبهك",
          "إلهام يُزرع",
          "نظرة جديدة إلى نفسك"
        ]
      },
      {
        "titre": "لعبة تأمّل ذاتي",
        "texte": "خُذها بخفّة: مرآة رمزية، لتحتفي بنفسك أكثر."
      }
    ],
    "citation": "اسمك يحمل أصلًا جزءًا من نورك.",
    "actionLabel": "استكشف على الإنترنت",
    "actionUrl": "https://shalify.app/vibration-prenom"
  }
};

export function VibrationPrenomScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "ANNÉE 2026",
    "titre": "Mon année 2026",
    "intro": "Posez une intention claire pour l’année et laissez chaque saison porter votre élan.",
    "blocs": [
      {
        "titre": "Une boussole pour l’année",
        "texte": "Une direction douce, un mot phare, quelques promesses tenues envers vous-même : votre année prend forme."
      },
      {
        "titre": "Ce que vous cultivez",
        "puces": [
          "Un thème central inspirant",
          "Des intentions par saison",
          "Des repères pour avancer",
          "Des victoires à célébrer"
        ]
      },
      {
        "titre": "Avancer en conscience",
        "texte": "Revenez à votre cap quand vous le souhaitez. Chaque pas compte, chaque saison vous rapproche."
      }
    ],
    "citation": "Une intention claire éclaire toute une année.",
    "actionLabel": "Ouvrir mon année en ligne",
    "actionUrl": "https://shalify.app/annee-2026"
  },
  "en": {
    "eyebrow": "YEAR 2026",
    "titre": "My year 2026",
    "intro": "Set a clear intention for the year and let each season carry your momentum.",
    "blocs": [
      {
        "titre": "A compass for the year",
        "texte": "A gentle direction, a guiding word, a few promises kept to yourself: your year takes shape."
      },
      {
        "titre": "What you cultivate",
        "puces": [
          "An inspiring central theme",
          "Intentions by season",
          "Markers to move forward",
          "Wins to celebrate"
        ]
      },
      {
        "titre": "Move mindfully",
        "texte": "Return to your course whenever you wish. Each step counts, each season brings you closer."
      }
    ],
    "citation": "A clear intention lights a whole year.",
    "actionLabel": "Open my year online",
    "actionUrl": "https://shalify.app/annee-2026"
  },
  "ar": {
    "eyebrow": "عام 2026",
    "titre": "عامي 2026",
    "intro": "ضع نيّة واضحة للعام ودع كل فصل يحمل اندفاعك.",
    "blocs": [
      {
        "titre": "بوصلة للعام",
        "texte": "وجهة لطيفة، كلمة مُرشِدة، وعود قليلة تحفظها لنفسك: يتشكّل عامك."
      },
      {
        "titre": "ما تزرعه",
        "puces": [
          "موضوع مركزي مُلهم",
          "نيّات بحسب الفصل",
          "إشارات للتقدّم",
          "انتصارات تُحتفى بها"
        ]
      },
      {
        "titre": "التقدّم بوعي",
        "texte": "عُد إلى وجهتك متى شئت. كل خطوة تُحسب، وكل فصل يقرّبك."
      }
    ],
    "citation": "النيّة الواضحة تضيء عامًا كاملًا.",
    "actionLabel": "افتح عامي على الإنترنت",
    "actionUrl": "https://shalify.app/annee-2026"
  }
};

export function Annee2026Screen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

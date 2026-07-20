import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "BRISE-GLACE",
    "titre": "Brise-glace",
    "intro": "Des questions douces pour engager la conversation avec chaleur et faire tomber la timidité.",
    "blocs": [
      {
        "titre": "Ouvrir le dialogue",
        "texte": "Une bonne question rapproche. Le brise-glace vous propose des amorces sincères pour créer le lien."
      },
      {
        "titre": "Ce qu’il vous offre",
        "puces": [
          "Des questions inspirantes",
          "Un ton léger et bienveillant",
          "De quoi lancer un échange vrai",
          "Une complicité qui naît vite"
        ]
      },
      {
        "titre": "Se découvrir en douceur",
        "texte": "Chaque question ouvre une porte. Laissez la conversation grandir naturellement."
      }
    ],
    "citation": "Une belle question ouvre le cœur des rencontres.",
    "actionLabel": "Découvrir en ligne",
    "actionUrl": "https://shalify.app/brise-glace"
  },
  "en": {
    "eyebrow": "ICEBREAKER",
    "titre": "Icebreaker",
    "intro": "Gentle questions to start the conversation warmly and melt away shyness.",
    "blocs": [
      {
        "titre": "Open the dialogue",
        "texte": "A good question draws close. The icebreaker offers sincere openers to create the link."
      },
      {
        "titre": "What it offers you",
        "puces": [
          "Inspiring questions",
          "A light and caring tone",
          "What it takes to start a true exchange",
          "A closeness that arises quickly"
        ]
      },
      {
        "titre": "Discover each other gently",
        "texte": "Each question opens a door. Let the conversation grow naturally."
      }
    ],
    "citation": "A beautiful question opens the heart of encounters.",
    "actionLabel": "Discover online",
    "actionUrl": "https://shalify.app/brise-glace"
  },
  "ar": {
    "eyebrow": "كاسر الجليد",
    "titre": "كاسر الجليد",
    "intro": "أسئلة لطيفة لبدء الحديث بدفء وإذابة الخجل.",
    "blocs": [
      {
        "titre": "افتح الحوار",
        "texte": "السؤال الجيّد يقرّب. يقترح عليك كاسر الجليد بدايات صادقة لصنع الرابط."
      },
      {
        "titre": "ما يقدّمه لك",
        "puces": [
          "أسئلة مُلهمة",
          "نبرة خفيفة ورحيمة",
          "ما يلزم لبدء تبادل حقيقي",
          "ألفة تنشأ بسرعة"
        ]
      },
      {
        "titre": "تعارف بلطف",
        "texte": "كل سؤال يفتح بابًا. دع الحديث ينمو بشكل طبيعي."
      }
    ],
    "citation": "السؤال الجميل يفتح قلب اللقاءات.",
    "actionLabel": "اكتشف على الإنترنت",
    "actionUrl": "https://shalify.app/brise-glace"
  }
};

export function BriseGlaceScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

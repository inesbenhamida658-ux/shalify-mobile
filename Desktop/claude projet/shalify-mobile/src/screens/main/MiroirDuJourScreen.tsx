import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "MIROIR DU JOUR",
    "titre": "Le miroir du jour",
    "intro": "Un instant pour vous regarder avec bienveillance et reconnaître votre valeur du moment.",
    "blocs": [
      {
        "titre": "Se voir avec douceur",
        "texte": "Le miroir vous renvoie une parole encourageante, choisie pour éclairer votre journée."
      },
      {
        "titre": "Ce qu’il vous offre",
        "puces": [
          "Un mot juste pour aujourd’hui",
          "Un regard bienveillant sur vous",
          "Un ancrage dans le présent",
          "Une confiance ravivée"
        ]
      },
      {
        "titre": "Un rendez-vous quotidien",
        "texte": "Chaque jour, revenez au miroir pour reconnecter à votre lumière intérieure."
      }
    ],
    "citation": "Se regarder avec tendresse change toute la journée.",
    "actionLabel": "Ouvrir le miroir en ligne",
    "actionUrl": "https://shalify.app/miroir-du-jour"
  },
  "en": {
    "eyebrow": "MIRROR OF THE DAY",
    "titre": "The mirror of the day",
    "intro": "A moment to look at yourself with kindness and recognize your value of the moment.",
    "blocs": [
      {
        "titre": "See yourself gently",
        "texte": "The mirror reflects an encouraging word, chosen to light your day."
      },
      {
        "titre": "What it offers you",
        "puces": [
          "A fitting word for today",
          "A kind gaze upon yourself",
          "An anchor in the present",
          "A revived confidence"
        ]
      },
      {
        "titre": "A daily rendezvous",
        "texte": "Each day, return to the mirror to reconnect to your inner light."
      }
    ],
    "citation": "Looking at yourself with tenderness changes the whole day.",
    "actionLabel": "Open the mirror online",
    "actionUrl": "https://shalify.app/miroir-du-jour"
  },
  "ar": {
    "eyebrow": "مرآة اليوم",
    "titre": "مرآة اليوم",
    "intro": "لحظة لتنظر إلى نفسك برحمة وتُقرّ بقيمتك في اللحظة.",
    "blocs": [
      {
        "titre": "انظر إلى نفسك بلطف",
        "texte": "تعكس المرآة كلمة مشجّعة، مختارة لتضيء يومك."
      },
      {
        "titre": "ما تقدّمه لك",
        "puces": [
          "كلمة صائبة لهذا اليوم",
          "نظرة رحيمة إلى نفسك",
          "تجذّر في الحاضر",
          "ثقة مُحياة"
        ]
      },
      {
        "titre": "موعد يومي",
        "texte": "كل يوم، عُد إلى المرآة لإعادة الوصل بنورك الداخلي."
      }
    ],
    "citation": "النظر إلى نفسك بحنان يغيّر اليوم كله.",
    "actionLabel": "افتح المرآة على الإنترنت",
    "actionUrl": "https://shalify.app/miroir-du-jour"
  }
};

export function MiroirDuJourScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

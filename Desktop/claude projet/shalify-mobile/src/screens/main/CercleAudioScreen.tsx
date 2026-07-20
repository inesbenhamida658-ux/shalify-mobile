import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "CERCLE AUDIO",
    "titre": "Cercle audio",
    "intro": "Un cercle de parole en voix, réuni autour d’un thème, pour échanger et se soutenir.",
    "blocs": [
      {
        "titre": "La force du cercle",
        "texte": "Réunis par la voix, les participants partagent, écoutent et repartent portés par le collectif."
      },
      {
        "titre": "Comment il vit",
        "puces": [
          "Un thème choisi avec soin",
          "Un temps d’écoute pour chacun",
          "Une parole libre et respectée",
          "Un moment qui relie durablement"
        ]
      },
      {
        "titre": "Votre voix compte",
        "texte": "Chaque intervention nourrit le cercle. Ici, on avance à plusieurs, avec bienveillance."
      }
    ],
    "citation": "La parole partagée éclaire le chemin de chacun.",
    "actionLabel": "Rejoindre le cercle en ligne",
    "actionUrl": "https://shalify.app/cercle-audio"
  },
  "en": {
    "eyebrow": "AUDIO CIRCLE",
    "titre": "Audio circle",
    "intro": "A spoken circle, gathered around a theme, to exchange and support one another.",
    "blocs": [
      {
        "titre": "The strength of the circle",
        "texte": "Gathered by voice, participants share, listen and leave carried by the collective."
      },
      {
        "titre": "How it lives",
        "puces": [
          "A theme chosen with care",
          "A listening time for each one",
          "A free and respected voice",
          "A moment that binds lastingly"
        ]
      },
      {
        "titre": "Your voice counts",
        "texte": "Each contribution feeds the circle. Here, we move forward together, with kindness."
      }
    ],
    "citation": "Shared speech lights each one’s path.",
    "actionLabel": "Join the circle online",
    "actionUrl": "https://shalify.app/cercle-audio"
  },
  "ar": {
    "eyebrow": "دائرة صوتية",
    "titre": "دائرة صوتية",
    "intro": "دائرة كلام بالصوت، تجتمع حول موضوع، للتبادل والتساند.",
    "blocs": [
      {
        "titre": "قوة الدائرة",
        "texte": "مجتمعون بالصوت، يشارك المشاركون ويستمعون ويغادرون محمولين بالجماعة."
      },
      {
        "titre": "كيف تحيا",
        "puces": [
          "موضوع مختار بعناية",
          "وقت إصغاء لكل واحد",
          "كلام حرّ ومحترَم",
          "لحظة تربط بشكل دائم"
        ]
      },
      {
        "titre": "صوتك يُحسب",
        "texte": "كل مداخلة تغذّي الدائرة. هنا، نتقدّم معًا، برحمة."
      }
    ],
    "citation": "الكلام المشترك يضيء طريق كل واحد.",
    "actionLabel": "انضمّ إلى الدائرة على الإنترنت",
    "actionUrl": "https://shalify.app/cercle-audio"
  }
};

export function CercleAudioScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

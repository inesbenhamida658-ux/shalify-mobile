import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "MUR D’INTENTIONS",
    "titre": "Le mur d’intentions",
    "intro": "Déposez une intention et voyez celles de la communauté former une mosaïque lumineuse.",
    "blocs": [
      {
        "titre": "Une intention partagée",
        "texte": "Chaque membre pose un souhait, une promesse, un élan. Réunies, ces intentions dessinent une belle énergie."
      },
      {
        "titre": "Ce que le mur porte",
        "puces": [
          "Vos intentions bien vivantes",
          "L’élan des autres membres",
          "Une inspiration collective",
          "Un rappel de ce qui compte"
        ]
      },
      {
        "titre": "Semer et se relier",
        "texte": "Poser son intention sur le mur, c’est la rendre plus réelle et la relier à celles des autres."
      }
    ],
    "citation": "Une intention posée devient une graine qui pousse.",
    "actionLabel": "Déposer mon intention en ligne",
    "actionUrl": "https://shalify.app/mur-intentions"
  },
  "en": {
    "eyebrow": "INTENTION WALL",
    "titre": "The intention wall",
    "intro": "Place an intention and watch the community’s form a luminous mosaic.",
    "blocs": [
      {
        "titre": "A shared intention",
        "texte": "Each member places a wish, a promise, a momentum. Gathered, these intentions draw a beautiful energy."
      },
      {
        "titre": "What the wall carries",
        "puces": [
          "Your intentions fully alive",
          "The momentum of other members",
          "A collective inspiration",
          "A reminder of what counts"
        ]
      },
      {
        "titre": "Sow and connect",
        "texte": "Placing your intention on the wall makes it more real and links it to others’."
      }
    ],
    "citation": "An intention placed becomes a seed that grows.",
    "actionLabel": "Place my intention online",
    "actionUrl": "https://shalify.app/mur-intentions"
  },
  "ar": {
    "eyebrow": "جدار النيّات",
    "titre": "جدار النيّات",
    "intro": "ضع نيّة وشاهد نيّات المجتمع تشكّل فسيفساء مضيئة.",
    "blocs": [
      {
        "titre": "نيّة مشتركة",
        "texte": "يضع كل عضو أمنية، وعدًا، اندفاعًا. مجتمعة، ترسم هذه النيّات طاقة جميلة."
      },
      {
        "titre": "ما يحمله الجدار",
        "puces": [
          "نيّاتك حيّة تمامًا",
          "اندفاع الأعضاء الآخرين",
          "إلهام جماعي",
          "تذكير بما يهمّ"
        ]
      },
      {
        "titre": "ازرع وتواصل",
        "texte": "وضع نيّتك على الجدار يجعلها أكثر واقعية ويربطها بنيّات الآخرين."
      }
    ],
    "citation": "النيّة الموضوعة تصبح بذرة تنمو.",
    "actionLabel": "ضع نيّتي على الإنترنت",
    "actionUrl": "https://shalify.app/mur-intentions"
  }
};

export function MurIntentionsScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

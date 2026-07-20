import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "NUMÉROLOGIE",
    "titre": "Numérologie",
    "intro": "Découvrez le chemin que révèle votre date de naissance et laissez-vous inspirer.",
    "blocs": [
      {
        "titre": "Un éclairage symbolique",
        "texte": "À partir de votre date, un chemin de vie se dessine, porteur de qualités à cultiver."
      },
      {
        "titre": "Ce que vous explorez",
        "puces": [
          "Votre nombre chemin de vie",
          "Vos forces naturelles",
          "Des pistes de développement",
          "Une inspiration pour avancer"
        ]
      },
      {
        "titre": "À prendre comme un miroir",
        "texte": "La numérologie ouvre une réflexion douce sur vous-même, à savourer librement."
      }
    ],
    "citation": "Chaque parcours porte une lumière singulière.",
    "actionLabel": "Calculer en ligne",
    "actionUrl": "https://shalify.app/numerologie"
  },
  "en": {
    "eyebrow": "NUMEROLOGY",
    "titre": "Numerology",
    "intro": "Discover the path your birth date reveals and let yourself be inspired.",
    "blocs": [
      {
        "titre": "A symbolic light",
        "texte": "From your date, a life path takes shape, carrying qualities to cultivate."
      },
      {
        "titre": "What you explore",
        "puces": [
          "Your life path number",
          "Your natural strengths",
          "Avenues for growth",
          "An inspiration to move forward"
        ]
      },
      {
        "titre": "Take it as a mirror",
        "texte": "Numerology opens a gentle reflection on yourself, to savor freely."
      }
    ],
    "citation": "Every journey carries a singular light.",
    "actionLabel": "Calculate online",
    "actionUrl": "https://shalify.app/numerologie"
  },
  "ar": {
    "eyebrow": "علم الأعداد",
    "titre": "علم الأعداد",
    "intro": "اكتشف الطريق الذي يكشفه تاريخ ميلادك ودع الإلهام يأتيك.",
    "blocs": [
      {
        "titre": "إضاءة رمزية",
        "texte": "انطلاقًا من تاريخك، يتشكّل مسار حياة يحمل صفات تُزرع."
      },
      {
        "titre": "ما تستكشفه",
        "puces": [
          "رقم مسار حياتك",
          "قواك الطبيعية",
          "مسارات للتطوّر",
          "إلهام للتقدّم"
        ]
      },
      {
        "titre": "خُذها كمرآة",
        "texte": "يفتح علم الأعداد تأمّلًا لطيفًا في نفسك، يُتذوَّق بحرية."
      }
    ],
    "citation": "كل مسار يحمل نورًا فريدًا.",
    "actionLabel": "احسب على الإنترنت",
    "actionUrl": "https://shalify.app/numerologie"
  }
};

export function NumerologieScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

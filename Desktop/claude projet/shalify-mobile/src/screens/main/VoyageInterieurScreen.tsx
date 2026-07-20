import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "VOYAGE INTÉRIEUR",
    "titre": "Voyage intérieur",
    "intro": "Offrez-vous une parenthèse guidée vers plus de calme, de clarté et de présence.",
    "blocs": [
      {
        "titre": "Une traversée apaisante",
        "texte": "Guidé pas à pas, vous descendez vers un espace intérieur paisible où le mental se pose."
      },
      {
        "titre": "Ce que le voyage apporte",
        "puces": [
          "Un relâchement profond",
          "Un retour au présent",
          "Une clarté retrouvée",
          "Une énergie renouvelée"
        ]
      },
      {
        "titre": "À votre rythme",
        "texte": "Prenez ce temps quand vous le souhaitez. Chaque voyage vous rapproche de vous-même."
      }
    ],
    "citation": "Le plus beau voyage mène vers l’intérieur de soi.",
    "actionLabel": "Commencer le voyage en ligne",
    "actionUrl": "https://shalify.app/voyage-interieur"
  },
  "en": {
    "eyebrow": "INNER JOURNEY",
    "titre": "Inner journey",
    "intro": "Offer yourself a guided pause toward more calm, clarity and presence.",
    "blocs": [
      {
        "titre": "A soothing crossing",
        "texte": "Guided step by step, you descend toward a peaceful inner space where the mind settles."
      },
      {
        "titre": "What the journey brings",
        "puces": [
          "A deep release",
          "A return to the present",
          "A recovered clarity",
          "A renewed energy"
        ]
      },
      {
        "titre": "At your pace",
        "texte": "Take this time whenever you wish. Each journey brings you closer to yourself."
      }
    ],
    "citation": "The most beautiful journey leads within.",
    "actionLabel": "Start the journey online",
    "actionUrl": "https://shalify.app/voyage-interieur"
  },
  "ar": {
    "eyebrow": "رحلة داخلية",
    "titre": "رحلة داخلية",
    "intro": "امنح نفسك استراحة موجَّهة نحو مزيد من الهدوء والصفاء والحضور.",
    "blocs": [
      {
        "titre": "عبور مُهدّئ",
        "texte": "موجَّهًا خطوة بخطوة، تنزل نحو فضاء داخلي هادئ يستقرّ فيه العقل."
      },
      {
        "titre": "ما تجلبه الرحلة",
        "puces": [
          "استرخاء عميق",
          "عودة إلى الحاضر",
          "صفاء مُستعاد",
          "طاقة متجدّدة"
        ]
      },
      {
        "titre": "على إيقاعك",
        "texte": "خُذ هذا الوقت متى شئت. كل رحلة تقرّبك من نفسك."
      }
    ],
    "citation": "أجمل رحلة تقود إلى الداخل.",
    "actionLabel": "ابدأ الرحلة على الإنترنت",
    "actionUrl": "https://shalify.app/voyage-interieur"
  }
};

export function VoyageInterieurScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

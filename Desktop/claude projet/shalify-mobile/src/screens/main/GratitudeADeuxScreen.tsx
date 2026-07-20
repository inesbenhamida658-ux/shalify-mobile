import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "GRATITUDE À DEUX",
    "titre": "Gratitude à deux",
    "intro": "Partagez chaque jour une gratitude avec une personne chère et renforcez votre lien.",
    "blocs": [
      {
        "titre": "Un rituel qui rapproche",
        "texte": "Se dire merci nourrit la relation. Chaque jour, échangez une gratitude et cultivez la tendresse."
      },
      {
        "titre": "Ce que le rituel offre",
        "puces": [
          "Un moment de partage sincère",
          "Un regard positif sur vos jours",
          "Un lien qui se renforce",
          "Une joie douce, cultivée à deux"
        ]
      },
      {
        "titre": "La gratitude, un cadeau",
        "texte": "Offrir sa reconnaissance, c’est offrir de la présence. À deux, elle rayonne davantage."
      }
    ],
    "citation": "La gratitude partagée double la lumière.",
    "actionLabel": "Commencer à deux en ligne",
    "actionUrl": "https://shalify.app/gratitude-a-deux"
  },
  "en": {
    "eyebrow": "GRATITUDE FOR TWO",
    "titre": "Gratitude for two",
    "intro": "Share a gratitude each day with someone dear and strengthen your bond.",
    "blocs": [
      {
        "titre": "A ritual that draws close",
        "texte": "Saying thank you nourishes the relationship. Each day, exchange a gratitude and cultivate tenderness."
      },
      {
        "titre": "What the ritual offers",
        "puces": [
          "A moment of sincere sharing",
          "A positive look at your days",
          "A bond that strengthens",
          "A gentle joy, cultivated for two"
        ]
      },
      {
        "titre": "Gratitude, a gift",
        "texte": "To offer your appreciation is to offer presence. For two, it radiates more."
      }
    ],
    "citation": "Shared gratitude doubles the light.",
    "actionLabel": "Start for two online",
    "actionUrl": "https://shalify.app/gratitude-a-deux"
  },
  "ar": {
    "eyebrow": "امتنان لاثنين",
    "titre": "امتنان لاثنين",
    "intro": "شارك كل يوم امتنانًا مع شخص عزيز وقوِّ رابطكما.",
    "blocs": [
      {
        "titre": "طقس يقرّب",
        "texte": "قول شكرًا يغذّي العلاقة. كل يوم، تبادلا امتنانًا ونمِّيا الحنان."
      },
      {
        "titre": "ما يقدّمه الطقس",
        "puces": [
          "لحظة مشاركة صادقة",
          "نظرة إيجابية إلى أيامكما",
          "رابط يقوى",
          "فرح لطيف، يُزرع لاثنين"
        ]
      },
      {
        "titre": "الامتنان، هديّة",
        "texte": "تقديم تقديرك تقديمٌ للحضور. لاثنين، يشعّ أكثر."
      }
    ],
    "citation": "الامتنان المشترك يُضاعف النور.",
    "actionLabel": "ابدآ لاثنين على الإنترنت",
    "actionUrl": "https://shalify.app/gratitude-a-deux"
  }
};

export function GratitudeADeuxScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

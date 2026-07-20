import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "MICRO-LIVE",
    "titre": "Micro-live",
    "intro": "Un direct court et vibrant, quelques minutes pour partager une idée forte et créer le lien.",
    "blocs": [
      {
        "titre": "Bref et intense",
        "texte": "Le micro-live va à l’essentiel : une inspiration, un savoir-faire, une présence, offerts en direct."
      },
      {
        "titre": "Ce qui le rend précieux",
        "puces": [
          "Un format léger, facile à suivre",
          "Une proximité immédiate",
          "Des échanges en temps réel",
          "Un moment qui reste"
        ]
      },
      {
        "titre": "Osez le direct",
        "texte": "Quelques minutes suffisent pour toucher la communauté et faire rayonner votre valeur."
      }
    ],
    "citation": "Un instant de vérité crée le lien le plus fort.",
    "actionLabel": "Voir les micro-lives en ligne",
    "actionUrl": "https://shalify.app/micro-live"
  },
  "en": {
    "eyebrow": "MICRO-LIVE",
    "titre": "Micro-live",
    "intro": "A short, vibrant live, a few minutes to share a strong idea and create the link.",
    "blocs": [
      {
        "titre": "Brief and intense",
        "texte": "The micro-live gets to the point: an inspiration, a skill, a presence, offered live."
      },
      {
        "titre": "What makes it precious",
        "puces": [
          "A light format, easy to follow",
          "Immediate closeness",
          "Real-time exchanges",
          "A moment that stays"
        ]
      },
      {
        "titre": "Dare to go live",
        "texte": "A few minutes are enough to touch the community and let your value shine."
      }
    ],
    "citation": "A moment of truth creates the strongest link.",
    "actionLabel": "See micro-lives online",
    "actionUrl": "https://shalify.app/micro-live"
  },
  "ar": {
    "eyebrow": "بثّ قصير",
    "titre": "بثّ قصير",
    "intro": "بثّ مباشر قصير ونابض، دقائق لمشاركة فكرة قوية وصنع الرابط.",
    "blocs": [
      {
        "titre": "قصير وكثيف",
        "texte": "يذهب البثّ القصير إلى الجوهر: إلهام، مهارة، حضور، تُقدَّم مباشرة."
      },
      {
        "titre": "ما يجعله ثمينًا",
        "puces": [
          "صيغة خفيفة سهلة المتابعة",
          "قرب فوري",
          "تبادلات في الوقت الحقيقي",
          "لحظة تبقى"
        ]
      },
      {
        "titre": "تجرّأ على المباشر",
        "texte": "دقائق تكفي للمس المجتمع وإشعاع قيمتك."
      }
    ],
    "citation": "لحظة صدق تصنع أقوى رابط.",
    "actionLabel": "شاهد البثوث القصيرة على الإنترنت",
    "actionUrl": "https://shalify.app/micro-live"
  }
};

export function MicroLiveScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

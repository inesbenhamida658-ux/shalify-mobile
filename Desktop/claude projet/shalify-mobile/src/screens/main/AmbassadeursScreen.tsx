import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "AMBASSADEURS",
    "titre": "Programme ambassadeurs",
    "intro": "Portez la lumière de Shalify autour de vous et grandissez avec une communauté que vous inspirez.",
    "blocs": [
      {
        "titre": "Un rôle qui rayonne",
        "texte": "L’ambassadeur fait connaître Shalify avec cœur, accueille les nouveaux membres et incarne ses valeurs."
      },
      {
        "titre": "Ce que vous recevez",
        "puces": [
          "Une reconnaissance visible",
          "Des avantages dédiés",
          "Un accompagnement privilégié",
          "Une place au cœur du projet"
        ]
      },
      {
        "titre": "Grandir en partageant",
        "texte": "Plus vous relayez la lumière, plus votre présence et votre valeur s’amplifient."
      }
    ],
    "citation": "Partager sa conviction, c’est déjà semer l’abondance.",
    "actionLabel": "Devenir ambassadeur en ligne",
    "actionUrl": "https://shalify.app/ambassadeurs"
  },
  "en": {
    "eyebrow": "AMBASSADORS",
    "titre": "Ambassador program",
    "intro": "Carry the light of Shalify around you and grow with a community you inspire.",
    "blocs": [
      {
        "titre": "A radiant role",
        "texte": "The ambassador shares Shalify with heart, welcomes new members and embodies its values."
      },
      {
        "titre": "What you receive",
        "puces": [
          "Visible recognition",
          "Dedicated benefits",
          "Privileged support",
          "A place at the heart of the project"
        ]
      },
      {
        "titre": "Grow by sharing",
        "texte": "The more you relay the light, the more your presence and value amplify."
      }
    ],
    "citation": "Sharing your conviction already sows abundance.",
    "actionLabel": "Become an ambassador online",
    "actionUrl": "https://shalify.app/ambassadeurs"
  },
  "ar": {
    "eyebrow": "السفراء",
    "titre": "برنامج السفراء",
    "intro": "احمل نور شاليفي من حولك وانمُ مع مجتمع تُلهمه.",
    "blocs": [
      {
        "titre": "دور يشعّ",
        "texte": "يعرّف السفير بشاليفي بقلبه، يرحّب بالأعضاء الجدد ويجسّد قيمها."
      },
      {
        "titre": "ما تتلقّاه",
        "puces": [
          "تقدير ظاهر",
          "مزايا مخصّصة",
          "مرافقة مميّزة",
          "مكان في قلب المشروع"
        ]
      },
      {
        "titre": "انمُ بالمشاركة",
        "texte": "كلما نقلت النور أكثر، تضخّم حضورك وقيمتك."
      }
    ],
    "citation": "مشاركة قناعتك زرعٌ للوفرة أصلًا.",
    "actionLabel": "كن سفيرًا على الإنترنت",
    "actionUrl": "https://shalify.app/ambassadeurs"
  }
};

export function AmbassadeursScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

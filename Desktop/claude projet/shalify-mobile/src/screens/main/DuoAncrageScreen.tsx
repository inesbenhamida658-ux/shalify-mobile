import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "DUO ANCRAGE",
    "titre": "Duo ancrage",
    "intro": "Un binôme d’ancrage pour vous soutenir et rester fidèle à vos intentions, jour après jour.",
    "blocs": [
      {
        "titre": "Un allié de constance",
        "texte": "Votre binôme veille avec vous sur vos engagements et vous rappelle en douceur votre cap."
      },
      {
        "titre": "Ce que le duo apporte",
        "puces": [
          "Un soutien régulier",
          "Une présence rassurante",
          "Une motivation renouvelée",
          "Un ancrage partagé"
        ]
      },
      {
        "titre": "Tenir bon, ensemble",
        "texte": "Quand l’élan faiblit, le binôme relance. À deux, la constance devient naturelle."
      }
    ],
    "citation": "Un binôme fidèle rend la constance légère.",
    "actionLabel": "Trouver mon binôme en ligne",
    "actionUrl": "https://shalify.app/duo-ancrage"
  },
  "en": {
    "eyebrow": "ANCHOR DUO",
    "titre": "Anchor duo",
    "intro": "An anchoring pair to support you and stay true to your intentions, day after day.",
    "blocs": [
      {
        "titre": "An ally of constancy",
        "texte": "Your pair watches over your commitments with you and gently reminds you of your course."
      },
      {
        "titre": "What the duo brings",
        "puces": [
          "A regular support",
          "A reassuring presence",
          "A renewed motivation",
          "A shared anchor"
        ]
      },
      {
        "titre": "Hold on, together",
        "texte": "When the momentum weakens, the pair revives it. As two, constancy becomes natural."
      }
    ],
    "citation": "A faithful pair makes constancy light.",
    "actionLabel": "Find my pair online",
    "actionUrl": "https://shalify.app/duo-ancrage"
  },
  "ar": {
    "eyebrow": "ثنائي التجذّر",
    "titre": "ثنائي التجذّر",
    "intro": "ثنائي تجذّر يسندك ويُبقيك وفيًّا لنيّاتك، يومًا بعد يوم.",
    "blocs": [
      {
        "titre": "حليف الثبات",
        "texte": "يسهر ثنائيك معك على التزاماتك ويذكّرك بلطف بوجهتك."
      },
      {
        "titre": "ما يجلبه الثنائي",
        "puces": [
          "سند منتظم",
          "حضور مطمئن",
          "دافع متجدّد",
          "تجذّر مشترك"
        ]
      },
      {
        "titre": "اثبت، معًا",
        "texte": "حين يضعف الاندفاع، يُنعشه الثنائي. باثنين، يصبح الثبات طبيعيًّا."
      }
    ],
    "citation": "الثنائي الوفيّ يجعل الثبات خفيفًا.",
    "actionLabel": "اعثر على ثنائيي على الإنترنت",
    "actionUrl": "https://shalify.app/duo-ancrage"
  }
};

export function DuoAncrageScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

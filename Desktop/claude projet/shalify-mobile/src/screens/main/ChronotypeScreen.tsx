import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "CHRONOTYPE",
    "titre": "Mon chronotype",
    "intro": "Découvrez votre rythme naturel et organisez vos journées en harmonie avec votre énergie.",
    "blocs": [
      {
        "titre": "Votre horloge intérieure",
        "texte": "Certains rayonnent le matin, d’autres le soir. Connaître votre chronotype aligne vos efforts sur vos meilleurs moments."
      },
      {
        "titre": "Ce que vous en tirez",
        "puces": [
          "Vos heures de pleine énergie",
          "Les moments propices au repos",
          "Un rythme respecté et fluide",
          "Une créativité mieux placée"
        ]
      },
      {
        "titre": "Vivre en accord",
        "texte": "Organisez vos rituels et vos offres autour de votre énergie naturelle, pour avancer sereinement."
      }
    ],
    "citation": "Respecter son rythme, c’est déployer sa pleine énergie.",
    "actionLabel": "Trouver mon chronotype en ligne",
    "actionUrl": "https://shalify.app/chronotype"
  },
  "en": {
    "eyebrow": "CHRONOTYPE",
    "titre": "My chronotype",
    "intro": "Discover your natural rhythm and organize your days in harmony with your energy.",
    "blocs": [
      {
        "titre": "Your inner clock",
        "texte": "Some shine in the morning, others in the evening. Knowing your chronotype aligns your efforts with your best moments."
      },
      {
        "titre": "What you gain",
        "puces": [
          "Your hours of full energy",
          "The moments ripe for rest",
          "A respected, fluid rhythm",
          "A better placed creativity"
        ]
      },
      {
        "titre": "Live in tune",
        "texte": "Organize your rituals and offers around your natural energy, to move forward serenely."
      }
    ],
    "citation": "Respecting your rhythm unfolds your full energy.",
    "actionLabel": "Find my chronotype online",
    "actionUrl": "https://shalify.app/chronotype"
  },
  "ar": {
    "eyebrow": "النمط الزمني",
    "titre": "نمطي الزمني",
    "intro": "اكتشف إيقاعك الطبيعي ونظّم أيامك بانسجام مع طاقتك.",
    "blocs": [
      {
        "titre": "ساعتك الداخلية",
        "texte": "بعضهم يشعّ صباحًا، وآخرون مساءً. معرفة نمطك تُحاذي جهودك مع أفضل لحظاتك."
      },
      {
        "titre": "ما تكسبه",
        "puces": [
          "ساعات طاقتك الكاملة",
          "اللحظات المناسبة للراحة",
          "إيقاع محترَم وسلس",
          "إبداع في موضعه الأفضل"
        ]
      },
      {
        "titre": "العيش بانسجام",
        "texte": "نظّم طقوسك وعروضك حول طاقتك الطبيعية، لتتقدّم بهدوء."
      }
    ],
    "citation": "احترام إيقاعك يُطلق طاقتك الكاملة.",
    "actionLabel": "اعرف نمطي على الإنترنت",
    "actionUrl": "https://shalify.app/chronotype"
  }
};

export function ChronotypeScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

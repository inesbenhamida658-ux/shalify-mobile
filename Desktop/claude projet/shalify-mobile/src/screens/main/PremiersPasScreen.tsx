import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "PREMIERS PAS",
    "titre": "Mes premiers pas",
    "intro": "Un guide doux pour débuter sur Shalify sereinement et poser des bases solides.",
    "blocs": [
      {
        "titre": "Bien commencer",
        "puces": [
          "Complétez votre profil avec soin",
          "Ajoutez une photo claire et accueillante",
          "Racontez votre valeur en quelques mots",
          "Choisissez vos premières offres"
        ]
      },
      {
        "titre": "Prendre confiance",
        "puces": [
          "Explorez le lieu à votre rythme",
          "Inspirez-vous des autres créateurs",
          "Fixez vos prix avec les repères proposés",
          "Ouvrez votre agenda de réservations"
        ]
      },
      {
        "titre": "Avancer sereinement",
        "texte": "Chaque petit pas construit votre présence. Vous restez toujours accompagné : Shalify avance avec vous."
      }
    ],
    "citation": "Le premier pas contient déjà toute la route.",
    "actionLabel": "Suivre le guide en ligne",
    "actionUrl": "https://shalify.app/premiers-pas"
  },
  "en": {
    "eyebrow": "FIRST STEPS",
    "titre": "My first steps",
    "intro": "A gentle guide to begin on Shalify serenely and lay solid foundations.",
    "blocs": [
      {
        "titre": "Start well",
        "puces": [
          "Complete your profile with care",
          "Add a clear and welcoming photo",
          "Tell your value in a few words",
          "Choose your first offers"
        ]
      },
      {
        "titre": "Gain confidence",
        "puces": [
          "Explore the place at your pace",
          "Draw inspiration from other creators",
          "Set your prices with the proposed cues",
          "Open your booking agenda"
        ]
      },
      {
        "titre": "Move serenely",
        "texte": "Each small step builds your presence. You are never alone: Shalify accompanies you."
      }
    ],
    "citation": "The first step already holds the whole road.",
    "actionLabel": "Follow the guide online",
    "actionUrl": "https://shalify.app/premiers-pas"
  },
  "ar": {
    "eyebrow": "الخطوات الأولى",
    "titre": "خطواتي الأولى",
    "intro": "دليل لطيف للبدء على شاليفي بهدوء ووضع أسس متينة.",
    "blocs": [
      {
        "titre": "ابدأ جيّدًا",
        "puces": [
          "أكمل ملفّك بعناية",
          "أضف صورة واضحة ومرحّبة",
          "احكِ قيمتك بكلمات قليلة",
          "اختر عروضك الأولى"
        ]
      },
      {
        "titre": "اكسب الثقة",
        "puces": [
          "استكشف المكان على إيقاعك",
          "استلهم من المبدعين الآخرين",
          "حدّد أسعارك بالإشارات المقترحة",
          "افتح أجندة حجوزاتك"
        ]
      },
      {
        "titre": "تقدّم بهدوء",
        "texte": "كل خطوة صغيرة تبني حضورك. لست وحدك أبدًا: شاليفي ترافقك."
      }
    ],
    "citation": "الخطوة الأولى تحمل الطريق كله.",
    "actionLabel": "اتبع الدليل على الإنترنت",
    "actionUrl": "https://shalify.app/premiers-pas"
  }
};

export function PremiersPasScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

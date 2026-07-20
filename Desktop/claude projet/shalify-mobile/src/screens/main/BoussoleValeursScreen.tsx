import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "BOUSSOLE DES VALEURS",
    "titre": "Ma boussole des valeurs",
    "intro": "Identifiez ce qui compte le plus pour vous et laissez vos valeurs guider vos choix.",
    "blocs": [
      {
        "titre": "Un cap intérieur",
        "texte": "Vos valeurs sont votre boussole. Les nommer clarifie vos décisions et renforce votre confiance."
      },
      {
        "titre": "Ce que la boussole éclaire",
        "puces": [
          "Vos valeurs essentielles",
          "Ce qui donne du sens à vos jours",
          "Des choix alignés et sereins",
          "Une direction fidèle à vous"
        ]
      },
      {
        "titre": "Décider avec justesse",
        "texte": "Quand un doute se présente, revenez à vos valeurs : elles indiquent toujours le nord."
      }
    ],
    "citation": "Vos valeurs sont le nord de toutes vos décisions.",
    "actionLabel": "Trouver ma boussole en ligne",
    "actionUrl": "https://shalify.app/boussole-des-valeurs"
  },
  "en": {
    "eyebrow": "VALUES COMPASS",
    "titre": "My values compass",
    "intro": "Identify what matters most to you and let your values guide your choices.",
    "blocs": [
      {
        "titre": "An inner course",
        "texte": "Your values are your compass. Naming them clarifies your decisions and strengthens your confidence."
      },
      {
        "titre": "What the compass lights",
        "puces": [
          "Your essential values",
          "What gives meaning to your days",
          "Aligned and serene choices",
          "A direction true to you"
        ]
      },
      {
        "titre": "Decide rightly",
        "texte": "When a doubt arises, return to your values: they always point north."
      }
    ],
    "citation": "Your values are the north of all your decisions.",
    "actionLabel": "Find my compass online",
    "actionUrl": "https://shalify.app/boussole-des-valeurs"
  },
  "ar": {
    "eyebrow": "بوصلة القيم",
    "titre": "بوصلة قيمي",
    "intro": "حدّد ما يهمّك أكثر ودع قيمك توجّه خياراتك.",
    "blocs": [
      {
        "titre": "وجهة داخلية",
        "texte": "قيمك بوصلتك. تسميتها توضّح قراراتك وتقوّي ثقتك."
      },
      {
        "titre": "ما تضيئه البوصلة",
        "puces": [
          "قيمك الجوهرية",
          "ما يمنح أيامك معنى",
          "خيارات مُحاذاة وهادئة",
          "وجهة وفيّة لك"
        ]
      },
      {
        "titre": "قرّر بصواب",
        "texte": "حين يظهر شكّ، عُد إلى قيمك: تشير دائمًا إلى الشمال."
      }
    ],
    "citation": "قيمك هي شمال كل قراراتك.",
    "actionLabel": "اعرف بوصلتي على الإنترنت",
    "actionUrl": "https://shalify.app/boussole-des-valeurs"
  }
};

export function BoussoleValeursScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

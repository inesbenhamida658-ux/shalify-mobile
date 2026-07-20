import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "RÉSONANCE PROFONDE",
    "titre": "Résonance profonde",
    "intro": "Rencontrez des personnes qui vibrent sur les mêmes valeurs et cultivez des liens sincères.",
    "blocs": [
      {
        "titre": "Se relier par les valeurs",
        "texte": "La résonance rapproche celles et ceux qui partagent une même vision, pour des liens durables et vrais."
      },
      {
        "titre": "Ce qui guide la rencontre",
        "puces": [
          "Vos valeurs essentielles",
          "Ce qui vous fait vibrer",
          "Une écoute mutuelle sincère",
          "Un respect présent à chaque échange"
        ]
      },
      {
        "titre": "Des liens qui comptent",
        "texte": "Ici, la profondeur prime sur le nombre. Chaque rencontre a du sens et vous enrichit."
      }
    ],
    "citation": "Les liens les plus vrais naissent des valeurs partagées.",
    "actionLabel": "Explorer en ligne",
    "actionUrl": "https://shalify.app/resonance-profonde"
  },
  "en": {
    "eyebrow": "DEEP RESONANCE",
    "titre": "Deep resonance",
    "intro": "Meet people who vibrate on the same values and cultivate sincere bonds.",
    "blocs": [
      {
        "titre": "Connect through values",
        "texte": "Resonance draws close those who share one vision, for lasting and true bonds."
      },
      {
        "titre": "What guides the encounter",
        "puces": [
          "Your essential values",
          "What makes you vibrate",
          "A sincere mutual listening",
          "A respect present in each exchange"
        ]
      },
      {
        "titre": "Bonds that count",
        "texte": "Here, depth prevails over number. Each encounter has meaning and enriches you."
      }
    ],
    "citation": "The truest bonds are born of shared values.",
    "actionLabel": "Explore online",
    "actionUrl": "https://shalify.app/resonance-profonde"
  },
  "ar": {
    "eyebrow": "رنين عميق",
    "titre": "رنين عميق",
    "intro": "التقِ بأشخاص يهتزّون على القيم نفسها ونمِّ روابط صادقة.",
    "blocs": [
      {
        "titre": "التواصل بالقيم",
        "texte": "يقرّب الرنين من يتشاركون رؤية واحدة، لروابط دائمة وحقيقية."
      },
      {
        "titre": "ما يوجّه اللقاء",
        "puces": [
          "قيمك الجوهرية",
          "ما يجعلك تهتزّ",
          "إصغاء متبادل صادق",
          "احترام حاضر في كل تبادل"
        ]
      },
      {
        "titre": "روابط تُحسب",
        "texte": "هنا، العمق يسبق العدد. كل لقاء له معنى ويُثريك."
      }
    ],
    "citation": "أصدق الروابط تولد من القيم المشتركة.",
    "actionLabel": "استكشف على الإنترنت",
    "actionUrl": "https://shalify.app/resonance-profonde"
  }
};

export function ResonanceProfondeScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

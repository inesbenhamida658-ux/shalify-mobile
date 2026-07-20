import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "SUGGESTION DE PRIX",
    "titre": "Suggestion de prix",
    "intro": "Fixez le juste montant de vos offres avec assurance, guidé par des repères clairs.",
    "blocs": [
      {
        "titre": "Un repère bienveillant",
        "texte": "À partir de votre savoir, de la durée et du soin apporté, un intervalle harmonieux vous est proposé pour valoriser votre travail."
      },
      {
        "titre": "Ce qui pèse dans la balance",
        "puces": [
          "La profondeur de votre expertise",
          "Le temps offert à chaque membre",
          "Le format de votre accompagnement",
          "La valeur ressentie par ceux que vous guidez"
        ]
      },
      {
        "titre": "Vous gardez la main",
        "texte": "La suggestion éclaire votre choix. Le montant final reste le vôtre, ajusté à votre vision."
      }
    ],
    "citation": "Un prix juste honore votre valeur et celle du membre.",
    "actionLabel": "Utiliser l’outil en ligne",
    "actionUrl": "https://shalify.app/suggestion-de-prix"
  },
  "en": {
    "eyebrow": "PRICE SUGGESTION",
    "titre": "Price suggestion",
    "intro": "Set the right amount for your offers with confidence, guided by clear cues.",
    "blocs": [
      {
        "titre": "A kind reference",
        "texte": "From your knowledge, the duration and the care given, a harmonious range is proposed to value your work."
      },
      {
        "titre": "What tips the balance",
        "puces": [
          "The depth of your expertise",
          "The time given to each member",
          "The format of your support",
          "The value felt by those you guide"
        ]
      },
      {
        "titre": "You keep control",
        "texte": "The suggestion lights your choice. The final amount stays yours, tuned to your vision."
      }
    ],
    "citation": "A fair price honors your value and the member’s.",
    "actionLabel": "Use the tool online",
    "actionUrl": "https://shalify.app/suggestion-de-prix"
  },
  "ar": {
    "eyebrow": "اقتراح السعر",
    "titre": "اقتراح السعر",
    "intro": "حدّد المبلغ العادل لعروضك بثقة، موجَّهًا بإشارات واضحة.",
    "blocs": [
      {
        "titre": "مرجع لطيف",
        "texte": "انطلاقًا من معرفتك ومن المدّة والعناية المبذولة، يُقترح عليك نطاق متناغم لتثمين عملك."
      },
      {
        "titre": "ما يرجّح الكفّة",
        "puces": [
          "عمق خبرتك",
          "الوقت الممنوح لكل عضو",
          "صيغة مرافقتك",
          "القيمة التي يشعر بها من ترشدهم"
        ]
      },
      {
        "titre": "القرار بيدك",
        "texte": "يضيء الاقتراح خيارك. يبقى المبلغ النهائي لك، مضبوطًا على رؤيتك."
      }
    ],
    "citation": "السعر العادل يُكرّم قيمتك وقيمة العضو.",
    "actionLabel": "استخدم الأداة على الإنترنت",
    "actionUrl": "https://shalify.app/suggestion-de-prix"
  }
};

export function SuggestionPrixScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "AUTO-HYPNOSE",
    "titre": "Auto-hypnose",
    "intro": "Un accompagnement guidé pour vous détendre en profondeur et cultiver vos ressources intérieures.",
    "blocs": [
      {
        "titre": "Une détente profonde",
        "texte": "Guidé par la voix, vous accédez à un état de calme où l’esprit s’apaise et se recentre."
      },
      {
        "titre": "Ce que la séance cultive",
        "puces": [
          "Un relâchement du corps",
          "Un apaisement du mental",
          "Une confiance renforcée",
          "Un ancrage durable"
        ]
      },
      {
        "titre": "Un rituel régénérant",
        "texte": "Pratiquée régulièrement, l’auto-hypnose devient un allié précieux de votre équilibre."
      }
    ],
    "citation": "Le calme se cultive, un souffle à la fois.",
    "actionLabel": "Commencer la séance en ligne",
    "actionUrl": "https://shalify.app/auto-hypnose"
  },
  "en": {
    "eyebrow": "SELF-HYPNOSIS",
    "titre": "Self-hypnosis",
    "intro": "A guided support to relax deeply and cultivate your inner resources.",
    "blocs": [
      {
        "titre": "A deep relaxation",
        "texte": "Guided by the voice, you reach a state of calm where the mind settles and recenters."
      },
      {
        "titre": "What the session cultivates",
        "puces": [
          "A release of the body",
          "A soothing of the mind",
          "A strengthened confidence",
          "A lasting anchor"
        ]
      },
      {
        "titre": "A regenerating ritual",
        "texte": "Practiced regularly, self-hypnosis becomes a precious ally of your balance."
      }
    ],
    "citation": "Calm is cultivated, one breath at a time.",
    "actionLabel": "Start the session online",
    "actionUrl": "https://shalify.app/auto-hypnose"
  },
  "ar": {
    "eyebrow": "التنويم الذاتي",
    "titre": "التنويم الذاتي",
    "intro": "مرافقة موجَّهة لتسترخي بعمق وتُنمّي مواردك الداخلية.",
    "blocs": [
      {
        "titre": "استرخاء عميق",
        "texte": "موجَّهًا بالصوت، تصل إلى حالة هدوء يستقرّ فيها العقل ويتمركز."
      },
      {
        "titre": "ما تُنمّيه الجلسة",
        "puces": [
          "استرخاء الجسد",
          "تهدئة العقل",
          "ثقة مُعزَّزة",
          "تجذّر دائم"
        ]
      },
      {
        "titre": "طقس مُجدِّد",
        "texte": "بالممارسة المنتظمة، يصبح التنويم الذاتي حليفًا ثمينًا لتوازنك."
      }
    ],
    "citation": "الهدوء يُزرع، نفَسًا بعد نفَس.",
    "actionLabel": "ابدأ الجلسة على الإنترنت",
    "actionUrl": "https://shalify.app/auto-hypnose"
  }
};

export function AutoHypnoseScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

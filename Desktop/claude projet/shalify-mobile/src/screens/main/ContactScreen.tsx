import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "CONTACT",
    "titre": "Nous contacter",
    "intro": "Une question, une idée, un besoin d’accompagnement ? L’équipe Shalify vous répond avec soin.",
    "blocs": [
      {
        "titre": "Une équipe à votre écoute",
        "texte": "Nous lisons chaque message avec attention et revenons vers vous rapidement, avec bienveillance."
      },
      {
        "titre": "Ce que nous aimons recevoir",
        "puces": [
          "Vos questions sur Shalify",
          "Vos idées pour améliorer le lieu",
          "Vos besoins d’accompagnement",
          "Vos retours qui nous font grandir"
        ]
      },
      {
        "titre": "Toujours par email",
        "texte": "Écrivez-nous à tout moment. Votre message compte et trouve une réponse humaine."
      }
    ],
    "citation": "Chaque message reçu est une main tendue.",
    "actionLabel": "Nous écrire en ligne",
    "actionUrl": "https://shalify.app/contact"
  },
  "en": {
    "eyebrow": "CONTACT",
    "titre": "Contact us",
    "intro": "A question, an idea, a need for support? The Shalify team answers you with care.",
    "blocs": [
      {
        "titre": "A team that listens",
        "texte": "We read each message with attention and come back to you quickly, with kindness."
      },
      {
        "titre": "What we love to receive",
        "puces": [
          "Your questions about Shalify",
          "Your ideas to improve the place",
          "Your needs for support",
          "Your feedback that makes us grow"
        ]
      },
      {
        "titre": "Always by email",
        "texte": "Write to us at any time. Your message counts and finds a human answer."
      }
    ],
    "citation": "Every message received is a hand extended.",
    "actionLabel": "Write to us online",
    "actionUrl": "https://shalify.app/contact"
  },
  "ar": {
    "eyebrow": "اتصال",
    "titre": "اتصل بنا",
    "intro": "سؤال، فكرة، حاجة إلى مرافقة؟ فريق شاليفي يجيبك بعناية.",
    "blocs": [
      {
        "titre": "فريق يُصغي إليك",
        "texte": "نقرأ كل رسالة باهتمام ونعود إليك بسرعة، برحمة."
      },
      {
        "titre": "ما نحبّ أن نتلقّاه",
        "puces": [
          "أسئلتك عن شاليفي",
          "أفكارك لتحسين المكان",
          "حاجاتك إلى المرافقة",
          "ملاحظاتك التي تُنمّينا"
        ]
      },
      {
        "titre": "دائمًا عبر البريد",
        "texte": "اكتب إلينا في أي وقت. رسالتك تُحسب وتجد جوابًا إنسانيًّا."
      }
    ],
    "citation": "كل رسالة نتلقّاها يد ممدودة.",
    "actionLabel": "اكتب إلينا على الإنترنت",
    "actionUrl": "https://shalify.app/contact"
  }
};

export function ContactScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "JOURNAL VOCAL",
    "titre": "Mon journal vocal",
    "intro": "Déposez vos pensées à voix haute et gardez la trace vivante de votre cheminement.",
    "blocs": [
      {
        "titre": "Écrire avec sa voix",
        "texte": "Parfois, dire est plus simple qu’écrire. Confiez vos ressentis à votre voix, en toute liberté."
      },
      {
        "titre": "Ce que le journal garde",
        "puces": [
          "Vos réflexions du moment",
          "Le fil de vos journées",
          "Vos élans et vos victoires",
          "Une mémoire douce de vous"
        ]
      },
      {
        "titre": "Un rendez-vous avec soi",
        "texte": "Revenez écouter vos voix passées : elles racontent votre chemin et votre évolution."
      }
    ],
    "citation": "Votre voix garde la mémoire vivante de vos jours.",
    "actionLabel": "Ouvrir mon journal en ligne",
    "actionUrl": "https://shalify.app/journal-vocal"
  },
  "en": {
    "eyebrow": "VOICE JOURNAL",
    "titre": "My voice journal",
    "intro": "Lay down your thoughts aloud and keep a living trace of your path.",
    "blocs": [
      {
        "titre": "Write with your voice",
        "texte": "Sometimes, saying is simpler than writing. Entrust your feelings to your voice, freely."
      },
      {
        "titre": "What the journal keeps",
        "puces": [
          "Your reflections of the moment",
          "The thread of your days",
          "Your sparks and your wins",
          "A gentle memory of you"
        ]
      },
      {
        "titre": "A meeting with yourself",
        "texte": "Come back to listen to your past voices: they tell your path and your growth."
      }
    ],
    "citation": "Your voice keeps the living memory of your days.",
    "actionLabel": "Open my journal online",
    "actionUrl": "https://shalify.app/journal-vocal"
  },
  "ar": {
    "eyebrow": "يوميات صوتية",
    "titre": "يومياتي الصوتية",
    "intro": "ضع أفكارك بصوت عالٍ واحتفظ بأثر حيّ لمسيرتك.",
    "blocs": [
      {
        "titre": "الكتابة بصوتك",
        "texte": "أحيانًا، القول أبسط من الكتابة. ائتمن صوتك على مشاعرك، بكل حرية."
      },
      {
        "titre": "ما تحفظه اليوميات",
        "puces": [
          "تأمّلاتك في اللحظة",
          "خيط أيامك",
          "اندفاعاتك وانتصاراتك",
          "ذاكرة لطيفة عنك"
        ]
      },
      {
        "titre": "موعد مع الذات",
        "texte": "عُد للاستماع إلى أصواتك السابقة: تحكي طريقك وتطوّرك."
      }
    ],
    "citation": "صوتك يحفظ الذاكرة الحيّة لأيامك.",
    "actionLabel": "افتح يومياتي على الإنترنت",
    "actionUrl": "https://shalify.app/journal-vocal"
  }
};

export function JournalVocalScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

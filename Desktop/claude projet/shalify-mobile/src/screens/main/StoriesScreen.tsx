import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "LES STORIES",
    "titre": "Stories du jour",
    "intro": "Des instants courts et lumineux, partagés par les membres, à découvrir avant qu’ils s’envolent.",
    "blocs": [
      {
        "titre": "Le meilleur de l’instant",
        "texte": "Un mot, une image, une inspiration : les stories captent la vie du moment et la offrent en douceur."
      },
      {
        "titre": "Vivant et éphémère",
        "puces": [
          "Des partages spontanés",
          "Une fenêtre sur le quotidien des créateurs",
          "Des idées à saisir sur le vif",
          "Un fil léger, renouvelé en continu"
        ]
      },
      {
        "titre": "Partagez la vôtre",
        "texte": "Un élan, une victoire, une pensée : votre story rejoint le fil et touche la communauté."
      }
    ],
    "citation": "Chaque instant partagé rapproche les cœurs.",
    "actionLabel": "Voir les stories en ligne",
    "actionUrl": "https://shalify.app/stories"
  },
  "en": {
    "eyebrow": "STORIES",
    "titre": "Today’s stories",
    "intro": "Short, bright moments, shared by members, to discover before they drift away.",
    "blocs": [
      {
        "titre": "The best of the moment",
        "texte": "A word, an image, an inspiration: stories capture the life of the moment and offer it gently."
      },
      {
        "titre": "Alive and fleeting",
        "puces": [
          "Spontaneous shares",
          "A window into creators’ days",
          "Ideas to catch on the spot",
          "A light thread, ever renewed"
        ]
      },
      {
        "titre": "Share yours",
        "texte": "A spark, a win, a thought: your story joins the thread and touches the community."
      }
    ],
    "citation": "Every shared moment brings hearts closer.",
    "actionLabel": "See stories online",
    "actionUrl": "https://shalify.app/stories"
  },
  "ar": {
    "eyebrow": "القصص",
    "titre": "قصص اليوم",
    "intro": "لحظات قصيرة ومضيئة يشاركها الأعضاء، تُكتشَف قبل أن تتلاشى.",
    "blocs": [
      {
        "titre": "أفضل ما في اللحظة",
        "texte": "كلمة، صورة، إلهام: تلتقط القصص حياة اللحظة وتقدّمها بلطف."
      },
      {
        "titre": "حيّ وعابر",
        "puces": [
          "مشاركات عفوية",
          "نافذة على يوميات المبدعين",
          "أفكار تُلتقَط في حينها",
          "خيط خفيف يتجدّد باستمرار"
        ]
      },
      {
        "titre": "شارك قصتك",
        "texte": "اندفاعة، انتصار، فكرة: تنضمّ قصتك إلى الخيط وتلمس المجتمع."
      }
    ],
    "citation": "كل لحظة مشتركة تقرّب القلوب.",
    "actionLabel": "شاهد القصص على الإنترنت",
    "actionUrl": "https://shalify.app/stories"
  }
};

export function StoriesScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

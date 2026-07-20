import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "LE REFUGE",
    "titre": "Mon refuge",
    "intro": "Un espace de calme rien qu’à vous, à retrouver dès que le besoin de douceur se fait sentir.",
    "blocs": [
      {
        "titre": "Un havre intérieur",
        "texte": "Le refuge est votre lieu de paix : quelques instants pour respirer, vous poser et vous ressourcer."
      },
      {
        "titre": "Ce que vous y trouvez",
        "puces": [
          "Un souffle qui apaise",
          "Un silence bienveillant",
          "Un ancrage rassurant",
          "Une tendresse pour vous"
        ]
      },
      {
        "titre": "Toujours accessible",
        "texte": "Revenez au refuge quand vous voulez. Il vous accueille, calme et constant."
      }
    ],
    "citation": "Un refuge intérieur reste ouvert à toute heure.",
    "actionLabel": "Entrer dans le refuge en ligne",
    "actionUrl": "https://shalify.app/refuge"
  },
  "en": {
    "eyebrow": "THE REFUGE",
    "titre": "My refuge",
    "intro": "A space of calm just for you, to return to whenever the need for gentleness arises.",
    "blocs": [
      {
        "titre": "An inner haven",
        "texte": "The refuge is your place of peace: a few moments to breathe, settle and restore yourself."
      },
      {
        "titre": "What you find there",
        "puces": [
          "A breath that soothes",
          "A caring silence",
          "A reassuring anchor",
          "A tenderness for you"
        ]
      },
      {
        "titre": "Always reachable",
        "texte": "Return to the refuge whenever you wish. It welcomes you, calm and constant."
      }
    ],
    "citation": "An inner refuge stays open at any hour.",
    "actionLabel": "Enter the refuge online",
    "actionUrl": "https://shalify.app/refuge"
  },
  "ar": {
    "eyebrow": "الملاذ",
    "titre": "ملاذي",
    "intro": "فضاء هدوء خاصّ بك، تعود إليه متى نشأت الحاجة إلى اللطف.",
    "blocs": [
      {
        "titre": "مأوى داخلي",
        "texte": "الملاذ مكان سلامك: لحظات لتتنفّس وتستقرّ وتستعيد نفسك."
      },
      {
        "titre": "ما تجده هنا",
        "puces": [
          "نفَس يُهدّئ",
          "صمت رحيم",
          "تجذّر مطمئن",
          "حنان لك"
        ]
      },
      {
        "titre": "متاح دائمًا",
        "texte": "عُد إلى الملاذ متى شئت. يستقبلك، هادئًا وثابتًا."
      }
    ],
    "citation": "الملاذ الداخلي يبقى مفتوحًا في أي وقت.",
    "actionLabel": "ادخل الملاذ على الإنترنت",
    "actionUrl": "https://shalify.app/refuge"
  }
};

export function RefugeScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

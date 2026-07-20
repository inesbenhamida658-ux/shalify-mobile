import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "VISION BOARD",
    "titre": "Mon tableau de vision",
    "intro": "Rassemblez vos rêves en un tableau inspirant qui guide vos pas au quotidien.",
    "blocs": [
      {
        "titre": "Voir pour créer",
        "texte": "Donnez une forme à vos aspirations : images, mots et couleurs réunis rendent vos rêves plus proches."
      },
      {
        "titre": "Ce que le tableau réveille",
        "puces": [
          "Une vision claire de votre cap",
          "Une inspiration renouvelée",
          "Un rappel doux chaque jour",
          "Une énergie tournée vers l’avenir"
        ]
      },
      {
        "titre": "Un rituel qui porte",
        "texte": "Revenez à votre tableau pour raviver votre élan et reconnecter à ce qui vous anime."
      }
    ],
    "citation": "Ce que l’on visualise devient un chemin possible.",
    "actionLabel": "Créer mon tableau en ligne",
    "actionUrl": "https://shalify.app/vision-board"
  },
  "en": {
    "eyebrow": "VISION BOARD",
    "titre": "My vision board",
    "intro": "Gather your dreams into an inspiring board that guides your steps every day.",
    "blocs": [
      {
        "titre": "See to create",
        "texte": "Give a shape to your aspirations: images, words and colors together bring your dreams closer."
      },
      {
        "titre": "What the board awakens",
        "puces": [
          "A clear view of your course",
          "Renewed inspiration",
          "A gentle daily reminder",
          "An energy turned toward the future"
        ]
      },
      {
        "titre": "A ritual that carries",
        "texte": "Return to your board to revive your momentum and reconnect to what moves you."
      }
    ],
    "citation": "What we visualize becomes a possible path.",
    "actionLabel": "Create my board online",
    "actionUrl": "https://shalify.app/vision-board"
  },
  "ar": {
    "eyebrow": "لوحة الرؤية",
    "titre": "لوحة رؤيتي",
    "intro": "اجمع أحلامك في لوحة مُلهمة توجّه خطواتك كل يوم.",
    "blocs": [
      {
        "titre": "أن ترى لتخلق",
        "texte": "امنح تطلعاتك شكلًا: صور وكلمات وألوان مجتمعة تقرّب أحلامك."
      },
      {
        "titre": "ما تُوقظه اللوحة",
        "puces": [
          "رؤية واضحة لوجهتك",
          "إلهام متجدّد",
          "تذكير لطيف كل يوم",
          "طاقة موجَّهة نحو المستقبل"
        ]
      },
      {
        "titre": "طقس يحمل",
        "texte": "عُد إلى لوحتك لإحياء اندفاعك وإعادة الوصل بما يحرّكك."
      }
    ],
    "citation": "ما نتصوّره يصبح طريقًا ممكنًا.",
    "actionLabel": "أنشئ لوحتي على الإنترنت",
    "actionUrl": "https://shalify.app/vision-board"
  }
};

export function VisionBoardScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

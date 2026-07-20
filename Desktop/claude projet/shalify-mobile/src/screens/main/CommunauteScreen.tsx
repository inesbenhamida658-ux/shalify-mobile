import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "LA COMMUNAUTÉ",
    "titre": "La communauté Shalify",
    "intro": "Un cercle bienveillant où chaque savoir compte et où chaque personne trouve sa place.",
    "blocs": [
      {
        "titre": "Un lieu qui rassemble",
        "texte": "Créateurs et membres se rencontrent autour d’une même conviction : la valeur humaine se partage et se célèbre."
      },
      {
        "titre": "Ce qui vous relie",
        "puces": [
          "Des échanges sincères et respectueux",
          "Des entraides entre créateurs",
          "Des rencontres par affinités",
          "Une bienveillance qui porte chacun"
        ]
      },
      {
        "titre": "Grandir ensemble",
        "texte": "Ici, votre présence enrichit le cercle, et le cercle vous soutient à votre tour."
      }
    ],
    "citation": "Ensemble, chaque talent trouve sa lumière.",
    "actionLabel": "Rejoindre en ligne",
    "actionUrl": "https://shalify.app/communaute"
  },
  "en": {
    "eyebrow": "THE COMMUNITY",
    "titre": "The Shalify community",
    "intro": "A caring circle where every knowledge counts and every person finds a place.",
    "blocs": [
      {
        "titre": "A place that gathers",
        "texte": "Creators and members meet around one conviction: human value is shared and celebrated."
      },
      {
        "titre": "What binds you",
        "puces": [
          "Sincere and respectful exchanges",
          "Mutual support among creators",
          "Encounters by affinity",
          "A kindness that carries each one"
        ]
      },
      {
        "titre": "Grow together",
        "texte": "Here, your presence enriches the circle, and the circle supports you in return."
      }
    ],
    "citation": "Together, every talent finds its light.",
    "actionLabel": "Join online",
    "actionUrl": "https://shalify.app/communaute"
  },
  "ar": {
    "eyebrow": "المجتمع",
    "titre": "مجتمع شاليفي",
    "intro": "دائرة رحيمة تُحسب فيها كل معرفة ويجد فيها كل شخص مكانه.",
    "blocs": [
      {
        "titre": "مكان يجمع",
        "texte": "يلتقي المبدعون والأعضاء حول قناعة واحدة: القيمة الإنسانية تُشارَك وتُحتفى بها."
      },
      {
        "titre": "ما يربطك",
        "puces": [
          "تبادلات صادقة ومحترمة",
          "تعاون بين المبدعين",
          "لقاءات بحسب التقارب",
          "لطف يحمل كل واحد"
        ]
      },
      {
        "titre": "ننمو معًا",
        "texte": "هنا، حضورك يُثري الدائرة، والدائرة تسندك بدورها."
      }
    ],
    "citation": "معًا، تجد كل موهبة نورها.",
    "actionLabel": "انضمّ على الإنترنت",
    "actionUrl": "https://shalify.app/communaute"
  }
};

export function CommunauteScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

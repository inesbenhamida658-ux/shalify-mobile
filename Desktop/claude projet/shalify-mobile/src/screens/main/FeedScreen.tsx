import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "LE FEED",
    "titre": "Le feed de la communauté",
    "intro": "Suivez le fil vivant de Shalify : inspirations, savoirs partagés et belles nouvelles des membres.",
    "blocs": [
      {
        "titre": "Un fil qui inspire",
        "texte": "Chaque jour, des pensées, des offres et des moments partagés par la communauté nourrissent votre élan."
      },
      {
        "titre": "Ce que vous y trouvez",
        "puces": [
          "Les nouveautés des créateurs",
          "Des inspirations douces à savourer",
          "Des rencontres à ne pas laisser passer",
          "Vos moments favoris réunis"
        ]
      },
      {
        "titre": "Participez à la vie du lieu",
        "texte": "Réagissez, encouragez, partagez votre propre lumière. Le feed grandit de chaque présence."
      }
    ],
    "citation": "Une communauté vivante se nourrit de chaque voix.",
    "actionLabel": "Ouvrir le feed en ligne",
    "actionUrl": "https://shalify.app/feed"
  },
  "en": {
    "eyebrow": "THE FEED",
    "titre": "The community feed",
    "intro": "Follow the living thread of Shalify: inspirations, shared knowledge and good news from members.",
    "blocs": [
      {
        "titre": "A thread that inspires",
        "texte": "Each day, thoughts, offers and shared moments from the community feed your momentum."
      },
      {
        "titre": "What you find there",
        "puces": [
          "Creators’ latest news",
          "Gentle inspirations to savor",
          "Encounters worth catching",
          "Your favorite moments gathered"
        ]
      },
      {
        "titre": "Take part in the life of the place",
        "texte": "React, encourage, share your own light. The feed grows with every presence."
      }
    ],
    "citation": "A living community feeds on every voice.",
    "actionLabel": "Open the feed online",
    "actionUrl": "https://shalify.app/feed"
  },
  "ar": {
    "eyebrow": "الخلاصة",
    "titre": "خلاصة المجتمع",
    "intro": "تابع الخيط الحيّ لشاليفي: إلهامات ومعارف مشتركة وأخبار جميلة من الأعضاء.",
    "blocs": [
      {
        "titre": "خيط يُلهم",
        "texte": "كل يوم، أفكار وعروض ولحظات مشتركة من المجتمع تغذّي اندفاعك."
      },
      {
        "titre": "ما تجده هنا",
        "puces": [
          "أحدث أخبار المبدعين",
          "إلهامات لطيفة تُتذوَّق",
          "لقاءات جديرة بالانتباه",
          "لحظاتك المفضّلة مجموعة"
        ]
      },
      {
        "titre": "شارك في حياة المكان",
        "texte": "تفاعل، شجّع، شارك نورك الخاص. تنمو الخلاصة مع كل حضور."
      }
    ],
    "citation": "المجتمع الحيّ يتغذّى من كل صوت.",
    "actionLabel": "افتح الخلاصة على الإنترنت",
    "actionUrl": "https://shalify.app/feed"
  }
};

export function FeedScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

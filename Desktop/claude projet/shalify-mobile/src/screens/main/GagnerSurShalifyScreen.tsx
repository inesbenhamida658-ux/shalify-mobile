import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "GAGNER SUR SHALIFY",
    "titre": "Gagner sur Shalify",
    "intro": "Transformez votre savoir en revenus sereins, étape par étape, à votre rythme.",
    "blocs": [
      {
        "titre": "Le chemin, en clair",
        "puces": [
          "Créez un profil qui vous ressemble",
          "Proposez des offres à votre juste valeur",
          "Recevez des réservations confirmées",
          "Encaissez votre part, 75 % de chaque vente"
        ]
      },
      {
        "titre": "Plusieurs façons de créer de la valeur",
        "puces": [
          "Accompagnements en direct",
          "Formations et audios",
          "Lives et cercles",
          "Créations à la demande"
        ]
      },
      {
        "titre": "Un cadre qui vous porte",
        "texte": "Réservations, reçus, revenus et rappels sont réunis dans votre espace. Vous avancez, Shalify tient le fil."
      }
    ],
    "citation": "Votre expérience de vie est une vraie qualification.",
    "actionLabel": "Commencer en ligne",
    "actionUrl": "https://shalify.app/gagner-sur-shalify"
  },
  "en": {
    "eyebrow": "EARN ON SHALIFY",
    "titre": "Earn on Shalify",
    "intro": "Turn your knowledge into serene income, step by step, at your own pace.",
    "blocs": [
      {
        "titre": "The path, made clear",
        "puces": [
          "Create a profile that reflects you",
          "Offer at your fair value",
          "Receive confirmed bookings",
          "Collect your share, 75% of each sale"
        ]
      },
      {
        "titre": "Many ways to create value",
        "puces": [
          "Live support",
          "Courses and audios",
          "Lives and circles",
          "Creations on request"
        ]
      },
      {
        "titre": "A frame that carries you",
        "texte": "Bookings, receipts, earnings and reminders gather in your space. You move forward, Shalify holds the thread."
      }
    ],
    "citation": "Your life experience is a real qualification.",
    "actionLabel": "Start online",
    "actionUrl": "https://shalify.app/gagner-sur-shalify"
  },
  "ar": {
    "eyebrow": "اكسب على شاليفي",
    "titre": "اكسب على شاليفي",
    "intro": "حوّل معرفتك إلى دخل هادئ، خطوة بخطوة، على إيقاعك.",
    "blocs": [
      {
        "titre": "الطريق بوضوح",
        "puces": [
          "أنشئ ملفًّا يشبهك",
          "اعرض بقيمتك العادلة",
          "تلقَّ حجوزات مؤكدة",
          "حصّل حصتك، 75% من كل بيع"
        ]
      },
      {
        "titre": "طرق عديدة لخلق القيمة",
        "puces": [
          "مرافقة مباشرة",
          "دورات وملفّات صوتية",
          "بثوث ودوائر",
          "إبداعات عند الطلب"
        ]
      },
      {
        "titre": "إطار يحملك",
        "texte": "الحجوزات والإيصالات والأرباح والتذكيرات مجموعة في مساحتك. تتقدّم، وشاليفي تمسك الخيط."
      }
    ],
    "citation": "تجربتك في الحياة مؤهّل حقيقي.",
    "actionLabel": "ابدأ على الإنترنت",
    "actionUrl": "https://shalify.app/gagner-sur-shalify"
  }
};

export function GagnerSurShalifyScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

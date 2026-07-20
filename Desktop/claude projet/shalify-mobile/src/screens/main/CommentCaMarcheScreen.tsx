import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "COMMENT ÇA MARCHE",
    "titre": "Comment ça marche",
    "intro": "Shalify en quelques étapes simples, pour découvrir, se relier et faire grandir sa valeur.",
    "blocs": [
      {
        "titre": "Pour les membres",
        "puces": [
          "Explorez les talents par rubrique",
          "Choisissez un créateur qui vous inspire",
          "Réservez un créneau en toute clarté",
          "Vivez un accompagnement de qualité"
        ]
      },
      {
        "titre": "Pour les créateurs",
        "puces": [
          "Créez un profil qui vous ressemble",
          "Proposez vos offres à leur juste valeur",
          "Recevez des réservations confirmées",
          "Encaissez votre part à chaque vente"
        ]
      },
      {
        "titre": "Un cadre bienveillant",
        "texte": "Réservations, revenus, reçus et rappels sont réunis dans votre espace. Vous avancez, Shalify tient le fil."
      }
    ],
    "citation": "Un chemin simple révèle une grande valeur.",
    "actionLabel": "Découvrir en détail en ligne",
    "actionUrl": "https://shalify.app/comment-ca-marche"
  },
  "en": {
    "eyebrow": "HOW IT WORKS",
    "titre": "How it works",
    "intro": "Shalify in a few simple steps, to discover, connect and grow your value.",
    "blocs": [
      {
        "titre": "For members",
        "puces": [
          "Explore talents by section",
          "Choose a creator who inspires you",
          "Book a slot with full clarity",
          "Live a quality experience"
        ]
      },
      {
        "titre": "For creators",
        "puces": [
          "Create a profile that reflects you",
          "Offer at their fair value",
          "Receive confirmed bookings",
          "Collect your share on each sale"
        ]
      },
      {
        "titre": "A caring frame",
        "texte": "Bookings, earnings, receipts and reminders gather in your space. You move forward, Shalify holds the thread."
      }
    ],
    "citation": "A simple path reveals a great value.",
    "actionLabel": "Discover in detail online",
    "actionUrl": "https://shalify.app/comment-ca-marche"
  },
  "ar": {
    "eyebrow": "كيف يعمل",
    "titre": "كيف يعمل",
    "intro": "شاليفي في خطوات بسيطة، لتكتشف وتتواصل وتُنمّي قيمتك.",
    "blocs": [
      {
        "titre": "للأعضاء",
        "puces": [
          "استكشف المواهب حسب الباب",
          "اختر مبدعًا يُلهمك",
          "احجز موعدًا بكل وضوح",
          "عِش تجربة راقية"
        ]
      },
      {
        "titre": "للمبدعين",
        "puces": [
          "أنشئ ملفًّا يشبهك",
          "اعرض بقيمتها العادلة",
          "تلقَّ حجوزات مؤكدة",
          "حصّل حصتك في كل بيع"
        ]
      },
      {
        "titre": "إطار رحيم",
        "texte": "الحجوزات والأرباح والإيصالات والتذكيرات مجموعة في مساحتك. تتقدّم، وشاليفي تمسك الخيط."
      }
    ],
    "citation": "الطريق البسيط يكشف قيمة عظيمة.",
    "actionLabel": "اكتشف بالتفصيل على الإنترنت",
    "actionUrl": "https://shalify.app/comment-ca-marche"
  }
};

export function CommentCaMarcheScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

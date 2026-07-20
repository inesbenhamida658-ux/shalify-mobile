import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "VIVRE ET VENDRE",
    "titre": "Vivre et vendre",
    "intro": "Faites de votre passion une activité qui vous nourrit, avec équilibre et confiance.",
    "blocs": [
      {
        "titre": "Un art de vendre en douceur",
        "texte": "Vendre devient un échange sincère : vous offrez de la valeur, le membre repart grandi, la juste part vous revient."
      },
      {
        "titre": "Vos leviers au quotidien",
        "puces": [
          "Des offres claires et régulières",
          "Une présence constante et humaine",
          "Des membres fidélisés avec attention",
          "Des revenus qui progressent sereinement"
        ]
      },
      {
        "titre": "L’équilibre avant tout",
        "texte": "Avancez à votre rythme. Une activité durable se construit avec constance et respect de vous-même."
      }
    ],
    "citation": "Vivre de son talent est une abondance accessible.",
    "actionLabel": "Explorer en ligne",
    "actionUrl": "https://shalify.app/vivre-et-vendre"
  },
  "en": {
    "eyebrow": "LIVE AND SELL",
    "titre": "Live and sell",
    "intro": "Turn your passion into an activity that nourishes you, with balance and confidence.",
    "blocs": [
      {
        "titre": "A gentle art of selling",
        "texte": "Selling becomes a sincere exchange: you offer value, the member leaves enriched, the fair share returns to you."
      },
      {
        "titre": "Your daily levers",
        "puces": [
          "Clear and regular offers",
          "A steady and human presence",
          "Members kept close with care",
          "Earnings that grow serenely"
        ]
      },
      {
        "titre": "Balance above all",
        "texte": "Move at your own pace. A lasting activity is built with constancy and respect for yourself."
      }
    ],
    "citation": "Living from your talent is an accessible abundance.",
    "actionLabel": "Explore online",
    "actionUrl": "https://shalify.app/vivre-et-vendre"
  },
  "ar": {
    "eyebrow": "أن تعيش وتبيع",
    "titre": "أن تعيش وتبيع",
    "intro": "اجعل من شغفك نشاطًا يغذّيك، بتوازن وثقة.",
    "blocs": [
      {
        "titre": "فنّ البيع بلطف",
        "texte": "يصبح البيع تبادلًا صادقًا: تقدّم قيمة، يغادر العضو أغنى، وتعود إليك الحصة العادلة."
      },
      {
        "titre": "روافعك اليومية",
        "puces": [
          "عروض واضحة ومنتظمة",
          "حضور ثابت وإنساني",
          "أعضاء مُحافَظ عليهم بعناية",
          "أرباح تنمو بهدوء"
        ]
      },
      {
        "titre": "التوازن أولًا",
        "texte": "تقدّم على إيقاعك. النشاط الدائم يُبنى بالمثابرة واحترام الذات."
      }
    ],
    "citation": "العيش من موهبتك وفرة في المتناول.",
    "actionLabel": "استكشف على الإنترنت",
    "actionUrl": "https://shalify.app/vivre-et-vendre"
  }
};

export function VivreEtVendreScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

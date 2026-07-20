import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "PLAN DU SITE",
    "titre": "Plan du site",
    "intro": "Retrouvez d’un coup d’œil tous les espaces de Shalify et naviguez avec aisance.",
    "blocs": [
      {
        "titre": "Découvrir",
        "puces": [
          "Les créateurs et leurs talents",
          "Les rubriques et savoirs",
          "Les lives et les cercles",
          "La communauté et son feed"
        ]
      },
      {
        "titre": "Créer et vendre",
        "puces": [
          "Gagner sur Shalify",
          "Mes revenus et mes reçus",
          "Suggestion de prix",
          "Premium créateur"
        ]
      },
      {
        "titre": "Se relier",
        "puces": [
          "Shalify Connect",
          "Résonance profonde",
          "Mentorat et duos",
          "Salon vocal et cercles"
        ]
      },
      {
        "titre": "Prendre soin de soi",
        "puces": [
          "Rituels et méditations",
          "Journal et gratitudes",
          "Refuge et voyage intérieur",
          "Miroir et météo intérieure"
        ]
      }
    ],
    "citation": "Un chemin clair rend chaque pas confiant.",
    "actionLabel": "Voir le plan en ligne",
    "actionUrl": "https://shalify.app/plan-du-site"
  },
  "en": {
    "eyebrow": "SITE MAP",
    "titre": "Site map",
    "intro": "Find at a glance all the spaces of Shalify and navigate with ease.",
    "blocs": [
      {
        "titre": "Discover",
        "puces": [
          "Creators and their talents",
          "Sections and knowledge",
          "Lives and circles",
          "The community and its feed"
        ]
      },
      {
        "titre": "Create and sell",
        "puces": [
          "Earn on Shalify",
          "My earnings and receipts",
          "Price suggestion",
          "Creator premium"
        ]
      },
      {
        "titre": "Connect",
        "puces": [
          "Shalify Connect",
          "Deep resonance",
          "Mentoring and duos",
          "Voice room and circles"
        ]
      },
      {
        "titre": "Care for yourself",
        "puces": [
          "Rituals and meditations",
          "Journal and gratitudes",
          "Refuge and inner journey",
          "Mirror and inner weather"
        ]
      }
    ],
    "citation": "A clear path makes every step confident.",
    "actionLabel": "See the map online",
    "actionUrl": "https://shalify.app/plan-du-site"
  },
  "ar": {
    "eyebrow": "خريطة الموقع",
    "titre": "خريطة الموقع",
    "intro": "اعثر بنظرة واحدة على كل فضاءات شاليفي وتنقّل بسهولة.",
    "blocs": [
      {
        "titre": "اكتشف",
        "puces": [
          "المبدعون ومواهبهم",
          "الأبواب والمعارف",
          "البثوث والدوائر",
          "المجتمع وخلاصته"
        ]
      },
      {
        "titre": "أبدع وبِع",
        "puces": [
          "اكسب على شاليفي",
          "أرباحي وإيصالاتي",
          "اقتراح السعر",
          "بريميوم للمبدع"
        ]
      },
      {
        "titre": "تواصل",
        "puces": [
          "شاليفي كونكت",
          "رنين عميق",
          "إرشاد وثنائيات",
          "صالون صوتي ودوائر"
        ]
      },
      {
        "titre": "اعتنِ بنفسك",
        "puces": [
          "طقوس وتأمّلات",
          "يوميات وامتنانات",
          "ملاذ ورحلة داخلية",
          "مرآة وطقس داخلي"
        ]
      }
    ],
    "citation": "الطريق الواضح يجعل كل خطوة واثقة.",
    "actionLabel": "اطّلع على الخريطة على الإنترنت",
    "actionUrl": "https://shalify.app/plan-du-site"
  }
};

export function PlanDuSiteScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

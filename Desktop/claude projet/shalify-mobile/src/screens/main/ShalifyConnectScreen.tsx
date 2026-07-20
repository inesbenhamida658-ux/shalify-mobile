import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "SHALIFY CONNECT",
    "titre": "Shalify Connect",
    "intro": "Six façons de se relier aux autres, autour de ce qui vous ressemble et vous fait grandir.",
    "blocs": [
      {
        "titre": "Se relier, pleinement",
        "texte": "Shalify Connect rassemble les personnes par affinités sincères, au-delà des apparences, sur la base de leur valeur réelle."
      },
      {
        "titre": "Les six façons de se relier",
        "puces": [
          "Par les langues, pour apprendre ensemble",
          "Par les savoirs, pour transmettre et recevoir",
          "Par le mentorat, pour grandir accompagné",
          "Par la création, pour bâtir à plusieurs",
          "Par l’amitié, pour des liens vrais",
          "Par des rencontres sincères et respectueuses"
        ]
      },
      {
        "titre": "La sincérité d’abord",
        "texte": "Des profils vrais, une bienveillance présente, des connexions qui reposent sur qui l’on est vraiment."
      }
    ],
    "citation": "Se relier vraiment commence par se montrer tel que l’on est.",
    "actionLabel": "Découvrir Connect en ligne",
    "actionUrl": "https://shalify.app/shalify-connect"
  },
  "en": {
    "eyebrow": "SHALIFY CONNECT",
    "titre": "Shalify Connect",
    "intro": "Six ways to connect with others, around what resembles you and helps you grow.",
    "blocs": [
      {
        "titre": "Connect, fully",
        "texte": "Shalify Connect gathers people by sincere affinities, beyond appearances, on the basis of their real value."
      },
      {
        "titre": "The six ways to connect",
        "puces": [
          "Through languages, to learn together",
          "Through knowledge, to transmit and receive",
          "Through mentoring, to grow accompanied",
          "Through creation, to build together",
          "Through friendship, for true bonds",
          "Through sincere and respectful encounters"
        ]
      },
      {
        "titre": "Sincerity first",
        "texte": "Real profiles, a present kindness, connections that rest on who we truly are."
      }
    ],
    "citation": "To connect truly begins by showing up as you are.",
    "actionLabel": "Discover Connect online",
    "actionUrl": "https://shalify.app/shalify-connect"
  },
  "ar": {
    "eyebrow": "شاليفي كونكت",
    "titre": "شاليفي كونكت",
    "intro": "ستّ طرق للتواصل مع الآخرين، حول ما يشبهك ويُنمّيك.",
    "blocs": [
      {
        "titre": "التواصل، بالكامل",
        "texte": "يجمع شاليفي كونكت الناس بتقارب صادق، وراء المظاهر، على أساس قيمتهم الحقيقية."
      },
      {
        "titre": "الطرق الستّ للتواصل",
        "puces": [
          "باللغات، للتعلّم معًا",
          "بالمعارف، للنقل والتلقّي",
          "بالإرشاد، للنموّ مرافَقًا",
          "بالإبداع، للبناء معًا",
          "بالصداقة، لروابط حقيقية",
          "بلقاءات صادقة ومحترمة"
        ]
      },
      {
        "titre": "الصدق أولًا",
        "texte": "ملفّات حقيقية، لطف حاضر، وروابط تقوم على من نحن فعلًا."
      }
    ],
    "citation": "التواصل الحقيقي يبدأ بأن تُظهر نفسك كما أنت.",
    "actionLabel": "اكتشف كونكت على الإنترنت",
    "actionUrl": "https://shalify.app/shalify-connect"
  }
};

export function ShalifyConnectScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

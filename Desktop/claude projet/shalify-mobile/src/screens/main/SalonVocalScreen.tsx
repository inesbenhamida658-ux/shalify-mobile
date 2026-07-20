import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "LE FEU DE CAMP",
    "titre": "Salon vocal permanent",
    "intro": "Une salle audio toujours ouverte, comme un feu de camp. Entrez, écoutez, partagez une parole douce.",
    "blocs": [
      {
        "titre": "Toujours ouvert",
        "texte": "Le salon vous accueille à toute heure. Un espace de voix, chaleureux, où l’on se relie simplement."
      },
      {
        "titre": "Un espace bienveillant",
        "puces": [
          "Parlez avec douceur, écoutez avec le cœur",
          "Chacun a sa place autour du feu",
          "Ce qui se dit ici reste porté avec respect"
        ]
      },
      {
        "titre": "Se relier par la voix",
        "texte": "Rejoignez la salle avec votre prénom et laissez la conversation vous porter."
      }
    ],
    "citation": "Une voix partagée réchauffe tout un cercle.",
    "actionLabel": "Rejoindre le feu de camp",
    "actionUrl": "https://shalify.app/salon-vocal"
  },
  "en": {
    "eyebrow": "THE CAMPFIRE",
    "titre": "Permanent voice room",
    "intro": "An audio room always open, like a campfire. Come in, listen, share a gentle word.",
    "blocs": [
      {
        "titre": "Always open",
        "texte": "The room welcomes you at any hour. A space of voices, warm, where we simply connect."
      },
      {
        "titre": "A caring space",
        "puces": [
          "Speak gently, listen with the heart",
          "Everyone has a place around the fire",
          "What is said here stays held with respect"
        ]
      },
      {
        "titre": "Connect through voice",
        "texte": "Join the room with your first name and let the conversation carry you."
      }
    ],
    "citation": "A shared voice warms a whole circle.",
    "actionLabel": "Join the campfire",
    "actionUrl": "https://shalify.app/salon-vocal"
  },
  "ar": {
    "eyebrow": "نار المخيّم",
    "titre": "صالون صوتي دائم",
    "intro": "غرفة صوتية مفتوحة دائمًا، كنار المخيّم. ادخل، استمع، وشارك كلمة لطيفة.",
    "blocs": [
      {
        "titre": "مفتوح دائمًا",
        "texte": "يستقبلك الصالون في أي وقت. فضاء أصوات دافئ نتواصل فيه ببساطة."
      },
      {
        "titre": "مساحة رحيمة",
        "puces": [
          "تكلّم بلطف، واستمع بالقلب",
          "لكل واحد مكان حول النار",
          "ما يُقال هنا يبقى محفوظًا باحترام"
        ]
      },
      {
        "titre": "التواصل بالصوت",
        "texte": "انضمّ إلى الغرفة باسمك ودع الحديث يحملك."
      }
    ],
    "citation": "الصوت المشترك يُدفئ دائرة بأكملها.",
    "actionLabel": "انضمّ إلى نار المخيّم",
    "actionUrl": "https://shalify.app/salon-vocal"
  }
};

export function SalonVocalScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

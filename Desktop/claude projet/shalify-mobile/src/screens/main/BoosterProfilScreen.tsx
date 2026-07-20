import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "BOOSTER MON PROFIL",
    "titre": "Booster mon profil",
    "intro": "Rendez votre profil magnétique et donnez envie aux membres de vous découvrir et de vous choisir.",
    "blocs": [
      {
        "titre": "Un diagnostic bienveillant",
        "texte": "Votre profil est passé en revue avec soin : ce qui brille déjà et ce qui gagnerait à être mis en lumière."
      },
      {
        "titre": "Les points qui font la différence",
        "puces": [
          "Une photo claire et accueillante",
          "Une présentation qui raconte votre valeur",
          "Des offres bien décrites",
          "Des repères de confiance visibles"
        ]
      },
      {
        "titre": "Des gestes simples, un vrai effet",
        "texte": "Chaque amélioration proposée est concrète et rapide à appliquer, pour un profil qui rayonne."
      }
    ],
    "citation": "Un profil soigné attire les belles rencontres.",
    "actionLabel": "Booster mon profil en ligne",
    "actionUrl": "https://shalify.app/booster-mon-profil"
  },
  "en": {
    "eyebrow": "BOOST MY PROFILE",
    "titre": "Boost my profile",
    "intro": "Make your profile magnetic and give members the wish to discover and choose you.",
    "blocs": [
      {
        "titre": "A kind diagnosis",
        "texte": "Your profile is reviewed with care: what already shines and what would gain from being highlighted."
      },
      {
        "titre": "The points that make the difference",
        "puces": [
          "A clear and welcoming photo",
          "A presentation that tells your value",
          "Well described offers",
          "Visible cues of trust"
        ]
      },
      {
        "titre": "Simple gestures, real effect",
        "texte": "Each proposed improvement is concrete and quick to apply, for a profile that radiates."
      }
    ],
    "citation": "A polished profile draws beautiful encounters.",
    "actionLabel": "Boost my profile online",
    "actionUrl": "https://shalify.app/booster-mon-profil"
  },
  "ar": {
    "eyebrow": "تعزيز ملفّي",
    "titre": "تعزيز ملفّي",
    "intro": "اجعل ملفّك جذّابًا وامنح الأعضاء الرغبة في اكتشافك واختيارك.",
    "blocs": [
      {
        "titre": "تشخيص لطيف",
        "texte": "يُراجَع ملفّك بعناية: ما يلمع أصلًا وما يكسب من الإبراز."
      },
      {
        "titre": "النقاط التي تصنع الفارق",
        "puces": [
          "صورة واضحة ومرحّبة",
          "تقديم يحكي قيمتك",
          "عروض موصوفة جيدًا",
          "إشارات ثقة ظاهرة"
        ]
      },
      {
        "titre": "خطوات بسيطة، أثر حقيقي",
        "texte": "كل تحسين مقترح ملموس وسريع التطبيق، لملفّ يشعّ."
      }
    ],
    "citation": "الملفّ المعتنى به يجذب اللقاءات الجميلة.",
    "actionLabel": "عزّز ملفّي على الإنترنت",
    "actionUrl": "https://shalify.app/booster-mon-profil"
  }
};

export function BoosterProfilScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

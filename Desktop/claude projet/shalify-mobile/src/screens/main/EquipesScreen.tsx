import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "ÉQUIPES",
    "titre": "Créer une équipe",
    "intro": "Unissez vos talents à ceux d’autres créateurs pour offrir des accompagnements plus riches.",
    "blocs": [
      {
        "titre": "La force du collectif",
        "texte": "À plusieurs, vos savoirs se complètent et donnent naissance à des offres uniques et complètes."
      },
      {
        "titre": "Ce que l’équipe rend possible",
        "puces": [
          "Des offres à plusieurs voix",
          "Un partage clair de la valeur",
          "Une visibilité renforcée",
          "Une entraide au quotidien"
        ]
      },
      {
        "titre": "Construire ensemble",
        "texte": "Rassemblez les bonnes personnes, définissez votre projet commun, avancez d’un même pas."
      }
    ],
    "citation": "Ensemble, on porte des projets plus grands.",
    "actionLabel": "Créer une équipe en ligne",
    "actionUrl": "https://shalify.app/equipes"
  },
  "en": {
    "eyebrow": "TEAMS",
    "titre": "Create a team",
    "intro": "Unite your talents with other creators to offer richer support.",
    "blocs": [
      {
        "titre": "The strength of the collective",
        "texte": "Together, your knowledge complements one another and gives birth to unique, complete offers."
      },
      {
        "titre": "What the team makes possible",
        "puces": [
          "Offers with several voices",
          "A clear sharing of value",
          "Reinforced visibility",
          "Daily mutual support"
        ]
      },
      {
        "titre": "Build together",
        "texte": "Gather the right people, define your shared project, move forward in step."
      }
    ],
    "citation": "Together, we carry greater projects.",
    "actionLabel": "Create a team online",
    "actionUrl": "https://shalify.app/equipes"
  },
  "ar": {
    "eyebrow": "الفِرق",
    "titre": "إنشاء فريق",
    "intro": "وحّد مواهبك مع مبدعين آخرين لتقديم مرافقات أغنى.",
    "blocs": [
      {
        "titre": "قوة الجماعة",
        "texte": "معًا، تتكامل معارفكم وتولد عروض فريدة وكاملة."
      },
      {
        "titre": "ما يتيحه الفريق",
        "puces": [
          "عروض بأصوات متعددة",
          "تقاسم واضح للقيمة",
          "ظهور مُعزَّز",
          "تعاون يومي"
        ]
      },
      {
        "titre": "ابنوا معًا",
        "texte": "اجمع الأشخاص المناسبين، حدّدوا مشروعكم المشترك، وتقدّموا بخطوة واحدة."
      }
    ],
    "citation": "معًا، نحمل مشاريع أكبر.",
    "actionLabel": "أنشئ فريقًا على الإنترنت",
    "actionUrl": "https://shalify.app/equipes"
  }
};

export function EquipesScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

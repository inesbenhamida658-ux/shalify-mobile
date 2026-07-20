import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "PREMIUM CRÉATEUR",
    "titre": "Premium créateur",
    "intro": "Donnez à votre présence une élégance supérieure et faites rayonner votre savoir auprès de plus de membres.",
    "blocs": [
      {
        "titre": "Une vitrine mise en avant",
        "texte": "Votre profil gagne une place de choix, une mise en lumière soignée et des repères qui inspirent confiance au premier regard."
      },
      {
        "titre": "Des outils qui portent loin",
        "puces": [
          "Statistiques détaillées de vos visites",
          "Mise en avant dans les rubriques",
          "Réponses guidées pour vos offres",
          "Badge qui valorise votre sérieux"
        ]
      },
      {
        "titre": "Votre valeur, amplifiée",
        "texte": "Plus de regards, plus de rencontres justes, une progression sereine de vos revenus, à votre rythme."
      }
    ],
    "citation": "Votre talent mérite une belle lumière.",
    "actionLabel": "Découvrir Premium en ligne",
    "actionUrl": "https://shalify.app/premium-createur"
  },
  "en": {
    "eyebrow": "CREATOR PREMIUM",
    "titre": "Creator premium",
    "intro": "Give your presence a finer elegance and let your knowledge shine before more members.",
    "blocs": [
      {
        "titre": "A highlighted showcase",
        "texte": "Your profile earns a choice spot, careful spotlighting and cues that inspire trust at first glance."
      },
      {
        "titre": "Tools that reach far",
        "puces": [
          "Detailed statistics of your visits",
          "Priority placement in the sections",
          "Guided replies for your offers",
          "A badge that honors your care"
        ]
      },
      {
        "titre": "Your value, amplified",
        "texte": "More eyes, more fitting encounters, a serene rise in your earnings, at your own pace."
      }
    ],
    "citation": "Your talent deserves a beautiful light.",
    "actionLabel": "Discover Premium online",
    "actionUrl": "https://shalify.app/premium-createur"
  },
  "ar": {
    "eyebrow": "بريميوم للمبدع",
    "titre": "بريميوم للمبدع",
    "intro": "امنح حضورك أناقة أرقى، ودع معرفتك تشعّ أمام عدد أكبر من الأعضاء.",
    "blocs": [
      {
        "titre": "واجهة مُبرَزة",
        "texte": "يحصل ملفّك على مكان متميّز، وإضاءة معتنى بها، وإشارات تبعث الثقة من النظرة الأولى."
      },
      {
        "titre": "أدوات تصل بعيدًا",
        "puces": [
          "إحصاءات مفصّلة لزياراتك",
          "إبراز في الأبواب",
          "ردود موجَّهة لعروضك",
          "شارة تُثمّن جدّيتك"
        ]
      },
      {
        "titre": "قيمتك، مُضاعَفة",
        "texte": "أنظار أكثر، لقاءات أنسب، وارتفاع هادئ لأرباحك، على إيقاعك."
      }
    ],
    "citation": "موهبتك تستحق نورًا جميلًا.",
    "actionLabel": "اكتشف بريميوم",
    "actionUrl": "https://shalify.app/premium-createur"
  }
};

export function PremiumCreateurScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

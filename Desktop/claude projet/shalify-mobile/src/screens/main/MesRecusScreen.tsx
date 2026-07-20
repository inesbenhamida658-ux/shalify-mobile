import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "MES REÇUS",
    "titre": "Mes reçus",
    "intro": "Chaque vente honorée génère un reçu clair, prêt à garder et à partager avec vos membres.",
    "blocs": [
      {
        "titre": "Un justificatif soigné",
        "texte": "Prestation, date, membre accompagné et montant réglé : le reçu réunit tout, présenté avec la même élégance que votre espace."
      },
      {
        "titre": "Toujours à portée",
        "texte": "Vos reçus restent réunis au même endroit. Vous les retrouvez quand vous le souhaitez, prêts à télécharger."
      },
      {
        "titre": "Simple à transmettre",
        "puces": [
          "Un membre le demande : vous l’envoyez en un geste",
          "Votre comptabilité reste limpide",
          "Vos revenus gardent une trace nette"
        ]
      }
    ],
    "citation": "La clarté nourrit la confiance.",
    "actionLabel": "Voir mes reçus en ligne",
    "actionUrl": "https://shalify.app/mes-recus"
  },
  "en": {
    "eyebrow": "MY RECEIPTS",
    "titre": "My receipts",
    "intro": "Every honored sale creates a clear receipt, ready to keep and share with your members.",
    "blocs": [
      {
        "titre": "A polished record",
        "texte": "Service, date, member supported and amount settled: the receipt gathers it all, presented with the same elegance as your space."
      },
      {
        "titre": "Always within reach",
        "texte": "Your receipts stay gathered in one place. You find them whenever you wish, ready to download."
      },
      {
        "titre": "Simple to send",
        "puces": [
          "A member asks: you send it in one gesture",
          "Your bookkeeping stays clear",
          "Your earnings keep a clean trace"
        ]
      }
    ],
    "citation": "Clarity nourishes trust.",
    "actionLabel": "View my receipts online",
    "actionUrl": "https://shalify.app/mes-recus"
  },
  "ar": {
    "eyebrow": "إيصالاتي",
    "titre": "إيصالاتي",
    "intro": "كل عملية بيع مُكرَّمة تُنشئ إيصالًا واضحًا، جاهزًا للحفظ والمشاركة مع أعضائك.",
    "blocs": [
      {
        "titre": "سجلّ أنيق",
        "texte": "الخدمة، التاريخ، العضو المرافَق والمبلغ المسدَّد: يجمع الإيصال كل ذلك، مقدَّمًا بالأناقة نفسها التي تميّز مساحتك."
      },
      {
        "titre": "دائمًا في المتناول",
        "texte": "تبقى إيصالاتك مجموعة في مكان واحد. تجدها متى شئت، جاهزة للتنزيل."
      },
      {
        "titre": "سهل الإرسال",
        "puces": [
          "يطلبه عضو: ترسله بحركة واحدة",
          "تبقى محاسبتك واضحة",
          "تحتفظ أرباحك بأثر نظيف"
        ]
      }
    ],
    "citation": "الوضوح يغذّي الثقة.",
    "actionLabel": "اطّلع على إيصالاتي",
    "actionUrl": "https://shalify.app/mes-recus"
  }
};

export function MesRecusScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

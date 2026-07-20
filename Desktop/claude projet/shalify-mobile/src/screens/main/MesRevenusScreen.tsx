import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "MON TABLEAU DE REVENUS",
    "titre": "Mes revenus",
    "intro": "Suivez vos ventes réelles en toute clarté. Chaque montant provient de vos réservations confirmées.",
    "blocs": [
      {
        "titre": "Une vue limpide",
        "texte": "Revenu total, part encaissée sur trente jours, ventes réglées : tout se lit d’un regard, mis à jour à chaque réservation honorée."
      },
      {
        "titre": "Votre part revient à vous",
        "texte": "La part créateur représente 75 % de chaque vente. Elle vous est acquise dès que la réservation est confirmée."
      },
      {
        "titre": "Le détail de chaque vente",
        "puces": [
          "La date et la prestation vendue",
          "Le membre accompagné",
          "Le montant et votre part exacte",
          "Le reçu prêt à consulter"
        ]
      }
    ],
    "citation": "Ce que vous savez faire porte une vraie valeur.",
    "actionLabel": "Ouvrir mon tableau en ligne",
    "actionUrl": "https://shalify.app/mes-revenus"
  },
  "en": {
    "eyebrow": "MY EARNINGS BOARD",
    "titre": "My earnings",
    "intro": "Follow your real sales with full clarity. Every amount comes from your confirmed bookings.",
    "blocs": [
      {
        "titre": "A clear view",
        "texte": "Total earnings, share collected over thirty days, settled sales: everything reads at a glance, refreshed with each honored booking."
      },
      {
        "titre": "Your share is yours",
        "texte": "The creator share is 75% of each sale. It becomes yours as soon as the booking is confirmed."
      },
      {
        "titre": "The detail of each sale",
        "puces": [
          "The date and the service sold",
          "The member supported",
          "The amount and your exact share",
          "The receipt ready to view"
        ]
      }
    ],
    "citation": "What you know how to do carries real value.",
    "actionLabel": "Open my board online",
    "actionUrl": "https://shalify.app/mes-revenus"
  },
  "ar": {
    "eyebrow": "لوحة أرباحي",
    "titre": "أرباحي",
    "intro": "تابع مبيعاتك الحقيقية بكل وضوح. كل مبلغ يأتي من حجوزاتك المؤكدة.",
    "blocs": [
      {
        "titre": "رؤية واضحة",
        "texte": "إجمالي الأرباح، الحصة المحصّلة خلال ثلاثين يومًا، المبيعات المسدّدة: كل شيء يُقرأ بنظرة واحدة، ويتحدّث مع كل حجز مُكرَّم."
      },
      {
        "titre": "حصّتك لك",
        "texte": "حصة المبدع هي 75% من كل عملية بيع. تصبح لك بمجرد تأكيد الحجز."
      },
      {
        "titre": "تفاصيل كل عملية بيع",
        "puces": [
          "التاريخ والخدمة المُباعة",
          "العضو المرافَق",
          "المبلغ وحصتك بالضبط",
          "الإيصال جاهز للاطلاع"
        ]
      }
    ],
    "citation": "ما تُتقنه يحمل قيمة حقيقية.",
    "actionLabel": "افتح لوحتي على الإنترنت",
    "actionUrl": "https://shalify.app/mes-revenus"
  }
};

export function MesRevenusScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      image="/rituel-matin-lever.jpg"
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

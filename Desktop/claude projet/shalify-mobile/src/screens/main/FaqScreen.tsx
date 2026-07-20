import React from 'react';
import { ContentScreen, type ContentData } from '../../components';
import { useLang } from '../../context/LangContext';

const TXT: Record<string, ContentData> = {
  "fr": {
    "eyebrow": "QUESTIONS FRÉQUENTES",
    "titre": "Questions fréquentes",
    "intro": "Les réponses aux questions les plus courantes, pour avancer sur Shalify en confiance.",
    "blocs": [
      {
        "titre": "Qui peut rejoindre Shalify ?",
        "texte": "Toute personne portant un savoir à partager. Votre expérience de vie est une vraie qualification, au même titre qu’un diplôme."
      },
      {
        "titre": "Comment sont fixés les revenus ?",
        "texte": "Vous choisissez vos prix. La part créateur représente 75 % de chaque vente et vous revient dès la réservation confirmée."
      },
      {
        "titre": "Comment fonctionnent les réservations ?",
        "texte": "Un membre réserve un créneau, reçoit une confirmation avec référence, et vous retrouvez chaque rendez-vous dans votre agenda."
      },
      {
        "titre": "Mes données restent-elles protégées ?",
        "texte": "Vos informations restent chez vous, en local. La confidentialité et la sérénité passent avant tout."
      },
      {
        "titre": "Puis-je avancer à mon rythme ?",
        "texte": "Oui. Vous construisez votre présence étape par étape, en toute liberté, selon vos disponibilités."
      }
    ],
    "citation": "Une réponse claire ouvre toujours le pas suivant.",
    "actionLabel": "Voir toutes les réponses en ligne",
    "actionUrl": "https://shalify.app/faq"
  },
  "en": {
    "eyebrow": "FREQUENT QUESTIONS",
    "titre": "Frequent questions",
    "intro": "Answers to the most common questions, to move forward on Shalify with confidence.",
    "blocs": [
      {
        "titre": "Who can join Shalify?",
        "texte": "Anyone carrying a knowledge to share. Your life experience is a real qualification, just like a diploma."
      },
      {
        "titre": "How are earnings set?",
        "texte": "You choose your prices. The creator share is 75% of each sale and returns to you as soon as the booking is confirmed."
      },
      {
        "titre": "How do bookings work?",
        "texte": "A member books a slot, receives a confirmation with a reference, and you find each appointment in your agenda."
      },
      {
        "titre": "Do my data stay protected?",
        "texte": "Your information stays with you, local. Confidentiality and serenity come first."
      },
      {
        "titre": "Can I move at my own pace?",
        "texte": "Yes. You build your presence step by step, without pressure, according to your availability."
      }
    ],
    "citation": "A clear answer always opens the next step.",
    "actionLabel": "See all answers online",
    "actionUrl": "https://shalify.app/faq"
  },
  "ar": {
    "eyebrow": "أسئلة متكرّرة",
    "titre": "أسئلة متكرّرة",
    "intro": "إجابات على أكثر الأسئلة شيوعًا، للتقدّم على شاليفي بثقة.",
    "blocs": [
      {
        "titre": "من يمكنه الانضمام إلى شاليفي؟",
        "texte": "كل من يحمل معرفة ليشاركها. تجربتك في الحياة مؤهّل حقيقي، شأنها شأن الشهادة."
      },
      {
        "titre": "كيف تُحدَّد الأرباح؟",
        "texte": "تختار أسعارك. حصة المبدع 75% من كل بيع وتعود إليك بمجرد تأكيد الحجز."
      },
      {
        "titre": "كيف تعمل الحجوزات؟",
        "texte": "يحجز العضو موعدًا، ويتلقّى تأكيدًا مع مرجع، وتجد كل موعد في أجندتك."
      },
      {
        "titre": "هل تبقى بياناتي محمية؟",
        "texte": "تبقى معلوماتك عندك، محليًّا. الخصوصية والطمأنينة أولًا."
      },
      {
        "titre": "هل أتقدّم على إيقاعي؟",
        "texte": "نعم. تبني حضورك خطوة بخطوة، بلا ضغط، حسب أوقاتك."
      }
    ],
    "citation": "الإجابة الواضحة تفتح دائمًا الخطوة التالية.",
    "actionLabel": "اطّلع على كل الإجابات على الإنترنت",
    "actionUrl": "https://shalify.app/faq"
  }
};

export function FaqScreen() {
  const { lang } = useLang();
  return (
    <ContentScreen
      data={TXT[lang] ?? TXT.fr}
    />
  );
}

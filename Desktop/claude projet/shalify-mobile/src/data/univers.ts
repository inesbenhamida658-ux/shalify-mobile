// Les 7 univers Shalify (ordre immuable — voir DESIGN-SHALIFY-VALIDE.md).
// Sections fixes de l'accueil. Les images viennent EN DIRECT du site (shalify.app),
// donc zéro doublon : l'app affiche les vraies photos du site, par internet.
export interface Univers {
  id: string;
  roman: string;
  rubrique: string; // valeur exacte côté API pour filtrer les créateurs
  image: string;    // photo réelle hébergée sur le site
  fr: string;
  en: string;
  ar: string;
  sousFr: string;
  sousEn: string;
  sousAr: string;
}

const SITE = 'https://shalify.app';

export const UNIVERS: Univers[] = [
  { id: 'competences', roman: 'I', rubrique: 'Compétences', image: `${SITE}/competence.jpg`, fr: 'Compétences', en: 'Skills', ar: 'المهارات',
    sousFr: 'Avocats, architectes, ingénieurs, experts', sousEn: 'Lawyers, architects, engineers, experts', sousAr: 'محامون، مهندسون، خبراء' },
  { id: 'artisanat', roman: 'II', rubrique: 'Artisanat & Création', image: `${SITE}/savoir.jpg`, fr: 'Artisanat & Création', en: 'Craft & Creation', ar: 'الحِرف والإبداع',
    sousFr: 'Cuisiniers, musiciens, artistes, couturiers', sousEn: 'Cooks, musicians, artists, tailors', sousAr: 'طهاة، موسيقيون، فنانون' },
  { id: 'transformation', roman: 'III', rubrique: 'Transformation', image: `${SITE}/poster-transformation.jpg`, fr: 'Transformation', en: 'Transformation', ar: 'التحوّل',
    sousFr: 'Coachs, praticiens, yoga, méditation', sousEn: 'Coaches, practitioners, yoga, meditation', sousAr: 'مدرّبون، يوغا، تأمل' },
  { id: 'savoirs', roman: 'IV', rubrique: 'Savoirs', image: `${SITE}/poster-savoirs.jpg`, fr: 'Savoirs', en: 'Knowledge', ar: 'المعارف',
    sousFr: 'Formations, audios, livres, masterclasses', sousEn: 'Courses, audios, books, masterclasses', sousAr: 'دورات، كتب، ماستر كلاس' },
  { id: 'lives', roman: 'V', rubrique: 'Lives', image: `${SITE}/meditation-bien-etre.jpg`, fr: 'Lives', en: 'Lives', ar: 'البث المباشر',
    sousFr: 'Sessions en direct, conférences, ateliers', sousEn: 'Live sessions, talks, workshops', sousAr: 'جلسات مباشرة، ورشات' },
  { id: 'resonance', roman: 'VI', rubrique: 'Résonance', image: `${SITE}/amour1.jpg`, fr: 'Résonance', en: 'Resonance', ar: 'التناغم',
    sousFr: 'Connexions par valeurs, profils vérifiés', sousEn: 'Value-based connections, verified profiles', sousAr: 'روابط بالقيم، ملفات موثقة' },
  { id: 'autres', roman: 'VII', rubrique: 'Autres talents & savoir-faire', image: `${SITE}/competence.jpg`, fr: 'Autres talents & savoir-faire', en: 'Other talents & know-how', ar: 'مواهب ومهارات أخرى',
    sousFr: 'Mères, retraités, jardiniers, autodidactes', sousEn: 'Parents, retirees, gardeners, self-taught', sousAr: 'أمهات، متقاعدون، عصاميون' },
];

export function universLabel(u: Univers, lang: string): string {
  return lang === 'en' ? u.en : lang === 'ar' ? u.ar : u.fr;
}
export function universSous(u: Univers, lang: string): string {
  return lang === 'en' ? u.sousEn : lang === 'ar' ? u.sousAr : u.sousFr;
}

// Stockage local des « expériences douces » et de la finition.
// AsyncStorage uniquement — données non sensibles, hors connexion.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todayKey } from './rituel';

// --- Petites victoires ---------------------------------------------------
const VICTOIRES_KEY = 'shalify_victoires';
export interface VictoireEntry { date: string; text: string; }

export async function getVictoires(): Promise<VictoireEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(VICTOIRES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
export async function addVictoire(text: string, now: Date = new Date()): Promise<VictoireEntry[]> {
  const clean = text.trim();
  if (!clean) return getVictoires();
  const current = await getVictoires();
  const updated = [{ date: todayKey(now), text: clean }, ...current].slice(0, 100);
  await AsyncStorage.setItem(VICTOIRES_KEY, JSON.stringify(updated));
  return updated;
}
export async function removeVictoire(index: number): Promise<VictoireEntry[]> {
  const current = await getVictoires();
  const updated = current.filter((_, i) => i !== index);
  await AsyncStorage.setItem(VICTOIRES_KEY, JSON.stringify(updated));
  return updated;
}

// --- Affirmation personnelle ---------------------------------------------
const AFFIRMATION_KEY = 'shalify_affirmation';
export async function getAffirmation(): Promise<string> {
  try { return (await AsyncStorage.getItem(AFFIRMATION_KEY)) ?? ''; } catch { return ''; }
}
export async function saveAffirmation(text: string): Promise<void> {
  await AsyncStorage.setItem(AFFIRMATION_KEY, text.trim());
}

// --- Météo intérieure (dernier ciel choisi) ------------------------------
const CIEL_KEY = 'shalify_ciel_du_jour';
export interface CielChoisi { date: string; key: string; }
export async function getCiel(): Promise<CielChoisi | null> {
  try {
    const raw = await AsyncStorage.getItem(CIEL_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
export async function saveCiel(key: string, now: Date = new Date()): Promise<void> {
  await AsyncStorage.setItem(CIEL_KEY, JSON.stringify({ date: todayKey(now), key }));
}

// --- Parcours 21 jours (jours cochés) ------------------------------------
const PARCOURS21_KEY = 'shalify_parcours21';
export async function getParcours21(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(PARCOURS21_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
export async function toggleParcours21(jour: number): Promise<number[]> {
  const current = await getParcours21();
  const updated = current.includes(jour) ? current.filter(j => j !== jour) : [...current, jour];
  await AsyncStorage.setItem(PARCOURS21_KEY, JSON.stringify(updated));
  return updated;
}

// --- Fiches créateurs récemment vues -------------------------------------
const RECENTS_KEY = 'shalify_recents';
export interface RecentCreator { id: string; nom: string; rubrique: string; photoUrl?: string; }
export async function getRecents(): Promise<RecentCreator[]> {
  try {
    const raw = await AsyncStorage.getItem(RECENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
export async function pushRecent(item: RecentCreator): Promise<void> {
  try {
    const current = await getRecents();
    const deduped = [item, ...current.filter(c => c.id !== item.id)].slice(0, 8);
    await AsyncStorage.setItem(RECENTS_KEY, JSON.stringify(deduped));
  } catch { /* non bloquant */ }
}

// --- Résultat du test de découverte --------------------------------------
const TEST_RESULT_KEY = 'shalify_test_result';
export async function getTestResult(): Promise<string | null> {
  try { return await AsyncStorage.getItem(TEST_RESULT_KEY); } catch { return null; }
}
export async function saveTestResult(profilKey: string): Promise<void> {
  await AsyncStorage.setItem(TEST_RESULT_KEY, profilKey);
}

// --- Taille du texte (accessibilité) -------------------------------------
const TEXT_SCALE_KEY = 'shalify_text_scale';
export type TextScale = 0.9 | 1 | 1.15 | 1.3;
export async function getTextScale(): Promise<TextScale> {
  try {
    const raw = await AsyncStorage.getItem(TEXT_SCALE_KEY);
    const n = raw ? Number(raw) : 1;
    return ([0.9, 1, 1.15, 1.3].includes(n) ? n : 1) as TextScale;
  } catch { return 1; }
}
export async function saveTextScale(scale: TextScale): Promise<void> {
  await AsyncStorage.setItem(TEXT_SCALE_KEY, String(scale));
}

// --- Onboarding vu -------------------------------------------------------
const ONBOARDING_KEY = 'shalify_onboarding_seen';
export async function hasSeenOnboarding(): Promise<boolean> {
  try { return (await AsyncStorage.getItem(ONBOARDING_KEY)) === '1'; } catch { return true; }
}
export async function markOnboardingSeen(): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_KEY, '1');
}

// --- Rappel doux du jour (opt-in, 100 % local) ---------------------------
// Aucune permission native : un simple réglage local. Le message doux
// s'affiche à l'ouverture, une seule fois par jour, si le rappel est activé.
const RAPPEL_KEY = 'shalify_rappel_actif';
const RAPPEL_VU_KEY = 'shalify_rappel_dernier_jour';

export async function getRappelActif(): Promise<boolean> {
  try { return (await AsyncStorage.getItem(RAPPEL_KEY)) === '1'; } catch { return false; }
}
export async function setRappelActif(actif: boolean): Promise<void> {
  await AsyncStorage.setItem(RAPPEL_KEY, actif ? '1' : '0').catch(() => {});
}
// Renvoie true une seule fois par jour tant que le rappel est activé.
export async function shouldShowRappel(now: Date = new Date()): Promise<boolean> {
  try {
    if ((await AsyncStorage.getItem(RAPPEL_KEY)) !== '1') return false;
    const today = todayKey(now);
    if ((await AsyncStorage.getItem(RAPPEL_VU_KEY)) === today) return false;
    await AsyncStorage.setItem(RAPPEL_VU_KEY, today);
    return true;
  } catch { return false; }
}

// --- Marque-pages de formations (local) ----------------------------------
// Retrouvables dans Ma bibliothèque. Zéro donnée sensible, zéro serveur.
const BOOKMARKS_KEY = 'shalify_formations_marquees';
export interface FormationMarquee { id: string; titre: string; auteur?: string; }

export async function getBookmarks(): Promise<FormationMarquee[]> {
  try {
    const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
export async function isBookmarked(id: string): Promise<boolean> {
  return (await getBookmarks()).some(b => b.id === id);
}
export async function toggleBookmark(item: FormationMarquee): Promise<FormationMarquee[]> {
  const current = await getBookmarks();
  const exists = current.some(b => b.id === item.id);
  const updated = exists ? current.filter(b => b.id !== item.id) : [item, ...current].slice(0, 60);
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated)).catch(() => {});
  return updated;
}

// --- Progression de lecture d'une formation (points d'or, local) ---------
// map { formationId: nombre d'étapes lues }. Simple compteur 0..total.
const READING_KEY = 'shalify_lecture_progress';
export type ReadingProgress = Record<string, number>;

export async function getReadingProgress(): Promise<ReadingProgress> {
  try {
    const raw = await AsyncStorage.getItem(READING_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
export async function setReadingStep(id: string, step: number): Promise<ReadingProgress> {
  const current = await getReadingProgress();
  const safe = Math.max(0, Math.round(step));
  const updated = { ...current, [id]: safe };
  await AsyncStorage.setItem(READING_KEY, JSON.stringify(updated)).catch(() => {});
  return updated;
}

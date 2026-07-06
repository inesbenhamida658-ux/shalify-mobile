// Stockage local du rituel Shalify (streak, gratitude, quiz de valeurs, parrainage).
// AsyncStorage uniquement — données non sensibles, fonctionne hors connexion.
import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = 'shalify_streak';
const GRATITUDE_KEY = 'shalify_gratitude';
const QUIZ_KEY = 'shalify_quiz_values';
const REFERRAL_KEY = 'shalify_referral_code';

// --- Date locale au format YYYY-MM-DD (sans fuseau UTC) ------------------
export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function yesterdayKey(d: Date = new Date()): string {
  const y = new Date(d.getTime() - 86400000);
  return todayKey(y);
}

// --- Streak quotidien ----------------------------------------------------
export interface StreakState { count: number; last: string; }

export async function getStreak(): Promise<StreakState> {
  try {
    const raw = await AsyncStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { count: 0, last: '' };
}

// À appeler à l’ouverture du rituel : incrémente si nouveau jour, garde la série.
export async function touchStreak(now: Date = new Date()): Promise<StreakState> {
  const today = todayKey(now);
  const prev = await getStreak();
  let next: StreakState;
  if (prev.last === today) {
    next = prev;
  } else if (prev.last === yesterdayKey(now)) {
    next = { count: prev.count + 1, last: today };
  } else {
    next = { count: 1, last: today };
  }
  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(next));
  return next;
}

// --- Journal de gratitude ------------------------------------------------
export interface GratitudeEntry { date: string; text: string; }

export async function getGratitude(): Promise<GratitudeEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(GRATITUDE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function addGratitude(text: string, now: Date = new Date()): Promise<GratitudeEntry[]> {
  const clean = text.trim();
  if (!clean) return getGratitude();
  const current = await getGratitude();
  const entry: GratitudeEntry = { date: todayKey(now), text: clean };
  const updated = [entry, ...current].slice(0, 100);
  await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(updated));
  return updated;
}

export async function removeGratitude(index: number): Promise<GratitudeEntry[]> {
  const current = await getGratitude();
  const updated = current.filter((_, i) => i !== index);
  await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(updated));
  return updated;
}

// --- Quiz de valeurs (accueil personnalisé) ------------------------------
export async function getQuizValues(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(QUIZ_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function saveQuizValues(keys: string[]): Promise<void> {
  await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(keys));
}

export async function hasDoneQuiz(): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(QUIZ_KEY);
    return raw != null;
  } catch { return false; }
}

// --- Parrainage : code stable par appareil -------------------------------
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function makeCode(seed: string): string {
  // Hash simple et déterministe : même graine => même code.
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let out = '';
  let x = h >>> 0;
  for (let i = 0; i < 5; i++) {
    out += CODE_ALPHABET[x % CODE_ALPHABET.length];
    x = Math.floor(x / CODE_ALPHABET.length) + (i + 1) * 2654435761;
    x = x >>> 0;
  }
  return `SHALIFY-${out}`;
}

export async function getReferralCode(seed?: string): Promise<string> {
  try {
    const existing = await AsyncStorage.getItem(REFERRAL_KEY);
    if (existing) return existing;
  } catch { /* ignore */ }
  const base = (seed && seed.trim()) || `${todayKey()}-${Math.floor(Math.random() * 1e9)}`;
  const code = makeCode(base);
  try { await AsyncStorage.setItem(REFERRAL_KEY, code); } catch { /* ignore */ }
  return code;
}

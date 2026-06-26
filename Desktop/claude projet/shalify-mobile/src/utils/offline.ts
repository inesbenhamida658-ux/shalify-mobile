import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_CREATORS = 'shalify_cache_creators';
const CACHE_PREFS = 'shalify_cache_prefs';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 min

interface CacheEntry<T> { data: T; ts: number }

async function getCache<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.ts > CACHE_TTL_MS) return null;
    return entry.data;
  } catch { return null; }
}

async function setCache<T>(key: string, data: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
}

export async function getCachedCreators<T>(): Promise<T | null> {
  return getCache<T>(CACHE_CREATORS);
}

export async function setCachedCreators<T>(data: T): Promise<void> {
  return setCache(CACHE_CREATORS, data);
}

export async function getCachedPrefs<T>(): Promise<T | null> {
  return getCache<T>(CACHE_PREFS);
}

export async function setCachedPrefs<T>(data: T): Promise<void> {
  return setCache(CACHE_PREFS, data);
}

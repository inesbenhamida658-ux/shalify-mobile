// Profils bloqués par l'utilisateur — stockés en local (AsyncStorage).
// Un profil bloqué disparaît des listes publiques et de la recherche.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'shalify_blocked_creators';

export async function getBlockedIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export async function blockCreator(id: string): Promise<void> {
  const ids = await getBlockedIds();
  if (!ids.includes(id)) {
    await AsyncStorage.setItem(KEY, JSON.stringify([...ids, id]));
  }
}

export async function unblockCreator(id: string): Promise<void> {
  const ids = await getBlockedIds();
  await AsyncStorage.setItem(KEY, JSON.stringify(ids.filter(x => x !== id)));
}

export async function isBlocked(id: string): Promise<boolean> {
  return (await getBlockedIds()).includes(id);
}

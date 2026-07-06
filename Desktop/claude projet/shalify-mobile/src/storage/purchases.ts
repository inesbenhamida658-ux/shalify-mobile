// Journal local des demandes / réservations (Ma bibliothèque).
// Non sensible : sert à retrouver ce que l'on a demandé, hors connexion.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'shalify_purchases';

export interface PurchaseEntry {
  id: string;
  creatorNom: string;
  serviceTitre: string;
  prix: string;
  date: string; // JJ/MM/AAAA
}

export async function getPurchases(): Promise<PurchaseEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function addPurchase(entry: Omit<PurchaseEntry, 'id' | 'date'>): Promise<PurchaseEntry[]> {
  const current = await getPurchases();
  const d = new Date();
  const date = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  const item: PurchaseEntry = { ...entry, id: `${d.getTime()}`, date };
  const updated = [item, ...current].slice(0, 100);
  try { await AsyncStorage.setItem(KEY, JSON.stringify(updated)); } catch { /* ignore */ }
  return updated;
}

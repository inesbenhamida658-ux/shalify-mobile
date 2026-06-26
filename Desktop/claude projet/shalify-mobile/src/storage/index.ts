import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage uniquement pour données NON sensibles
const FAVORITES_KEY = 'shalify_favorites';
const CART_KEY = 'shalify_cart';
const LANG_KEY = 'shalify_mobile_lang';
const CURRENCY_KEY = 'shalify_mobile_currency';

export async function getFavorites(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function saveFavorites(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export async function addFavorite(id: string): Promise<string[]> {
  const current = await getFavorites();
  if (current.includes(id)) return current;
  const updated = [...current, id];
  await saveFavorites(updated);
  return updated;
}

export async function removeFavorite(id: string): Promise<string[]> {
  const current = await getFavorites();
  const updated = current.filter(fid => fid !== id);
  await saveFavorites(updated);
  return updated;
}

export async function getCartItems(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function saveCartItems(items: string[]): Promise<void> {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
}

export async function getCurrency(): Promise<string> {
  return (await AsyncStorage.getItem(CURRENCY_KEY)) ?? 'EUR';
}

export async function saveCurrency(currency: string): Promise<void> {
  await AsyncStorage.setItem(CURRENCY_KEY, currency);
}

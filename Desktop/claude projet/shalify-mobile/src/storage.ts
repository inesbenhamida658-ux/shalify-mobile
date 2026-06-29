import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Currency } from './types';

const CURRENCY_KEY = 'shalify_currency';
const FAVORITES_KEY = 'shalify_favorites';

export async function getCurrency(): Promise<Currency> {
  const val = await AsyncStorage.getItem(CURRENCY_KEY);
  return (val as Currency) ?? 'EUR';
}

export async function saveCurrency(currency: Currency): Promise<void> {
  await AsyncStorage.setItem(CURRENCY_KEY, currency);
}

export async function getFavorites(): Promise<string[]> {
  const val = await AsyncStorage.getItem(FAVORITES_KEY);
  return val ? (JSON.parse(val) as string[]) : [];
}

export async function addFavorite(id: string): Promise<void> {
  const current = await getFavorites();
  if (!current.includes(id)) {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...current, id]));
  }
}

export async function removeFavorite(id: string): Promise<void> {
  const current = await getFavorites();
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(current.filter(f => f !== id)));
}

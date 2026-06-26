import type { Currency } from '../types';

// Taux indicatifs seulement — TND reste base pour paiements réels
const RATES: Record<Currency, number> = {
  TND: 1,
  EUR: 0.29,
  USD: 0.32,
  GBP: 0.25,
  MAD: 3.18,
  CAD: 0.44,
};

const SYMBOLS: Record<Currency, string> = {
  TND: 'TND',
  EUR: '€',
  USD: '$',
  GBP: '£',
  MAD: 'MAD',
  CAD: 'CA$',
};

export function convertPrice(priceTND: number, currency: Currency): string {
  if (currency === 'TND') return `${priceTND} TND`;
  const converted = priceTND * RATES[currency];
  return `${SYMBOLS[currency]}${converted.toFixed(0)}`;
}

export function getCurrencyLabel(currency: Currency): string {
  return `${currency} (${SYMBOLS[currency]})`;
}

export const CURRENCIES: Currency[] = ['TND', 'EUR', 'USD', 'GBP', 'MAD', 'CAD'];

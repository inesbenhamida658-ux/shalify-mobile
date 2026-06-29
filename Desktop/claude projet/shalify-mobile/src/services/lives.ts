import { apiGet } from './api';
import type { Live } from '../types';

// Liste publique des lives — GET /api/lives renvoie { lives } (données sanitizées, triées par date)
export async function getLives(token?: string): Promise<Live[]> {
  const data = await apiGet<{ lives: Live[] }>('/api/lives', token);
  return data.lives ?? [];
}

// Lives à venir uniquement — GET /api/lives?statut=a_venir
export async function getUpcomingLives(token?: string): Promise<Live[]> {
  const data = await apiGet<{ lives: Live[] }>('/api/lives?statut=a_venir', token);
  return data.lives ?? [];
}

import { apiGet } from './api';
import { repairText } from '../utils/repairText';
import type { Live } from '../types';

// Rétablit les accents perdus à l'affichage (filet temporaire, voir repairText).
function fixLive(l: Live): Live {
  return {
    ...l,
    titre: repairText(l.titre),
    description: repairText(l.description),
    createurPrenom: repairText(l.createurPrenom),
    createurNom: repairText(l.createurNom),
  };
}

// Liste publique des lives — GET /api/lives renvoie { lives } (données sanitizées, triées par date)
export async function getLives(token?: string): Promise<Live[]> {
  const data = await apiGet<{ lives: Live[] }>('/api/lives', token);
  return (data.lives ?? []).map(fixLive);
}

// Lives à venir uniquement — GET /api/lives?statut=a_venir
export async function getUpcomingLives(token?: string): Promise<Live[]> {
  const data = await apiGet<{ lives: Live[] }>('/api/lives?statut=a_venir', token);
  return (data.lives ?? []).map(fixLive);
}

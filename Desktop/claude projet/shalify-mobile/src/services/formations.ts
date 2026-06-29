import { apiGet } from './api';
import type { Formation } from '../types';

// Liste publique des formations actives — GET /api/formations renvoie { formations }
// Triées par ventes décroissantes côté site.
export async function getFormations(token?: string): Promise<Formation[]> {
  const data = await apiGet<{ formations: Formation[] }>('/api/formations', token);
  return data.formations ?? [];
}

// Formations d'une rubrique — GET /api/formations?rubrique=...
export async function getFormationsByRubrique(rubrique: string, token?: string): Promise<Formation[]> {
  const data = await apiGet<{ formations: Formation[] }>(
    `/api/formations?rubrique=${encodeURIComponent(rubrique)}`,
    token
  );
  return data.formations ?? [];
}

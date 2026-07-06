import { apiGet } from './api';
import { repairText } from '../utils/repairText';
import type { Formation } from '../types';

// Rétablit les accents perdus à l'affichage (filet temporaire, voir repairText).
function fixFormation(f: Formation): Formation {
  return {
    ...f,
    titre: repairText(f.titre),
    description: repairText(f.description),
    createurPrenom: repairText(f.createurPrenom),
    createurNom: repairText(f.createurNom),
  };
}

// Liste publique des formations actives — GET /api/formations renvoie { formations }
// Triées par ventes décroissantes côté site.
export async function getFormations(token?: string): Promise<Formation[]> {
  const data = await apiGet<{ formations: Formation[] }>('/api/formations', token);
  return (data.formations ?? []).map(fixFormation);
}

// Formations d'une rubrique — GET /api/formations?rubrique=...
export async function getFormationsByRubrique(rubrique: string, token?: string): Promise<Formation[]> {
  const data = await apiGet<{ formations: Formation[] }>(
    `/api/formations?rubrique=${encodeURIComponent(rubrique)}`,
    token
  );
  return data.formations ?? [];
}

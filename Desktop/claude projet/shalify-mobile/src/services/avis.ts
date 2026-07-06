import { apiGet } from './api';
import { repairText } from '../utils/repairText';

// Correspond à GET /api/avis du site
export interface Avis {
  id: string;
  profilId: string;
  auteurPrenom: string;
  note: number; // 1-5
  commentaire: string;
  date: string;
}

// Avis d'un créateur — GET /api/avis?profilId=xxx renvoie { avis, moyenne, total }
export async function getAvisForProfil(
  profilId: string,
  token?: string
): Promise<{ avis: Avis[]; moyenne: number; total: number }> {
  const data = await apiGet<{ avis: Avis[]; moyenne: number; total: number }>(
    `/api/avis?profilId=${encodeURIComponent(profilId)}`,
    token
  );
  const avis = (data.avis ?? []).map(a => ({
    ...a,
    auteurPrenom: repairText(a.auteurPrenom),
    commentaire: repairText(a.commentaire),
  }));
  return { avis, moyenne: data.moyenne ?? 0, total: data.total ?? 0 };
}

// Notes moyennes de tous les créateurs — GET /api/avis?summary=1 renvoie { summary: { [id]: {moyenne,total} } }
export async function getAvisSummary(
  token?: string
): Promise<Record<string, { moyenne: number; total: number }>> {
  const data = await apiGet<{ summary: Record<string, { moyenne: number; total: number }> }>(
    `/api/avis?summary=1`,
    token
  );
  return data.summary ?? {};
}

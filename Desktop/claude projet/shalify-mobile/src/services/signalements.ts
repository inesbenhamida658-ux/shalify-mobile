import { apiPost } from './api';

// Correspond au POST /api/signalements du site
export async function signalerProfil(
  cibleId: string,
  ciblePrenom: string,
  raison: string,
  auteurEmail?: string
): Promise<{ success: boolean }> {
  return apiPost<{ success: boolean }>('/api/signalements', {
    type: 'profil',
    cibleId,
    ciblePrenom,
    raison,
    auteurEmail: auteurEmail ?? '',
    cibleUrl: `https://shalify.app/profils/${cibleId}`,
  });
}

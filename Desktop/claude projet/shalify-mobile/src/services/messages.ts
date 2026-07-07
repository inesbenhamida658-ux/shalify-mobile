import { apiGet } from './api';
import { repairText } from '../utils/repairText';
import { ENV } from '../config/env';

// Conversations réelles de l'utilisateur, lues depuis le site (Shalify Connect).
// GET /api/messages?email=... renvoie { conversations: [{ id, profil1Prenom, profil2Prenom, profil1Email }] }
export interface Conversation {
  id: string;
  prenom: string; // l'autre personne
  webUrl: string; // ouvre le fil réel sur le site
}

interface RawConv {
  id: string;
  profil1Prenom?: string;
  profil2Prenom?: string;
  profil1Email?: string;
}

export async function getConversations(email: string, token?: string): Promise<Conversation[]> {
  const addr = email.trim().toLowerCase();
  let raw: RawConv[] = [];
  try {
    const data = await apiGet<{ conversations?: RawConv[] }>(
      `/api/messages?email=${encodeURIComponent(addr)}`,
      token,
    );
    raw = data.conversations ?? [];
  } catch {
    raw = [];
  }
  return raw.map((c) => {
    const autre = (c.profil1Email ?? '').toLowerCase() === addr ? c.profil2Prenom : c.profil1Prenom;
    return {
      id: c.id,
      prenom: repairText(autre ?? ''),
      webUrl: `${ENV.API_BASE_URL}/rencontres/messages/${c.id}`,
    };
  });
}

import { apiGet } from './api';
import { repairText } from '../utils/repairText';

// Fil d'actualités agrégé — GET /api/feed renvoie { items }
// Chaque item provient de vraies données Shalify : nouveaux créateurs
// approuvés, prochains lives, nouvelles formations, posts du feed.
export interface FeedItem {
  id: string;
  type: 'createur' | 'live' | 'formation' | 'post';
  titre: string;
  texte: string;
  rubrique: string;
  auteur: string;
  photoUrl: string;
  date: string;
  dateLabel?: string;
  lien: string;
  prix?: number;
  devise?: string;
}

function fixItem(it: FeedItem): FeedItem {
  return {
    ...it,
    titre: repairText(it.titre),
    texte: repairText(it.texte),
    auteur: repairText(it.auteur),
    rubrique: repairText(it.rubrique),
  };
}

export async function getFeed(token?: string): Promise<FeedItem[]> {
  const data = await apiGet<{ items?: FeedItem[] }>('/api/feed', token);
  return (data.items ?? []).map(fixItem);
}

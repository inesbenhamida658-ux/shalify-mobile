import { apiGet } from './api';
import type { Creator } from '../types';

// Données mock si API indisponible — clairement marquées DÉMO
const MOCK_CREATORS: Creator[] = [
  {
    id: 'demo-1',
    prenom: 'Amira',
    nom: 'B.',
    bio: 'Coach PNL et hypnothérapeute. 8 ans d\'accompagnement pour retrouver clarté et confiance. [DÉMO]',
    rubrique: 'Transformation',
    tags: ['PNL', 'Hypnose', 'Confiance'],
    tarif: 60,
    devise: 'EUR',
    verified: true,
    rating: 4.9,
    reviewCount: 47,
  },
  {
    id: 'demo-2',
    prenom: 'Karim',
    nom: 'M.',
    bio: 'Artisan céramiste. J\'enseigne la poterie pour débutants et passionnés. [DÉMO]',
    rubrique: 'Artisanat & Création',
    tags: ['Céramique', 'Poterie', 'Création manuelle'],
    tarif: 45,
    devise: 'EUR',
    verified: false,
    rating: 4.7,
    reviewCount: 23,
  },
  {
    id: 'demo-3',
    prenom: 'Lina',
    nom: 'S.',
    bio: 'Nutritionniste et coach bien-être. Je t\'accompagne vers une relation apaisée avec la nourriture. [DÉMO]',
    rubrique: 'Transformation',
    tags: ['Nutrition', 'Bien-être', 'Alimentation consciente'],
    tarif: 55,
    devise: 'EUR',
    verified: true,
    rating: 4.8,
    reviewCount: 31,
  },
];

export async function getCreators(token?: string): Promise<Creator[]> {
  try {
    const data = await apiGet<{ profils: Creator[] }>('/api/profils/all', token);
    return data.profils ?? [];
  } catch {
    // Fallback données DÉMO si API indisponible
    return MOCK_CREATORS;
  }
}

export async function getCreatorById(id: string, token?: string): Promise<Creator | null> {
  try {
    const data = await apiGet<{ profil: Creator }>(`/api/profils/${id}`, token);
    return data.profil ?? null;
  } catch {
    return MOCK_CREATORS.find(c => c.id === id) ?? null;
  }
}

export async function searchCreators(query: string, token?: string): Promise<Creator[]> {
  try {
    const data = await apiGet<{ profils: Creator[] }>(`/api/recherche?q=${encodeURIComponent(query)}`, token);
    return data.profils ?? [];
  } catch {
    const q = query.toLowerCase();
    return MOCK_CREATORS.filter(c =>
      c.prenom.toLowerCase().includes(q) ||
      c.rubrique.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
  }
}

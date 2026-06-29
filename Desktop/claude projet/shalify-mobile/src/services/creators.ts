import { apiGet } from './api';
import type { Creator, Service } from '../types';

// Forme brute renvoyée par le site (GET /api/profils, GET /api/profils/[id])
interface RawService {
  titre?: string;
  description?: string;
  prix?: number;
  duree?: string;
  type?: string;
  lienPaiement?: string;
  lienKonnect?: string;
}
interface RawProfil {
  id: string;
  prenom: string;
  nom: string;
  bio?: string;
  specialite?: string;
  rubrique: string;
  photoUrl?: string;
  services?: RawService[];
  approuve?: boolean;
}

// Le site stocke les prix en TND (plateforme Tunisie)
const DEFAULT_DEVISE = 'TND';

function mapService(raw: RawService, creatorId: string, index: number): Service {
  const typeMap: Record<string, Service['type']> = {
    formation: 'formation',
    live: 'live',
    ressource: 'ressource',
    seance: 'seance',
  };
  return {
    id: `${creatorId}-svc-${index}`,
    creatorId,
    nom: raw.titre ?? 'Service',
    titre: raw.titre,
    description: raw.description,
    duree: raw.duree,
    prix: typeof raw.prix === 'number' ? raw.prix : undefined,
    devise: DEFAULT_DEVISE,
    type: typeMap[(raw.type ?? '').toLowerCase()] ?? 'seance',
    lienPaiement: raw.lienPaiement ?? raw.lienKonnect,
  };
}

function mapProfil(raw: RawProfil): Creator {
  const services = (raw.services ?? []).map((s, i) => mapService(s, raw.id, i));
  const prixServices = services.map(s => s.prix).filter((p): p is number => typeof p === 'number');
  const tarif = prixServices.length > 0 ? Math.min(...prixServices) : undefined;
  return {
    id: raw.id,
    prenom: raw.prenom,
    nom: raw.nom,
    bio: raw.bio,
    photoUrl: raw.photoUrl,
    avatar: raw.photoUrl,
    specialite: raw.specialite,
    rubrique: raw.rubrique,
    tags: raw.specialite ? [raw.specialite] : [],
    tarif,
    devise: DEFAULT_DEVISE,
    verified: raw.approuve !== false,
    services,
  };
}

// Liste publique des créateurs approuvés — GET /api/profils (PAS /api/profils/all qui est admin)
export async function getCreators(token?: string): Promise<Creator[]> {
  const data = await apiGet<{ profils: RawProfil[] }>('/api/profils', token);
  return (data.profils ?? []).map(mapProfil);
}

// Créateurs filtrés par rubrique — GET /api/profils?rubrique=...
export async function getCreatorsByRubrique(rubrique: string, token?: string): Promise<Creator[]> {
  const data = await apiGet<{ profils: RawProfil[] }>(
    `/api/profils?rubrique=${encodeURIComponent(rubrique)}`,
    token
  );
  return (data.profils ?? []).map(mapProfil);
}

// Détail d'un créateur — GET /api/profils/[id] renvoie { profil }
export async function getCreatorById(id: string, token?: string): Promise<Creator | null> {
  const data = await apiGet<{ profil: RawProfil | null }>(`/api/profils/${id}`, token);
  return data.profil ? mapProfil(data.profil) : null;
}

// Recherche — filtrage côté client sur la liste publique (robuste, zéro dépendance fragile)
export async function searchCreators(query: string, token?: string): Promise<Creator[]> {
  const all = await getCreators(token);
  const q = query.trim().toLowerCase();
  if (!q) return all;
  return all.filter(c =>
    `${c.prenom} ${c.nom}`.toLowerCase().includes(q) ||
    c.rubrique.toLowerCase().includes(q) ||
    (c.specialite ?? '').toLowerCase().includes(q) ||
    (c.bio ?? '').toLowerCase().includes(q)
  );
}

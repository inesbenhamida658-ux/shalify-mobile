import { apiGet } from './api';
import { getBlockedIds } from '../storage/blocked';
import { repairText } from '../utils/repairText';
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
  email?: string;
  bio?: string;
  specialite?: string;
  rubrique: string;
  photoUrl?: string;
  videoUrl?: string;
  galerie?: string[];
  photos?: string[];
  services?: RawService[];
  approuve?: boolean;
  ville?: string;
  pays?: string;
  createdAt?: string;
  created_at?: string;
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
  // Le site renvoie parfois une chaîne vide : on la traite comme absente (repli élégant).
  const photoUrl = raw.photoUrl && raw.photoUrl.trim() !== '' ? raw.photoUrl : undefined;
  const videoUrl = raw.videoUrl && raw.videoUrl.trim() !== '' ? raw.videoUrl : undefined;
  const galerie = (raw.galerie ?? raw.photos ?? []).filter(
    (p): p is string => typeof p === 'string' && p.trim() !== ''
  );
  return {
    id: raw.id,
    prenom: repairText(raw.prenom),
    nom: repairText(raw.nom),
    email: raw.email,
    bio: repairText(raw.bio),
    photoUrl,
    avatar: photoUrl,
    specialite: repairText(raw.specialite),
    rubrique: repairText(raw.rubrique),
    tags: raw.specialite ? [repairText(raw.specialite)] : [],
    tarif,
    devise: DEFAULT_DEVISE,
    verified: raw.approuve !== false,
    services,
    videoUrl,
    galerie,
    ville: raw.ville && raw.ville.trim() !== '' ? repairText(raw.ville) : undefined,
    pays: raw.pays && raw.pays.trim() !== '' ? repairText(raw.pays) : undefined,
    createdAt: raw.createdAt ?? raw.created_at,
  };
}

// Créateur de la semaine : choix déterministe et stable sur 7 jours.
// Change chaque semaine, jamais au hasard, jamais de fausse donnée.
export function creatorOfWeek(list: Creator[], now: Date = new Date()): Creator | null {
  if (list.length === 0) return null;
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.floor((now.getTime() - start.getTime()) / (7 * 86400000));
  return list[week % list.length];
}

// Est-ce une fiche récente ? (moins de 21 jours, si l'API renvoie la date)
export function isNewCreator(c: Creator, now: Date = new Date()): boolean {
  if (!c.createdAt) return false;
  const d = new Date(c.createdAt).getTime();
  if (Number.isNaN(d)) return false;
  return now.getTime() - d < 21 * 86400000;
}

// Masque les comptes de test / QA (l'API publique en renvoie encore quelques-uns).
// Évite d'afficher « Test1 QA » aux vraies utilisatrices.
function estCompteTest(raw: RawProfil): boolean {
  const email = (raw.email ?? '').toLowerCase();
  const bio = (raw.bio ?? '').toLowerCase();
  const nomComplet = `${raw.prenom ?? ''} ${raw.nom ?? ''}`.toLowerCase();
  return (
    email.includes('test.com') ||
    email.includes('@test.') ||
    email.includes('doublon.audit') ||
    email.includes('example.com') ||
    bio.includes('audit automatique') ||
    bio.includes('bio test') ||
    nomComplet.includes('test1 qa') ||
    nomComplet.includes('qa test')
  );
}

// Liste publique des créateurs approuvés — GET /api/profils (PAS /api/profils/all qui est admin)
export async function getCreators(token?: string): Promise<Creator[]> {
  const data = await apiGet<{ profils: RawProfil[] }>('/api/profils', token);
  const blocked = await getBlockedIds();
  return (data.profils ?? []).filter(p => !estCompteTest(p) && !blocked.includes(p.id)).map(mapProfil);
}

// Créateurs filtrés par rubrique — GET /api/profils?rubrique=...
export async function getCreatorsByRubrique(rubrique: string, token?: string): Promise<Creator[]> {
  const data = await apiGet<{ profils: RawProfil[] }>(
    `/api/profils?rubrique=${encodeURIComponent(rubrique)}`,
    token
  );
  const blocked = await getBlockedIds();
  return (data.profils ?? []).filter(p => !estCompteTest(p) && !blocked.includes(p.id)).map(mapProfil);
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

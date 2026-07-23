// Éditeur de fiche créatrice (plan point 13-16).
// Lit la fiche existante depuis /api/profils et enregistre via PUT /api/profils.
// L'édition d'une fiche déjà en base demande le code d'édition (editToken),
// reçu dans l'email de bienvenue Shalify. On le garde en mémoire sécurisée.
import * as SecureStore from 'expo-secure-store';
import { apiGet, apiPut } from './api';
import { repairText } from '../utils/repairText';

const EDIT_TOKEN_KEY = 'shalify_edit_token';

export interface EditableService {
  titre: string;
  description: string;
  duree: string;
  prix: string; // saisi en texte, converti en nombre à l'envoi
}

export interface EditableProfile {
  id?: string;
  prenom: string;
  nom: string;
  email: string;
  specialite: string;
  bio: string;
  rubrique: string;
  ville: string;
  pays: string;
  photoUrl: string;
  services: EditableService[];
  exists: boolean; // fiche déjà présente en base
}

interface RawService {
  titre?: string; nom?: string; description?: string;
  duree?: string; prix?: number; tarif?: number;
}
interface RawProfil {
  id: string; prenom?: string; nom?: string; email?: string;
  specialite?: string; bio?: string; rubrique?: string;
  ville?: string; pays?: string; photoUrl?: string; avatar?: string;
  services?: RawService[];
}

export function emptyProfile(email: string): EditableProfile {
  return {
    prenom: '', nom: '', email, specialite: '', bio: '',
    rubrique: 'Compétences', ville: '', pays: '', photoUrl: '',
    services: [], exists: false,
  };
}

export async function getEditToken(): Promise<string> {
  try {
    return (await SecureStore.getItemAsync(EDIT_TOKEN_KEY)) ?? '';
  } catch {
    return '';
  }
}

export async function setEditToken(token: string): Promise<void> {
  try {
    if (token.trim()) await SecureStore.setItemAsync(EDIT_TOKEN_KEY, token.trim());
  } catch {
    // stockage sécurisé indisponible : le code reste saisi pour cette session
  }
}

// Récupère la fiche de la personne connectée (par identifiant de fiche ou email).
export async function getMyProfile(email: string, profilId?: string, token?: string): Promise<EditableProfile> {
  const base = emptyProfile(email);
  try {
    const data: { profil?: RawProfil | null; profils?: RawProfil[] } = token
      ? await apiGet<{ profil?: RawProfil | null }>('/api/profils?mine=1', token)
      : await apiGet<{ profils?: RawProfil[] }>('/api/profils');
    const list: RawProfil[] = data.profils ?? (data.profil ? [data.profil] : []);
    const mine = list.find((p: RawProfil) =>
      (profilId && p.id === profilId) ||
      (p.email ?? '').toLowerCase() === email.toLowerCase(),
    );
    if (!mine) return base;
    return {
      id: mine.id,
      prenom: repairText(mine.prenom ?? ''),
      nom: repairText(mine.nom ?? ''),
      email,
      specialite: repairText(mine.specialite ?? ''),
      bio: repairText(mine.bio ?? ''),
      rubrique: repairText(mine.rubrique ?? 'Compétences'),
      ville: repairText(mine.ville ?? ''),
      pays: repairText(mine.pays ?? ''),
      photoUrl: mine.photoUrl ?? mine.avatar ?? '',
      services: (mine.services ?? []).map((s: RawService) => ({
        titre: repairText(s.titre ?? s.nom ?? ''),
        description: repairText(s.description ?? ''),
        duree: s.duree ?? '',
        prix: (s.prix ?? s.tarif) != null ? String(s.prix ?? s.tarif) : '',
      })),
      exists: true,
    };
  } catch {
    return base;
  }
}

// Enregistre la fiche (PUT = mise à jour d'une fiche existante avec le code d'édition).
export async function saveMyProfile(
  profile: EditableProfile,
  editToken: string,
  token?: string,
): Promise<{ success: boolean }> {
  const services = profile.services
    .filter(s => s.titre.trim())
    .map(s => ({
      titre: s.titre.trim(),
      description: s.description.trim(),
      duree: s.duree.trim(),
      prix: s.prix.trim() ? Number(s.prix.replace(/[^0-9.]/g, '')) || 0 : 0,
    }));
  const body = {
    email: profile.email,
    editToken: editToken.trim(),
    prenom: profile.prenom.trim(),
    nom: profile.nom.trim(),
    bio: profile.bio.trim(),
    specialite: profile.specialite.trim(),
    rubrique: profile.rubrique,
    ville: profile.ville.trim(),
    pays: profile.pays.trim(),
    photoUrl: profile.photoUrl.trim(),
    services,
  };
  await setEditToken(editToken);
  return apiPut<{ success: boolean }>('/api/profils', body, token);
}

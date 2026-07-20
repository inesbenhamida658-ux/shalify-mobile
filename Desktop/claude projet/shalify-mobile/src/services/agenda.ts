import { apiGet, apiPost } from './api';

// Créneaux d'agenda — même backend que le site (GET /api/agenda?profilId=...).
export interface Creneau {
  id: string;
  profilId: string;
  date: string;        // YYYY-MM-DD
  heureDebut: string;  // HH:MM
  heureFin: string;    // HH:MM
  type: 'individuel' | 'groupe';
  prix: number;
  disponible: boolean;
  modalite?: 'visio' | 'presentiel' | 'telephone';
  langue?: string;
  duree?: number;
  capacite?: number;
  nbReservations?: number;
}

// Une réservation vue côté cliente (historique GET ?vue=mes-reservations).
export interface MaReservation {
  reference: string;
  profilId: string;
  creneauId: string;
  emailClient: string;
  date: string;
  heureDebut: string;
  statut: 'confirmee' | 'en_attente' | 'liste_attente' | 'annulee' | 'reportee';
  createdAt: string;
}

// Renvoie les créneaux disponibles d'un créateur (sans données personnelles des clients).
export async function getCreneaux(profilId: string, token?: string): Promise<Creneau[]> {
  const data = await apiGet<{ creneaux?: Creneau[] }>(
    `/api/agenda?profilId=${encodeURIComponent(profilId)}`,
    token
  );
  return (data.creneaux ?? []).filter(c => c.disponible);
}

// Réserve un créneau — POST /api/agenda?action=reserver. Renvoie la référence + statut.
export async function reserverCreneau(
  payload: {
    creneauId: string; profilId: string; nomClient: string; emailClient: string;
    message?: string; langueEchange?: string; fuseauClient?: string;
  },
  token?: string
): Promise<{ success?: boolean; confirmation?: string; reference?: string; listeAttente?: boolean; error?: string }> {
  return apiPost(
    '/api/agenda?action=reserver',
    payload,
    token
  );
}

// Annuler ou reporter une réservation via sa référence + l'email de la cliente.
export async function annulerReservation(
  payload: { profilId: string; reference: string; emailClient: string },
  token?: string
): Promise<{ success?: boolean; error?: string }> {
  return apiPost('/api/agenda?action=annuler', payload, token);
}

export async function reporterReservation(
  payload: { profilId: string; reference: string; emailClient: string; nouveauCreneauId?: string },
  token?: string
): Promise<{ success?: boolean; nouveauCreneauId?: string | null; error?: string }> {
  return apiPost('/api/agenda?action=reporter', payload, token);
}

// Historique des réservations de la cliente + ses favoris (anti-IDOR : email vérifié serveur).
export async function getMesReservations(
  email: string, token?: string
): Promise<{ reservations: MaReservation[]; favoris: string[] }> {
  const data = await apiGet<{ reservations?: MaReservation[]; favoris?: string[] }>(
    `/api/agenda?vue=mes-reservations&email=${encodeURIComponent(email)}`,
    token
  );
  return { reservations: data.reservations ?? [], favoris: data.favoris ?? [] };
}

// Ajouter / retirer un créateur des favoris de la cliente.
export async function basculerFavori(
  payload: { emailClient: string; profilId: string; retirer?: boolean },
  token?: string
): Promise<{ success?: boolean; favoris?: string[]; error?: string }> {
  return apiPost('/api/agenda?action=favori', payload, token);
}

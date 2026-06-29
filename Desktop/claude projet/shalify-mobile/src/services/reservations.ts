import { apiPost } from './api';

// Correspond au POST /api/reservations du site (statut initial: paiement_a_confirmer)
export interface ReservationPayload {
  profilId: string;
  createurEmail: string;
  createurNom: string;
  clientPrenom: string;
  clientEmail: string;
  clientMessage?: string;
  serviceTitle: string;
  servicePrix: string;
}

// Enregistre la réservation côté site. L'admin / le créateur la voit et la confirme
// dès réception du paiement Ziina. Renvoie l'id de réservation.
export async function createReservation(
  payload: ReservationPayload,
  token?: string
): Promise<{ success: boolean; id?: string }> {
  return apiPost<{ success: boolean; id?: string }>('/api/reservations', payload, token);
}

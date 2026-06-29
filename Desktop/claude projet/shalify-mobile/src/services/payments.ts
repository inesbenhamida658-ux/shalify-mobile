import { Linking } from 'react-native';
import { ENV } from '../config/env';
import { createReservation } from './reservations';
import type { Creator, Service, User } from '../types';

// Architecture paiement neutre. Fournisseur actif: Ziina (lien de paiement hébergé public).
// Aucune clé secrète côté app. Aucun débit géré par Shalify directement.

export interface CheckoutResult {
  reservationEnregistree: boolean;
  paiementOuvert: boolean;
}

// URL de paiement du fournisseur actif
export function getCheckoutUrl(): string | null {
  if (ENV.PAYMENT_PROVIDER === 'ziina') return ENV.ZIINA_PAYMENT_URL;
  return null;
}

// Enregistre la réservation puis ouvre la page de paiement du fournisseur.
// La réservation est best-effort: même si elle échoue, on laisse le client payer.
export async function startCheckout(params: {
  creator: Creator;
  service: Service;
  user: User;
  message?: string;
  token?: string;
}): Promise<CheckoutResult> {
  const { creator, service, user, message, token } = params;

  let reservationEnregistree = false;
  try {
    const res = await createReservation(
      {
        profilId: creator.id,
        createurEmail: creator.email ?? '',
        createurNom: `${creator.prenom} ${creator.nom}`.trim(),
        clientPrenom: user.prenom ?? '',
        clientEmail: user.email,
        clientMessage: message ?? '',
        serviceTitle: service.titre ?? service.nom,
        servicePrix: String(service.prix ?? service.tarif ?? ''),
      },
      token
    );
    reservationEnregistree = !!res.success;
  } catch {
    reservationEnregistree = false;
  }

  let paiementOuvert = false;
  const url = getCheckoutUrl();
  if (url) {
    try {
      await Linking.openURL(url);
      paiementOuvert = true;
    } catch {
      paiementOuvert = false;
    }
  }

  return { reservationEnregistree, paiementOuvert };
}

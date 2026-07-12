import { Linking } from 'react-native';
import { ENV } from '../config/env';
import { createReservation } from './reservations';
import { addPurchase } from '../storage/purchases';
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

// Item payant générique (live, formation, produit) quand il n'y a pas de couple
// créateur/service classique. Sert à brancher le paiement sur tout contenu vendable.
export interface ItemPayant {
  id: string;
  titre: string;
  prix: number | string;
  createurNom?: string;
  createurEmail?: string;
  createurId?: string;
}

// Enregistre la réservation puis ouvre la page de paiement du fournisseur.
// La réservation est best-effort: même si elle échoue, on laisse le client payer.
// Accepte soit un couple creator/service, soit un item payant générique.
export async function startCheckout(params: {
  creator?: Creator;
  service?: Service;
  item?: ItemPayant;
  user: User;
  message?: string;
  token?: string;
}): Promise<CheckoutResult> {
  const { creator, service, item, user, message, token } = params;

  // Normalise vers un jeu de champs commun (titre, prix, créateur).
  const titre = item?.titre ?? service?.titre ?? service?.nom ?? '';
  const prix = String(item?.prix ?? service?.prix ?? service?.tarif ?? '');
  const createurNom = item?.createurNom ?? (creator ? `${creator.prenom} ${creator.nom}`.trim() : 'Shalify');
  const createurEmail = item?.createurEmail ?? creator?.email ?? '';
  const profilId = item?.createurId ?? creator?.id ?? item?.id ?? '';

  let reservationEnregistree = false;
  try {
    const res = await createReservation(
      {
        profilId,
        createurEmail,
        createurNom,
        clientPrenom: user.prenom ?? '',
        clientEmail: user.email,
        clientMessage: message ?? '',
        serviceTitle: titre,
        servicePrix: prix,
      },
      token
    );
    reservationEnregistree = !!res.success;
  } catch {
    reservationEnregistree = false;
  }

  // Trace locale de la demande (Ma bibliothèque). Best-effort, jamais bloquant.
  try {
    await addPurchase({
      creatorNom: createurNom,
      serviceTitre: titre,
      prix,
    });
  } catch { /* ignore */ }

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

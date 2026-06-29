export type Lang = 'fr' | 'en' | 'ar';
export type Currency = 'TND' | 'EUR' | 'USD' | 'GBP' | 'MAD' | 'CAD';

export interface User {
  id: string;
  email: string;
  prenom?: string;
  nom?: string;
  avatar?: string;
  role: 'user' | 'createur' | 'admin';
  lang?: Lang;
  currency?: Currency;
  createdAt: string;
}

export interface Creator {
  id: string;
  prenom: string;
  nom: string;
  email?: string;
  bio?: string;
  avatar?: string;
  photoUrl?: string;
  specialite?: string;
  rubrique: string;
  tags: string[];
  tarif?: number;
  devise?: string;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  services?: Service[];
}

export interface Service {
  id: string;
  creatorId: string;
  nom: string;
  titre?: string;
  description?: string;
  duree?: string;
  prix?: number;
  tarif?: number;
  devise?: string;
  type: 'seance' | 'formation' | 'live' | 'ressource';
  // Lien de paiement fourni par le créateur (Konnect / manuel) — défini côté site
  lienPaiement?: string;
}

// Formation — correspond à GET /api/formations du site
export interface Formation {
  id: string;
  titre: string;
  description: string;
  createurPrenom: string;
  createurNom: string;
  rubrique: string;
  prix: number;
  devise: string;
  dureeTotal: string;
  niveauRequis: string;
  photoUrl?: string;
  ventes: number;
}

// Live — correspond à GET /api/lives du site (données sanitizées)
export interface Live {
  id: string;
  titre: string;
  description: string;
  createurPrenom: string;
  createurNom: string;
  rubrique: string;
  date: string;
  heure: string;
  dureeMinutes: number;
  prix: number;
  devise: string;
  placesTotal: number;
  placesReservees: number;
  statut: 'a_venir' | 'en_cours' | 'termine' | 'annule';
  photoUrl?: string;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  contenu: string;
  lu: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  dernierMessage?: string;
  dernierMessageDate?: string;
  nonLus: number;
}

export interface CartItem {
  serviceId: string;
  creatorId: string;
  titre: string;
  tarif: number;
  creatorName: string;
}

export interface Reservation {
  id: string;
  serviceId: string;
  creatorId: string;
  userId: string;
  statut: 'en_attente' | 'confirme' | 'annule';
  createdAt: string;
  note?: string;
}

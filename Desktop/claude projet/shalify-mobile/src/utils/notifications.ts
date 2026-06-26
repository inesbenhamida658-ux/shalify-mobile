// Notifications préparées — aucune permission demandée au lancement
// Activer quand Expo Notifications sera intégré et permissions accordées explicitement

export type NotifType = 'message' | 'reservation' | 'promo';

export interface NotifPayload {
  type: NotifType;
  titre: string;
  corps: string;
  data?: Record<string, string>;
}

export async function requestNotifPermission(): Promise<boolean> {
  // Ne pas appeler au lancement — attendre une action utilisateur explicite
  return false;
}

export async function scheduleLocalNotif(_payload: NotifPayload): Promise<void> {
  // TODO: implémenter avec expo-notifications après permission explicite
}

export async function registerPushToken(): Promise<string | null> {
  // TODO: enregistrer le token Expo Push après permission explicite
  return null;
}

import * as SecureStore from 'expo-secure-store';
import { apiPost, apiGet } from './api';
import type { User } from '../types';

const TOKEN_KEY = 'shalify_session_token';

export async function getStoredToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function storeToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function clearToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

// Étape 1 : demander l'envoi d'un OTP par email
export async function requestOTP(email: string): Promise<{ success: boolean }> {
  return apiPost('/api/auth/login', { email });
}

// Réponse réelle du site pour /api/auth/verify et /api/auth/login-password
interface AuthResponse {
  success?: boolean;
  token: string;
  role?: 'createur' | 'client' | 'admin';
  nom?: string;
  profilId?: string;
  user?: Partial<User>;
}

// Construit un User mobile à partir de la réponse du site (qui renvoie role/nom/profilId)
function buildUser(email: string, res: AuthResponse): User {
  if (res.user && res.user.email) return res.user as User;
  const fullName = (res.nom ?? '').trim();
  const [prenom, ...rest] = fullName.split(/\s+/).filter(Boolean);
  const role: User['role'] = res.role === 'createur' ? 'createur' : res.role === 'admin' ? 'admin' : 'user';
  return {
    id: res.profilId ?? email,
    email,
    prenom: prenom || undefined,
    nom: rest.length ? rest.join(' ') : undefined,
    role,
    createdAt: new Date().toISOString(),
  };
}

// Étape 2 : vérifier l'OTP et récupérer le token de session
export async function verifyOTP(email: string, code: string): Promise<{ token: string; user: User }> {
  const res = await apiPost<AuthResponse>('/api/auth/verify', { email, code });
  return { token: res.token, user: buildUser(email, res) };
}

// Login par mot de passe (si activé)
export async function loginWithPassword(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await apiPost<AuthResponse>('/api/auth/login-password', { email, password });
  return { token: res.token, user: buildUser(email, res) };
}

// Inscription complète : mot de passe choisi dès le départ et session ouverte.
export async function registerWithPassword(prenom: string, email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await apiPost<AuthResponse>('/api/auth/register', {
    prenom,
    email,
    password,
    role: 'client',
    pays: '',
    consentAccepte: true,
  });
  return { token: res.token, user: buildUser(email, res) };
}

// Récupérer l'utilisateur courant
export async function getMe(token: string): Promise<{ user: User | null }> {
  return apiGet('/api/auth/me', token);
}

// Mot de passe oublié
export async function forgotPassword(email: string): Promise<{ success: boolean }> {
  return apiPost('/api/auth/forgot-password', { email });
}

// Réinitialiser le mot de passe
export async function resetPassword(token: string, password: string): Promise<{ success: boolean }> {
  return apiPost('/api/auth/reset-password', { token, password });
}

// Déconnexion
export async function logout(token: string): Promise<void> {
  await apiPost('/api/auth/logout', {}, token).catch(() => {});
  await clearToken();
}

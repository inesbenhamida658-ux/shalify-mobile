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

// Étape 2 : vérifier l'OTP et récupérer le token de session
export async function verifyOTP(email: string, code: string): Promise<{ token: string; user: User }> {
  return apiPost('/api/auth/verify', { email, code });
}

// Login par mot de passe (si activé)
export async function loginWithPassword(email: string, password: string): Promise<{ token: string; user: User }> {
  return apiPost('/api/auth/login-password', { email, password });
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

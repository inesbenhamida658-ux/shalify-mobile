import { ENV } from '../config/env';

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...fetchOpts } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOpts.headers as Record<string, string> ?? {}),
  };
  if (token) headers['x-session-token'] = token;

  const res = await fetch(`${ENV.API_BASE_URL}${path}`, { ...fetchOpts, headers });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(errData.error ?? `Erreur ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  return apiFetch<T>(path, { method: 'GET', token });
}

export async function apiPost<T>(path: string, body: unknown, token?: string): Promise<T> {
  return apiFetch<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
    token,
  });
}

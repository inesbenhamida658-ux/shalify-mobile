'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getStoredToken, getMe, logout as authLogout, storeToken } from '../services/auth';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  token: null,
  loading: true,
  setAuth: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedToken = await getStoredToken();
        if (storedToken) {
          const { user: me } = await getMe(storedToken);
          if (me) { setToken(storedToken); setUser(me); }
        }
      } catch { /* session invalide ou expirée */ }
      finally { setLoading(false); }
    })();
  }, []);

  const setAuth = async (tok: string, u: User) => {
    await storeToken(tok);
    setToken(tok);
    setUser(u);
  };

  const logout = async () => {
    if (token) await authLogout(token);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }

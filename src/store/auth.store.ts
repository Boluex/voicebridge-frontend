import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  businesses?: any[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  setTokens: (access: string, refresh: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,

      setTokens: (access, refresh) => {
        set({ accessToken: access, refreshToken: refresh });
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', access);
          localStorage.setItem('refreshToken', refresh);
        }
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await authApi.login({ email, password });
          get().setTokens(data.accessToken, data.refreshToken);
          set({ user: data.user, isLoading: false });
        } catch (e) {
          set({ isLoading: false });
          throw e;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await authApi.register({ name, email, password });
          get().setTokens(data.accessToken, data.refreshToken);
          set({ user: data.user, isLoading: false });
        } catch (e) {
          set({ isLoading: false });
          throw e;
        }
      },

      logout: async () => {
        const { refreshToken } = get();
        if (refreshToken) {
          await authApi.logout(refreshToken).catch(() => {});
        }
        set({ user: null, accessToken: null, refreshToken: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/login';
        }
      },

      fetchMe: async () => {
        try {
          const { data } = await authApi.me();
          set({ user: data.user });
        } catch {
          set({ user: null });
        }
      },
    }),
    {
      name: 'voicebridge-auth',
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken, refreshToken: s.refreshToken }),
    }
  )
);

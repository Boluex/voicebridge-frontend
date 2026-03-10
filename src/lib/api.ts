import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: false,
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/api/auth/refresh`, { refreshToken });
          localStorage.setItem('accessToken', data.accessToken);
          original.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(original);
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// ─── AUTH ────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: (refreshToken: string) =>
    api.post('/auth/logout', { refreshToken }),
  me: () => api.get('/auth/me'),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token: string) =>
    api.get(`/auth/verify-email?token=${token}`),
};

// ─── BUSINESSES ──────────────────────────────────────────────────────────────
export const businessApi = {
  list: () => api.get('/businesses'),
  create: (data: any) => api.post('/businesses', data),
  get: (id: string) => api.get(`/businesses/${id}`),
  update: (id: string, data: any) => api.put(`/businesses/${id}`, data),
  delete: (id: string) => api.delete(`/businesses/${id}`),
  stats: (id: string) => api.get(`/businesses/stats/${id}`),
  getPublic: (slug: string) => api.get(`/businesses/public/${slug}`),
};

// ─── CATALOGUE ───────────────────────────────────────────────────────────────
export const catalogueApi = {
  list: (businessId: string) => api.get(`/catalogue/${businessId}`),
  create: (businessId: string, data: any) => api.post(`/catalogue/${businessId}`, data),
  update: (itemId: string, data: any) => api.put(`/catalogue/item/${itemId}`, data),
  delete: (itemId: string) => api.delete(`/catalogue/item/${itemId}`),
  toggle: (itemId: string) => api.patch(`/catalogue/item/${itemId}/toggle`),
};

// ─── ORDERS ──────────────────────────────────────────────────────────────────
export const orderApi = {
  list: (params?: { businessId?: string; status?: string; page?: number }) =>
    api.get('/orders', { params }),
  get: (id: string) => api.get(`/orders/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/orders/${id}/status`, { status }),
};

// ─── CALLS ───────────────────────────────────────────────────────────────────
export const callApi = {
  list: (params?: { businessId?: string; page?: number }) =>
    api.get('/calls', { params }),
};

// ─── PAYSTACK ────────────────────────────────────────────────────────────────
export const paystackApi = {
  listBanks: () => api.get('/paystack/banks'),
  verifyAccount: (accountNumber: string, bankCode: string) =>
    api.get(`/paystack/verify-account?account=${accountNumber}&bank=${bankCode}`),
};

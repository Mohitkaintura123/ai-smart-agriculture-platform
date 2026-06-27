/**
 * API Service Layer — Week 4
 *
 * Replaces mock data with real calls to the Express backend.
 * Backend must be running on http://localhost:5000 (or VITE_API_BASE_URL).
 *
 * Services that are NOT yet backed by the real API (auth, weather, AI) continue
 * to return mock data so every existing page keeps working exactly as before.
 */

import axios from 'axios';

// ─── Axios Instance ────────────────────────────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor — unwrap the { success, data } envelope
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    const status = error.response?.status || 500;
    const enhanced = new Error(message);
    enhanced.status = status;
    enhanced.originalError = error;
    return Promise.reject(enhanced);
  }
);

// ─── Weather Service (still uses mockData — no weather backend yet) ────────────
export const weatherService = {
  getCurrentWeather: async (_district) => {
    const { weatherData } = await import('../data/mockData.js');
    return weatherData;
  },

  getForecast: async (_district, _days = 5) => {
    const { weatherData } = await import('../data/mockData.js');
    return weatherData.forecast;
  },
};

// ─── Auth Service (still uses mockData — no auth backend yet) ─────────────────
export const authService = {
  login: async (email, _password) => {
    console.log('Login attempt:', email);
    return { success: true, user: { email, name: 'Demo Farmer' } };
  },

  logout: async () => {
    return { success: true };
  },

  register: async (userData) => {
    console.log('Register attempt:', userData);
    return { success: true };
  },
};

// ─── Farmer Service (still uses mockData — no farmer backend yet) ─────────────
export const farmerService = {
  getStats: async () => {
    const { farmerStats } = await import('../data/mockData.js');
    return farmerStats;
  },

  getFarmers: async (_cooperativeId) => {
    return [];
  },
};

// ─── Crop Service — REAL API calls to Express backend ─────────────────────────
export const cropService = {
  /** GET /api/crops — returns full cropsCatalog-style objects */
  getCropsCatalog: async () => {
    const res = await apiClient.get('/crops');
    return res.data.data;
  },

  /** GET /api/crops — returns slim cropData-style objects for Dashboard table */
  getCropsDashboard: async () => {
    const res = await apiClient.get('/crops');
    return res.data.data.map((c) => ({
      name: c.name,
      area: `${c.area} ${c.areaUnit}`,
      status: c.status,
      health: c.health,
      progress: c.progress,
    }));
  },

  /** GET /api/crops/:id */
  getCropById: async (id) => {
    const res = await apiClient.get(`/crops/${id}`);
    return res.data.data;
  },

  /** GET /api/crops/search?q= */
  searchCrops: async (q) => {
    const res = await apiClient.get('/crops/search', { params: { q } });
    return res.data.data;
  },

  /** POST /api/crops */
  createCrop: async (cropPayload) => {
    const res = await apiClient.post('/crops', cropPayload);
    return res.data.data;
  },

  /** PUT /api/crops/:id */
  updateCrop: async (id, updates) => {
    const res = await apiClient.put(`/crops/${id}`, updates);
    return res.data.data;
  },

  /** DELETE /api/crops/:id */
  deleteCrop: async (id) => {
    await apiClient.delete(`/crops/${id}`);
    return true;
  },

  /** Legacy — kept so existing code that imports cropService.getCrops() still works */
  getCrops: async () => {
    return cropService.getCropsDashboard();
  },

  analyzeImage: async (_imageFile) => {
    return { disease: null, health: 'Good', confidence: 0.92 };
  },
};

// ─── AI Service (still uses mock responses — no Gemini backend yet) ────────────
export const aiService = {
  chat: async (_message, _language = 'en') => {
    return { response: 'AI assistant coming soon. Stay tuned!' };
  },

  voiceQuery: async (_audioBlob, _language = 'hi') => {
    return { response: 'Voice assistant coming soon!' };
  },
};

export default {
  weather: weatherService,
  auth: authService,
  farmer: farmerService,
  crop: cropService,
  ai: aiService,
};

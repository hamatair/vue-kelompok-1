// src/stores/auth.js
import Api from '@/services/AxiosClient'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    initialize() {
      if (this.token) {
        Api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.fetchProfile();
      }
    },

    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await Api.post('/login', credentials);

        this.token = response.data.access_token;
        this.user = response.data.user;

        // FIX: gunakan "token"
        localStorage.setItem('token', this.token);

        Api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        return true;
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(data) {
      this.loading = true;
      this.error = null;

      try {
        const response = await Api.post('/register', data);

        this.token = response.data.access_token;
        this.user = response.data.user;

        localStorage.setItem('token', this.token);

        Api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        return true;
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(formData) {
      this.loading = true;
      this.error = null;

      try {
        await Api.post('/profile/update', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        await this.fetchProfile();
        return true;
      } catch (err) {
        this.error = err.response?.data?.message || 'Gagal update profil';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchProfile() {
      if (!this.token) return;

      try {
        const response = await Api.get('/profile');
        this.user = response.data;
      } catch (err) {
        if (err.response?.status === 401) this.logout();
      }
    },

    async logout() {
      try {
        await Api.post('/logout');
      } catch (err) {
        console.error('Logout error ignored', err);
      } finally {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        delete Api.defaults.headers.common['Authorization'];
      }
    },
  },
});

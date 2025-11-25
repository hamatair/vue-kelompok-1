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
        // Set token ke header default dari instance Api
        Api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        this.fetchProfile()
      }
    },

    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        // Gunakan instance Api
        const response = await Api.post('/login', credentials)
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)

        // Atur header Authorization untuk semua request selanjutnya
        Api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        await this.fetchProfile()
        return true
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async register(data) {
      this.loading = true
      this.error = null
      try {
        // Gunakan instance Api
        const response = await Api.post('/register', data)
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)

        // Atur header Authorization untuk semua request selanjutnya
        Api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        await this.fetchProfile()
        return true
      } catch (err) {
        if (err.response?.data?.errors) {
          // Asumsi error validasi (Laravel)
          this.error = Object.values(err.response.data.errors)[0][0]
        } else {
          this.error = err.response?.data?.message || 'Registration failed'
        }
        return false
      } finally {
        this.loading = false
      }
    },

    async fetchProfile() {
      if (!this.token) return
      try {
        // Gunakan instance Api
        const response = await Api.get('/profile')
        this.user = response.data
      } catch (err) {
        // Jika token expired (401), paksa logout
        if (err.response?.status === 401) this.logout()
      }
    },

    async fetchRecommendation() {
      if (!this.token) return null
      try {
        // Gunakan instance Api
        const response = await Api.get('/recommendation/calories')
        return response.data
      } catch (err) {
        console.error('Failed to fetch recommendation', err)
        return null
      }
    },

    async logout() {
      if (!this.token) return

      try {
        await Api.post('/logout')
      } catch (error) {
        console.error('Logout request failed, but clearing local state anyway.', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        delete Api.defaults.headers.common['Authorization']
      }
    },
  },
})

import axios from 'axios'
import { defineStore } from 'pinia'
import { api } from '@/services/api'

const API_BASE_URL = 'http://127.0.0.1:8000/api'
axios.defaults.baseURL = API_BASE_URL

const existingToken = localStorage.getItem('token')
if (existingToken) {
  const authHeader = `Bearer ${existingToken}`
  axios.defaults.headers.common['Authorization'] = authHeader
  api.defaults.headers.common['Authorization'] = authHeader
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: existingToken || null,
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setAuthHeader(token) {
      const authHeader = `Bearer ${token}`
      axios.defaults.headers.common['Authorization'] = authHeader
      api.defaults.headers.common['Authorization'] = authHeader
    },
    clearAuthHeader() {
      delete axios.defaults.headers.common['Authorization']
      delete api.defaults.headers.common['Authorization']
    },
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/login', credentials)
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)
        this.setAuthHeader(this.token)
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
        if (!data.activity) data.activity = 'jarang'
        const response = await axios.post('/register', data)
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)
        this.setAuthHeader(this.token)
        await this.fetchProfile()
        return true
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed'
        return false
      } finally {
        this.loading = false
      }
    },
    async fetchProfile() {
      if (!this.token) return
      try {
        const response = await axios.get('/profile')
        this.user = response.data
      } catch (err) {
        if (err.response?.status === 401) this.logout()
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      this.clearAuthHeader()
    },
  },
})

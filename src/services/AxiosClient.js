import axios from 'axios'

// Membuat instance Axios dengan konfigurasi default
const Api = axios.create({
  // Base URL harus menunjuk ke root API Laravel Anda
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default Api

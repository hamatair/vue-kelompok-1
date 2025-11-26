import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export function getArticles(params) {
  // Meneruskan params ke axios
  // Jika params.all ada, axios akan membuat query string: ?all=true
  return apiClient.get('/api/articles', { params });
}

export default Api

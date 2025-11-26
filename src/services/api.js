  import Api from '@/services/AxiosClient'

  const MEDICAL_RECORDS_PATH = '/medical-records'
  const CONSULTATIONS_PATH = '/consultations'
  const CATEGORIES_PATH = '/admin/article-categories'
  const ARTICLES_PATH = '/admin/articles'

  // 🟢 RIWAYAT KESEHATAN

  export const getMedicalRecords = () =>
    Api.get(MEDICAL_RECORDS_PATH)

  export const getMedicalRecord = (id) =>
    Api.get(`${MEDICAL_RECORDS_PATH}/${id}`)

  export const createMedicalRecord = (data) =>
    Api.post(MEDICAL_RECORDS_PATH, data)

  export const updateMedicalRecord = (id, data) =>
    Api.put(`${MEDICAL_RECORDS_PATH}/${id}`, data)

  export const deleteMedicalRecord = (id) =>
    Api.delete(`${MEDICAL_RECORDS_PATH}/${id}`)


  // 🟡 KONSULTASI CHATBOT


  export const fetchActiveConsultationForUser = () =>
    Api.get(`${CONSULTATIONS_PATH}/me/active`)

  export const createConsultation = () =>
    Api.post(CONSULTATIONS_PATH)

  export const fetchConsultationDetail = (id, limit = 100) =>
    Api.get(`${CONSULTATIONS_PATH}/${id}`, { params: { limit } })

  export const sendChatMessage = (consultationId, content) =>
    Api.post('/messages', { consultation_id: consultationId, content })

  export const endConsultation = (id) =>
    Api.patch(`${CONSULTATIONS_PATH}/${id}`, { status: 'selesai' })

  //  ADMIN KONSULTASI

  export function adminFetchConsultations(status) {
    return Api.get('/admin/consultations', {
      params: status ? { status } : {},
    })
  }

  export function adminUpdateConsultationStatus(id, status) {
    return Api.put(`/admin/consultations/${id}`, { status })
  }

  export function adminDeleteConsultation(id) {
    return Api.delete(`/admin/consultations/${id}`)
  }



  export const getArticles = () => 
    Api.get(ARTICLES_PATH, { params: { all: true } })
  
  export const getArticle = (id) => 
    Api.get(`${ARTICLES_PATH}/${id}`)
  
  // Jika mengirim gambar (file upload), pastikan 'data' adalah FormData
  export const createArticle = (data) => 
    Api.post(ARTICLES_PATH, data)
  
  
  export const updateArticle = (id, data) => 
    Api.post(`${ARTICLES_PATH}/${id}?_method=PUT`, data) 
    // Atau jika JSON biasa: Api.put(`${ARTICLES_PATH}/${id}`, data)
  
  export const deleteArticle = (id) => 
    Api.delete(`${ARTICLES_PATH}/${id}`)

  // 🔵 KATEGORI ARTIKEL
  
  // Ambil semua kategori
  export const getCategories = () => 
    Api.get(CATEGORIES_PATH)
  
  // Ambil satu kategori by ID
  export const getCategory = (id) => 
    Api.get(`${CATEGORIES_PATH}/${id}`)
  
  // Buat kategori baru
  export const createCategory = (data) => 
    Api.post(CATEGORIES_PATH, data)
  
  // Update kategori
  // Catatan: Jika kategori hanya berupa Teks (tanpa upload gambar), gunakan Api.put sudah cukup.
  export const updateCategory = (id, data) => 
    Api.put(`${CATEGORIES_PATH}/${id}`, data)
  
  // Hapus kategori
  export const deleteCategory = (id) => 
    Api.delete(`${CATEGORIES_PATH}/${id}`)
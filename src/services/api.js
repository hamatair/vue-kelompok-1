import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api'
const MEDICAL_RECORDS_PATH = '/medical-records'
const CONSULTATIONS_PATH = '/consultations'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

// RIWAYAT KESEHATAN
export const getMedicalRecords = () => api.get(MEDICAL_RECORDS_PATH)
export const getMedicalRecord = (id) => api.get(`${MEDICAL_RECORDS_PATH}/${id}`)
export const createMedicalRecord = (data) =>
  api.post(MEDICAL_RECORDS_PATH, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
export const updateMedicalRecord = (id, data) =>
  api.post(`${MEDICAL_RECORDS_PATH}/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
export const patchMedicalRecord = (id, data) => api.patch(`${MEDICAL_RECORDS_PATH}/${id}`, data)
export const deleteMedicalRecord = (id) => api.delete(`${MEDICAL_RECORDS_PATH}/${id}`)

// KONSULTASI CHATBOT
export const fetchActiveConsultationForUser = () => api.get(`${CONSULTATIONS_PATH}/me/active`)
export const createConsultation = () => api.post(CONSULTATIONS_PATH)
export const fetchConsultationDetail = (id, limit = 100) =>
  api.get(`${CONSULTATIONS_PATH}/${id}`, { params: { limit } })
export const sendChatMessage = (consultationId, content) =>
  api.post('/messages', { consultation_id: consultationId, content })
export const endConsultation = (id) =>
  api.patch(`${CONSULTATIONS_PATH}/${id}`, { status: 'selesai' })

export default api

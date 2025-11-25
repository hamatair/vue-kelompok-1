import Api from '@/services/AxiosClient'

const MEDICAL_RECORDS_PATH = '/medical-records'
const CONSULTATIONS_PATH = '/consultations'

// RIWAYAT KESEHATAN
export const getMedicalRecords = () => Api.get(MEDICAL_RECORDS_PATH)
export const getMedicalRecord = (id) => Api.get(`${MEDICAL_RECORDS_PATH}/${id}`)
export const createMedicalRecord = (data) =>
  Api.post(MEDICAL_RECORDS_PATH, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
export const updateMedicalRecord = (id, data) =>
  Api.post(`${MEDICAL_RECORDS_PATH}/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
export const patchMedicalRecord = (id, data) => Api.patch(`${MEDICAL_RECORDS_PATH}/${id}`, data)
export const deleteMedicalRecord = (id) => Api.delete(`${MEDICAL_RECORDS_PATH}/${id}`)
// KONSULTASI CHATBOT
export const fetchActiveConsultationForUser = () => Api.get(`${CONSULTATIONS_PATH}/me/active`)
export const createConsultation = () => Api.post(CONSULTATIONS_PATH)
export const fetchConsultationDetail = (id, limit = 100) =>
  Api.get(`${CONSULTATIONS_PATH}/${id}`, { params: { limit } })
export const sendChatMessage = (consultationId, content) =>
  Api.post('/messages', { consultation_id: consultationId, content })
export const endConsultation = (id) =>
  Api.patch(`${CONSULTATIONS_PATH}/${id}`, { status: 'selesai' })
// ADMIN KONSULTASI CHATBOT
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

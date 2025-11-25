import axios from "axios";

const API_URL = "http://localhost:8000/api";

// RIWAYAT KESEHATAN
export const getMedicalRecords = () => axios.get(`${API_URL}/medical-records`);

// export const getMedicalRecord = (id) =>
//   axios.get(`${API_URL}/medical-records/${id}`);

export const createMedicalRecord = (data) =>
  axios.post(`${API_URL}/medical-records`, data);

export const updateMedicalRecord = (id, data) =>
  axios.put(`${API_URL}/medical-records/${id}`, data);

// export const patchMedicalRecord = (id, data) =>
//   axios.patch(`${API_URL}/medical-records/${id}`, data);

export const deleteMedicalRecord = (id) =>
  axios.delete(`${API_URL}/medical-records/${id}`);

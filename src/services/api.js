import axios from "axios";

const API_URL = "http://localhost:8000/api/medical-records";

// RIWAYAT KESEHATAN
export const getMedicalRecords = () => axios.get(API_URL);
export const getMedicalRecord = (id) => axios.get(`${API_URL}/${id}`);
export const createMedicalRecord = (data) =>
  axios.post(API_URL, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateMedicalRecord = (id, data) =>
  axios.post(`${API_URL}/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const patchMedicalRecord = (id, data) =>
  axios.patch(`${API_URL}/${id}`, data);
export const deleteMedicalRecord = (id) => axios.delete(`${API_URL}/${id}`);

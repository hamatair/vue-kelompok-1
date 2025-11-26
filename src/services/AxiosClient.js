// src/services/AxiosClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Inject token yang benar
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // FIX: gunakan "token", bukan "access_token"

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle error
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API ERROR:", err.response?.data);

    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default api;
  
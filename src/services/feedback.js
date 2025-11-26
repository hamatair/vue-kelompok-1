// src/services/feedback.js
import Api from "@/services/AxiosClient";

export default {
  async getAll() {
    try {
      const res = await Api.get("/feedbacks"); // FIX: public endpoint
      return res.data; // backend return { data: [...] }
    } catch (err) {
      console.error("FEEDBACK GET ERROR:", err);
      return { data: [] };
    }
  },

  async create(payload) {
    try {
      const res = await Api.post("/feedbacks", payload); // FIX: authorized route
      return res.data;
    } catch (err) {
      console.error("FEEDBACK POST ERROR:", err);
      throw err;
    }
  },
};
import { defineStore } from "pinia";
import {
  getMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "@/services/api";

export const useMedicalRecordStore = defineStore("medicalRecordStore", {
  state: () => ({
    records: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchRecords() {
      this.loading = true;
      try {
        const response = await getMedicalRecords();
        this.records = response.data; // backend = array langsung
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async addRecord(payload) {
      try {
        const response = await createMedicalRecord(payload);
        this.records.push(response.data); // backend balikin object
      } catch (err) {
        this.error = err;
      }
    },

    async updateRecord(id, payload) {
      try {
        const response = await updateMedicalRecord(id, payload);
        const updated = response.data;

        const index = this.records.findIndex((i) => i.id === id);
        if (index !== -1) this.records[index] = updated;
      } catch (err) {
        this.error = err;
      }
    },

    async removeRecord(id) {
      try {
        await deleteMedicalRecord(id);
        this.records = this.records.filter((i) => i.id !== id);
      } catch (err) {
        this.error = err;
      }
    },
  },
});

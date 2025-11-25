import { defineStore } from 'pinia'
import {
  getMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from '../services/api'

export const useMedicalRecordStore = defineStore('medicalRecordStore', {
  state: () => ({
    records: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchRecords() {
      this.loading = true
      try {
        const response = await getMedicalRecords()
        this.records = response.data.data // Sesuaikan struktur API Laravel-mu
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    async addRecord(formData) {
      try {
        const response = await createMedicalRecord(formData)
        this.records.push(response.data.data)
      } catch (err) {
        this.error = err
      }
    },

    async updateRecord(id, formData) {
      try {
        const response = await updateMedicalRecord(id, formData)
        const updated = response.data.data

        const index = this.records.findIndex((r) => r.id === id)
        if (index !== -1) {
          this.records[index] = updated
        }
      } catch (err) {
        this.error = err
      }
    },

    async removeRecord(id) {
      try {
        await deleteMedicalRecord(id)
        this.records = this.records.filter((r) => r.id !== id)
      } catch (err) {
        this.error = err
      }
    },
  },
})

// src/stores/chatWidget.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  fetchActiveConsultationForUser,
  createConsultation,
  sendChatMessage,
  endConsultation,
} from '../services/api'

export const useChatWidgetStore = defineStore('chatWidget', () => {
  const isOpen = ref(false)
  const consultation = ref(null)
  const messages = ref([])
  const loadingInitial = ref(false)
  const sending = ref(false)
  const error = ref(null)

  const consultationId = computed(() => consultation.value?.id ?? null)
  const isFinished = computed(() => consultation.value?.status === 'selesai')

  const open = async () => {
    isOpen.value = true

    if (consultationId.value && !isFinished.value) {
      return
    }

    await ensureSession()
  }

  const close = () => {
    isOpen.value = false
  }

  const ensureSession = async () => {
    loadingInitial.value = true
    error.value = null

    try {
      const activeRes = await fetchActiveConsultationForUser()
      const active = activeRes.data?.data

      if (active) {
        consultation.value = active
        messages.value = active.messages ?? []
        return
      }

      const res = await createConsultation()
      const created = res.data.data
      consultation.value = created
      messages.value = []
    } catch (err) {
      const resp = err?.response
      error.value = resp?.data?.message || 'Gagal memulai konsultasi. Coba lagi.'
    } finally {
      loadingInitial.value = false
    }
  }

  const sendMessage = async (text) => {
    const content = text?.trim()
    if (!content) return

    if (!consultationId.value || isFinished.value) {
      await ensureSession()
      if (!consultationId.value || isFinished.value) return
    }

    sending.value = true
    error.value = null

    try {
      const res = await sendChatMessage(consultationId.value, content)

      const payload = res.data?.data || {}
      const userMsg = payload.user_message
      const assistantMsg = payload.assistant_message

      if (userMsg) messages.value.push(userMsg)
      if (assistantMsg) messages.value.push(assistantMsg)
    } catch (err) {
      console.error(err)
      const resp = err?.response

      if (resp?.status === 409) {
        error.value = resp.data?.message || 'Konsultasi sudah selesai.'
      } else {
        error.value = resp?.data?.message || 'Gagal mengirim pesan. Coba lagi.'
      }
    } finally {
      sending.value = false
    }
  }

  const finishConsultation = async () => {
    if (!consultationId.value) return
    error.value = null
    loadingInitial.value = true

    try {
      const res = await endConsultation(consultationId.value)
      consultation.value = res.data.data
    } catch (err) {
      console.error(err)
      const resp = err?.response
      error.value = resp?.data?.message || 'Gagal mengakhiri konsultasi. Coba lagi.'
    } finally {
      loadingInitial.value = false
    }
  }

  return {
    isOpen,
    consultation,
    messages,
    loadingInitial,
    sending,
    error,

    consultationId,
    isFinished,

    open,
    close,
    ensureSession,
    sendMessage,
    finishConsultation,
  }
})

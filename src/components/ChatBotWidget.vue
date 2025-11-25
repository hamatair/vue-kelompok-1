<!-- src/components/ChatWidget.vue -->
<template>
  <div>
    <button
      v-if="!chatStore.isOpen"
      type="button"
      class="fixed bottom-4 right-4 inline-flex items-center justify-center gap-2 w-14 h-14 rounded-full bg-linear-to-br from-orange-600 to-orange-700 text-slate-50 text-sm font-medium shadow-[0_10px_25px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.35)] sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 z-9999"
      @click="handleOpen"
    >
      <span class="text-base">💬</span>
      <span class="hidden sm:inline">Konsultasi</span>
    </button>

    <div
      v-else
      class="fixed bottom-4 right-4 max-h-[70vh] w-full max-w-[calc(100%-32px)] bg-white rounded-2xl flex flex-col shadow-[0_18px_40px_rgba(15,23,42,0.35)] border border-slate-200/60 overflow-hidden z-9999 sm:w-[360px] sm:max-h-[520px]"
    >
      <div
        class="bg-linear-to-br from-orange-600 to-orange-700 text-slate-50 px-4 py-3 flex items-center justify-between"
      >
        <div class="inline-flex items-center gap-2 font-semibold text-sm">
          <span class="text-lg">💬</span>
          <span>Konsultasi Chatbot</span>
        </div>

        <div class="inline-flex items-center gap-2">
          <button
            v-if="chatStore.consultation && !chatStore.isFinished"
            type="button"
            class="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-100 transition hover:bg-white/20"
            @click="handleEnd"
          >
            Akhiri
          </button>
          <button
            type="button"
            class="w-6 h-6 inline-flex items-center justify-center rounded-full bg-white/15 text-xs transition hover:bg-white/25"
            @click="chatStore.close"
          >
            ✕
          </button>
        </div>
      </div>

      <div
        class="p-3 flex-1 overflow-y-auto g-[radial-gradient(circle_at_top,#eff6ff_0%,#f9fafb_45%,#ffffff_100%)]"
      >
        <div
          v-if="!authStore.isAuthenticated"
          class="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
        >
          Silakan login terlebih dahulu untuk menggunakan konsultasi.
        </div>

        <template v-else>
          <div v-if="chatStore.loadingInitial" class="text-xs text-slate-500">
            Memuat konsultasi...
          </div>

          <div
            v-else-if="chatStore.error"
            class="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
          >
            {{ chatStore.error }}
          </div>

          <div v-else class="flex flex-col">
            <div
              v-for="msg in chatStore.messages"
              :key="msg.id"
              :class="[
                'max-w-[80%] mb-2 px-3 py-2 rounded-xl text-sm leading-tight wrap-break-word',
                msg.sender_type === 'user'
                  ? 'bg-orange-600 text-slate-50 self-end rounded-br-sm'
                  : 'bg-slate-200 text-slate-900 self-start rounded-bl-sm',
              ]"
            >
              {{ msg.content }}
            </div>

            <div
              v-if="chatStore.isFinished"
              class="mt-3 text-xs text-slate-600 font-medium bg-amber-50 border border-amber-100 rounded-lg px-3 py-2"
            >
              Sesi konsultasi ini telah selesai. Terima kasih sudah berkonsultasi 😊
            </div>

            <div v-else-if="chatStore.sending" class="text-xs text-slate-500 mt-1">
              Bot sedang mengetik...
            </div>
          </div>
        </template>
      </div>

      <form
        class="flex items-center gap-2 border-t border-slate-200 bg-slate-50 px-2 py-1.5"
        @submit.prevent="handleSend"
      >
        <input
          v-model="input"
          type="text"
          placeholder="Tulis pertanyaan kamu..."
          :disabled="
            !authStore.isAuthenticated ||
            chatStore.sending ||
            chatStore.loadingInitial ||
            chatStore.isFinished
          "
          class="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 bg-white outline-none transition disabled:opacity-60 disabled:cursor-not-allowed focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
        <button
          type="submit"
          :disabled="
            !authStore.isAuthenticated || chatStore.sending || !input.trim() || chatStore.isFinished
          "
          class="px-4 py-2 rounded-full bg-orange-600 text-slate-50 text-sm font-medium transition hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Kirim
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChatWidgetStore } from '../stores/chatBot'
import { useAuthStore } from '../stores/auth'

const chatStore = useChatWidgetStore()
const authStore = useAuthStore()
const input = ref('')

const handleOpen = async () => {
  if (!authStore.isAuthenticated) {
    alert('Silakan login terlebih dahulu.')
    return
  }
  await chatStore.open()
}

const handleSend = async () => {
  const text = input.value
  if (!text.trim()) return
  await chatStore.sendMessage(text)
  input.value = ''
}

const handleEnd = async () => {
  if (!chatStore.consultationId) return
  const ok = confirm('Yakin ingin mengakhiri sesi konsultasi ini?')
  if (!ok) return
  await chatStore.finishConsultation()
}
</script>

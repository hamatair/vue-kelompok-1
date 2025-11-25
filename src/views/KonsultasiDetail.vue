<!-- src/views/admin/AdminConsultationDetail.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchConsultationDetail, adminUpdateConsultationStatus } from '../services/api'

const route = useRoute()
const router = useRouter()

const consultation = ref(null)
const messages = ref([])

const loading = ref(false)
const error = ref('')

const loadDetail = async () => {
  loading.value = true
  error.value = ''
  try {
    const id = route.params.id
    const res = await fetchConsultationDetail(id, 200)
    const data = res.data.data ?? res.data
    consultation.value = data.consultation
    messages.value = data.messages ?? []
  } catch (err) {
    console.error(err)
    error.value = err?.response?.data?.message || 'Gagal memuat detail konsultasi.'
  } finally {
    loading.value = false
  }
}

const formatDateTime = (dt) => {
  if (!dt) return '-'
  return new Date(dt).toLocaleString()
}

const bubbleClass = (m) => {
  if (m.sender_type === 'user') {
    return 'ml-auto bg-orange-500 text-white rounded-tr-md'
  }
  if (m.sender_type === 'admin') {
    return 'ml-auto bg-emerald-500 text-white rounded-tr-md'
  }
  return 'mr-auto bg-gray-100 text-gray-800 rounded-tl-md'
}

const senderLabel = (t) => {
  if (t === 'user') return 'Pengguna'
  if (t === 'ai') return 'Bot'
  if (t === 'admin') return 'Admin'
  return t
}

const goBack = () => {
  router.push('/admin/consultations')
}

const endConsultation = async () => {
  if (!consultation.value) return
  const ok = confirm('Akhiri sesi konsultasi ini?')
  if (!ok) return
  try {
    const res = await adminUpdateConsultationStatus(consultation.value.id, 'selesai')
    consultation.value = res.data.data ?? res.data
  } catch (err) {
    alert(err?.response?.data?.message || 'Gagal mengakhiri konsultasi. Coba lagi.')
  }
}

onMounted(loadDetail)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex items-start justify-between mb-6 gap-4">
        <div class="flex items-start gap-4">
          <button
            type="button"
            @click="goBack"
            class="inline-flex items-center text-sm text-gray-500 hover:text-orange-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="w-4 h-4 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Kembali
          </button>

          <div>
            <h1 class="text-2xl font-bold text-orange-500">
              Konsultasi #{{ consultation?.id ?? route.params.id }}
            </h1>
            <p v-if="consultation" class="mt-1 text-sm text-gray-600">
              User:
              <span class="font-semibold text-gray-900">
                {{ consultation.user?.name ?? `User #${consultation.user_id}` }}
              </span>
              <span class="mx-2 text-gray-400">·</span>
              Status:
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border capitalize"
                :class="
                  consultation.status === 'aktif'
                    ? 'bg-orange-100 text-orange-600 border-orange-200'
                    : 'bg-emerald-100 text-emerald-600 border-emerald-200'
                "
              >
                {{ consultation.status }}
              </span>
            </p>
          </div>
        </div>

        <div v-if="consultation" class="flex items-center gap-2">
          <button
            v-if="consultation.status === 'aktif'"
            type="button"
            @click="endConsultation"
            class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Akhiri Konsultasi
          </button>
        </div>
      </div>

      <!-- Info ringkas konsultasi -->
      <div
        v-if="consultation"
        class="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 text-sm text-gray-600"
      >
        <div class="flex flex-wrap gap-4">
          <div>
            <div class="text-xs uppercase tracking-wide text-gray-400">Mulai</div>
            <div class="font-medium text-gray-800">
              {{ formatDateTime(consultation.started_at) }}
            </div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide text-gray-400">Selesai</div>
            <div class="font-medium text-gray-800">
              {{ consultation.ended_at ? formatDateTime(consultation.ended_at) : '-' }}
            </div>
          </div>
        </div>
      </div>

      <!-- State loading / error -->
      <div v-if="loading" class="mb-4 text-sm text-gray-500 flex items-center gap-2">
        Memuat detail konsultasi...
      </div>
      <div
        v-else-if="error"
        class="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2"
      >
        {{ error }}
      </div>

      <!-- Chat box -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
        <h2 class="text-sm font-semibold text-gray-700 mb-3">Riwayat Percakapan</h2>

        <div class="max-h-[65vh] overflow-y-auto pr-1 space-y-3 custom-scroll">
          <div
            v-for="m in messages"
            :key="m.id"
            :class="[
              'flex flex-col max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm',
              bubbleClass(m),
            ]"
          >
            <div class="flex justify-between items-center mb-1 text-[11px]">
              <span class="font-medium opacity-80">
                {{ senderLabel(m.sender_type) }}
              </span>
              <span class="opacity-70">
                {{ formatDateTime(m.sent_at) }}
              </span>
            </div>
            <div class="whitespace-pre-wrap leading-snug">
              {{ m.content }}
            </div>
          </div>

          <div v-if="messages.length === 0" class="text-center text-sm text-gray-500 py-6">
            Belum ada pesan pada sesi ini.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar halus sedikit, optional */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.6);
  border-radius: 999px;
}
</style>

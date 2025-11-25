<!-- src/views/admin/AdminConsultations.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  adminFetchConsultations,
  adminUpdateConsultationStatus,
  adminDeleteConsultation,
} from '../services/api'

const router = useRouter()

const consultations = ref([])
const loading = ref(false)
const error = ref('')
const statusFilter = ref('') // "", "aktif", "selesai"

const loadConsultations = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await adminFetchConsultations(statusFilter.value || undefined)
    consultations.value = res.data.data ?? res.data ?? []
  } catch (err) {
    console.error(err)
    error.value = err?.response?.data?.message || 'Gagal memuat daftar konsultasi.'
  } finally {
    loading.value = false
  }
}

const formatDateTime = (dt) => {
  if (!dt) return '-'
  return new Date(dt).toLocaleString()
}

const goDetail = (id) => {
  router.push(`/admin/consultations/${id}`)
}

const endConsultation = async (id) => {
  const ok = confirm(`Akhiri konsultasi #${id}?`)
  if (!ok) return
  try {
    await adminUpdateConsultationStatus(id, 'selesai')
    await loadConsultations()
  } catch (err) {
    alert(err?.response?.data?.message || 'Gagal mengakhiri konsultasi. Coba lagi.')
  }
}

const deleteConsultation = async (id) => {
  const ok = confirm(`Hapus konsultasi #${id}?`)
  if (!ok) return
  try {
    await adminDeleteConsultation(id)
    await loadConsultations()
  } catch (err) {
    alert(err?.response?.data?.message || 'Gagal menghapus konsultasi.')
  }
}

const goToCategories = () => {
  router.push('/admin/category')
}
const goToArticles = () => {
  router.push('/admin/articles')
}

onMounted(loadConsultations)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
    <div class="max-w-6xl mx-auto">
      <!-- Segment "Konsultasi" (bisa ditambah tab lain nanti kalau mau) -->
      <div class="flex justify-center mb-10">
        <div class="bg-gray-200 p-1 rounded-lg inline-flex text-sm font-medium">
          <!-- Tombol Inactive -->
          <button
            @click="goToArticles"
            class="px-5 py-2 rounded-md text-gray-500 hover:text-gray-900 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            Articles
          </button>

          <button
            @click="goToCategories"
            class="px-5 py-2 rounded-md text-gray-500 hover:text-gray-900 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            Categories
          </button>
          <!-- Tombol Active -->
          <button
            class="px-5 py-2 bg-white text-gray-800 rounded-md shadow-sm transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3.75h5.25M4.5 5.25A2.25 2.25 0 016.75 3h10.5A2.25 2.25 0 0119.5 5.25v9.75A2.25 2.25 0 0117.25 17.25H8.664l-2.658 2.214A.75.75 0 015 18.9v-1.65"
              />
            </svg>
            Konsultasi
          </button>
        </div>
      </div>

      <!-- Header + Filter -->
      <div class="mb-8 flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-bold text-orange-500 mb-1">Daftar Konsultasi</h1>
          <p class="text-gray-500 text-sm">Kelola sesi konsultasi pengguna (aktif & selesai).</p>
        </div>

        <!-- Filter status -->
        <div class="flex items-center gap-3">
          <label class="text-sm text-gray-600 flex items-center gap-2">
            <span>Status</span>
            <select
              v-model="statusFilter"
              @change="loadConsultations"
              class="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            >
              <option value="">Semua</option>
              <option value="aktif">Aktif</option>
              <option value="selesai">Selesai</option>
            </select>
          </label>
        </div>
      </div>

      <!-- State loading / error -->
      <div v-if="loading" class="mb-4 text-sm text-gray-500">Memuat data konsultasi...</div>
      <div
        v-else-if="error"
        class="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2"
      >
        {{ error }}
      </div>

      <!-- Tabel Konsultasi -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead
              class="bg-white border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs"
            >
              <tr>
                <th class="px-6 py-4 font-medium">ID</th>
                <th class="px-6 py-4 font-medium">User</th>
                <th class="px-6 py-4 font-medium">Status</th>
                <th class="px-6 py-4 font-medium">Mulai</th>
                <th class="px-6 py-4 font-medium">Selesai</th>
                <th class="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-50">
              <tr v-for="c in consultations" :key="c.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 text-gray-400">#{{ c.id }}</td>
                <td class="px-6 py-4 text-gray-800">
                  {{ c.user?.name ?? `User #${c.user_id}` }}
                </td>
                <td class="px-6 py-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium border capitalize"
                    :class="
                      c.status === 'aktif'
                        ? 'bg-orange-100 text-orange-600 border-orange-200'
                        : 'bg-emerald-100 text-emerald-600 border-emerald-200'
                    "
                  >
                    {{ c.status || 'unknown' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-gray-600">
                  {{ formatDateTime(c.started_at) }}
                </td>
                <td class="px-6 py-4 text-gray-600">
                  {{ c.ended_at ? formatDateTime(c.ended_at) : '-' }}
                </td>
                <td class="px-6 py-4 text-right space-x-3">
                  <!-- Detail -->
                  <button
                    @click="goDetail(c.id)"
                    class="inline-flex items-center text-gray-400 hover:text-orange-500 transition-colors"
                    title="Lihat detail"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.6"
                      stroke="currentColor"
                      class="w-4 h-4 mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                      />
                    </svg>
                    Detail
                  </button>

                  <!-- Akhiri (hanya kalau aktif) -->
                  <button
                    v-if="c.status === 'aktif'"
                    @click="endConsultation(c.id)"
                    class="inline-flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
                    title="Akhiri konsultasi"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.6"
                      stroke="currentColor"
                      class="w-4 h-4 mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.25 5.25h13.5m-10.5 6h7.5M9 5.25v-1.5m6 1.5v-1.5M6.75 5.25h10.5A1.5 1.5 0 0118.75 6.75v11.25a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V6.75a1.5 1.5 0 011.5-1.5z"
                      />
                    </svg>
                    Akhiri
                  </button>

                  <!-- Hapus -->
                  <button
                    @click="deleteConsultation(c.id)"
                    class="inline-flex items-center text-gray-400 hover:text-red-500 transition-colors"
                    title="Hapus konsultasi"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.6"
                      stroke="currentColor"
                      class="w-4 h-4 mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M4.772 5.79c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty state -->
          <div
            v-if="!loading && !error && consultations.length === 0"
            class="p-8 text-center text-gray-500 text-sm"
          >
            Tidak ada konsultasi untuk filter saat ini.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

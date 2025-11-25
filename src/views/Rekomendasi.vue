<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const recommendationData = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  if (!auth.token) {
    router.push('/login')
    return
  }

  const result = await auth.fetchRecommendation()

  if (result && result.data) {
    recommendationData.value = result.data
  }

  isLoading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 md:p-10">
    <div class="max-w-3xl mx-auto">

      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <button @click="router.back()"
          class="bg-white p-3 rounded-full shadow-sm hover:bg-gray-100 text-gray-600 transition">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h1 class="text-3xl font-extrabold text-gray-800">Daily Recommendation</h1>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <i class="fa-solid fa-circle-notch fa-spin text-4xl text-orange-500 mb-4"></i>
        <p class="text-gray-500">Menghitung kebutuhan kalori Anda...</p>
      </div>

      <!-- Content -->
      <div v-else-if="recommendationData" class="space-y-6 animate-fade-in">

        <!-- Kartu Utama: Kalori Harian -->
        <div
          class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div class="relative z-10">
            <h2 class="text-lg font-medium opacity-90 mb-1">Kebutuhan Kalori Harian Anda</h2>
            <div class="flex items-baseline gap-2">
              <span class="text-5xl font-extrabold">{{ recommendationData.calculation_result.daily_calorie_intake
                }}</span>
              <span class="text-xl font-bold">kkal/hari</span>
            </div>
            <p class="mt-4 text-sm opacity-90 bg-white/20 inline-block px-4 py-2 rounded-lg">
              <i class="fa-solid fa-info-circle mr-1"></i> Berdasarkan aktivitas <strong>{{
                recommendationData.user_profile.activity_level.replace('_', ' ') }}</strong>
            </p>
          </div>
          <!-- Dekorasi Background -->
          <i class="fa-solid fa-fire absolute -right-6 -bottom-10 text-9xl text-white opacity-20"></i>
        </div>

        <!-- Detail Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Kartu BMR -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <i class="fa-solid fa-bed"></i>
              </div>
              <h3 class="font-bold text-gray-800">BMR (Basal Metabolic Rate)</h3>
            </div>
            <p class="text-3xl font-bold text-gray-800">{{ recommendationData.calculation_result.basal_metabolic_rate }}
              <span class="text-sm text-gray-400 font-normal">kkal</span>
            </p>
            <p class="text-xs text-gray-500 mt-2">Energi minimal yang dibakar tubuh saat istirahat total.</p>
          </div>

          <!-- Kartu Aktivitas Fisik BARU -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 text-xl shadow-sm">
                <i class="fa-solid fa-person-running"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-800 text-lg">Tingkat Aktivitas</h3>
                <p class="text-xs text-gray-400 font-medium">Faktor Pengali Kalori</p>
              </div>
            </div>
            <p class="text-2xl font-bold text-gray-800 capitalize">{{
              recommendationData.user_profile.activity_level.replace(/_/g, ' ') }}</p>
            <p class="text-xs text-gray-500 mt-2">Level ini digunakan untuk mengalikan BMR Anda.</p>
          </div>

          <!-- Kartu Profil Fisik -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <i class="fa-solid fa-user-tag"></i>
              </div>
              <h3 class="font-bold text-gray-800">Profil Pengguna</h3>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between border-b border-gray-50 pb-1">
                <span class="text-gray-500">Usia</span>
                <span class="font-bold text-gray-800">{{ recommendationData.user_profile.age }} Tahun</span>
              </div>
              <div class="flex justify-between border-b border-gray-50 pb-1">
                <span class="text-gray-500">Berat Badan</span>
                <span class="font-bold text-gray-800">{{ recommendationData.user_profile.weight_kg }} kg</span>
              </div>
              <div class="flex justify-between border-b border-gray-50 pb-1">
                <span class="text-gray-500">Tinggi Badan</span>
                <span class="font-bold text-gray-800">{{ recommendationData.user_profile.height_cm }} cm</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Tips Box -->
        <div class="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
          <h3 class="text-blue-800 font-bold mb-2"><i class="fa-solid fa-lightbulb mr-2"></i>Saran Nutrisi</h3>
          <p class="text-blue-700 text-sm leading-relaxed">
            Untuk mencapai target kesehatan Anda, disarankan membagi total kalori ini ke dalam 3 kali makan besar dan 2
            kali camilan sehat. Pastikan asupan protein cukup untuk menjaga massa otot.
          </p>
        </div>

      </div>

      <!-- Error State (Jika data gagal load atau profil belum lengkap) -->
      <div v-else class="text-center py-10 bg-white rounded-2xl shadow-sm border border-red-100 p-8">
        <i class="fa-solid fa-triangle-exclamation text-4xl text-red-400 mb-4"></i>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Data Tidak Tersedia</h3>
        <p class="text-gray-500 mb-6">Mohon lengkapi data profil Anda (Berat, Tinggi, Tanggal Lahir) agar kami bisa
          menghitung rekomendasi.</p>
        <button @click="router.push('/dashboard')"
          class="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition">
          Kembali ke Dashboard
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>
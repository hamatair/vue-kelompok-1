<template>
  <nav class="w-full px-6 py-4 flex justify-between items-center bg-orange text-white-soft">
    <div>
      <router-link to="/" class="flex items-center gap-2 font-bold text-lg cursor-pointer">
        <img src="../assets/logo.svg" alt="Calmate Logo" class="h-9 w-9 rounded-full object-cover" />
        <div class="text-xl font-bold tracking-wide text-white">CALMATE</div>
      </router-link>
    </div>

    <div class="flex gap-8 font-semibold text-white-soft">
      <router-link @click="closeMenu" to="/" class="hover:text-orange-light">Home</router-link>
      <router-link @click="closeMenu" to="/artikel" class="hover:text-orange-light">Artikel</router-link>
      <router-link @click="closeMenu" to="/rekomendasi" class="hover:text-orange-light">Rekomendasi</router-link>
    </div>

    <!-- MENU USER -->
    <div v-if="isAuthenticated" class="relative" ref="menuRef">
      <div class="cursor-pointer flex items-center gap-2 font-semibold">
        <div @click="toggleMenu" class="flex items-center gap-2">
          <img
            :src="user.photo_url ? '/storage/' + user.photo_url : fallbackPhoto"
            class="w-10 h-10 rounded-full object-cover"
          />
          <span>{{ user.name }}</span>
        </div>
      </div>

      <div
        v-if="showMenu"
        class="absolute right-0 mt-3 w-56 bg-white-soft text-black-base rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50"
      >
        <router-link @click="closeMenu" class="hover:bg-orange-light/20 p-2 rounded block" to="/profile">
          Profile
        </router-link>

        <div @click="openRiwayatKesehatan" class="hover:bg-orange-light/20 p-2 rounded cursor-pointer">
          Riwayat Kesehatan
        </div>

        <div @click="openProgressNutrisi" class="hover:bg-orange-light/20 p-2 rounded cursor-pointer">
          Progress Nutrisi
        </div>

        <div @click="openFeedback" class="hover:bg-orange-light/20 p-2 rounded cursor-pointer">
          Feedback
        </div>

        <button
          type="button"
          @click="handleLogoutFromMenu"
          class="w-full rounded-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 text-sm transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- AUTH BUTTONS -->
    <div v-else>
      <button
        @click="handleLogin"
        class="rounded-full bg-white hover:bg-gray-100 text-orange-500 font-semibold py-2 px-4 text-sm mr-4"
      >
        Login
      </button>

      <button
        @click="handleRegister"
        class="rounded-full bg-yellow-400 hover:bg-yellow-100 text-black hover:text-orange-500 font-semibold py-2 px-4 text-sm"
      >
        Register
      </button>
    </div>

    <!-- FEEDBACK MODAL -->
    <FeedbackModal
      v-if="showFeedbackModal"
      @close="showFeedbackModal = false"
      @submit="submitFeedback"
    />
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import feedbackService from '@/services/feedback'
import FeedbackModal from '@/components/FeedbackModal.vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user || {})
const isAuthenticated = computed(() => authStore.isAuthenticated)
const router = useRouter()

const fallbackPhoto = "https://i.pravatar.cc/150?img=12"
const showMenu = ref(false)
const showFeedbackModal = ref(false)

const menuRef = ref(null)

const toggleMenu = () => (showMenu.value = !showMenu.value)
const closeMenu = () => (showMenu.value = false)

const openRiwayatKesehatan = () => { closeMenu(); router.push('/riwayat-kesehatan') }
const openProgressNutrisi = () => { closeMenu(); router.push('/progress') }

const openFeedback = () => {
  closeMenu()

  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  showFeedbackModal.value = true
}

const submitFeedback = async (payload) => {
  try {
    await feedbackService.create(payload)
    showFeedbackModal.value = false
    alert("Terima kasih! Feedback berhasil dikirim.")
  } catch (err) {
    console.error("FEEDBACK ERROR:", err)
    alert("Gagal mengirim feedback")
  }
}

const handleLogoutFromMenu = async () => {
  await authStore.logout()
  closeMenu()
  router.push('/login')
}

const handleRegister = () => router.push('/register')
const handleLogin = () => router.push('/login')

const handleClickOutside = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) showMenu.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

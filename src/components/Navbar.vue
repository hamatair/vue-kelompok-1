<template>
  <nav class="w-full px-6 py-4 flex justify-between items-center bg-orange text-white-soft">
    <div class="flex items-center gap-2 font-bold text-lg">
      <span>LOGO</span>
    </div>

    <div class="flex gap-8 font-semibold text-white-soft">
      <router-link @click="closeMenu" to="/" class="hover:text-orange-light">Home</router-link>
      <router-link @click="closeMenu" to="/artikel" class="hover:text-orange-light"
        >Artikel</router-link
      >
      <router-link @click="closeMenu" to="/rekomendasi" class="hover:text-orange-light"
        >Rekomendasi</router-link
      >
    </div>

    <div class="relative" ref="menuRef">
      <div @click="closeMenu" class="cursor-pointer flex items-center gap-2 font-semibold">
        <router-link 
        v-if="user.role == 'admin'"
         @click=" " to="/dashboard-view"
          class="hover:text-orange-light"> Dashboard </router-link>
        <!-- <router-link 
         @click="closeMenu" to="/dashboard-view"
          class="hover:text-orange-light"> Dashboard </router-link> -->
        <div @click="toggleMenu" class="cursor-pointer flex items-center gap-2 font-semibold">
          <img :src="user.photo" class="w-10 h-10 rounded-full" />
          <span>{{ user.name }}</span>
        </div>
      </div>

      <div
        v-if="showMenu"
        class="absolute right-0 mt-3 w-56 bg-white-soft text-black-base rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50"
      >
        <router-link
          @click="closeMenu"
          class="hover:bg-orange-light/20 p-2 rounded block"
          to="/profile"
        >
          Profile
        </router-link>

        <div
          @click="openRiwayatKesehatan"
          class="hover:bg-orange-light/20 p-2 rounded cursor-pointer"
        >
          Riwayat Kesehatan
        </div>

        <div
          @click="openProgressNutrisi"
          class="hover:bg-orange-light/20 p-2 rounded cursor-pointer"
        >
          Progress Nutrisi
        </div>

        <div @click="openFeedback" class="hover:bg-orange-light/20 p-2 rounded cursor-pointer">
          Feedback
        </div>

        <div
          @click="closeMenu"
          class="hover:bg-orange-light/20 p-2 rounded cursor-pointer text-red-600"
        >
          Logout
        </div>
      </div>
    </div>
  </nav>

  <div
    v-if="showFeedback"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]"
    @click.self="closeFeedback"
  >
    <div class="bg-white-soft p-8 rounded-xl shadow-xl w-[450px] max-w-full">
      <h2 class="text-2xl font-bold text-black-base mb-2">Nilai Aplikasi Kami!</h2>
      <p class="text-gray-700 mb-6 leading-relaxed">
        Kami ingin mendengar pengalaman Anda. Berikan feedback agar kami dapat terus memperbaiki
        aplikasi ini.
      </p>
      <div class="mb-6">
        <div class="font-semibold mb-2">Peringkat</div>
        <div class="flex gap-2">
          <button v-for="n in 5" :key="n" @click="setRating(n)" class="text-3xl">
            <FontAwesomeIcon
              :icon="rating >= n ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              class="text-orange cursor-pointer transition"
            />
          </button>
        </div>
      </div>
      <div>
        <div class="font-semibold mb-2">Bisakah Anda memberi tahu kami lebih lanjut?</div>
        <textarea
          v-model="text"
          placeholder="Tambahkan feedback..."
          rows="4"
          class="w-full border border-orange-light rounded-md px-3 py-2"
        ></textarea>
      </div>
      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="closeFeedback"
          class="px-4 py-2 bg-gray-300 text-black-base rounded-md font-semibold hover:bg-gray-400"
        >
          Batal
        </button>
        <button
          @click="submitFeedback"
          class="px-5 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light"
        >
          Kirim
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router' // Import router

const userStore = useUserStore()
const user = userStore.$state
const router = useRouter() // Init router

/* STATE */
const showFeedback = ref(false)
const rating = ref(0)
const text = ref('')

const showMenu = ref(false)
const menuRef = ref(null)

/* MENU HANDLERS */
const toggleMenu = () => (showMenu.value = !showMenu.value)
const closeMenu = () => (showMenu.value = false)

/* NAVIGASI (Function Style) */
const openRiwayatKesehatan = () => {
  closeMenu()
  router.push('/riwayat-kesehatan')
}

// PROGRESS NUTRISI
const openProgressNutrisi = () => {
  closeMenu()
  router.push('/progress')
}

/* FEEDBACK HANDLERS */
const openFeedback = () => {
  closeMenu()
  showFeedback.value = true
}

const closeFeedback = () => {
  showFeedback.value = false
  rating.value = 0
  text.value = ''
}

const setRating = (n) => {
  rating.value = n
}

const submitFeedback = () => {
  console.log('Feedback terkirim:', {
    rating: rating.value,
    comment: text.value,
  })
  closeFeedback()
}

/* AUTO CLOSE */
const handleClickOutside = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

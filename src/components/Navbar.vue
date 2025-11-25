<template>
  <nav class="w-full px-6 py-4 flex justify-between items-center bg-orange text-white-soft">
<<<<<<< HEAD
    <div>
      <router-link to="/" class="flex items-center gap-2 font-bold text-lg cursor-pointer">
        <img
          src="../assets/logo.svg"
          alt="Calmate Logo"
          class="h-9 w-9 rounded-full object-cover"
        />
        <div class="text-xl font-bold tracking-wide text-white">CALMATE</div>
      </router-link>
||||||| d0a6ead

    <!-- Logo -->
    <div class="flex items-center gap-2 font-bold text-lg">
      <span>LOGO</span>
=======

    <div class="flex items-center gap-2 font-bold text-lg">
      <span>LOGO</span>
>>>>>>> origin/main
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

<<<<<<< HEAD
    <div v-if="isAuthenticated" class="relative" ref="menuRef">
      <div class="cursor-pointer flex items-center gap-2 font-semibold">
        <router-link
          v-if="user.role == 'admin'"
          @click="closeMenu"
          to="/dashboard-view"
          class="hover:text-orange-light"
        >
          Dashboard
        </router-link>
        <!-- <router-link 
         @click="closeMenu" to="/dashboard-view"
          class="hover:text-orange-light"> Dashboard </router-link> -->
        <div @click="toggleMenu" class="cursor-pointer flex items-center gap-2 font-semibold">
          <!-- <img :src="user.photo" class="w-10 h-10 rounded-full" /> -->
          <img :src="'https://i.pravatar.cc/150?img=12'" class="w-10 h-10 rounded-full" />
          <span>{{ user.name }}</span>
        </div>
||||||| d0a6ead
    <!-- User -->
    <div class="relative" ref="menuRef">
      <div @click="toggleMenu" class="cursor-pointer flex items-center gap-2 font-semibold">
        <img :src="user.photo" class="w-10 h-10 rounded-full" />
        <span>{{ user.name }}</span>
=======
    <div class="relative" ref="menuRef">
      <div @click="toggleMenu" class="cursor-pointer flex items-center gap-2 font-semibold">
        <img :src="user.photo" class="w-10 h-10 rounded-full" />
        <span>{{ user.name }}</span>
>>>>>>> origin/main
      </div>

<<<<<<< HEAD
      <div
        v-if="showMenu"
        class="absolute right-0 mt-3 w-56 bg-white-soft text-black-base rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50"
      >
        <router-link
          @click="closeMenu"
          class="hover:bg-orange-light/20 p-2 rounded block"
          to="/profile"
        >
||||||| d0a6ead
      <div v-if="showMenu"
        class="absolute right-0 mt-3 w-56 bg-white-soft text-black-base rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50">
        <router-link @click="closeMenu" class="hover:bg-orange-light/20 p-2 rounded" to="/profile">
=======
      <div v-if="showMenu"
        class="absolute right-0 mt-3 w-56 bg-white-soft text-black-base rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50">
        
        <router-link @click="closeMenu" class="hover:bg-orange-light/20 p-2 rounded block" to="/profile">
>>>>>>> origin/main
          Profile
        </router-link>

        <div
          @click="openRiwayatKesehatan"
          class="hover:bg-orange-light/20 p-2 rounded cursor-pointer"
        >
          Riwayat Kesehatan
        </div>

<<<<<<< HEAD
        <div
          @click="openProgressNutrisi"
          class="hover:bg-orange-light/20 p-2 rounded cursor-pointer"
        >
||||||| d0a6ead
        <div @click="closeMenu" class="hover:bg-orange-light/20 p-2 rounded cursor-pointer">
=======
        <div @click="openProgressNutrisi" class="hover:bg-orange-light/20 p-2 rounded cursor-pointer">
>>>>>>> origin/main
          Progress Nutrisi
        </div>

        <div @click="openFeedback" class="hover:bg-orange-light/20 p-2 rounded cursor-pointer">
          Feedback
        </div>

        <button
          type="button"
          @click="handleLogoutFromMenu"
          class="w-full rounded-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 text-sm transition crusor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
    <div v-else>
      <button
        @click="handleLogin"
        class="rounded-full bg-white hover:bg-gray-100 text-orange-500 font-semibold py-2 px-4 text-sm mr-4 transition hover:cursor-pointer"
      >
        Login
      </button>
      <button
        @click="handleRegister"
        class="rounded-full bg-yellow-400 hover:bg-yellow-100 text-black hover:text-orange-500 font-semibold py-2 px-4 text-sm transition hover:cursor-pointer"
      >
        Register
      </button>
    </div>
  </nav>

<<<<<<< HEAD
  <div
    v-if="showFeedback"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-9999"
    @click.self="closeFeedback"
  >
||||||| d0a6ead
  <!-- FEEDBACK MODAL -->
  <div v-if="showFeedback" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]"
    @click.self="closeFeedback">
=======
  <div v-if="showFeedback" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]"
    @click.self="closeFeedback">
>>>>>>> origin/main
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
<<<<<<< HEAD
        <button
          @click="submitFeedback"
          class="px-5 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light"
        >
||||||| d0a6ead

        <button @click="submitFeedback"
          class="px-5 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light">
=======
        <button @click="submitFeedback"
          class="px-5 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light">
>>>>>>> origin/main
          Kirim
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router' // Import router
import { useAuthStore } from '../stores/auth'
||||||| d0a6ead
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useUserStore } from "../stores/userStore";
=======
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router"; // Import router
>>>>>>> origin/main

<<<<<<< HEAD
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(
  () => authStore.user ?? { name: 'Pengguna', photo: 'https://i.pravatar.cc/150?img=12' },
)
const router = useRouter() // Init router
||||||| d0a6ead
const userStore = useUserStore();
const user = userStore.$state;
=======
const userStore = useUserStore();
const user = userStore.$state;
const router = useRouter(); // Init router
>>>>>>> origin/main

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
<<<<<<< HEAD
  closeMenu()
  router.push('/riwayat-kesehatan')
}

// PROGRESS NUTRISI
const openProgressNutrisi = () => {
  closeMenu()
  router.push('/progress')
}
||||||| d0a6ead
  closeMenu(); // tutup dropdown dulu
  router.push("/riwayat-kesehatan"); // lalu navigate
};
=======
  closeMenu();
  router.push("/riwayat-kesehatan");
};

// PROGRESS NUTRISI
const openProgressNutrisi = () => {
  closeMenu();
  router.push("/progress");
};
>>>>>>> origin/main

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
<<<<<<< HEAD
  })
  closeFeedback()
}

/* AUTO CLOSE */
||||||| d0a6ead
  });

  closeFeedback();
};

/* AUTO CLOSE menu ketika klik luar */
=======
  });
  closeFeedback();
};

/* AUTO CLOSE */
>>>>>>> origin/main
const handleClickOutside = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    showMenu.value = false
  }
}

const handleLogout = async () => {
  await authStore.logout()
  alert('Logout berhasil')
  router.push('/login')
}

const handleLogoutFromMenu = async () => {
  await handleLogout()
  closeMenu()
}

const handleRegister = () => {
  router.push('/register')
}

const handleLogin = () => {
  router.push('/login')
}

onMounted(() => {
  if (authStore.token && !authStore.user) authStore.fetchProfile()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
<<<<<<< HEAD
  document.removeEventListener('click', handleClickOutside)
})
</script>
||||||| d0a6ead
  document.removeEventListener("click", handleClickOutside);
});
</script>
=======
  document.removeEventListener("click", handleClickOutside);
});
</script>
>>>>>>> origin/main

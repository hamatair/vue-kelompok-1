<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 px-4 sm:px-6 md:px-8 lg:px-10 py-12"
  >
    <div
      class="w-full max-w-5xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 border border-blue-100 transition-all duration-300 hover:shadow-blue-300/30"
    >
      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="relative group">
          <img
            :src="user.avatar"
            alt="User Avatar"
            class="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full object-cover border-4 border-blue-500 shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 rounded-full bg-blue-600/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer"
            @click="changeAvatar"
          >
            <span class="text-white font-semibold text-sm sm:text-base">
              Change
            </span>
          </div>
        </div>

        <div class="flex flex-col text-center md:text-left">
          <h2
            class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-snug"
          >
            {{ user.name }}
          </h2>
          <p class="text-gray-500 text-sm sm:text-base md:text-lg">
            {{ user.role }}
          </p>

          <div
            class="flex flex-wrap justify-center md:justify-start gap-3 mt-4 text-xs sm:text-sm"
          >
            <span
              class="px-3 py-1 bg-blue-100 text-blue-600 font-medium rounded-full"
              >Member</span
            >
            <span
              class="px-3 py-1 bg-green-100 text-green-600 font-medium rounded-full"
              >Active</span
            >
          </div>
        </div>
      </div>

      <div class="w-full h-px bg-gray-200 my-8"></div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700"
      >
        <div class="flex flex-col gap-1">
          <span class="font-semibold text-gray-500 uppercase tracking-wide"
            >Email</span
          >
          <span class="break-all">{{ user.email }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="font-semibold text-gray-500 uppercase tracking-wide"
            >Joined</span
          >
          <span>{{ user.joined }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="font-semibold text-gray-500 uppercase tracking-wide"
            >Location</span
          >
          <span>{{ user.location }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="font-semibold text-gray-500 uppercase tracking-wide"
            >Team</span
          >
          <span>{{ user.team }}</span>
        </div>
      </div>

      <div class="w-full h-px bg-gray-200 my-8"></div>

      <div
        class="flex flex-col sm:flex-row justify-center sm:justify-between gap-3 sm:gap-5"
      >
        <button
          @click="goToDashboard"
          class="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 active:scale-95 transition-all duration-200"
        >
          ← Dashboard
        </button>

        <button
          @click="editProfile"
          class="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200"
        >
          Edit Profile
        </button>

        <button
          @click="logout"
          class="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 active:scale-95 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dummy user data
const user = ref({
  name: 'Kelompok 1',
  role: 'Kelompok PemWebLan',
  email: 'Kelompok1@example.com',
  joined: 'October 2025',
  location: 'Malang, Indonesia',
  team: 'VueJS Dev Team',
  avatar: 'https://i.pravatar.cc/200?img=13',
})

// Functions
const editProfile = () => {
  alert('Edit profile feature coming soon!')
}

const changeAvatar = () => {
  alert('Change avatar clicked!')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const logout = () => {
  localStorage.removeItem('access_token')
  alert('You have been logged out!')
  router.push('/login')
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
section {
  animation: fadeInUp 0.6s ease-in-out;
}
</style>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-4">
    <!-- Kartu Profil -->
    <div
      class="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <!-- Foto Profil -->
      <div class="flex flex-col items-center">
        <div class="relative">
          <img
            :src="user.avatar"
            alt="User Avatar"
            class="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
          <div
            class="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
            @click="changeAvatar"
          >
            <span class="text-white font-medium text-sm">Change</span>
          </div>
        </div>

        <!-- Nama & Role -->
        <h2 class="mt-4 text-2xl font-bold text-gray-800">{{ user.name }}</h2>
        <p class="text-gray-500 text-sm">{{ user.role }}</p>
      </div>

      <!-- Info Detail -->
      <div class="mt-6 space-y-3">
        <div class="flex justify-between text-gray-700">
          <span class="font-medium">Email</span>
          <span>{{ user.email }}</span>
        </div>
        <div class="flex justify-between text-gray-700">
          <span class="font-medium">Joined</span>
          <span>{{ user.joined }}</span>
        </div>
        <div class="flex justify-between text-gray-700">
          <span class="font-medium">Location</span>
          <span>{{ user.location }}</span>
        </div>
      </div>

      <!-- Tombol Aksi -->
      <div class="mt-8 flex justify-center">
        <button
          @click="editProfile"
          class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 active:scale-95 transition-all duration-200"
        >
          Edit Profile
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Data profil sementara
const user = ref({
  name: 'Muhamad Raffi',
  role: 'Frontend Developer',
  email: 'raffi@example.com',
  joined: 'August 2024',
  location: 'Malang, Indonesia',
  avatar: 'https://i.pravatar.cc/150?img=13',
})

// Fungsi aksi
const editProfile = () => {
  alert('Edit profile feature coming soon!')
}

const changeAvatar = () => {
  alert('Change avatar clicked!')
}
</script>

<style scoped>
/* Tambahan animasi lembut */
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

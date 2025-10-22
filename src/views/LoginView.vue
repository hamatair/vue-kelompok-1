<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>

      <form class="space-y-4" @submit.prevent="handleLogin">
        
        <div>
    <label for="email" class="block text-sm font-medium text-gray-700">Identitas Pengguna (Email)</label>
    <input
        id="email"
        type="email"
        v-model="email"
        required
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500"
    />
</div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Kunci Akses (Password)</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Masuk
          </button>
        </div>
      </form>

      <p class="mt-4 text-sm text-center text-gray-600">
        Belum terdaftar sebagai pengguna? 
        <router-link to="/register" class="text-blue-600 hover:text-blue-800 font-medium">
          Lakukan Registrasi
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

/**
 * Handle Login: Fungsi ini hanya melakukan navigasi ke Dashboard 
 * (sesuai permintaan, belum ada koneksi REST API).
 */
const handleLogin = () => {
  // Ganti '/dashboard' dengan path yang sesuai jika perlu
  router.push('/dashboard');
};
</script>

<style scoped>
/* Keeping it basic, no custom CSS needed */
</style>
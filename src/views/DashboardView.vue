<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-blue-600">Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/profile"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Profile
            </router-link>
            <button
              @click="handleLogout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang! 👋
          </h2>
          <p class="text-gray-600">
            Ini adalah halaman dashboard Anda. Kelola semua aktivitas di sini.
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-blue-500 rounded-lg shadow-md p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-sm font-medium">Total Users</p>
                <p class="text-3xl font-bold mt-2">1,234</p>
              </div>
              <div class="bg-blue-600 rounded-full p-3">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-green-500 rounded-lg shadow-md p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-sm font-medium">Revenue</p>
                <p class="text-3xl font-bold mt-2">$45.6K</p>
              </div>
              <div class="bg-green-600 rounded-full p-3">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-purple-500 rounded-lg shadow-md p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-purple-100 text-sm font-medium">Projects</p>
                <p class="text-3xl font-bold mt-2">89</p>
              </div>
              <div class="bg-purple-600 rounded-full p-3">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Aktivitas Terbaru</h3>
          <div class="space-y-4">
            <div class="flex items-center p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">John Doe menambahkan project baru</p>
                <p class="text-sm text-gray-500">2 jam yang lalu</p>
              </div>
            </div>
            
            <div class="flex items-center p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  AS
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">Alice Smith menyelesaikan task</p>
                <p class="text-sm text-gray-500">5 jam yang lalu</p>
              </div>
            </div>
            
            <div class="flex items-center p-4 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  BJ
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">Bob Johnson upload dokumen</p>
                <p class="text-sm text-gray-500">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  console.log('Logging out...')
  router.push('/')
}
</script>
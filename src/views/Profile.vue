<template>
  <div class="max-w-full mx-auto px-20 mb-10">

    <div v-if="loading" class="text-center py-20 text-lg font-semibold">
      Loading...
    </div>

    <div v-if="error" class="text-center text-red-600 py-4 font-semibold">
      {{ error }}
    </div>

    <div v-if="!loading && user" class="space-y-6">

      <!-- Header -->
      <div class="bg-white-soft p-6 border-b border-orange-light/40">
        <div class="flex justify-between items-center">

          <div class="flex gap-5">
            <img :src="user.photo_url ? '/storage/' + user.photo_url : defaultPhoto"
              class="w-24 h-24 rounded-full border border-orange-light object-cover" />


            <div class="flex flex-col justify-center">
              <div class="text-xl font-semibold text-black-base">{{ user.name }}</div>
              <div class="text-gray-600">{{ user.email }}</div>
            </div>
          </div>

          <router-link to="/edit-profile"
            class="px-4 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light transition">
            Ubah
          </router-link>
        </div>
      </div>

      <!-- Informasi Pribadi -->
      <div class="bg-white-soft p-6 border-b border-orange-light/40">
        <div class="text-lg font-bold text-black-base">INFORMASI PRIBADI</div>

        <div class="grid grid-cols-2 gap-4 mt-4">

          <div>
            <div class="font-semibold">Tanggal Lahir</div>
            <div class="text-gray-700">{{ user.date_of_birth }}</div>
          </div>

          <div>
            <div class="font-semibold">Jenis Kelamin</div>
            <div class="text-gray-700">{{ user.gender }}</div>
          </div>

        </div>
      </div>

      <!-- Body Metrics -->
      <div class="bg-white-soft p-6 border-b border-orange-light/40">
        <div class="text-lg font-bold text-black-base">BODY METRICS</div>

        <div class="grid grid-cols-2 gap-4 mt-4">

          <div>
            <div class="font-semibold">Height (cm)</div>
            <div class="text-gray-700">{{ user.height_cm }}</div>
          </div>

          <div>
            <div class="font-semibold">Weight (kg)</div>
            <div class="text-gray-700">{{ user.weight_kg }}</div>
          </div>

        </div>
      </div>

      <!-- Aktivitas -->
      <div class="bg-white-soft p-6 border-b border-orange-light/40">
        <div class="text-lg font-bold text-black-base">AKTIVITAS</div>

        <div class="mt-4">
          <div class="font-semibold">Activity Level</div>
          <div class="text-gray-700">{{ user.activity }}</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const loading = computed(() => auth.loading)
const error = computed(() => auth.error)
const user = computed(() => auth.user)

/* FIX FOTO */
const profilePhoto = computed(() => {
  if (!user.value) return "https://i.pravatar.cc/150?img=12"
  if (user.value.photo_url) return "/storage/" + user.value.photo_url
  return "https://i.pravatar.cc/150?img=12"
})
</script>

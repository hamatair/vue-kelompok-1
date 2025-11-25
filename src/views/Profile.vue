<template>
  <div class="max-w-full mx-auto px-20">

    <!-- Section 1: Profile Header -->
    <div class="bg-white-soft p-6 border-b border-orange-light/40">
      <div class="flex justify-between items-center">

        <div class="flex gap-5">
          <img :src="user.photo" class="w-24 h-24 rounded-full border border-orange-light" />

          <div class="flex flex-col justify-center">
            <div class="text-xl font-semibold text-black-base">{{ user.name }}</div>
            <div class="text-gray-600">{{ user.email }}</div>
          </div>
        </div>

        <!-- FIX: jadikan flex + items-center -->
        <div class="flex items-center">
          <router-link
            to="/edit-profile"
            class="px-4 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light transition"
          >
            Ubah
          </router-link>
        </div>

      </div>
    </div>

    <!-- Section 2: Informasi Pribadi -->
    <div class="bg-white-soft p-6 border-b border-orange-light/40">
      <div class="text-lg font-bold text-black-base">INFORMASI PRIBADI</div>

      <div class="grid grid-cols-2 gap-2 mt-4">

        <div>
          <div class="font-semibold">Tanggal Lahir</div>
          <div class="text-gray-700">{{ user.birthDate }}</div>
        </div>

        <div>
          <div class="font-semibold">Jenis Kelamin</div>
          <div class="text-gray-700">{{ user.gender }}</div>
        </div>

      </div>
    </div>

    <!-- Section 3: Body Metrics -->
    <div class="bg-white-soft p-6 border-b border-orange-light/40">
      <div class="text-lg font-bold text-black-base">BODY METRICS</div>

      <div class="grid grid-cols-2 gap-2 mt-4">

        <div>
          <div class="font-semibold">Height (cm)</div>
          <div class="text-gray-700">{{ user.height }}</div>
        </div>

        <div>
          <div class="font-semibold">Weight (kg)</div>
          <div class="text-gray-700">{{ user.weight }}</div>
        </div>

      </div>
    </div>

    <!-- Section 4: Aktivitas -->
    <div class="bg-white-soft p-6 border-b border-orange-light/40">
      <div class="text-lg font-bold text-black-base">AKTIVITAS</div>

      <div class="mt-4">
        <div class="font-semibold">Activity Level</div>
        <div class="text-gray-700">{{ user.activity }}</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";

const store = useUserStore();
const user = store.$state;
</script>

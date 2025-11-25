<template>
  <div class="min-h-screen bg-white-soft text-black-base">
    <Navbar />
    <router-view />
    <ChatBotWidget v-if="authStore.isAuthenticated" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import ChatBotWidget from './components/ChatBotWidget.vue'
import Navbar from './components/Navbar.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchProfile()
})
</script>

<template>
  <div class="min-h-screen bg-white-soft text-black-base">
    <Navbar />
    <router-view />
    <ChatBotWidget v-if="authStore.isAuthenticated" />
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// import ChatBotWidget from './components/ChatBotWidget.vue'
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchProfile()
})
</script>
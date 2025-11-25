<template>
  <div class="min-h-screen bg-white-soft text-black-base">
    <Navbar />
    <router-view />
    <ChatBotWidget />
  </div>
</template>

<script setup>
import ChatBotWidget from './components/ChatBotWidget.vue'
import Navbar from './components/Navbar.vue'
</script>

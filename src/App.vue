<template>
  <div class="min-h-screen bg-white-soft text-black-base">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

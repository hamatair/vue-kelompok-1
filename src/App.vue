<script setup>
import { RouterView } from 'vue-router';
import './assets/main.css';
</script>

<template>
  <!-- Hanya boleh ada satu RouterView di sini sebagai pintu masuk utama -->
  <RouterView />
</template>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f3f4f6;
}
</style>
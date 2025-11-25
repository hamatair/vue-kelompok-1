<template>
  <div class="min-h-screen bg-white-soft text-black-base">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
</script>

<template>
  <RouterView />
</template>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f3f4f6;
}
</style>
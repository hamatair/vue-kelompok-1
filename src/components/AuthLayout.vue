<script setup>
defineProps({
    title: String,
    error: String,
})
</script>

<template>
    <!-- 1. Wrapper Utama (Layar Penuh & Center) -->
    <div class="auth-wrapper">
        <!-- 2. Kartu Putih (Lebar Terbatas) -->
        <div class="auth-card animate-fade-in">
            <!-- Header: Logo & Judul -->
            <div class="auth-header">
                <!-- LOGO BARU (GAMBAR) -->
                <!-- Menggunakan @/assets/logo.png akan otomatis diproses oleh Vite -->
                <img src="@/assets/logo.png" alt="Logo Aplikasi" class="auth-logo" />

                <h1 class="auth-title">{{ title }}</h1>
            </div>

            <!-- Slot untuk Form Login/Register -->
            <slot></slot>

            <!-- Error Alert (Jika ada) -->
            <div v-if="error" class="mt-5 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span class="font-bold">{{ error }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
</style>

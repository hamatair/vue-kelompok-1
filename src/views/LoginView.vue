<script setup>
import { useAuthStore } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router' // Tambahkan RouterLink di sini
import AuthLayout from '../components/AuthLayout.vue'

const router = useRouter()
const auth = useAuthStore()
const showPassword = ref(false)
const form = reactive({ email: '', password: '' })

const handleLogin = async () => {
  if (await auth.login(form)) {
    router.push('/')
  }
}
</script>

<template>
  <AuthLayout title="Login" :error="auth.error">
    <!-- FORM LOGIN LENGKAP -->
    <form @submit.prevent="handleLogin" class="space-y-5">
      <!-- Input Email -->
      <div>
        <label class="block text-black font-bold text-lg mb-1">Email</label>
        <input
          type="email"
          v-model="form.email"
          class="custom-input"
          required
          placeholder="email@example.com"
        />
      </div>

      <!-- Input Password -->
      <div>
        <label class="block text-black font-bold text-lg mb-1">Password</label>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            class="custom-input pr-10"
            required
          />
          <!-- Tombol Intip Password -->
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-3 text-gray-600 focus:outline-none"
          >
            <i class="fa-solid" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
          </button>
        </div>
      </div>

      <!-- Tombol Login -->
      <button type="submit" class="btn-primary text-xl shadow-md" :disabled="auth.loading">
        <span v-if="auth.loading">Loading...</span>
        <span v-else>Login Account</span>
      </button>
    </form>

    <!-- Footer Link -->
    <div class="text-center mt-6">
      <p class="text-sm font-semibold">
        Don't have an account?
        <RouterLink to="/register" class="text-orange-500 hover:underline font-bold"
          >Register</RouterLink
        >
      </p>
    </div>
  </AuthLayout>
</template>

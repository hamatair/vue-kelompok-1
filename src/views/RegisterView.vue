<script setup>
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  date_of_birth: '',
  gender: 'male',
  height_cm: '',
  weight_kg: '',
  activity: 'jarang', // Default value
})

const handleRegister = async () => {
  // Panggil action register di Pinia Store
  const success = await auth.register(form)

  // Jika berhasil, redirect ke dashboard
  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <AuthLayout title="Registration" :error="auth.error">
    <form @submit.prevent="handleRegister" class="space-y-4">
      <!-- Name -->
      <div>
        <label class="block text-black font-bold text-sm mb-1">Name</label>
        <input type="text" v-model="form.name" class="custom-input py-2" required placeholder="Your Name" />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-black font-bold text-sm mb-1">Email</label>
        <input type="email" v-model="form.email" class="custom-input py-2" required placeholder="email@example.com" />
      </div>

      <!-- Password & Confirm -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-black font-bold text-sm mb-1">Password</label>
          <input type="password" v-model="form.password" class="custom-input py-2" required />
        </div>
        <div>
          <label class="block text-black font-bold text-sm mb-1">Confirm</label>
          <input type="password" v-model="form.password_confirmation" class="custom-input py-2" required />
        </div>
      </div>

      <!-- Profil Fisik (Grid 2 Kolom) -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Tanggal Lahir -->
        <div>
          <label class="block text-black font-bold text-xs mb-1">Birth Date</label>
          <input type="date" v-model="form.date_of_birth" class="custom-input text-xs py-2" required />
        </div>

        <!-- Gender -->
        <div>
          <label class="block text-black font-bold text-xs mb-1">Gender</label>
          <select v-model="form.gender" class="custom-input text-xs py-2" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <!-- Tinggi Badan -->
        <div>
          <label class="block text-black font-bold text-xs mb-1">Height (cm)</label>
          <input type="number" v-model="form.height_cm" class="custom-input text-xs py-2" required placeholder="170" />
        </div>

        <!-- Berat Badan -->
        <div>
          <label class="block text-black font-bold text-xs mb-1">Weight (kg)</label>
          <input type="number" v-model="form.weight_kg" class="custom-input text-xs py-2" required placeholder="60" />
        </div>
      </div>

      <!-- Aktivitas Fisik -->
      <div class="col-span-2">
        <label class="form-label text-xs">Activity Level</label>
        <select v-model="form.activity" class="custom-input text-xs py-2" required>
          <option value="jarang">Jarang (Sedentary)</option>
          <option value="olahraga_ringan">Ringan (1-3x seminggu)</option>
          <option value="olahraga_sedang">Sedang (3-5x seminggu)</option>
          <option value="olahraga_berat">Berat (6-7x seminggu)</option>
          <option value="sangat_berat">Sangat Berat (2x sehari)</option>
        </select>
      </div>

      <!-- Tombol Submit -->
      <button type="submit" class="btn-primary text-lg shadow-md mt-4" :disabled="auth.loading">
        <span v-if="auth.loading">Creating Account...</span>
        <span v-else>Create Account</span>
      </button>
    </form>

    <!-- Link ke Login -->
    <div class="text-center mt-4">
      <p class="text-sm font-semibold">
        Already have an account?
        <RouterLink to="/login" class="text-orange-500 hover:underline font-bold">Login</RouterLink>
      </p>
    </div>
  </AuthLayout>
</template>

<style scoped>
/* CSS Lokal untuk Input & Button agar tampilan sesuai desain */
.custom-input {
  border: 2.5px solid black;
  border-radius: 12px;
  padding: 8px 12px;
  width: 100%;
  font-weight: 600;
  outline: none;
  transition: all 0.2s;
  background-color: white;
}

.custom-input:focus {
  border-color: #f59e0b;
  /* Warna Orange/Amber */
}

.btn-primary {
  background-color: #f59e0b;
  border-radius: 12px;
  color: white;
  font-weight: 800;
  padding: 12px;
  width: 100%;
  transition: opacity 0.2s;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-primary:disabled {
  background-color: #fbbf24;
  cursor: not-allowed;
}
</style>

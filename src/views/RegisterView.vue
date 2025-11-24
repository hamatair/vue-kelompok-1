<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const errorMessage = ref('')
const successMessage = ref('')

const formData = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  date_of_birth: '',
  gender: '',
  height_cm: '',
  weight_kg: '',
  activity: '',
  role: 'user',
})

const handleRegister = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (formData.value.password !== formData.value.password_confirmation) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  console.log('Registration Data:', formData.value)
  successMessage.value = 'Registration successful! Check console for data.'

  setTimeout(() => {
    router.push('/login')
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-md">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="text-center text-2xl/9 font-bold tracking-tight text-white">Register</h2>
      </div>

      <div class="mt-10">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label for="name" class="block text-sm/6 font-medium text-gray-100">Full Name</label>
            <div class="mt-2">
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-100"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                autocomplete="email"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
            <div class="mt-2">
              <input
                id="password"
                v-model="formData.password"
                type="password"
                required
                autocomplete="new-password"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label for="password_confirmation" class="block text-sm/6 font-medium text-gray-100"
              >Confirm Password</label
            >
            <div class="mt-2">
              <input
                id="password_confirmation"
                v-model="formData.password_confirmation"
                type="password"
                required
                autocomplete="new-password"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label for="date_of_birth" class="block text-sm/6 font-medium text-gray-100"
              >Date of Birth</label
            >
            <div class="mt-2">
              <input
                id="date_of_birth"
                v-model="formData.date_of_birth"
                type="date"
                required
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm/6 font-medium text-gray-100">Gender</label>
            <div class="mt-2 flex gap-4">
              <label class="flex items-center text-gray-100">
                <input v-model="formData.gender" type="radio" value="male" required class="mr-2" />
                Male
              </label>
              <label class="flex items-center text-gray-100">
                <input
                  v-model="formData.gender"
                  type="radio"
                  value="female"
                  required
                  class="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label for="height_cm" class="block text-sm/6 font-medium text-gray-100"
              >Height (cm)</label
            >
            <div class="mt-2">
              <input
                id="height_cm"
                v-model.number="formData.height_cm"
                type="number"
                required
                min="100"
                max="250"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label for="weight_kg" class="block text-sm/6 font-medium text-gray-100"
              >Weight (kg)</label
            >
            <div class="mt-2">
              <input
                id="weight_kg"
                v-model.number="formData.weight_kg"
                type="number"
                step="0.1"
                required
                min="30"
                max="300"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label for="activity" class="block text-sm/6 font-medium text-gray-100"
              >Activity Level</label
            >
            <div class="mt-2">
              <select
                id="activity"
                v-model="formData.activity"
                required
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              >
                <option value="">Select activity level</option>
                <option value="jarang">Jarang (Sedentary)</option>
                <option value="olahraga_ringan">Olahraga Ringan (Light Exercise)</option>
                <option value="olahraga_sedang">Olahraga Sedang (Moderate Exercise)</option>
                <option value="olahraga_berat">Olahraga Berat (Heavy Exercise)</option>
                <option value="sangat_berat">Sangat Berat (Very Heavy Exercise)</option>
              </select>
            </div>
          </div>

          <div v-if="errorMessage" class="text-red-400 text-sm">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="text-green-400 text-sm">
            {{ successMessage }}
          </div>

          <div class="mt-8!">
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-400">
          Already have an account?
          <router-link to="/login" class="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

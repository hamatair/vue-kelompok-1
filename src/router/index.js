import { createRouter, createWebHistory } from 'vue-router'

import ProgresNutrisi from '@/views/ProgresNutrisi.vue'
import RiwayatKesehatan from '@/views/RiwayatKesehatan.vue'
import Artikel from '../views/Artikel.vue'
import EditProfile from '../views/EditProfile.vue'
import Home from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import Profile from '../views/Profile.vue'
import RegisterView from '../views/RegisterView.vue'
import Rekomendasi from '../views/Rekomendasi.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/edit-profile', component: EditProfile },
  { path: '/artikel', component: Artikel },
  { path: '/rekomendasi', component: Rekomendasi },
  { path: '/riwayat-kesehatan', component: RiwayatKesehatan },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/progress', component: ProgresNutrisi },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

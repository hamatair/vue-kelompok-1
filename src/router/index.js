import { createRouter, createWebHistory } from 'vue-router'

import RiwayatKesehatan from '@/views/RiwayatKesehatan.vue'
import Artikel from '../views/Artikel.vue'
import EditProfile from '../views/EditProfile.vue'
import Home from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import Profile from '../views/Profile.vue'
import ProgresNutrisi from '../views/ProgresNutrisi.vue'
import RegisterView from '../views/RegisterView.vue'
import Rekomendasi from '../views/Rekomendasi.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/edit-profile', component: EditProfile },
  { path: '/artikel', component: Artikel },
  { path: '/rekomendasi', component: Rekomendasi },
  { path: '/riwayat-kesehatan', component: RiwayatKesehatan },
  { path: '/progress', component: ProgresNutrisi },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login', // SPA pertama kali ke halaman login
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: DashboardView,
    // },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
  ],
})

export default router

import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'
import Artikel from '../views/Artikel.vue'
import Rekomendasi from '../views/Rekomendasi.vue'
import EditProfile from '../views/EditProfile.vue'
import RiwayatKesehatan from '@/views/RiwayatKesehatan.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
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
  { path: '/profile', component: Profile },
  { path: '/edit-profile', component: EditProfile },
  { path: '/artikel', component: Artikel },
  { path: '/rekomendasi', component: Rekomendasi },
  { path: '/riwayat-kesehatan', component: RiwayatKesehatan },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.name === 'dashboard' && !auth.token) next({ name: 'login' })
  else if ((to.name === 'login' || to.name === 'register') && auth.token)
    next({ name: 'dashboard' })
  else next()
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.name === 'dashboard' && !auth.token) next({ name: 'login' })
  else if ((to.name === 'login' || to.name === 'register') && auth.token)
    next({ name: 'dashboard' })
  else next()
})

export default router

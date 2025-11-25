import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'
import Artikel from '../views/Artikel.vue'
import Rekomendasi from '../views/Rekomendasi.vue'
import EditProfile from '../views/EditProfile.vue'
import RiwayatKesehatan from '@/views/RiwayatKesehatan.vue'
import DashboardView from '@/views/DashboardView.vue'
import ArtikelDetail from '@/views/ArtikelDetail.vue'

// Import Admin Views (Yang baru kita buat)
import ArtikelEdit from '@/views/ArtikelEdit.vue'
import KategoriList from '@/views/KategoriList.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/profile', component: Profile },
  { path: '/edit-profile', component: EditProfile },
  { path: '/artikel', component: Artikel },
  { path: '/rekomendasi', component: Rekomendasi },
  { path: '/riwayat-kesehatan', component: RiwayatKesehatan },

  // Route Detail Artikel (Dynamic)
  { path: '/artikel/:id', component: ArtikelDetail },
  {
    path: '/dashboard-view',
    component: DashboardView,
    name: 'dashboard-view',
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  // Route Detail Artikel (Dynamic)
  { path: '/artikel/:id', component: ArtikelDetail },

  // --- Admin Routes (Management) ---
  { path: '/admin/articles', component: DashboardView },
  { path: '/admin/article/new', component: ArtikelEdit },
  { path: '/admin/article/edit/:id', component: ArtikelEdit },
  { path: '/admin/category/', component: KategoriList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isLoggedIn = auth.isAuthenticated
  const isAdmin = auth.user?.role === 'admin'

  if (to.meta?.requiresAuth && !isLoggedIn) return next({ name: 'login' })
  if (to.meta?.requiresAdmin && !isAdmin) return next({ name: 'home' })

  if ((to.name === 'login' || to.name === 'register') && isLoggedIn) {
    return isAdmin ? next({ name: 'dashboard-view' }) : next({ name: 'home' })
  }

  next()
})

export default router

import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

import ArtikelDetail from '@/views/ArtikelDetail.vue'
import DashboardView from '@/views/DashboardView.vue'
import RiwayatKesehatan from '@/views/RiwayatKesehatan.vue'
import Artikel from '../views/Artikel.vue'
import EditProfile from '../views/EditProfile.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Rekomendasi from '../views/Rekomendasi.vue'

// Import Admin Views (Yang baru kita buat)
import ArtikelEdit from '@/views/ArtikelEdit.vue'
import KategoriList from '@/views/KategoriList.vue'
import KonsultasiDetail from '@/views/KonsultasiDetail.vue'
import KonsultasiList from '@/views/KonsultasiList.vue'
import LoginView from '@/views/LoginView.vue'
import ProgresNutrisi from '@/views/ProgresNutrisi.vue'
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
  { path: '/progress', component: ProgresNutrisi },

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
  {
    path: '/admin/articles',
    component: DashboardView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/article/new',
    component: ArtikelEdit,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/article/edit/:id',
    component: ArtikelEdit,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/category/',
    component: KategoriList,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/consultations',
    component: KonsultasiList,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/consultations/:id',
    component: KonsultasiDetail,
    meta: { requiresAuth: true, requiresAdmin: true },
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (auth.token && !auth.user) {
    try {
      await auth.fetchProfile()
    } catch {
      auth.logout()
    }
  }

  const isLoggedIn = auth.isAuthenticated
  const isAdmin = auth.user?.role === 'admin'
  const isAdminRoute = to.path.startsWith('/admin')

  if ((to.meta?.requiresAuth || isAdminRoute) && !isLoggedIn) return next({ name: 'login' })

  if ((to.meta?.requiresAuth || isAdminRoute) && !isLoggedIn) return next({ name: 'login' })
  if ((to.meta?.requiresAdmin || isAdminRoute) && !isAdmin) return next({ name: 'home' })

  if ((to.name === 'login' || to.name === 'register') && isLoggedIn) {
    return isAdmin ? next({ name: 'dashboard-view' }) : next({ name: 'home' })
  }

  next()
})

export default router

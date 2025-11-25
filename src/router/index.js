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

import ArtikelEdit from '@/views/ArtikelEdit.vue'
import KategoriList from '@/views/KategoriList.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import KonsultasiDetail from '@/views/KonsultasiDetail.vue'
import KonsultasiList from '@/views/KonsultasiList.vue'
import ProgresNutrisi from '@/views/ProgresNutrisi.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },

  // 🔥 Perbaikan → tambahkan name
  { path: '/login', component: LoginView, name: 'login' },
  { path: '/register', component: RegisterView, name: 'register' },

  { path: '/profile', component: Profile },
  { path: '/edit-profile', component: EditProfile },
  { path: '/artikel', component: Artikel },
  { path: '/rekomendasi', component: Rekomendasi },
  { path: '/riwayat-kesehatan', component: RiwayatKesehatan },
  { path: '/progress', component: ProgresNutrisi },

  { path: '/artikel/:id', component: ArtikelDetail },

  {
    path: '/dashboard-view',
    component: DashboardView,
    name: 'dashboard-view',
    meta: { requiresAuth: true, requiresAdmin: true },
  },

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

  // 🔥 Hapus duplikasi
  if ((to.meta?.requiresAuth || isAdminRoute) && !isLoggedIn)
    return next({ name: 'login' })

  if ((to.meta?.requiresAdmin || isAdminRoute) && !isAdmin)
    return next({ name: 'home' })

  if ((to.name === 'login' || to.name === 'register') && isLoggedIn) {
    return isAdmin ? next({ name: 'dashboard-view' }) : next({ name: 'home' })
  }

  next()
})

export default router

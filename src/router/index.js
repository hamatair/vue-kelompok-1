import { createRouter, createWebHistory } from "vue-router";

// Import Views
import Profile from "../views/Profile.vue";
import Home from "../views/Home.vue";
import Artikel from "../views/Artikel.vue";
import Rekomendasi from "../views/Rekomendasi.vue";
import EditProfile from "../views/EditProfile.vue";
import RiwayatKesehatan from "@/views/RiwayatKesehatan.vue";
import DashboardView from "@/views/DashboardView.vue";
import ArtikelDetail from "@/views/ArtikelDetail.vue";

// Import Admin Views (Yang baru kita buat)
import ArtikelEdit from "@/views/ArtikelEdit.vue";
import KategoriList from "@/views/KategoriList.vue";

const routes = [
  // --- Public Routes ---
  { path: "/", component: Home },
  { path: "/profile", component: Profile },
  { path: "/edit-profile", component: EditProfile },
  { path: "/artikel", component: Artikel },
  { path: "/rekomendasi", component: Rekomendasi },
  { path: "/riwayat-kesehatan", component: RiwayatKesehatan },
  { path: "/dashboard-view", component: DashboardView },
  
  // Route Detail Artikel (Dynamic)
  { path: "/artikel/:id", component: ArtikelDetail },

  // --- Admin Routes (Management) ---
  { path: '/admin/articles', component: DashboardView },
  { path: '/admin/article/new', component: ArtikelEdit },
  { path: '/admin/article/edit/:id', component: ArtikelEdit },
  { path: '/admin/category/', component: KategoriList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
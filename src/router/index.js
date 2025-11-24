import { createRouter, createWebHistory } from "vue-router";

import Profile from "../views/Profile.vue";
import Home from "../views/Home.vue";
import Artikel from "../views/Artikel.vue";
import Rekomendasi from "../views/Rekomendasi.vue";
import EditProfile from "../views/EditProfile.vue";
import RiwayatKesehatan from "@/views/RiwayatKesehatan.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/profile", component: Profile },
  { path: "/edit-profile", component: EditProfile },
  { path: "/artikel", component: Artikel },
  { path: "/rekomendasi", component: Rekomendasi },
  { path: "/riwayat-kesehatan", component: RiwayatKesehatan },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

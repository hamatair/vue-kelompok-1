<!-- src/views/HomeView.vue -->
<template>
  <main class="min-h-screen bg-white text-slate-900">

    <!-- HERO -->
    <section class="bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-40 grid md:grid-cols-[1.3fr_0.7fr] gap-10 items-center">

        <!-- Text -->
        <div>
          <h1 class="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-orange-500">
            CALMATE
            <span class="block text-slate-950 text-3xl"> Jalan Anda Menuju Gaya Hidup Sehat </span>
          </h1>

          <p class="mt-4 text-sm sm:text-base text-slate-600 max-w-xl">
            Teman Anda untuk melacak nutrisi, mendapatkan rekomendasi makan, dan terkoneksi dengan
            komunitas serta konsultasi berbasis data.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <router-link 
              to="/register"
              class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-orange-400 hover:bg-orange-500 text-sm font-semibold text-white shadow-md transition"
            >
              Mulai Sekarang
            </router-link>
          </div>
        </div>

        <!-- Image -->
        <div class="flex justify-center md:justify-end w-full md:w-fit md:ms-auto">
          <div class="relative">
            <div class="absolute -top-6 -left-6 w-40 h-40 rounded-[2.5rem] bg-orange-200/60 blur-sm"></div>

            <div class="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-orange-50 shadow-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="../assets/illustration-healthy-food.png"
                alt="Ilustrasi makanan sehat"
                class="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- MENGAPA CALMATE -->
    <section class="py-14 md:pt-20 md:pb-24 bg-orange-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">

        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">
            Mengapa memilih <span class="text-orange-500">CalMate</span>?
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-600">
            Semua fitur dirancang untuk mendukung perjalanan kesehatanmu...
          </p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <!-- Card -->
          <div 
            v-for="(item, index) in iconCards" 
            :key="index"
            class="rounded-2xl bg-white shadow-md px-5 py-6 flex flex-col gap-2"
          >
            <div class="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
              <FontAwesomeIcon :icon="item.icon" class="w-5 h-5 text-orange-500" />
            </div>
            <h3 class="text-base font-semibold text-slate-900">{{ item.title }}</h3>
            <p class="text-sm text-slate-600">{{ item.desc }}</p>
          </div>

        </div>
      </div>
    </section>

    <!-- FEEDBACK -->
    <section class="py-14 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">

        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-900">Feedback Pengguna</h2>

          <button 
            v-if="isAuthenticated"
            @click="openFeedbackModal"
            class="px-4 py-2 bg-orange text-white-soft rounded-full font-semibold shadow hover:bg-orange-light transition"
          >
            Beri Feedback
          </button>

          <button 
            v-else 
            @click="$router.push('/login')"
            class="px-4 py-2 bg-orange text-white-soft rounded-full font-semibold shadow hover:bg-orange-light transition"
          >
            Login untuk Memberi Feedback
          </button>
        </div>

        <div v-if="feedbackList.length === 0" class="text-slate-500 text-sm">
          Belum ada feedback dari pengguna.
        </div>

        <div 
          v-else 
          class="flex gap-4 overflow-x-auto scrollbar-hidden pb-3"
        >
          <div 
            v-for="item in feedbackList"
            :key="item.id"
            class="min-w-[260px] max-w-[260px] bg-white shadow-md rounded-xl p-5 border border-orange-200 animate-fadeIn"
          >

            <div class="flex items-center mb-2">
              <FontAwesomeIcon 
                v-for="n in 5"
                :key="n"
                :icon="item.rating >= n ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                class="text-orange text-lg"
              />
            </div>

            <p class="text-slate-700 text-sm mb-4">{{ item.comment }}</p>

            <div class="text-xs text-slate-500">
              {{ formatDate(item.created_at) }}
            </div>

          </div>
        </div>

      </div>

      <FeedbackModal 
        v-if="showFeedbackModal"
        @close="showFeedbackModal = false"
        @submit="sendFeedback"
      />
    </section>

  </main>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBookOpen,
  faChartColumn,
  faWandSparkles,
  faClipboardList,
  faComments,
  faCircleCheck,
  faBriefcase,
  faGraduationCap,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { useAuthStore } from "@/stores/auth";
import FeedbackModal from "@/components/FeedbackModal.vue";
import feedbackService from "@/services/feedback";

export default {
  name: "Home",

  components: { 
    FontAwesomeIcon, 
    FeedbackModal 
  },

  data() {
    return {
      iconCards: [
        { icon: faBookOpen, title: "Artikel Kesehatan", desc: "Baca artikel nutrisi." },
        { icon: faChartColumn, title: "Progress Nutrisi", desc: "Pantau kalori harian." },
        { icon: faWandSparkles, title: "Rekomendasi Personal", desc: "Menu makanan personal." },
        { icon: faClipboardList, title: "Riwayat Kesehatan", desc: "Catatan kesehatan lengkap." },
        { icon: faComments, title: "Konsultasi / Chatbot", desc: "Tanya jawab nutrisi." },
        { icon: faCircleCheck, title: "Feedback Berkala", desc: "Evaluasi progress." },
      ],

      feedbackAll: [],
      showFeedbackModal: false,
    };
  },

  computed: {
    isAuthenticated() {
      return useAuthStore().isAuthenticated;
    },
    feedbackList() {
      return this.feedbackAll.slice(0, 3);
    },
  },

  methods: {
    openFeedbackModal() {
      this.showFeedbackModal = true;
    },

    async sendFeedback(payload) {
      await feedbackService.create(payload);
      await this.loadFeedback();
    },

    async loadFeedback() {
      const res = await feedbackService.getAll();
      this.feedbackAll = Array.isArray(res.data) ? res.data : [];
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },

  async mounted() {
    await this.loadFeedback();
  },
};
</script>

<style>
.scrollbar-hidden::-webkit-scrollbar { display: none; }

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
</style>

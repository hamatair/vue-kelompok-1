<!-- src/views/HomeView.vue -->
<template>
  <main class="min-h-screen bg-white text-slate-900">
    <!-- HERO -->
    <section class="bg-white">
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-40 grid md:grid-cols-[1.3fr_0.7fr] gap-10 items-center"
      >
        <!-- Text -->
        <div>
          <h1
            class="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-orange-500"
          >
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

        <div class="flex justify-center md:justify-end w-full md:w-fit md:ms-auto">
          <div class="relative">
            <div
              class="absolute -top-6 -left-6 w-40 h-40 rounded-[2.5rem] bg-orange-200/60 blur-sm"
            ></div>

            <div
              class="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-orange-50 shadow-2xl flex items-center internal justify-center overflow-hidden"
            >
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

    <!-- MENGAPA MEMILIH CALMATE -->
    <section class="py-14 md:pt-20 md:pb-24 bg-orange-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">
            Mengapa memilih <span class="text-orange-500">CalMate</span>?
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-600">
            Semua fitur dirancang untuk mendukung perjalanan kesehatanmu, dari edukasi sampai
            pemantauan nutrisi harian.
          </p>
        </div>

        <div class="mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-2xl bg-white shadow-md px-5 py-6 flex flex-col gap-2">
            <div class="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
              <FontAwesomeIcon :icon="icons.article" class="w-5 h-5 text-orange-500" />
            </div>
            <h3 class="text-base font-semibold text-slate-900">Artikel Kesehatan</h3>
            <p class="text-sm text-slate-600">
              Baca artikel seputar nutrisi, pola makan, dan gaya hidup sehat yang dikurasi agar
              mudah dipahami.
            </p>
          </div>

          <div class="rounded-2xl bg-white shadow-md px-5 py-6 flex flex-col gap-2">
            <div class="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
              <FontAwesomeIcon :icon="icons.progress" class="w-5 h-5 text-orange-500" />
            </div>
            <h3 class="text-base font-semibold text-slate-900">Progress Nutrisi</h3>
            <p class="text-sm text-slate-600">
              Pantau asupan kalori dan nutrisi harian dengan tampilan grafik dan ringkasan yang
              informatif.
            </p>
          </div>

          <!-- Rekomendasi -->
          <div class="rounded-2xl bg-white shadow-md px-5 py-6 flex flex-col gap-2">
            <div class="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
              <FontAwesomeIcon :icon="icons.recommendation" class="w-5 h-5 text-orange-500" />
            </div>
            <h3 class="text-base font-semibold text-slate-900">Rekomendasi Personal</h3>
            <p class="text-sm text-slate-600">
              Dapatkan rekomendasi menu dan kebiasaan makan berdasarkan tujuan dan preferensi
              pribadimu.
            </p>
          </div>

          <!-- Riwayat Kesehatan -->
          <div class="rounded-2xl bg-white shadow-md px-5 py-6 flex flex-col gap-2">
            <div class="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
              <FontAwesomeIcon :icon="icons.history" class="w-5 h-5 text-orange-500" />
            </div>
            <h3 class="text-base font-semibold text-slate-900">Riwayat Kesehatan</h3>
            <p class="text-sm text-slate-600">
              Simpan riwayat berat badan, catatan kondisi, dan perubahan dari waktu ke waktu dalam
              satu tempat.
            </p>
          </div>

          <div class="rounded-2xl bg-white shadow-md px-5 py-6 flex flex-col gap-2">
            <div class="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
              <FontAwesomeIcon :icon="icons.chat" class="w-5 h-5 text-orange-500" />
            </div>
            <h3 class="text-base font-semibold text-slate-900">Konsultasi / Chatbot</h3>
            <p class="text-sm text-slate-600">
              Ajukan pertanyaan seputar nutrisi kapan saja melalui chatbot yang selalu siap
              membantumu.
            </p>
          </div>

          <div class="rounded-2xl bg-white shadow-md px-5 py-6 flex flex-col gap-2">
            <div class="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
              <FontAwesomeIcon :icon="icons.feedback" class="w-5 h-5 text-orange-500" />
            </div>
            <h3 class="text-base font-semibold text-slate-900">Feedback Berkala</h3>
            <p class="text-sm text-slate-600">
              Terima feedback dan insight berkala untuk membantu kamu mengevaluasi progress dan
              tetap konsisten.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- UNTUK SIAPA CALMATE DIBUAT -->
    <section class="py-14 bg-orange-400 text-white">
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-[1.1fr_1.3fr] gap-8 items-center"
      >
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold">
            Untuk siapa <span class="text-yellow-200">CalMate</span> dibuat?
          </h2>
          <p class="mt-3 text-sm sm:text-base text-orange-50 max-w-md">
            CalMate dirancang untuk mendampingi berbagai tipe pengguna yang ingin membangun
            kebiasaan hidup lebih sehat tanpa harus ribet.
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex gap-3 items-start border-b border-orange-200/50 pb-4">
            <div class="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
              <FontAwesomeIcon :icon="icons.professional" class="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 class="text-base font-semibold">Profesional sibuk</h3>
              <p class="text-sm text-orange-50">
                Kamu yang punya jadwal padat dan butuh cara praktis untuk memantau pola makan di
                tengah aktivitas kerja.
              </p>
            </div>
          </div>

          <!-- Pelajar & mahasiswa -->
          <div class="flex gap-3 items-start border-b border-orange-200/50 pb-4">
            <div class="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
              <FontAwesomeIcon :icon="icons.student" class="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 class="text-base font-semibold">Pelajar & mahasiswa</h3>
              <p class="text-sm text-orange-50">
                Sedang belajar mengatur energi untuk kuliah, organisasi, dan aktivitas lain tanpa
                mengorbankan kesehatan.
              </p>
            </div>
          </div>

          <!-- Pemantau kesehatan jangka panjang -->
          <div class="flex gap-3 items-start">
            <div class="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
              <FontAwesomeIcon :icon="icons.heart" class="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 class="text-base font-semibold">Pemantau kesehatan jangka panjang</h3>
              <p class="text-sm text-orange-50">
                Perlu mencatat berat badan, riwayat kesehatan, dan progress nutrisi agar bisa
                dipantau bersama tenaga kesehatan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BAGAIMANA CALMATE MEMBANTU KAMU -->
    <section class="py-14 md:py-24 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">
            Bagaimana CalMate membantu kamu
          </h2>
        </div>

        <!-- Stepper -->
        <div class="mt-10 relative">
          <!-- garis horizontal hanya di md+ -->
          <div class="hidden md:block absolute top-6 left-0 right-0 h-[3px] bg-orange-200"></div>

          <div class="grid md:grid-cols-3 gap-10 md:gap-6 relative z-10">
            <!-- Step 1 -->
            <div class="flex md:block items-start gap-4">
              <div
                class="relative shrink-0 w-12 h-12 rounded-full bg-white border-4 border-orange-400 flex items-center justify-center text-orange-500 font-bold shadow-md md:mx-auto"
              >
                1
              </div>
              <div class="mt-2 md:mt-4 text-left md:text-center">
                <h3 class="text-base font-semibold text-slate-900">Buat profil & tujuan</h3>
                <p class="mt-1 text-sm text-slate-600">
                  Masukkan data dasar, target berat badan, dan preferensi makanan untuk
                  mempersonalisasi pengalamanmu.
                </p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex md:block items-start gap-4">
              <div
                class="relative shrink-0 w-12 h-12 rounded-full bg-white border-4 border-orange-400 flex items-center justify-center text-orange-500 font-bold shadow-md md:mx-auto"
              >
                2
              </div>
              <div class="mt-2 md:mt-4 text-left md:text-center">
                <h3 class="text-base font-semibold text-slate-900">Lacak & pantau progress</h3>
                <p class="mt-1 text-sm text-slate-600">
                  Catat asupan harian, pantau progress nutrisi, dan lihat rangkuman yang
                  memudahkanmu memahami pola makan.
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex md:block items-start gap-4">
              <div
                class="relative shrink-0 w-12 h-12 rounded-full bg-white border-4 border-orange-400 flex items-center justify-center text-orange-500 font-bold shadow-md md:mx-auto"
              >
                3
              </div>
              <div class="mt-2 md:mt-4 text-left md:text-center">
                <h3 class="text-base font-semibold text-slate-900">
                  Dapatkan insight & konsultasi
                </h3>
                <p class="mt-1 text-sm text-slate-600">
                  Nikmati rekomendasi personal, artikel relevan, dan dukungan chatbot untuk membantu
                  kamu mengambil keputusan yang lebih baik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-orange-400/10">
      <div
        class="max-w-5xl mx-auto px-4 sm:px-6 py-8 rounded-3xl bg-orange-400 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
      >
        <div>
          <h2 class="text-xl sm:text-2xl font-bold">
            Siap memulai perjalanan hidup sehat bersama CalMate?
          </h2>
          <p class="mt-2 text-sm sm:text-base text-orange-50 max-w-xl">
            Bangun kebiasaan makan yang lebih sehat dan terukur dengan dukungan artikel, tracking
            nutrisi, dan konsultasi dalam satu aplikasi.
          </p>
        </div>

        <router-link
          to="/register"
          class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-sm font-semibold text-orange-500 shadow-md hover:bg-orange-50 transition"
        >
          Daftar Sekarang
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
} from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'Home',
  components: { FontAwesomeIcon },
  data() {
    return {
      icons: {
        article: faBookOpen,
        progress: faChartColumn,
        recommendation: faWandSparkles,
        history: faClipboardList,
        chat: faComments,
        feedback: faCircleCheck,
        professional: faBriefcase,
        student: faGraduationCap,
        heart: faHeart,
      },
    }
  },
}
</script>

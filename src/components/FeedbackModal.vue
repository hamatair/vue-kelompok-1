<template>
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="close"
  >
    <div class="bg-white-soft p-8 rounded-xl shadow-xl w-[450px] max-w-full">

      <h2 class="text-2xl font-bold text-black-base mb-2">Nilai Aplikasi Kami!</h2>

      <p class="text-gray-700 mb-6 leading-relaxed">
        Kami ingin mendengar pengalaman Anda. Berikan feedback agar kami dapat terus memperbaiki aplikasi ini.
      </p>

      <!-- RATING -->
      <div class="mb-6">
        <div class="font-semibold mb-2">Peringkat</div>

        <div class="flex gap-2">
          <button
            v-for="n in 5"
            :key="n"
            @click="setRating(n)"
            class="text-3xl"
          >
            <FontAwesomeIcon
              :icon="rating >= n ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              class="text-orange cursor-pointer transition"
            />
          </button>
        </div>
      </div>

      <!-- TEXT FEEDBACK -->
      <div>
        <div class="font-semibold mb-2">Bisakah Anda memberi tahu kami lebih lanjut?</div>
        <textarea
          v-model="text"
          placeholder="Tambahkan feedback..."
          rows="4"
          class="w-full border border-orange-light rounded-md px-3 py-2"
        ></textarea>
      </div>

      <!-- BUTTONS -->
      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="close"
          class="px-4 py-2 bg-gray-300 text-black-base rounded-md font-semibold hover:bg-gray-400"
        >
          Batal
        </button>

        <button
          @click="submit"
          class="px-5 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light"
        >
          Kirim
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const emit = defineEmits(["close", "submit"]);

const rating = ref(0);
const text = ref("");

const close = () => emit("close");

const setRating = (n) => {
  rating.value = n;
};

const submit = () => {
  emit("submit", {
    rating: rating.value,
    comment: text.value
  });

  emit("close");
};
</script>

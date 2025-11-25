<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
  >
    <div class="bg-white-soft p-6 rounded-xl shadow-xl w-[600px] max-w-full">

      <h2 class="text-xl font-semibold mb-4 text-black-base">
        Crop Foto Profil
      </h2>

      <cropper
        ref="cropper"
        class="w-full h-[380px] bg-gray-200 rounded-xl overflow-hidden"
        :src="src"
        :stencil-component="CircleStencil"
        :stencil-props="{ aspectRatio: 1 }"
      />

      <div class="flex justify-end mt-5 gap-3">
        <button
          class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          @click="$emit('cancel')"
        >
          Batal
        </button>

        <button
          class="px-4 py-2 bg-orange text-white-soft rounded-md hover:bg-orange-light"
          @click="cropCircle"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Cropper, CircleStencil } from "vue-advanced-cropper";

const props = defineProps({
  src: { type: String, required: true },
});

const emit = defineEmits(["cancel", "save"]);

const cropper = ref(null);

/**
 * Crop area → convert to circle canvas → return PNG
 */
const cropCircle = () => {
  const result = cropper.value.getResult();
  if (!result || !result.canvas) return;

  const canvas = result.canvas;
  const size = Math.min(canvas.width, canvas.height);

  // Buat canvas bulat
  const circleCanvas = document.createElement("canvas");
  circleCanvas.width = size;
  circleCanvas.height = size;

  const ctx = circleCanvas.getContext("2d");

  // Clip lingkaran
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  // Draw image ke area lingkaran
  ctx.drawImage(canvas, 0, 0, size, size);

  // Convert to PNG transparan
  const finalImage = circleCanvas.toDataURL("image/png");
  emit("save", finalImage);
};
</script>

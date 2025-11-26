<template>
  <div class="max-w-full mx-auto px-20">

    <!-- MODAL CROP -->
    <CropperModal 
      v-if="cropSrc" 
      :src="cropSrc" 
      @save="applyCrop" 
      @cancel="cancelCrop" 
    />

    <div class="bg-white-soft p-6 border-b border-orange-light/40 flex justify-between">
      <div class="flex gap-5">

        <img
          :src="previewPhoto"
          class="w-24 h-24 rounded-full border border-orange-light object-cover"
        />

        <button @click="triggerUpload"
          class="h-fit px-4 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light">
          Ubah Foto Profil
        </button>

        <input 
          ref="fileInput" 
          type="file" 
          accept="image/*" 
          class="hidden" 
          @change="handlePhotoChange" 
        />
      </div>

      <router-link to="/profile"
        class="px-4 py-2 h-fit bg-gray-300 text-black-base rounded-md font-semibold hover:bg-gray-400">
        Kembali
      </router-link>
    </div>

    <div class="bg-white-soft space-y-6 py-6">

      <div class="grid grid-cols-2 gap-6">
        <ProfileField label="Nama" v-model="form.name" />

        <div class="flex flex-col">
          <label class="font-semibold mb-1">Email</label>
          <div class="border border-black-base bg-gray-200 text-black-base rounded-md px-3 py-2">
            {{ form.email }}
          </div>
        </div>

        <ProfileField label="Tanggal Lahir" v-model="form.date_of_birth" type="date" />
        <ProfileField label="Jenis Kelamin" v-model="form.gender" type="select">
          <option value="male">Pria</option>
          <option value="female">Wanita</option>
        </ProfileField>

        <ProfileField label="Height (cm)" v-model="form.height_cm" type="number" />
        <ProfileField label="Weight (kg)" v-model="form.weight_kg" type="number" />

        <ProfileField label="Activity Level" v-model="form.activity" type="select">
          <option value="jarang">Jarang</option>
          <option value="olahraga_ringan">Olahraga ringan</option>
          <option value="olahraga_sedang">Olahraga sedang</option>
          <option value="olahraga_berat">Olahraga berat</option>
          <option value="sangat_berat">Sangat berat</option>
        </ProfileField>
      </div>

      <div class="flex justify-end">
        <button @click="saveChanges"
          class="px-6 py-3 bg-orange text-white-soft rounded-md font-semibold hover:bg-black-base">
          Selesai
        </button>
      </div>

      <div v-if="error" class="text-red-600 text-center py-4 font-semibold">
        {{ error }}
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import ProfileField from "@/components/ProfileField.vue";
import CropperModal from "@/components/CropperModal.vue";

const auth = useAuthStore();

const fileInput = ref(null);
const cropSrc = ref(null);
const croppedBase64 = ref(null);
const finalFile = ref(null);

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toISOString().split("T")[0];
}

const form = reactive({
  name: auth.user.name,
  email: auth.user.email,
  date_of_birth: formatDate(auth.user.date_of_birth),
  gender: auth.user.gender,
  height_cm: auth.user.height_cm,
  weight_kg: auth.user.weight_kg,
  activity: auth.user.activity,
  photo_url: auth.user.photo_url,
});

const previewPhoto = computed(() =>
  croppedBase64.value
    ? croppedBase64.value
    : form.photo_url
      ? '/storage/' + form.photo_url
      : "https://i.pravatar.cc/150?img=12"
);

const triggerUpload = () => fileInput.value.click();

const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => (cropSrc.value = reader.result);
  reader.readAsDataURL(file);
};

const applyCrop = (img) => {
  croppedBase64.value = img;
  finalFile.value = base64ToFile(img, "photo.png");
  cropSrc.value = null;
};

const cancelCrop = () => {
  cropSrc.value = null;
  croppedBase64.value = null;
  finalFile.value = null;
  if (fileInput.value) fileInput.value.value = "";
};

function base64ToFile(base64, filename) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

const error = ref(null);

const saveChanges = async () => {
  try {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("date_of_birth", formatDate(form.date_of_birth));
    fd.append("gender", form.gender);
    fd.append("height_cm", form.height_cm);
    fd.append("weight_kg", form.weight_kg);
    fd.append("activity", form.activity);

    if (finalFile.value) {
      fd.append("photo", finalFile.value);
    }

    await auth.updateProfile(fd);
    window.location.href = "/profile";
  } catch (err) {
    error.value = "Gagal menyimpan perubahan";
  }
};
</script>

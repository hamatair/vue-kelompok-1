<template>
    <div class="max-w-full mx-auto px-20">

        <!-- CROP MODAL -->
        <CropperModal v-if="cropSrc" :src="cropSrc" @save="applyCrop" @cancel="cropSrc = null" />

        <!-- Section 1 -->
        <div class="bg-white-soft p-6 border-b border-orange-light/40">
            <div class="flex justify-between items-center">

                <div class="flex gap-5">
                    <div class="relative">
                        <img :src="localUser.photo"
                            class="w-24 h-24 rounded-full border border-orange-light object-cover" />

                        <input ref="fileInput" type="file" accept="image/*" class="hidden"
                            @change="handlePhotoChange" />
                    </div>

                    <div class="flex flex-col justify-center gap-2">
                        <button @click="triggerUpload"
                            class="w-fit px-4 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light transition flex items-center gap-2">
                            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                            Ubah Foto Profil
                        </button>
                    </div>
                </div>

                <!-- tombol kembali -->
                <router-link to="/profile"
                    class="px-4 py-2 bg-gray-300 text-black-base rounded-md font-semibold hover:bg-gray-400 transition">
                    Kembali
                </router-link>

            </div>
        </div>

        <!-- FORM SECTION -->
        <div class="bg-white-soft">

            <div class="grid grid-cols-2 gap-6 mt-6 border-b border-orange-light/40 pb-6">

                <!-- NAMA -->
                <div class="flex flex-col">
                    <label class="font-semibold mb-1">Nama</label>
                    <input v-model="localUser.name" class="border border-black-base rounded-md px-3 py-2" />
                </div>

                <!-- EMAIL -->
                <div class="flex flex-col">
                    <label class="font-semibold mb-1">Email</label>
                    <input v-model="localUser.email" class="border border-black-base rounded-md px-3 py-2" />
                </div>

                <!-- TGL LAHIR -->
                <div class="flex flex-col">
                    <label class="font-semibold mb-1">Tanggal Lahir</label>
                    <div class="relative">
                        <input v-model="localUser.birthDate" type="date"
                            class="w-full border border-black-base rounded-md px-3 py-2 pr-10" />
                        <FontAwesomeIcon icon="fa-regular fa-calendar"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
                    </div>
                </div>

                <!-- GENDER -->
                <div class="flex flex-col">
                    <label class="font-semibold mb-1">Jenis Kelamin</label>
                    <select v-model="localUser.gender" class="border border-black-base rounded-md px-3 py-2">
                        <option>Pria</option>
                        <option>Wanita</option>
                    </select>
                </div>

                <!-- HEIGHT -->
                <div class="flex flex-col">
                    <label class="font-semibold mb-1">Height (cm)</label>
                    <input v-model.number="localUser.height" type="number"
                        class="border border-black-base rounded-md px-3 py-2" />
                </div>

                <!-- WEIGHT -->
                <div class="flex flex-col">
                    <label class="font-semibold mb-1">Weight (kg)</label>
                    <input v-model="localUser.weight" type="text"
                        class="border border-black-base rounded-md px-3 py-2" />
                </div>

                <!-- ACTIVITY -->
                <div class="flex flex-col">
                    <label class="font-semibold mb-1">Activity Level</label>
                    <select v-model="localUser.activity" class="border border-black-base rounded-md px-3 py-2">
                        <option>Olahraga ringan</option>
                        <option>Olahraga sedang</option>
                        <option>Olahraga berat</option>
                    </select>
                </div>

            </div>

            <div class="mt-8 flex justify-end">
                <button @click="saveChanges"
                    class="px-6 py-3 bg-orange text-white-soft rounded-md font-semibold hover:bg-black-base transition">
                    Selesai
                </button>
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from "../stores/userStore";
import CropperModal from "../components/CropperModal.vue";

const store = useUserStore();
const fileInput = ref(null);

// crop source (image before cropping)
const cropSrc = ref(null);

// Copy initial state
const localUser = reactive({
    name: store.name,
    email: store.email,
    birthDate: store.birthDate,
    gender: store.gender,
    height: store.height,
    weight: store.weight,
    activity: store.activity,
    photo: store.photo,
});

// Trigger file picker
const triggerUpload = () => {
    fileInput.value.click();
};

// Handle file select
const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        cropSrc.value = reader.result; // buka modal cropper
    };
    reader.readAsDataURL(file);
};

// When crop finished
const applyCrop = (finalImage) => {
    localUser.photo = finalImage;
    cropSrc.value = null;
};

// Save changes
const saveChanges = () => {
    store.$patch(localUser);
    store.updatePhoto(localUser.photo);
    window.location.href = "/profile";
};
</script>

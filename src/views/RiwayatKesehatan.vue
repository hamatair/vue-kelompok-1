<template>
  <div class="max-w-full mx-auto px-20 py-10">

    <!-- Header Judul + Tombol Tambah -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <div class="text-2xl font-bold text-black-base">Riwayat Kesehatan</div>
        <div class="text-gray-600 text-sm">Catat Riwayat Kesehatanmu</div>
      </div>

      <button
        @click="openModal"
        class="px-4 py-2 bg-orange text-white-soft rounded-md font-semibold hover:bg-orange-light transition flex items-center gap-2 active:scale-95 duration-150 cursor-pointer"
      >
        <span class="text-lg">+</span> Tambah
      </button>
    </div>

    <!-- JIKA DATA KOSONG -->
    <div
      v-if="healthStore.records.length === 0"
      class="w-full text-center py-10 text-gray-600 border rounded-xl bg-white-soft shadow-sm mb-4"
    >
      Tidak ada data riwayat kesehatan yang disimpan
    </div>

    <!-- TABEL -->
    <div
      v-else
      class="bg-white-soft p-6 rounded-xl shadow-sm border border-orange-light/40"
    >
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b text-gray-700">
            <th class="py-3 px-4">No</th>
            <th class="py-3 px-4">Keterangan</th>
            <th class="py-3 px-4">Kategori</th>
            <th class="py-3 px-4">Tanggal</th>
            <th class="py-3 px-4">Arsip</th>
            <th class="py-3 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in healthStore.records"
            :key="item.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="py-3 px-4">{{ index + 1 }}</td>
            <td class="py-3 px-4">{{ item.description }}</td>
            <td class="py-3 px-4">{{ item.category }}</td>
            <td class="py-3 px-4">{{ item.date }}</td>

            <td class="py-3 px-4">
              <span
                v-if="item.file"
                class="bg-orange-light/20 px-2 py-1 rounded-lg text-orange text-xs font-semibold"
              >
                {{ item.file }}
              </span>
              <span v-else class="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg text-xs">None</span>
            </td>

            <td class="py-3 px-4 flex gap-3">
              <button @click="openEdit(item)" class="text-black-base hover:text-orange-light active:scale-95 transition duration-150 cursor-pointer">
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
              </button>
              <button @click="openDelete(item)" class="text-red-500 hover:text-red-700 active:scale-95 transition duration-150 cursor-pointer">
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL TAMBAH -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div class="bg-white-soft rounded-2xl p-8 w-[650px] shadow-lg relative">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-red-500 active:scale-95">✕</button>

        <h2 class="text-2xl font-bold text-orange">Tambah Riwayat Kesehatan</h2>
        <p class="text-gray-500 text-sm mb-6">Tambahkan Riwayat Kesehatan Terbaru Anda</p>

        <input v-model="newData.description" type="text" placeholder="Isi keterangan" class="w-full mb-4 border rounded-md px-3 py-2"/>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <select
            v-model="newData.category"
            class="border rounded-md px-3 py-2"
          >
            <option value="" disabled hidden>Pilih Kategori</option>
            <option value="Alergi">Alergi</option>
            <option value="Penyakit">Penyakit</option>
            <option value="Vaksinasi">Vaksinasi</option>
            <option value="Operasi">Operasi</option>
          </select>

          <input
            v-model="newData.date"
            type="date"
            class="border rounded-md px-3 py-2"
          />

        </div>

        <input v-model="newData.file" type="text" placeholder="nama file (opsional)" class="border rounded-md px-3 py-2 w-full"/>

        <button @click="saveNew" class="mt-6 w-full bg-orange text-white-soft font-semibold py-2 rounded-md hover:bg-orange-light active:scale-95">
          Save
        </button>
      </div>
    </div>

    <!-- MODAL EDIT -->
    <div v-if="showEdit" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div class="bg-white-soft rounded-2xl p-8 w-[650px] shadow-lg relative">
        <button @click="closeEdit" class="absolute top-3 right-3 text-gray-500 hover:text-red-500 active:scale-95">✕</button>

        <h2 class="text-2xl font-bold text-orange">Edit Riwayat Kesehatan</h2>
        <p class="text-gray-500 text-sm mb-6">Ubah data riwayat kesehatan</p>

        <input type="text" v-model="editItem.description" class="w-full mb-4 border rounded-md px-3 py-2"/>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <select v-model="editItem.category" class="border rounded-md px-3 py-2">
            <option>Alergi</option>
            <option>Penyakit</option>
            <option>Vaksinasi</option>
            <option>Operasi</option>
          </select>
          <input type="date" v-model="editItem.date" class="border rounded-md px-3 py-2"/>
        </div>

        <input type="text" v-model="editItem.file" class="border rounded-md px-3 py-2 w-full"/>

        <button @click="updateEdit" class="mt-6 w-full bg-orange text-white-soft font-semibold py-2 rounded-md hover:bg-orange-light active:scale-95">
          Update
        </button>
      </div>
    </div>

    <!-- MODAL DELETE -->
    <div v-if="showDelete" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div class="bg-white-soft rounded-2xl p-8 w-[450px] shadow-xl text-center">
        <h2 class="text-xl font-bold mb-4">Hapus Riwayat?</h2>
        <p class="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus data ini?</p>

        <div class="flex justify-center gap-3">
          <button @click="closeDelete" class="px-5 py-2 bg-gray-300 rounded-md active:scale-95">Batal</button>
          <button @click="confirmDelete" class="px-5 py-2 bg-red-500 text-white rounded-md active:scale-95">Hapus</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMedicalRecordStore } from "@/stores/medicalRecordStore";

const healthStore = useMedicalRecordStore();

// Fetch saat load halaman
onMounted(() => {
  healthStore.fetchRecords();
});

// modal controls
const showModal = ref(false);
const newData = ref({ description: "", category: "", date: "", file: "" });

const openModal = () => (showModal.value = true);
const closeModal = () => {
  showModal.value = false;
  newData.value = { description: "", category: "", date: "", file: "" };
};

const saveNew = () => {
  healthStore.addRecord({ ...newData.value });
  newData.value = { description: "", category: "", date: "", file: "" };
  closeModal();
};

// edit
const showEdit = ref(false);
const editItem = ref({});

const openEdit = (item) => {
  editItem.value = { ...item };
  showEdit.value = true;
};

const closeEdit = () => (showEdit.value = false);

const updateEdit = () => {
  healthStore.updateRecord(editItem.value.id, { ...editItem.value });
  closeEdit();
};

// delete
const showDelete = ref(false);
const deleteItem = ref({});

const openDelete = (item) => {
  deleteItem.value = item;
  showDelete.value = true;
};

const closeDelete = () => (showDelete.value = false);

const confirmDelete = () => {
  healthStore.removeRecord(deleteItem.value.id);
  closeDelete();
};
</script>

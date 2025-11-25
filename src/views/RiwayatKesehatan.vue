<script setup>
import { ref, onMounted } from "vue";
import { useMedicalRecordStore } from "@/stores/medicalRecordStore";

const store = useMedicalRecordStore();

const showModal = ref(false);
const isEditing = ref(false);
const currentId = ref(null);

const formData = ref({
  record_type: "",
  name: "",
  description: "",
  recorded_at: "",
});

// fetch data
onMounted(() => {
  store.fetchRecords();
});

// modal tambah
const openAddModal = () => {
  isEditing.value = false;
  formData.value = {
    record_type: "",
    name: "",
    description: "",
    recorded_at: "",
  };
  showModal.value = true;
};

// modal edit
const editRecord = (record) => {
  isEditing.value = true;
  currentId.value = record.id;
  formData.value = {
    record_type: record.record_type,
    name: record.name,
    description: record.description,
    recorded_at: record.recorded_at,
  };
  showModal.value = true;
};

const addRecord = async () => {
  await store.addRecord(formData.value);
  showModal.value = false;
};

const updateRecordData = async () => {
  await store.updateRecord(currentId.value, formData.value);
  showModal.value = false;
};

// ==============================
// Modal Delete
// ==============================
const showDeleteModal = ref(false);
const deleteId = ref(null);

const openDeleteModal = (id) => {
  deleteId.value = id;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  await store.removeRecord(deleteId.value);
  showDeleteModal.value = false;
};
</script>

<template>
  <div class="px-12 py-8">

    <!-- HEADER + BUTTON TAMBAH -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Riwayat Kesehatan</h1>
        <p class="text-gray-500 text-sm -mt-1">Catat Riwayat Kesehatanmu</p>
      </div>

      <button
        class="bg-[#FF7A00] text-white px-5 py-2 rounded-lg shadow hover:opacity-90"
        @click="openAddModal"
      >
        + Tambah
      </button>
    </div>

    <!-- =======================
         KONDISI KOSONG
    ======================== -->
    <div
      v-if="store.records.length === 0"
      class="w-full border border-gray-200 bg-gray-50 rounded-lg p-6 text-center text-gray-500"
    >
      Tidak ada riwayat kesehatan yang disimpan
    </div>

    <!-- TABLE -->
    <table
      v-else
      class="w-full border-collapse shadow-sm rounded-lg overflow-hidden mt-4"
    >
      <thead>
        <tr class="bg-gray-100 text-gray-700 text-sm">
          <th class="p-3 text-left">Jenis</th>
          <th class="p-3 text-left">Nama</th>
          <th class="p-3 text-left">Deskripsi</th>
          <th class="p-3 text-left">Tanggal</th>
          <th class="p-3 text-left">Aksi</th>
        </tr>
      </thead>

      <tbody class="text-sm">
        <tr
          v-for="item in store.records"
          :key="item.id"
          class="border-b hover:bg-gray-50"
        >
          <td class="p-3">{{ item.record_type }}</td>
          <td class="p-3">{{ item.name }}</td>
          <td class="p-3">{{ item.description }}</td>
          <td class="p-3">{{ item.recorded_at }}</td>

          <td class="p-3 flex gap-4">

            <!-- ICON EDIT -->
            <i
              class="fas fa-pen text-yellow-600 cursor-pointer hover:scale-110 transition"
              @click="editRecord(item)"
            ></i>

            <!-- ICON DELETE -->
            <i
              class="fas fa-trash text-red-600 cursor-pointer hover:scale-110 transition"
              @click="openDeleteModal(item.id)"
            ></i>

          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL ADD / EDIT -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 class="text-lg font-semibold mb-4">
          {{ isEditing ? "Edit Riwayat" : "Tambah Riwayat" }}
        </h2>

        <div class="mb-3">
          <label class="font-medium">Jenis</label>
          <select v-model="formData.record_type" class="w-full border p-2 rounded mt-1">
            <option disabled value="">Pilih jenis</option>
            <option value="penyakit">Penyakit</option>
            <option value="alergi">Alergi</option>
            <option value="vaksinasi">Vaksinasi</option>
            <option value="operasi">Operasi</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="font-medium">Nama</label>
          <input v-model="formData.name" type="text" class="w-full border p-2 rounded mt-1" />
        </div>

        <div class="mb-3">
          <label class="font-medium">Deskripsi</label>
          <textarea v-model="formData.description" class="w-full border p-2 rounded mt-1"></textarea>
        </div>

        <div class="mb-3">
          <label class="font-medium">Tanggal</label>
          <input v-model="formData.recorded_at" type="datetime-local" class="w-full border p-2 rounded mt-1" />
        </div>

        <div class="flex justify-end mt-4">
          <button class="px-4 py-2 mr-2" @click="showModal = false">Batal</button>
          <button
            class="bg-[#FF7A00] text-white px-4 py-2 rounded"
            @click="isEditing ? updateRecordData() : addRecord()"
          >
            {{ isEditing ? "Update" : "Simpan" }}
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL DELETE -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/45 flex items-center justify-center z-50"
    >
      <div class="bg-white px-10 py-8 rounded-xl shadow-lg text-center w-[380px]">

        <!-- ICON -->
        <div class="flex justify-center mb-4">
          <div class="border-4 border-[#FF7A00] rounded-full p-4">
            <span class="text-[#FF7A00] text-5xl font-bold">!</span>
          </div>
        </div>

        <p class="text-[#FF7A00] text-xl font-semibold mb-6">
          Yakin Ingin Menghapus?
        </p>

        <div class="flex justify-center gap-4">
          <button
            class="px-6 py-2 rounded-lg bg-gray-200 text-gray-700"
            @click="showDeleteModal = false"
          >
            Tidak
          </button>

          <button
            class="px-6 py-2 rounded-lg bg-[#FF7A00] text-white"
            @click="confirmDelete"
          >
            Ya
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

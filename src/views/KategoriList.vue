<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore'

const router = useRouter()
const categoryStore = useCategoryStore()

// State untuk input form
const newCategoryName = ref('')

// Data kategori dari store
const categories = computed(() => categoryStore.categories)

// Fungsi Tambah Kategori
const handleAddCategory = () => {
  if (newCategoryName.value.trim()) {
    categoryStore.addCategory(newCategoryName.value)
    newCategoryName.value = '' // Reset input
  } else {
    alert('Please enter a category name')
  }
}

// Fungsi Hapus Kategori
const handleDelete = (id) => {
  if (confirm('Are you sure you want to delete this category?')) {
    categoryStore.deleteCategory(id)
  }
}

// Fungsi Navigasi (Switch)
const goToArticles = () => {
  router.push('/admin/articles')
}
const goToConsultations = () => {
  router.push('/admin/consultations')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
    <div class="max-w-6xl mx-auto">
      <!-- 1. NAVIGATION SWITCH (Seperti di gambar) -->
      <div class="flex justify-center mb-10">
        <div class="bg-gray-200 p-1 rounded-lg inline-flex text-sm font-medium">
          <!-- Tombol Articles (Inactive) -->
          <button
            @click="goToArticles"
            class="px-5 py-2 rounded-md text-gray-500 hover:text-gray-900 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            Articles
          </button>

          <button
            class="px-5 py-2 bg-white text-gray-800 rounded-md shadow-sm transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            Categories
          </button>
          <button
            @click="goToConsultations"
            class="px-5 py-2 rounded-md text-gray-500 hover:text-gray-900 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3.75h5.25M4.5 5.25A2.25 2.25 0 016.75 3h10.5A2.25 2.25 0 0119.5 5.25v9.75A2.25 2.25 0 0117.25 17.25H8.664l-2.658 2.214A.75.75 0 015 18.9v-1.65"
              />
            </svg>
            Konsultasi
          </button>
        </div>
      </div>

      <!-- Header Section -->
      <div class="flex justify-between items-end mb-8">
        <div>
          <h1 class="text-3xl font-bold text-orange-500 mb-1">Categories</h1>
          <p class="text-gray-500 text-sm">Manage your article categories</p>
        </div>
        <!-- Tombol Add (Opsional, karena sudah ada form di kiri, tapi di gambar ada tombol ini) -->
        <button
          class="bg-orange-200 text-orange-700 hover:bg-orange-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Category
        </button>
      </div>

      <!-- MAIN CONTENT GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- CARD 1: ADD NEW CATEGORY -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
          <h2 class="font-medium text-gray-800 mb-1">Add New Category</h2>
          <p class="text-xs text-gray-500 mb-6">Create a new category for your articles</p>

          <label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
          <div class="flex flex-col gap-3">
            <input
              v-model="newCategoryName"
              type="text"
              placeholder="Enter category name"
              class="w-full bg-gray-100 border-none rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition"
              @keyup.enter="handleAddCategory"
            />
            <button
              @click="handleAddCategory"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              Save Category
            </button>
          </div>
        </div>

        <!-- CARD 2: EXISTING CATEGORIES -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 class="font-medium text-gray-800 mb-1">Existing Categories</h2>
          <p class="text-xs text-gray-500 mb-6">{{ categories.length }} categories available</p>

          <div class="space-y-3">
            <!-- Loop Categories -->
            <div
              v-for="cat in categories"
              :key="cat.id"
              class="flex justify-between items-center p-4 bg-gray-50 rounded-lg group hover:bg-orange-50 transition-colors"
            >
              <span class="text-sm font-medium text-gray-700 group-hover:text-orange-700">{{
                cat.name
              }}</span>

              <button
                @click="handleDelete(cat.id)"
                class="text-gray-300 hover:text-red-500 transition-colors p-1"
                title="Delete Category"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="categories.length === 0" class="text-center py-8 text-gray-400 text-sm">
            No categories found.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

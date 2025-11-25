<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/articleStore' 
import { useCategoryStore } from '@/stores/categoryStore'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

// State
const isEditMode = ref(false)
const articleId = ref(null)

const form = ref({
  title: '',
  content: '',
  category: 'Technology',
  date: new Date().toISOString().split('T')[0], // Default hari ini (YYYY-MM-DD)
  status: 'draft',
  image: null
})

// Pilihan Kategori
const categories = useCategoryStore().categories.map(cat => cat.name)

// Saat komponen dimuat, cek apakah ini mode Edit
onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true
    articleId.value = parseInt(route.params.id)
    
    // Ambil data dari store berdasarkan ID
    const existingArticle = articleStore.getArticleById(articleId.value)
    
    if (existingArticle) {
      // Copy data ke form (gunakan spread operator agar reaktifitas store tidak langsung berubah saat mengetik)
      form.value = { ...existingArticle }
    } else {
      // Jika ID tidak ditemukan (misal user mengetik URL ngawur)
      alert('Article not found!')
      router.push('/admin/articles')
    }
  }
})

// Handle upload gambar sederhana (Blob URL)
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = URL.createObjectURL(file)
  }
}

// Simpan Data (Create / Update)
const saveArticle = () => {
  if (!form.value.title) return alert('Title is required')

  const payload = {
    id: articleId.value, // null jika mode Create (nanti dihandle store)
    ...form.value
  }

  if (isEditMode.value) {
    articleStore.updateArticle(payload)
  } else {
    articleStore.addArticle(payload)
  }
  
  // Kembali ke halaman list setelah simpan
  router.push('/admin/articles')
}

const cancel = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
    <div class="max-w-6xl mx-auto">
      
      <!-- Tombol Back -->
      <button @click="cancel" class="flex items-center text-black font-bold mb-6 hover:text-orange-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        Back
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- KOLOM KIRI: Input Konten Utama -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Judul Artikel -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <label class="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
            <input 
              v-model="form.title" 
              type="text" 
              placeholder="Enter your article title..." 
              class="w-full bg-gray-100 border-transparent rounded-lg px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition"
            >
          </div>

          <!-- Upload Gambar -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <label class="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
            <div class="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-white overflow-hidden group hover:border-orange-400 transition-colors">
              <!-- Preview Gambar -->
              <img v-if="form.image" :src="form.image" class="absolute inset-0 w-full h-full object-cover">
              
              <!-- Input File (Invisible) -->
              <input type="file" @change="handleImageUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20">
              
              <!-- Placeholder Text -->
              <div v-if="!form.image" class="text-center p-4">
                <div class="text-gray-400 mb-2">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mx-auto"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                </div>
                <p class="text-gray-500 font-medium">Click to upload image</p>
                <p class="text-xs text-gray-400">PNG, JPG up to 10MB</p>
              </div>
              
              <!-- Overlay Hover (Jika sudah ada gambar) -->
              <div v-if="form.image" class="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center z-10 text-white text-sm font-medium">
                Change Image
              </div>
            </div>
          </div>

          <!-- Konten Artikel (Textarea) -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <!-- Tips: Di sini kamu bisa mengganti textarea dengan Rich Text Editor seperti Quill/TipTap jika mau -->
            <textarea 
              v-model="form.content" 
              class="w-full h-80 bg-gray-100 p-4 rounded-lg outline-none resize-y focus:bg-white focus:ring-2 focus:ring-orange-500 font-sans" 
              placeholder="Write your article here... (Supports basic HTML tags like <p>, <b>, etc.)"
            ></textarea>
          </div>
        </div>

        <!-- KOLOM KANAN: Sidebar Settings -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- Publish Status -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
             <div>
                <label class="block text-sm font-medium text-gray-700">Publish Status</label>
                <p class="text-xs text-gray-500 mt-1 capitalize">Current: <strong>{{ form.status }}</strong></p>
             </div>
             <!-- Toggle Switch Custom -->
             <button 
                @click="form.status = form.status === 'published' ? 'draft' : 'published'"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                :class="form.status === 'published' ? 'bg-orange-500' : 'bg-gray-200'"
              >
                <span 
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" 
                  :class="form.status === 'published' ? 'translate-x-6' : 'translate-x-1'"
                />
             </button>
          </div>

          <!-- Kategori -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div class="relative">
              <select v-model="form.category" class="w-full bg-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500 appearance-none">
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <!-- Tanggal Publish -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <label class="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
            <input 
              v-model="form.date" 
              type="date" 
              class="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 text-gray-600"
            >
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-3 pt-4">
            <button 
              @click="saveArticle" 
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg shadow-sm transition-colors flex justify-center items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" /></svg>
              {{ isEditMode ? 'Update Article' : 'Save Article' }}
            </button>
            <button 
              @click="cancel" 
              class="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
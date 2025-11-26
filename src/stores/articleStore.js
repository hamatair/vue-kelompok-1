import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getArticles, createArticle, updateArticle, deleteArticle } from '@/services/api'

export const useArticleStore = defineStore('articleStore', () => {
  // --- STATE ---
  const articles = ref([])
  const loading = ref(false)
  const error = ref(null)

  // --- GETTERS ---
  const getArticleById = computed(() => {
    return (articleId) => {
      if (!Array.isArray(articles.value)) return null
      return articles.value.find((article) => article.id === articleId)
    }
  })

  // --- ACTIONS ---

  // 1. Fetch Data (Read)
  async function fetchArticles(params = {}) {
    loading.value = true
    error.value = null
    
    try {
      const response = await getArticles(params)
      
      // Ambil body response dari axios
      const apiData = response.data 

      // LOGIKA PENANGANAN DATA (Sesuai Log Anda)
      if (apiData && Array.isArray(apiData.data)) {
        // KASUS: Laravel Pagination / Resource Wrapper
        // Ini yang terjadi di log Anda: { current_page: 1, data: [...], ... }
        articles.value = apiData.data
        
        console.log('✅ Data berhasil dimuat ke State:', articles.value)
      } 
      else if (Array.isArray(apiData)) {
        // KASUS: Array Polos (langsung [...])
        articles.value = apiData
      } 
      else {
        // KASUS: Format tidak dikenali
        console.warn('⚠️ Format data tidak sesuai expectation:', apiData)
        articles.value = []
      }

    } catch (err) {
      error.value = err
      console.error('❌ Gagal mengambil artikel:', err)
      articles.value = [] 
    } finally {
      loading.value = false
    }
  }
  // 2. Add Data (Create)
  async function addArticle(payload) {
    loading.value = true
    try {
      const response = await createArticle(payload)

      // Ambil data artikel baru dari response
      // Jika backend pakai Resource wrapper, ambil response.data.data, jika tidak response.data
      const newArticle = response.data.data || response.data

      // --- FIX: Pastikan articles.value adalah Array sebelum di-push ---
      if (!Array.isArray(articles.value)) {
        articles.value = []
      }

      articles.value.push(newArticle)
    } catch (err) {
      error.value = err
      console.error('Gagal menambah artikel:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 3. Update Data (Update)
  async function updateArticle(id, payload) {
    loading.value = true
    try {
      const response = await updateArticle(id, payload)
      // Deteksi struktur response update
      const updatedData = response.data.data || response.data

      // Pastikan array valid
      if (!Array.isArray(articles.value)) return

      const index = articles.value.findIndex((a) => a.id === id)
      if (index !== -1) {
        articles.value[index] = updatedData
      }
    } catch (err) {
      error.value = err
      console.error('Gagal update artikel:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 4. Delete Data (Delete)
  async function removeArticle(id) {
    loading.value = true
    try {
      await deleteArticle(id)

      if (Array.isArray(articles.value)) {
        articles.value = articles.value.filter((a) => a.id !== id)
      }
    } catch (err) {
      error.value = err
      console.error('Gagal menghapus artikel:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // --- RETURN ---
  return {
    articles,
    loading,
    error,
    getArticleById,
    fetchArticles,
    addArticle,
    updateArticle,
    removeArticle,
  }
})

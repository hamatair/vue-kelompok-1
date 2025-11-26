import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '@/services/api';

export const useCategoryStore = defineStore('categoryStore', () => {
  // --- STATE ---
  const categories = ref([]); // Data dimulai dari array kosong
  const loading = ref(false);
  const error = ref(null);

  // --- GETTERS ---
  const getCategoryById = computed(() => {
    return (categoryId) => categories.value.find(category => category.id === categoryId);
  });
   
  // --- ACTIONS ---

  // 1. Fetch Data (Read)
  async function fetchCategories() {
    loading.value = true;
    error.value = null;
    try {
      const response = await getCategories();
      // Asumsi response backend Laravel standard: { data: [...] }
      categories.value = response.data; 
    } catch (err) {
      error.value = err;
      console.error("Gagal mengambil kategori:", err);
    } finally {
      loading.value = false;
    }
  }

  // 2. Add Data (Create)
  async function addCategory(payload) {
    // Payload bisa berupa object { name: 'Health' }
    loading.value = true;
    try {
      const response = await createCategory(payload);
      // Push data baru dari backend (yang sudah punya ID) ke state
      categories.value.push(response.data);
    } catch (err) {
      error.value = err;
      console.error("Gagal menambah kategori:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }
   
  // 3. Update Data (Update)
  async function editCategory(id, payload) {
    loading.value = true;
    try {
      const response = await updateCategory(id, payload);
      const updatedData = response.data;

      // Update state lokal
      const index = categories.value.findIndex(c => c.id === id);
      if (index !== -1) {
        categories.value[index] = updatedData;
      }
    } catch (err) {
      error.value = err;
      console.error("Gagal update kategori:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }
   
  // 4. Delete Data (Delete)
  async function removeCategory(id) {
    loading.value = true;
    try {
      await deleteCategory(id);
      // Hapus dari state lokal
      categories.value = categories.value.filter(c => c.id !== id);
    } catch (err) {
      error.value = err;
      console.error("Gagal menghapus kategori:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }
   
  // --- RETURN ---
  return { 
    // State
    categories, 
    loading,
    error,
    // Getters
    getCategoryById, 
    // Actions
    fetchCategories,
    addCategory, 
    editCategory, // Saya namakan editCategory agar beda dengan nama import updateCategory
    removeCategory // Saya namakan removeCategory agar beda dengan nama import deleteCategory
  };
});
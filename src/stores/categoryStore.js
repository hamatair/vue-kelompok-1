import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCategoryStore = defineStore('categoryStore', () => {
  // --- STATE ---
  // Ubah ke object agar punya ID dan Name
  const categories = ref([
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Business' },
    { id: 3, name: 'Lifestyle' },
    { id: 4, name: 'Wellness' },
    { id: 5, name: 'Health' }
  ])

  // --- GETTERS ---
  const getCategoryById = computed(() => {
    return (categoryId) => categories.value.find(category => category.id === categoryId);
  });
   
  // --- ACTIONS ---
  function addCategory(categoryName) {
    if (!categoryName) return;

    // Logic ID otomatis
    const id = categories.value.length > 0 ? Math.max(...categories.value.map(a => a.id)) + 1 : 1;
    
    // Push object baru
    categories.value.push({ id, name: categoryName });
  }
   
  function updateCategory(updatedCategory) {
    const index = categories.value.findIndex(a => a.id === updatedCategory.id);
    if (index !== -1) {
      categories.value[index] = updatedCategory;
    }
  }
   
  function deleteCategory(id) {
    categories.value = categories.value.filter(a => a.id !== id);
  }
   
  // --- RETURN ---
  return { 
    categories, 
    getCategoryById, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
  };
});
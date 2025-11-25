import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useArticleStore = defineStore('articleStore', () => {
  // --- STATE ---
  const articles = ref([
    {
      id: 1,
      title: 'Why is exercise so important for seniors?',
      excerpt: 'Regular physical activity is vital for healthy aging. It can help maintain muscle mass, improve balance, and boost mood.',
      date: '2025-11-18', // Format tanggal diseragamkan YYYY-MM-DD agar mudah di input date HTML
      category: 'Wellness',
      status: 'published',
      author: 'Calmate Team',
      image: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/16291/18b0cdaf-cd84-4714-8a63-72d5dc8767e11.jpg',
      content: `
      <p class="mb-6"><span class="float-left text-7xl font-serif font-bold mr-3 mt-[-10px] leading-none">W</span>hether you were once much more physically active or have never been one to exercise regularly, now is a great time to start an exercise and fitness regimen. Getting and staying in shape is just as important for seniors as it is for younger people.</p>
      
      <p class="mb-6">Why is exercise important for older people? Getting your heart rate up and challenging your muscles benefits virtually every system in your body and improves your physical and mental health in myriad ways. Physical activity helps maintain a healthy blood pressure, keeps harmful plaque from building up in your arteries, reduces inflammation, improves blood sugar levels, strengthens bones, and helps stave off depression.</p>
  
      <p class="mb-6">Many older adults hesitate to get moving because they're unfamiliar with the types of exercise and fitness that are effective and safe. The good news is that any kind of movement is better than being sedentary, so there's nothing wrong with starting small and working your way up to longer workouts.</p>
      `
    },
    {
      id: 2,
      title: 'The Future of AI in Business',
      excerpt: 'Artificial Intelligence is transforming the business landscape, enabling companies to operate more efficiently and innovate.',
      content: 'Artificial Intelligence is no longer science fiction; it\'s a transformative force in the modern business landscape. From automating repetitive tasks to providing deep data insights, AI is enabling companies to operate more efficiently, make smarter decisions, and create innovative products and services.',
      date: '2025-11-18',
      author: 'Calmate Team',
      category: 'Technology',
      status: 'published',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  ]);

  // --- GETTERS ---
  const getArticleById = computed(() => {
    return (articleId) => articles.value.find(article => article.id === articleId);
  });

  // --- ACTIONS ---
  // Di Setup Store, actions adalah function biasa
  
  function addArticle(newArticle) {
    // Logic ID otomatis: cari ID terbesar + 1
    const id = articles.value.length > 0 ? Math.max(...articles.value.map(a => a.id)) + 1 : 1;
    // Push ke array (pakai .value karena ref)
    articles.value.push({ ...newArticle, id });
  }

  function updateArticle(updatedArticle) {
    const index = articles.value.findIndex(a => a.id === updatedArticle.id);
    if (index !== -1) {
      articles.value[index] = updatedArticle;
    }
  }

  function deleteArticle(id) {
    articles.value = articles.value.filter(a => a.id !== id);
  }

  // --- RETURN ---
  // Kembalikan semua state, getters, dan actions agar bisa dipakai di component
  return { 
    articles, 
    getArticleById, 
    addArticle, 
    updateArticle, 
    deleteArticle 
  };
});
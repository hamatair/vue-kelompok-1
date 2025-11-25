<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/articleStore.js'

const router = useRouter()
const articleStore = useArticleStore()

const articles = computed(() => articleStore.articles)

const editArticle = (id) => {
  router.push(`/admin/article/edit/${id}`)
}

const deleteArticle = (id) => {
  if (confirm('Are you sure you want to delete this article?')) {
    articleStore.deleteArticle(id)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const goToCategories = () => {
  router.push('/admin/category')
}
const goToConsultations = () => {
  router.push('/admin/consultations')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-center mb-10">
        <div class="bg-gray-200 p-1 rounded-lg inline-flex text-sm font-medium">
          <!-- Tombol Categories (Active - Putih & Shadow) -->
          <button
            class="px-5 py-2 bg-white text-gray-800 rounded-md hover:cursor-pointer shadow-sm transition-colors flex items-center"
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
            Artikel
          </button>
          <!-- Tombol Articles (Inactive) -->
          <button
            @click="goToCategories"
            class="px-5 py-2 rounded-md text-gray-500 hover:text-gray-900 hover:cursor-pointer transition-colors flex items-center"
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
            Kategori
          </button>
          <button
            @click="goToConsultations"
            class="px-5 py-2 rounded-md text-gray-500 hover:text-gray-900 hover:cursor-pointer transition-colors flex items-center"
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
      <div class="mb-8 flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-bold text-orange-500 mb-1">Articles</h1>
          <p class="text-gray-500 text-sm">Manage your articles and blog posts</p>
        </div>

        <!-- Tombol Add New -->
        <button
          @click="router.push('/admin/article/new')"
          class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-4 h-4 mr-2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Article
        </button>
      </div>

      <!-- Tabel Artikel -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead
              class="bg-white border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs"
            >
              <tr>
                <th class="px-6 py-4 font-medium">ID</th>
                <th class="px-6 py-4 font-medium">Title</th>
                <th class="px-6 py-4 font-medium">Category</th>
                <th class="px-6 py-4 font-medium">Date Posted</th>
                <th class="px-6 py-4 font-medium">Status</th>
                <th class="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr
                v-for="article in articles"
                :key="article.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 text-gray-400">#{{ article.id }}</td>
                <td class="px-6 py-4 font-medium text-gray-900">{{ article.title }}</td>
                <td class="px-6 py-4 text-gray-600">{{ article.category }}</td>
                <td class="px-6 py-4 text-gray-600">{{ formatDate(article.date) }}</td>
                <td class="px-6 py-4">
                  <!-- Badge Status -->
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium border capitalize"
                    :class="
                      article.status === 'published'
                        ? 'bg-orange-100 text-orange-600 border-orange-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    "
                  >
                    {{ article.status || 'Draft' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right space-x-3">
                  <!-- Tombol Edit -->
                  <button
                    @click="editArticle(article.id)"
                    class="text-gray-400 hover:text-orange-500 transition-colors"
                    title="Edit"
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                  <!-- Tombol Delete -->
                  <button
                    @click="deleteArticle(article.id)"
                    class="text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
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
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State jika tidak ada artikel -->
          <div v-if="articles.length === 0" class="p-8 text-center text-gray-500">
            No articles found. Click "Add Article" to create one.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

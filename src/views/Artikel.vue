<script setup>
import { ref } from 'vue'
import { useArticleStore } from '@/stores/articleStore'
import { useRouter } from 'vue-router'

const articleStore = useArticleStore()

const router = useRouter()

const goToArticle = (id) => {
  router.push(`/artikel/${id}`)
}

const categories = ref([
  { name: 'All Articles', count: 2, active: true },
  { name: 'Technology', count: 1, active: false },
  { name: 'Business', count: 1, active: false },
  { name: 'Lifestyle', count: 0, active: false },
])

const searchQuery = ref('')
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-800">
    <div class="py-16 px-30 text-center sm:bg-gray-50 border-b border-gray-200">
      <h1 class="text-3xl md:text-4xl font-medium text-gray-900 mb-3">Welcome to CALMATE Blog</h1>
      <p class="text-gray-500 mb-8">
        Discover insightful articles about technology, business, and lifestyle
      </p>

      <div class="max-w-xl mx-auto relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search articles..."
          class="w-full py-3 pl-12 pr-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
        />
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 pb-20">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="w-full lg:w-1/4">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 class="font-medium text-gray-700 mb-4">Categories</h3>
            <ul class="space-y-2">
              <li v-for="(cat, index) in categories" :key="index">
                <a
                  href="#"
                  class="flex justify-between items-center px-4 py-2 rounded-lg text-sm transition-colors"
                  :class="
                    cat.active ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                  "
                >
                  <span>{{ cat.name }}</span>
                  <span>({{ cat.count }})</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="w-full lg:w-3/4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="article in articleStore.articles"
              :key="article.id"
              class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div class="h-48 overflow-hidden">
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div class="p-6" @click="goToArticle(article.id)" style="cursor: pointer">
                <div class="mb-3">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                    :class="article.category === 'Business' ? 'bg-orange-500' : 'bg-orange-500'"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-3 h-3 mr-1 opacity-80"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.5 2A2.5 2.5 0 002 4.5v2.879a2.5 2.5 0 00.732 1.767l8.013 8.013a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-8.013-8.013A2.5 2.5 0 007.38 2H4.5zM5 5a1 1 0 011-1h.01a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ article.category }}
                  </span>
                </div>

                <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {{ article.title }}
                </h3>
                <p class="text-gray-500 text-sm mb-4 line-clamp-3">
                  {{ article.excerpt }}
                </p>

                <div class="flex items-center text-gray-400 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  {{ article.date }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

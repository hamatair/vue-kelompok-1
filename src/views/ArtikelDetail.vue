<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/articleStore'

const route = useRoute() 
const router = useRouter()
const articleStore = useArticleStore()

const article = computed(() => {
    const articleId = parseInt(route.params.id)
    return articleStore.articles.find(item => item.id === articleId)
})



const relatedArticle = computed(() => {
    const articleId = parseInt(route.params.id)
    return articleStore.articles.find(item => item.id !== articleId) || articleStore.articles[0]
})

const goBack = () => {
    router.push('/artikel') // Atau router.back()
}

// Helper untuk warna kategori (opsional)
const getCategoryColor = (cat) => {
    if (cat === 'Wellness') return 'bg-orange-500'
    if (cat === 'Business') return 'bg-orange-400'
    return 'bg-blue-500'
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 font-sans text-gray-800">

        <div v-if="article" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <button @click="goBack"
                class="group flex items-center text-black font-bold mb-12 hover:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                    stroke="currentColor" class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
            </button>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

                <div class="lg:col-span-4 flex flex-col">

                    <h1 class="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-6">
                        {{ article.title }}
                    </h1>

                    <div class="mb-10">
                        <span class="inline-block text-white px-4 py-1.5 rounded-full text-sm font-medium"
                            :class="getCategoryColor(article.category)">
                            {{ article.category }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-4 mb-8">
                        <button
                            class="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </button>
                        <button
                            class="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 2.848-5.978 5.817-5.978.96 0 1.912.006 2.02.009v2.453l-1.385-.001c-1.378 0-2.315.659-2.315 2.152v1.771h3.766l-.49 3.667h-3.276v7.98h-4.137z" />
                            </svg>
                        </button>
                        <button
                            class="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </button>
                        <button
                            class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                        </button>
                    </div>

                    <div class="text-sm text-gray-500 mb-12">
                        {{ article.date }}
                    </div>

                    <div v-if="relatedArticle" class="mt-auto">
                        <h3 class="font-bold text-black mb-4">You may also like these articles</h3>

                        <div @click="router.push(`/artikel/${relatedArticle.id}`)"
                            class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm cursor-pointer hover:shadow-md transition">
                            <div class="h-32 rounded-lg overflow-hidden mb-3">
                                <img :src="relatedArticle.image" class="w-full h-full object-cover">
                            </div>

                            <span
                                class="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                {{ relatedArticle.category }}
                            </span>

                            <h4 class="font-bold text-gray-900 mt-2 mb-1 leading-tight">
                                {{ relatedArticle.title }}
                            </h4>

                            <p class="text-xs text-gray-400 mb-2 truncate">
                                {{ relatedArticle.excerpt }}
                            </p>

                            <div class="flex items-center text-xs text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {{ relatedArticle.date }}
                            </div>
                        </div>
                    </div>

                </div>

                <div class="lg:col-span-8">

                    <div
                        class="w-full h-[400px] md:h-[500px] rounded-r-3xl rounded-bl-3xl overflow-hidden mb-8 shadow-sm">
                        <img :src="article.image" :alt="article.title" class="w-full h-full object-cover">
                    </div>

                    <div class="prose prose-lg max-w-none text-gray-800 font-serif leading-relaxed">
                        <div v-html="article.content"></div>
                    </div>

                </div>

            </div>
        </div>

        <div v-else class="min-h-screen flex items-center justify-center">
            <p class="text-gray-500">Loading Article...</p>
        </div>

        <footer class="bg-white border-t border-gray-200 pt-16 pb-8 mt-20">
            <div class="max-w-6xl mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div class="col-span-1 md:col-span-2 pr-8">
                        <h2 class="text-orange-500 font-bold text-lg mb-4">CALMATE</h2>
                        <p class="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Your trusted source for articles and recommendations.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-800 mb-4">Links</h4>
                        <ul class="space-y-3 text-sm text-gray-500">
                            <li><a href="#" class="hover:text-orange-500">About</a></li>
                            <li><a href="#" class="hover:text-orange-500">Artikel</a></li>
                            <li><a href="#" class="hover:text-orange-500">Rekomendasi</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-800 mb-4">Contact</h4>
                        <ul class="space-y-3 text-sm text-gray-500">
                            <li>info@calmate.com</li>
                            <li>(123) 456-7890</li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-100 pt-8 text-center text-xs text-gray-400">
                    &copy; 2025 CALMATE. All rights reserved.
                </div>
            </div>
        </footer>

    </div>
</template>
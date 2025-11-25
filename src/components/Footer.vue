<template>
  <footer class="bg-white border-t border-gray-200 pt-16 pb-8">
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
            <li>
              <router-link to="/" class="hover:text-orange-500 transition-colors">Home</router-link>
            </li>
            <li>
              <router-link to="/artikel" class="hover:text-orange-500 transition-colors"
                >Artikel</router-link
              >
            </li>
            <li>
              <router-link to="/rekomendasi" class="hover:text-orange-500 transition-colors"
                >Rekomendasi</router-link
              >
            </li>
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
</template>

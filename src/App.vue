<template>
  <div class="min-h-screen bg-white">
    <!-- Navbar -->
    <nav class="navbar-instagram sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
          📸 GSH Social
        </RouterLink>
        <div class="flex items-center gap-6">
          <div v-if="userStore.isLogged" class="flex items-center gap-4">
            <RouterLink :to="`/profile/${userStore.user?.username}`" class="hover:text-blue-600 transition-colors duration-200 font-medium">
              {{ userStore.user?.username }}
            </RouterLink>
            <button @click="logout" class="btn-instagram-outline">
              Déconnexion
            </button>
          </div>
          <div v-else class="flex gap-3">
            <RouterLink to="/login" class="btn-instagram-outline">
              Connexion
            </RouterLink>
            <RouterLink to="/register" class="btn-instagram">
              S'inscrire
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page content -->
    <main :class="userStore.isLogged ? 'pb-20' : ''" class="animate-fade-in">
      <RouterView />
    </main>

    <!-- Bottom Navigation Bar (Instagram-style) -->
    <nav v-if="userStore.isLogged" class="bottom-nav-instagram">
      <div class="flex justify-around items-center py-3 px-2">
        <!-- Home/Feed Button -->
        <RouterLink to="/" class="flex flex-col items-center p-3 rounded-xl transition-all duration-200 hover:bg-gray-100 group">
          <svg class="w-6 h-6 group-hover:text-blue-600 transition-colors duration-200" :class="$route.path === '/' || $route.path === '/feed' ? 'text-blue-600' : 'text-gray-900'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span class="text-xs mt-1 font-medium" :class="$route.path === '/' || $route.path === '/feed' ? 'text-blue-600' : 'text-gray-500'">Accueil</span>
        </RouterLink>

        <!-- Messages Button (placeholder for future) -->
        <button class="flex flex-col items-center p-3 rounded-xl transition-all duration-200 hover:bg-gray-100 text-gray-500 cursor-not-allowed group" disabled>
          <svg class="w-6 h-6 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <span class="text-xs mt-1 font-medium">Messages</span>
        </button>

        <!-- Profile Button -->
        <RouterLink :to="`/profile/${userStore.user?.username}`" class="flex flex-col items-center p-3 rounded-xl transition-all duration-200 hover:bg-gray-100 group">
          <svg class="w-6 h-6 group-hover:text-blue-600 transition-colors duration-200" :class="$route.path.startsWith('/profile') ? 'text-blue-600' : 'text-gray-900'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="text-xs mt-1 font-medium" :class="$route.path.startsWith('/profile') ? 'text-blue-600' : 'text-gray-500'">Profil</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useUserStore } from './stores/userStore'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
userStore.loadUser()

function logout() {
  userStore.logout()
  router.push('/login')
}
</script>

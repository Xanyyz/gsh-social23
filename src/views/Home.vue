<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50">
    <!-- Welcome Card -->
    <div class="card-instagram w-full max-w-sm p-6 animate-bounce-in">
      <!-- Logo/Brand -->
      <div class="text-center mb-6">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
          <span class="text-2xl">📸</span>
        </div>
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-2">
          GSH Social
        </h1>
        <p class="text-gray-500 text-base">
          Connectez-vous pour découvrir les postes des autres utilisateurs.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <RouterLink
          to="/login"
          class="btn-instagram w-full flex items-center justify-center gap-2 py-3 text-base font-semibold"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
          Se connecter
        </RouterLink>

        <RouterLink
          to="/register"
          class="btn-instagram-outline w-full flex items-center justify-center gap-2 py-3 text-base font-semibold"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
          Créer un compte
        </RouterLink>
      </div>

      <!-- Footer Text -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          Rejoignez la communauté GSH Social
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()
userStore.loadUser()

onMounted(() => {
  if (userStore.isLogged) {
    router.push({ name: 'Feed' }).catch(() => {})
  }
})
</script>

<style>
@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade {
  animation: fade 0.8s ease-out forwards;
}
</style>

<style scoped>
@import "@/assets/css/home.css";
</style>

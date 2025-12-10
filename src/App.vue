<template>
  <div class="min-h-screen flex flex-col bg-base-100">
    <!-- Navbar -->
    <nav class="sticky top-0 z-40 shadow-lg" style="background: linear-gradient(135deg, #001b4a 0%, #0a2d6f 100%);">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-bold" style="color: #fefefc;">
          🌐 GSH Social
        </RouterLink>
        <div class="flex items-center gap-6">
          <div v-if="userStore.isLogged" class="flex items-center gap-4">
            <span style="color: #fefefc; font-weight: 500;">{{ userStore.user?.username }}</span>
            <button @click="logout" class="px-4 py-2 rounded-lg font-semibold transition hover:opacity-90" style="background-color: #fefefc; color: #001b4a;">
              Déconnexion
            </button>
          </div>
          <div v-else class="flex gap-3">
            <RouterLink to="/login" class="px-4 py-2 rounded-lg font-semibold transition hover:shadow-lg" style="background-color: #fefefc; color: #001b4a;">
              Connexion
            </RouterLink>
            <RouterLink to="/register" class="px-4 py-2 rounded-lg font-semibold border-2 transition" style="border-color: #fefefc; color: #fefefc;">
              S'inscrire
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page content -->
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/userStore'

const userStore = useUserStore()
userStore.loadUser()

function logout() {
  userStore.logout()
}
</script>

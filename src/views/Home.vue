<template>
  <div class="min-h-screen flex items-center justify-center" style="background: linear-gradient(135deg, #001b4a 0%, #0a2d6f 100%);">
    <!-- Carte centrale -->
    <div class="w-full max-w-md p-12 rounded-2xl shadow-2xl animate-fade" style="background-color: #fefefc;">
      <!-- Logo -->
      <img
        src="../assets/lgsh_logo.jpg"
        alt="Logo lycée"
        class="w-28 mx-auto mb-8 drop-shadow-lg"
      />

      <!-- Titre -->
      <h1 class="text-4xl font-bold text-center mb-3" style="color: #001b4a;">
        Bienvenue
      </h1>

      <p class="text-center mb-10 font-medium" style="color: #666;">
        Connectez-vous ou créez un compte pour accéder à la plateforme.
      </p>

      <!-- Boutons -->
      <div class="flex flex-col gap-4">
        <!-- Bouton login -->
        <RouterLink
          to="/login"
          class="w-full text-center py-3 rounded-xl font-semibold transition duration-200 hover:shadow-lg"
          style="background: linear-gradient(135deg, #001b4a 0%, #0a2d6f 100%); color: #fefefc;"
        >
          Se connecter
        </RouterLink>

        <!-- Bouton register -->
        <RouterLink
          to="/register"
          class="w-full text-center py-3 rounded-xl font-semibold border-2 transition duration-200 hover:bg-gray-50"
          style="border-color: #001b4a; color: #001b4a;"
        >
          Créer un compte
        </RouterLink>
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

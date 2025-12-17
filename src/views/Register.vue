<!-- src/views/Register.vue -->
<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Main Card -->
      <div class="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <!-- Back to Home -->
        <div class="mb-4">
          <RouterLink
            to="/"
            class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-900 transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Retour à l’accueil
          </RouterLink>
        </div>

        <!-- Logo / Title -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>

          <h1 class="text-2xl font-bold text-gray-900 mb-2">GSH Social</h1>
          <p class="text-gray-600">Créez votre compte</p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur</label>
            <div class="relative">
              <input v-model="username" type="text" placeholder="votre_pseudo"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition"
                required />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
            <div class="relative">
              <input v-model="email" type="email" placeholder="votre@email.com"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition"
                required />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <div class="relative">
              <input v-model="password" type="password" placeholder="••••••••"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition"
                required />
            </div>
          </div>

          <!-- Submit -->
          <button type="submit"
            class="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition">
            Créer un compte
          </button>
        </form>

        <!-- Login link -->
        <div class="mt-8 text-center">
          <p class="text-gray-600">
            Déjà un compte ?
            <RouterLink to="/login" class="font-semibold text-blue-900 hover:text-blue-800 transition">
              Se connecter
            </RouterLink>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const username = ref('')
const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

async function handleRegister() {
  try {
    await userStore.register(username.value, email.value, password.value)
    // auto-login après inscription
    await userStore.login(email.value, password.value)
    router.push({ name: 'Feed' })
  } catch (err) {
    alert("Erreur lors de l'inscription")
  }
}
</script>

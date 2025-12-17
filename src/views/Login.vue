<!-- src/views/Login.vue -->
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

        <!-- Logo/Icon -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>

          <h1 class="text-2xl font-bold text-gray-900 mb-2">GSH Social</h1>
          <p class="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
              </div>
              <input v-model="email" type="email" placeholder="votre@email.com"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors"
                required />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input v-model="password" type="password" placeholder="••••••••"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors"
                required />
            </div>
          </div>

          <!-- Remember / Forgot -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" type="checkbox"
                class="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 text-sm text-gray-700">Se souvenir de moi</label>
            </div>
            <a href="#" class="text-sm font-medium text-blue-900 hover:text-blue-800 transition">Mot de passe oublié ?</a>
          </div>

          <!-- Submit -->
          <button type="submit"
            class="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition">
            Se connecter
          </button>
        </form>

        <!-- Register -->
        <div class="mt-8 text-center">
          <p class="text-gray-600">
            Nouveau sur GSH Social ?
            <RouterLink to="/register" class="font-semibold text-blue-900 hover:text-blue-800 transition">
              Créer un compte
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

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

async function handleLogin() {
  try {
    await userStore.login(email.value, password.value) // appel API vers backend
    router.push({ name: 'Feed' })
  } catch (err) {
    alert("Email ou mot de passe incorrect")
  }
}
</script>

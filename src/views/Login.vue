<!-- Login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001b4a] via-[#001b4a] to-[#fefefc]">
    <div class="backdrop-blur-lg bg-white/10 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border border-white/20 animate-fade">
      <h1 class="text-3xl font-bold text-[#fefefc] mb-4">Connexion</h1>
      <p class="text-[#fefefc]/80 mb-8">Connectez-vous pour accéder à votre espace.</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full text-black" required />
        <input v-model="password" type="password" placeholder="Mot de passe" class="input input-bordered w-full text-black" required />

        <button type="submit" class="btn btn-primary w-full">Se connecter</button>
      </form>

      <p class="mt-4 text-[#fefefc]/80">
        Pas encore de compte ? 
        <a @click.prevent="$emit('navigate','register')" href="#" class="text-[#fefefc] underline">Créer un compte</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const email = ref('');
const password = ref('');
const userStore = useUserStore();
const router = useRouter();

function handleLogin() {
  // Ici tu peux mettre une validation + appel API JSON-server
  const username = email.value.split('@')[0] || 'User'
  // use userStore to ensure profile exists and login
  const existing = userStore.getUserByUsername(username)
  if (existing) {
    userStore.login({ id: existing.id, username: existing.username, email: existing.email })
  } else {
    userStore.register(username, email.value)
  }
  // Navigate to feed after login
  router.push({ name: 'Feed' }).catch(() => {});
}
</script>

<style>
@keyframes fade { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
.animate-fade { animation: fade 0.8s ease-out forwards; }
</style>
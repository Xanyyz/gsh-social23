<!-- Register.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001b4a] via-[#001b4a] to-[#fefefc]">
    <div class="backdrop-blur-lg bg-white/10 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border border-white/20 animate-fade">
      <h1 class="text-3xl font-bold text-[#fefefc] mb-4">Créer un compte</h1>
      <p class="text-[#fefefc]/80 mb-8">Remplissez le formulaire pour créer votre compte.</p>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <input v-model="username" type="text" placeholder="Pseudo" class="input input-bordered w-full text-black" required />
        <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full text-black" required />
        <input v-model="password" type="password" placeholder="Mot de passe" class="input input-bordered w-full text-black" required />

        <button type="submit" class="btn btn-primary w-full">S'inscrire</button>
      </form>

      <p class="mt-4 text-[#fefefc]/80">
        Déjà un compte ? 
        <a @click.prevent="$emit('navigate','login')" href="#" class="text-[#fefefc] underline">Se connecter</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const username = ref('');
const email = ref('');
const password = ref('');
const userStore = useUserStore();
const router = useRouter();

function handleRegister() {
  // register via userStore which persists and logs in
  userStore.register(username.value || email.value.split('@')[0] || 'User', email.value)
  // Navigate to feed after register
  router.push({ name: 'Feed' }).catch(() => {});
}
</script>

<style>
@keyframes fade { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
.animate-fade { animation: fade 0.8s ease-out forwards; }
</style>
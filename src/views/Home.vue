<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 p-4">
    <!-- Card -->
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
      
      <!-- Logo / Brand -->
      <div class="text-center mb-6">
        <div class="w-16 h-16 mx-auto mb-4 rounded-xl bg-blue-600 flex items-center justify-center shadow">
          <span class="text-2xl text-white">📸</span>
        </div>

        <h1 class="text-2xl font-bold text-blue-700 mb-2">
          GSH Social
        </h1>

        <p class="text-gray-500 text-sm">
          Connectez-vous pour découvrir les posts des autres utilisateurs.
        </p>
      </div>

      <!-- Buttons -->
      <div class="space-y-3">
        <RouterLink
          to="/login"
          class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Se connecter
        </RouterLink>

        <RouterLink
          to="/register"
          class="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
        >
          Créer un compte
        </RouterLink>
      </div>

      <!-- Footer -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          Rejoignez la communauté GSH Social
        </p>
      </div>

    </div>
  </div>
</template>


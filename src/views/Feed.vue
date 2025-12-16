<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
    <!-- Header Section -->
    <div class="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-16 z-30">
      <div class="max-w-2xl mx-auto px-6 py-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-2">
            Fil d'actualité
          </h1>
          <p class="text-gray-500 text-sm">Découvrez ce qui se passe autour de vous</p>
        </div>
      </div>
    </div>

    <div class="max-w-2xl mx-auto px-6 py-8 space-y-8">
      <!-- Create Post Card -->
      <div class="card-instagram overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-bounce-in">
        <div class="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-1">
          <div class="bg-white p-6">
            <div class="flex items-center gap-4 mb-6">
              <div class="avatar-instagram flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {{ userStore.user?.username?.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">Créer une publication</h2>
                <p class="text-gray-500 text-sm">Partagez vos pensées avec vos amis</p>
              </div>
            </div>

            <form @submit.prevent="createPost" class="space-y-4">
              <div class="relative">
                <textarea
                  v-model="newPostContent"
                  @input="handleInput"
                  placeholder="Quoi de neuf ?"
                  class="input-instagram w-full p-4 text-gray-900 placeholder-gray-500 resize-none bg-white"
                  :class="{ 'border-red-400 focus:border-red-400 focus:ring-red-200': isOverLimit }"
                  rows="4"
                  required
                ></textarea>
                <div class="absolute bottom-3 right-3 text-xs" :class="isOverLimit ? 'text-red-500' : 'text-gray-500'">
                  {{ characterCount }}/{{ maxLength }}
                </div>
              </div>

              <div class="flex gap-3">
                <input
                  v-model="newPostImage"
                  type="url"
                  placeholder="URL de l'image (facultatif)"
                  class="input-instagram flex-1 bg-white text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  :disabled="!newPostContent.trim()"
                  class="btn-instagram flex items-center gap-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Posts Feed -->
      <div class="space-y-6">
        <!-- Empty State -->
        <div v-if="postStore.posts.length === 0" class="text-center py-16 animate-fade-in">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Aucune publication pour le moment</h3>
          <p class="text-gray-500">Soyez le premier à partager quelque chose !</p>
        </div>

        <!-- Posts List -->
        <div v-else class="space-y-6">
          <PostCard
            v-for="post in postStore.posts"
            :key="post.id"
            :post="post"
            class="animate-slide-up"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePostStore } from '../stores/postStore'
import { useUserStore } from '../stores/userStore'
import PostCard from '../components/PostCard.vue'

const postStore = usePostStore()
const userStore = useUserStore()
const newPostContent = ref('')
const newPostImage = ref('')
const maxLength = 280

onMounted(() => {
  postStore.loadPosts()
})

const characterCount = computed(() => newPostContent.value.length)
const isOverLimit = computed(() => characterCount.value > maxLength)
const isValidPost = computed(() => newPostContent.value.trim() && !isOverLimit.value)

function createPost() {
  if (!isValidPost.value) return
  if (!userStore.user) return

  postStore.createPost(userStore.user.username, newPostContent.value, newPostImage.value)
  newPostContent.value = ''
  newPostImage.value = ''
}

// Prevent typing beyond max length
function handleInput() {
  if (newPostContent.value.length > maxLength) {
    newPostContent.value = newPostContent.value.slice(0, maxLength)
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #94a3b8, #64748b);
}
</style>
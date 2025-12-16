<!-- src/components/PostCard.vue -->
<template>
  <div class="card-instagram overflow-hidden transform transition-all duration-300 hover:shadow-instagram-lg hover:-translate-y-1">
    <div class="p-6">
      <!-- Author Header -->
      <div class="flex items-center gap-4 mb-6">
        <RouterLink :to="{ name: 'Profile', params: { username: post.author } }" class="flex items-center gap-4 group">
          <div class="avatar-instagram shadow-lg group-hover:scale-110 transition-transform duration-200">
            {{ post.author.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h3 class="text-lg font-bold text-instagram-text group-hover:text-instagram-primary transition-colors duration-200">{{ post.author }}</h3>
            <p class="text-instagram-text-light text-sm">il y a quelques instants</p>
          </div>
        </RouterLink>
      </div>

      <!-- Post Content -->
      <div class="mb-6">
        <p class="text-instagram-text leading-relaxed text-lg whitespace-pre-wrap">{{ post.content }}</p>
        <img
          v-if="post.image"
          :src="post.image"
          class="mt-4 rounded-2xl w-full object-cover max-h-96 shadow-instagram"
          alt="Post image"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between gap-3 pt-4 border-t border-instagram-border">
        <button
          @click="likePost(post.id)"
          class="flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          :class="liked ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-200' : 'bg-white text-gray-900 hover:bg-gray-50'"
        >
          <svg class="w-5 h-5" :class="liked ? 'text-white' : 'text-instagram-text'" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span>{{ post.likes }}</span>
        </button>

        <button
          @click="toggleCommentBox"
          class="flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg bg-white text-gray-900 hover:bg-gray-50"
        >
          <svg class="w-5 h-5 text-instagram-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <span>{{ post.comments.length }}</span>
        </button>
      </div>

      <!-- Comments Section -->
      <div v-if="showCommentBox" class="mt-6 pt-6 border-t border-instagram-border animate-fade-in">
        <div class="flex gap-3 mb-4">
          <input
            v-model="newComment"
            type="text"
            placeholder="Écrivez un commentaire..."
            class="input-instagram flex-1 bg-instagram-light text-instagram-text placeholder-instagram-text-light"
            @keyup.enter="addComment(post.id)"
          />
          <button
            @click="addComment(post.id)"
            :disabled="!newComment.trim()"
            class="btn-instagram flex items-center gap-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>

        <div v-if="post.comments.length > 0" class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-500 mb-3">Commentaires</h4>
          <div v-for="(comment, index) in post.comments" :key="index" class="bg-white rounded-2xl p-4 border border-gray-200">
            <p class="text-gray-900">{{ comment }}</p>
          </div>
        </div>

        <!-- Comments Section -->
        <div v-if="showCommentBox" class="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
          <div class="flex gap-3 mb-4">
            <input
              v-model="newComment"
              type="text"
              placeholder="Écrivez un commentaire..."
              class="flex-1 p-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
              @keyup.enter="addComment(post.id)"
            />
            <button
              @click="addComment(post.id)"
              :disabled="!newComment.trim()"
              class="px-6 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              :class="newComment.trim() ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600' : 'bg-gray-300 text-gray-500'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>

          <div v-if="post.comments.length > 0" class="space-y-3">
            <h4 class="text-sm font-semibold text-instagram-text-light mb-3">Commentaires</h4>
            <div v-for="(comment, index) in post.comments" :key="index" class="bg-instagram-light rounded-2xl p-4 border border-instagram-border">
              <p class="text-instagram-text">{{ comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePostStore } from '../stores/postStore'
import { useUserStore } from '../stores/userStore'

const props = defineProps<{ post: any }>()
const postStore = usePostStore()
const userStore = useUserStore()
const post = props.post

const showCommentBox = ref(false)
const newComment = ref('')

const userId = computed(() => userStore.user?.id ?? null)
const liked = computed(() => {
  if (!userId.value) return false
  return Array.isArray(post.likedBy) && post.likedBy.includes(userId.value)
})

function toggleCommentBox() {
  showCommentBox.value = !showCommentBox.value
}

function likePost(id: number) {
  postStore.likePost(id)
}

function addComment(id: number) {
  if (newComment.value.trim() === '') return
  postStore.addComment(id, newComment.value.trim())
  newComment.value = ''
}
</script>
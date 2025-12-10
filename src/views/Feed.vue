<template>
  <div class="min-h-screen" style="background-color: #f5f7fa;">
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-4xl font-bold mb-10" style="color: #001b4a;">Fil d'actualité</h1>

      <!-- Formulaire pour créer un post -->
      <div class="rounded-2xl shadow-lg mb-8 p-6" style="background-color: #fefefc;">
        <h2 class="text-xl font-bold mb-4" style="color: #001b4a;">Créer un post</h2>
        <textarea
          v-model="newPostContent"
          placeholder="Quoi de neuf ?"
          class="w-full mb-4 p-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 resize-none"
          style="border-color: #e0e0e0; color: #333;"
          rows="4"
        ></textarea>
        <input
          v-model="newPostImage"
          type="text"
          placeholder="URL de l'image (facultatif)"
          class="w-full mb-4 p-3 rounded-lg border-2 focus:outline-none"
          style="border-color: #e0e0e0; color: #333;"
        />
        <button @click="createPost" class="w-full py-3 rounded-lg font-bold text-white transition duration-200 hover:shadow-lg" style="background: linear-gradient(135deg, #001b4a 0%, #0a2d6f 100%);">
          Publier
        </button>
      </div>

      <!-- Liste des posts -->
      <div class="space-y-4">
        <PostCard v-for="post in postStore.posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostStore } from '../stores/postStore'
import PostCard from '../components/PostCard.vue'

const postStore = usePostStore()
const newPostContent = ref('')
const newPostImage = ref('')

onMounted(() => {
  postStore.loadMockPosts()
})

function createPost() {
  if (!newPostContent.value.trim()) return
  const newPost = {
    id: Date.now(),
    author: 'Moi',
    content: newPostContent.value.trim(),
    image: newPostImage.value.trim() || undefined,
    likes: 0,
    likedBy: [],
    comments: [],
  }
  postStore.posts.unshift(newPost)
  newPostContent.value = ''
  newPostImage.value = ''
}
</script>
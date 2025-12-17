<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-2xl mx-auto space-y-6">

      <!-- Create Post -->
      <div class="bg-white border rounded-2xl shadow p-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-3">
          Créer un post
        </h2>

        <textarea
          v-model="newPost"
          placeholder="Quoi de neuf ?"
          class="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
          rows="3"
        />

        <button
          @click="handleCreatePost"
          class="mt-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          Publier
        </button>

        <p
          v-if="!userStore.isLogged"
          class="mt-2 text-sm text-gray-500"
        >
          Connectez-vous pour publier un post.
        </p>
      </div>

      <!-- Posts -->
      <div
        v-for="post in postStore.validPosts"
        :key="post.id"
        class="bg-white border rounded-2xl shadow p-4"
      >
        <!-- Author -->
        <div class="flex items-center justify-between mb-2">
          <p class="font-semibold text-blue-900">
            {{ post.author }}
          </p>
          <span class="text-xs text-gray-400">
            #{{ post.id }}
          </span>
        </div>

        <!-- Content -->
        <p class="text-gray-800 mb-3">
          {{ post.content }}
        </p>

        <!-- Image -->
        <img
          v-if="post.image"
          :src="post.image"
          class="w-full rounded-lg mb-3"
        />

        <!-- Actions -->
        <div class="flex items-center gap-4 text-sm">
          <button
            @click="postStore.likePost(post.id)"
            class="flex items-center gap-1 text-blue-900 hover:text-blue-700 transition"
          >
            ❤️ {{ post.likes }}
          </button>

          <span class="text-gray-400">
            💬 {{ post.comments.length }}
          </span>
        </div>

        <!-- Comments -->
        <div class="mt-4 space-y-2">
          <p
            v-for="(comment, index) in post.comments"
            :key="index"
            class="text-sm text-gray-700 bg-gray-100 rounded-lg px-3 py-2"
          >
            {{ comment }}
          </p>

          <!-- Add comment -->
          <div v-if="userStore.isLogged" class="flex gap-2 mt-2">
            <input
              v-model="comments[post.id]"
              type="text"
              placeholder="Ajouter un commentaire..."
              class="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <button
              @click="addComment(post.id)"
              class="text-blue-900 font-semibold text-sm"
            >
              Envoyer
            </button>
          </div>

          <p
            v-else
            class="text-sm text-gray-400"
          >
            Connectez-vous pour commenter.
          </p>
        </div>
      </div>

      <!-- No posts -->
      <p
        v-if="postStore.validPosts.length === 0"
        class="text-center text-gray-500"
      >
        Aucun post pour le moment.
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostStore } from '../stores/postStore'
import { useUserStore } from '../stores/userStore'

const postStore = usePostStore()
const userStore = useUserStore()

const newPost = ref('')
const comments = ref<Record<number, string>>({})

onMounted(() => {
  postStore.loadPosts()
})

function handleCreatePost() {
  if (!newPost.value.trim()) return
  postStore.createPost(newPost.value)
  newPost.value = ''
}

function addComment(postId: number) {
  const text = comments.value[postId]
  if (!text || !text.trim()) return

  postStore.addComment(postId, text)
  comments.value[postId] = ''
}
</script>

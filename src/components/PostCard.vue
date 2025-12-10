<!-- src/components/PostCard.vue -->
<template>
  <div class="rounded-2xl shadow-lg overflow-hidden" style="background-color: #fefefc; border: 1px solid #e0e0e0;">
    <div class="p-6">
        <div class="flex items-center gap-3 mb-4">
        <RouterLink :to="{ name: 'Profile', params: { username: post.author } }" class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-xl" style="background: linear-gradient(135deg, #001b4a 0%, #0a2d6f 100%); color: #fefefc;">
            {{ post.author.charAt(0).toUpperCase() }}
          </div>
          <h2 class="text-lg font-bold" style="color: #001b4a;">{{ post.author }}</h2>
        </RouterLink>
      </div>
      <p class="mb-4 leading-relaxed" style="color: #333;">{{ post.content }}</p>
      <img v-if="post.image" :src="post.image" class="mb-4 rounded-lg w-full object-cover max-h-80" />

      <div class="flex items-center justify-between gap-2 mb-4 pt-4" style="border-top: 1px solid #e0e0e0;">
        <button
          @click="likePost(post.id)"
          class="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
          :style="liked ? 'background: linear-gradient(135deg, #001b4a 0%, #0a2d6f 100%); color: #fff;' : 'background-color: #f5f7fa; color: #001b4a;'"
          :aria-pressed="liked"
        >
          <span v-if="liked">❤️</span>
          <span v-else>👍</span>
          {{ post.likes }}
        </button>
        <button @click="toggleCommentBox" class="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition" style="background-color: #f5f7fa; color: #001b4a;">
          💬 {{ post.comments.length }}
        </button>
      </div>

      <div v-if="showCommentBox" class="mt-4 pt-4" style="border-top: 1px solid #e0e0e0;">
        <div class="flex gap-2 mb-4">
          <input
            v-model="newComment"
            type="text"
            placeholder="Ajouter un commentaire"
            class="flex-1 p-3 rounded-lg border-2 focus:outline-none"
            style="border-color: #e0e0e0; color: #333;"
          />
          <button @click="addComment(post.id)" class="px-4 py-2 rounded-lg font-semibold transition text-white" style="background: linear-gradient(135deg, #001b4a 0%, #0a2d6f 100%);">
            Envoyer
          </button>
        </div>

        <ul v-if="post.comments.length > 0" class="space-y-2">
          <li v-for="(c, i) in post.comments" :key="i" class="text-sm p-3 rounded-lg" style="background-color: #f5f7fa; color: #333;">
            {{ c }}
          </li>
        </ul>
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
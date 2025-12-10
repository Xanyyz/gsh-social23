<template>
  <div class="min-h-screen py-8" style="background-color: #f5f7fa;">
    <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div class="flex items-center gap-6">
        <div class="w-28 h-28 rounded-full flex items-center justify-center text-3xl" :style="avatarStyle">
          <span v-if="!profile.avatar">{{ profile.username.charAt(0).toUpperCase() }}</span>
          <img v-else :src="profile.avatar" class="w-28 h-28 object-cover rounded-full" />
        </div>
        <div>
          <h2 class="text-2xl font-bold" style="color: #001b4a">{{ profile.username }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ profile.bio || 'Pas encore de bio.' }}</p>
          <div class="mt-3">
            <button v-if="isMe" @click="editing = !editing" class="px-3 py-2 rounded-lg border">{{ editing ? 'Annuler' : 'Modifier le profil' }}</button>
            <button v-else @click="toggleFollow" class="px-3 py-2 rounded-lg font-semibold" :style="followBtnStyle">{{ following ? 'Abonné' : 'Suivre' }}</button>
          </div>
        </div>
      </div>

      <div v-if="editing" class="mt-6">
        <label class="block text-sm font-medium text-gray-700">Bio</label>
        <textarea v-model="editBio" class="w-full p-3 rounded-md border my-2" rows="3"></textarea>
        <label class="block text-sm font-medium text-gray-700">Avatar URL</label>
        <input v-model="editAvatar" class="w-full p-3 rounded-md border my-2" />
        <div class="mt-3">
          <button @click="saveProfile" class="px-4 py-2 rounded-lg text-white" style="background: linear-gradient(135deg, #001b4a 0%, #0a2d6f 100%);">Enregistrer</button>
        </div>
      </div>

      <hr class="my-6" />

      <h3 class="text-xl font-bold mb-4" style="color: #001b4a">Publications de {{ profile.username }}</h3>
      <div class="space-y-4">
        <PostCard v-for="post in userPosts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { usePostStore } from '../stores/postStore'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const username = (route.params.username as string) || ''
const userStore = useUserStore()
const postStore = usePostStore()

const profile = computed(() => userStore.getUserByUsername(username) || { username, bio: '', avatar: '' })
const isMe = computed(() => userStore.user?.username === username)
const following = computed(() => userStore.isFollowing(username))

const editing = ref(false)
const editBio = ref('')
const editAvatar = ref('')

onMounted(() => {
  userStore.loadUsers()
  postStore.loadMockPosts()
  editBio.value = profile.value.bio || ''
  editAvatar.value = profile.value.avatar || ''
})

const userPosts = computed(() => postStore.posts.filter(p => p.author === username))

function saveProfile() {
  userStore.updateProfile({ bio: editBio.value, avatar: editAvatar.value })
  editing.value = false
}

function toggleFollow() {
  if (following.value) userStore.unfollow(username)
  else userStore.follow(username)
}

const avatarStyle = computed(() => ({ background: 'linear-gradient(135deg, #001b4a 0%, #0a2d6f 100%)', color: '#fefefc' }))
const followBtnStyle = computed(() => ({ background: following.value ? '#e6eefc' : '#001b4a', color: following.value ? '#001b4a' : '#fefefc' }))
</script>

<style scoped>
.rounded-2xl img { border-radius: 9999px; }
</style>

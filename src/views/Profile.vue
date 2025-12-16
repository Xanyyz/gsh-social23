<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 py-8">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Profile Header Card -->
      <div class="card-instagram p-8 mb-8 animate-bounce-in">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <!-- Avatar -->
          <div class="relative">
            <div class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-4xl text-white font-bold shadow-lg">
              <span v-if="!profile.avatar">{{ profile.username.charAt(0).toUpperCase() }}</span>
              <img v-else :src="profile.avatar" class="w-32 h-32 object-cover rounded-full" />
            </div>
            <div v-if="isMe" class="absolute -bottom-2 -right-2 w-8 h-8 bg-instagram-primary rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
          </div>

          <!-- Profile Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold text-instagram-text mb-2">{{ profile.username }}</h1>
            <p class="text-instagram-text-light mb-4 text-lg">{{ profile.bio || 'Aucune bio pour le moment.' }}</p>

            <!-- Stats -->
            <div class="flex justify-center md:justify-start gap-8 mb-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-instagram-primary">{{ userPosts.length }}</div>
                <div class="text-sm text-instagram-text-light">Publications</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-instagram-primary">{{ followersCount }}</div>
                <div class="text-sm text-instagram-text-light">Abonnés</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-instagram-primary">{{ followingCount }}</div>
                <div class="text-sm text-instagram-text-light">Abonnements</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 justify-center md:justify-start">
              <button
                v-if="isMe"
                @click="editing = !editing"
                class="btn-instagram-outline flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                {{ editing ? 'Annuler' : 'Modifier le profil' }}
              </button>
              <button
                v-else
                @click="toggleFollow"
                class="btn-instagram flex items-center gap-2"
                :class="following ? 'bg-instagram-light text-instagram-text border-instagram-border' : ''"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                {{ following ? 'Abonné' : 'Suivre' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Edit Profile Form -->
        <div v-if="editing" class="mt-8 pt-8 border-t border-instagram-border animate-fade-in">
          <h3 class="text-xl font-bold text-instagram-text mb-6">Modifier le profil</h3>
          <form @submit.prevent="saveProfile" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-instagram-text mb-2">Bio</label>
              <textarea
                v-model="editBio"
                placeholder="Parlez de vous..."
                class="input-instagram w-full resize-none"
                rows="4"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-instagram-text mb-2">URL de l'avatar</label>
              <input
                v-model="editAvatar"
                type="url"
                placeholder="https://exemple.com/avatar.jpg"
                class="input-instagram w-full"
              />
            </div>
            <div class="flex gap-3">
              <button type="submit" class="btn-instagram flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Enregistrer
              </button>
              <button type="button" @click="editing = false" class="btn-instagram-outline">
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Posts Section -->
      <div class="animate-slide-up">
        <h2 class="text-2xl font-bold text-instagram-text mb-6">Publications</h2>

        <!-- Empty State -->
        <div v-if="userPosts.length === 0" class="text-center py-16">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-instagram-primary to-instagram-secondary flex items-center justify-center shadow-instagram">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-instagram-text mb-2">Aucune publication</h3>
          <p class="text-instagram-text-light">{{ isMe ? 'Créez votre première publication !' : 'Cet utilisateur n\'a pas encore publié.' }}</p>
        </div>

        <!-- Posts Grid -->
        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PostCard
            v-for="post in userPosts"
            :key="post.id"
            :post="post"
            class="animate-scale-in"
          />
        </div>
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
const followersCount = computed(() => userStore.getFollowersCount(username))
const followingCount = computed(() => profile.value.following?.length || 0)

const editing = ref(false)
const editBio = ref('')
const editAvatar = ref('')

onMounted(() => {
  userStore.loadUsers()
  postStore.loadPosts()
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

const avatarStyle = computed(() => ({ background: 'linear-gradient(135deg, #E4405F 0%, #F77737 100%)', color: '#FAFAFA' }))
const followBtnStyle = computed(() => ({ background: following.value ? '#F0F0F0' : '#E4405F', color: following.value ? '#262626' : '#FAFAFA' }))
</script>

<style scoped>
.rounded-2xl img { border-radius: 9999px; }
</style>

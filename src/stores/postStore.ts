import { defineStore } from 'pinia'
import { useUserStore } from './userStore'

interface Post {
  id: number
  author: string
  content: string
  image?: string
  likes: number
  likedBy: number[]
  comments: string[]
}

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
  }),

  getters: {
    // Vrai Posts
    validPosts: (state) =>
      state.posts.filter(
        post =>
          post.author &&
          post.author !== 'Inconnu' &&
          post.author !== 'inconnu'
      ),
  },

  actions: {
    // Load posts from localStorage + nettoyage
    loadPosts() {
      const saved = localStorage.getItem('posts')
      if (saved) {
        const parsed: Post[] = JSON.parse(saved)

        // 🧹 Nettoyage des anciens posts fake
        this.posts = parsed.filter(
          post =>
            post.author &&
            post.author !== 'Inconnu' &&
            post.author !== 'inconnu'
        )
      } else {
        this.posts = []
      }
    },

    // Save posts to localStorage
    savePosts() {
      localStorage.setItem('posts', JSON.stringify(this.posts))
    },

    // Create a new post (UTILISATEUR CONNECTÉ OBLIGATOIRE)
    createPost(content: string, image?: string) {
      const userStore = useUserStore()
      const user = userStore.user

      //Sécurité, pas de user = pas de post
      if (!user) {
        alert('Vous devez être connecté pour publier un post.')
        return
      }

      const trimmedContent = content.trim()
      if (!trimmedContent) return

      const newPost: Post = {
        id: Date.now(),
        author: user.username,
        content: trimmedContent,
        image: image?.trim() || undefined,
        likes: 0,
        likedBy: [],
        comments: [],
      }

      this.posts.unshift(newPost)
      this.savePosts()
      return newPost
    },

    // like/unlike
    likePost(id: number) {
      const post = this.posts.find(p => p.id === id)
      const userStore = useUserStore()
      const user = userStore.user

      if (!user) {
        alert('Vous devez être connecté pour aimer un post.')
        return
      }

      if (!post) return

      const userId = user.id
      const idx = post.likedBy.indexOf(userId)

      if (idx === -1) {
        post.likedBy.push(userId)
        post.likes++
      } else {
        post.likedBy.splice(idx, 1)
        post.likes = Math.max(0, post.likes - 1)
      }

      this.savePosts()
    },

    addComment(id: number, comment: string) {
      const userStore = useUserStore()
      const user = userStore.user
      const post = this.posts.find(p => p.id === id)

      if (!user || !post || !comment.trim()) return

      post.comments.push(comment.trim())
      this.savePosts()
    },
  },
})

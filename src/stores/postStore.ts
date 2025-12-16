import { defineStore } from 'pinia';
import { useUserStore } from './userStore';


interface Post {
	id: number;
	author: string;
	content: string;
	image?: string;
	likes: number;
	likedBy: number[]; // user ids who liked
	comments: string[];
}


export const usePostStore = defineStore('post', {
	state: () => ({
		posts: [] as Post[],
	}),

	actions: {
		// Load posts from localStorage
		loadPosts() {
			const saved = localStorage.getItem('posts');
			if (saved) {
				this.posts = JSON.parse(saved);
			} else {
				this.posts = [];
			}
		},

		// Save posts to localStorage
		savePosts() {
			localStorage.setItem('posts', JSON.stringify(this.posts));
		},

		// Create a new post
		createPost(author: string, content: string, image?: string) {
			const newPost: Post = {
				id: Date.now(),
				author,
				content: content.trim(),
				image: image?.trim() || undefined,
				likes: 0,
				likedBy: [],
				comments: [],
			};
			this.posts.unshift(newPost);
			this.savePosts();
			return newPost;
		},

		// Toggle like/unlike for the current user
		likePost(id: number) {
			const post = this.posts.find(p => p.id === id);
			const userStore = useUserStore();
			const user = userStore.user;
			if (!user) {
				// not logged in
				// you can replace alert with a nicer UI later
				alert('Vous devez être connecté pour aimer un post.');
				return;
			}

			if (!post) return;

			const userId = user.id;
			const idx = post.likedBy.indexOf(userId);
			if (idx === -1) {
				// not liked yet -> like
				post.likedBy.push(userId);
				post.likes = Math.max(0, post.likes) + 1;
			} else {
				// already liked -> remove like (unlike)
				post.likedBy.splice(idx, 1);
				post.likes = Math.max(0, post.likes - 1);
			}
			this.savePosts();
		},

		addComment(id: number, comment: string) {
			const post = this.posts.find(p => p.id === id);
			if (post) {
				post.comments.push(comment);
				this.savePosts();
			}
		},
	},
});
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
		loadMockPosts() {
			this.posts = [
				{ id: 1, author: 'Alice', content: 'Bonjour tout le monde !', likes: 3, likedBy: [], comments: ['Salut !', 'Hello !'] },
				{ id: 2, author: 'Bob', content: 'Regardez cette image.', image: 'https://picsum.photos/200/150', likes: 5, likedBy: [], comments: ['Super !'] },
				{ id: 3, author: 'Charlie', content: "Aujourd'hui il fait beau.", likes: 2, likedBy: [], comments: [] },
			];
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
		},

		addComment(id: number, comment: string) {
			const post = this.posts.find(p => p.id === id);
			if (post) post.comments.push(comment);
		},
	},
});
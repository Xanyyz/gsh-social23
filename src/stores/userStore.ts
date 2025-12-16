import { defineStore } from 'pinia';

interface Profile {
  id: number;
  username: string;
  email?: string;
  bio?: string;
  avatar?: string; // image URL
  following?: string[]; // usernames
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | Profile,
    users: [] as Profile[],
  }),

  getters: {
    isLogged: (state) => state.user !== null,
    getUserByUsername: (state) => (username: string) => state.users.find(u => u.username === username) ?? null,
    getFollowersCount: (state) => (username: string) => state.users.filter(u => u.following?.includes(username)).length,
  },

  actions: {
    // initialize users from localStorage
    loadUsers() {
      const saved = localStorage.getItem('users');
      if (saved) {
        this.users = JSON.parse(saved);
      } else {
        this.users = [];
      }
    },

    saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users));
    },

    login(userData: { id: number; username: string; email?: string }) {
      // ensure user exists in users list
      let profile = this.users.find(u => u.username === userData.username);
      if (!profile) {
        profile = { id: userData.id, username: userData.username, email: userData.email, bio: '', avatar: '', following: [] };
        this.users.push(profile);
        this.saveUsers();
      }
      this.user = profile;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.saveUsers();
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },

    loadUser() {
      this.loadUsers();
      const saved = localStorage.getItem('user');
      if (saved) this.user = JSON.parse(saved);
    },

    // register a new user and log them in
    register(username: string, email?: string) {
      const id = Date.now();
      const profile: Profile = { id, username, email, bio: '', avatar: '', following: [] };
      this.users.push(profile);
      this.saveUsers();
      this.user = profile;
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    updateProfile(data: { bio?: string; avatar?: string }) {
      if (!this.user) return;
      const me = this.users.find(u => u.username === this.user!.username);
      if (!me) return;
      if (data.bio !== undefined) me.bio = data.bio;
      if (data.avatar !== undefined) me.avatar = data.avatar;
      this.user = me;
      this.saveUsers();
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    follow(username: string) {
      if (!this.user) return;
      const me = this.users.find(u => u.username === this.user!.username);
      if (!me) return;
      me.following = me.following ?? [];
      if (!me.following.includes(username)) {
        me.following.push(username);
        this.saveUsers();
        this.user = me;
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    },

    unfollow(username: string) {
      if (!this.user) return;
      const me = this.users.find(u => u.username === this.user!.username);
      if (!me || !me.following) return;
      const idx = me.following.indexOf(username);
      if (idx !== -1) {
        me.following.splice(idx, 1);
        this.saveUsers();
        this.user = me;
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    },

    isFollowing(username: string) {
      if (!this.user) return false;
      const me = this.users.find(u => u.username === this.user!.username);
      return !!me && (me.following ?? []).includes(username);
    },
  },
});

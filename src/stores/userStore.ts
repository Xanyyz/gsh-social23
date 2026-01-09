import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = `http://${window.location.hostname}:3000`;

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    users: [],
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isLogged: (state) => state.user !== null,
    getUserByUsername: (state) => (username) =>
      state.users.find(u => u.username === username),
    isFollowing: (state) => (username) =>
      state.user?.following?.includes(username),
    getFollowersCount: (state) => (username) => {
      const user = state.users.find(u => u.username === username);
      return user?.followers?.length || 0;
    }
  },

  actions: {
    async loadUsers() {
      const res = await axios.get(`${API_URL}/users`);
      this.users = res.data;
    },

    loadUser() {
      const saved = localStorage.getItem("user");
      if (saved) this.user = JSON.parse(saved);
    },

    async login(email, password) {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      this.token = res.data.token;
      localStorage.setItem("token", this.token);

      const profile = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });

      this.user = profile.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    async updateProfile(data) {
      const res = await axios.put(`${API_URL}/profile`, data, {
        headers: { Authorization: `Bearer ${this.token}` }
      });

      this.user = res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    async follow(username) {
      const res = await axios.post(`${API_URL}/follow`, { username }, {
        headers: { Authorization: `Bearer ${this.token}` }
      });

      this.user = res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    async unfollow(username) {
      const res = await axios.post(`${API_URL}/unfollow`, { username }, {
        headers: { Authorization: `Bearer ${this.token}` }
      });

      this.user = res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    }
  }
});

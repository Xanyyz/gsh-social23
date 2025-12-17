import { defineStore } from 'pinia';
import axios from 'axios';

interface Profile {
  _id: string; // MongoDB _id
  username: string;
  email?: string;
  bio?: string;
  avatar?: string;
  following?: string[];
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | Profile,
    token: localStorage.getItem("token") as string | null, // garder le token après refresh
  }),

  getters: {
    isLogged: (state) => state.user !== null,
  },

  actions: {
    // Inscription
    async register(username: string, email: string, password: string) {
      await axios.post("http://localhost:3000/register", { username, email, password });
    },

    // Connexion
    async login(email: string, password: string) {
      const res = await axios.post("http://localhost:3000/login", { email, password });
      this.token = res.data.token;
      localStorage.setItem("token", this.token);

      const profileRes = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = profileRes.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    // Déconnexion
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    // Charger l’utilisateur depuis localStorage (utile au démarrage)
    loadUser() {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
    },

    // Mise à jour du profil
    async updateProfile(data: { bio?: string; avatar?: string }) {
      if (!this.token) return;
      const res = await axios.put("http://localhost:3000/profile", data, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    // Suivre un utilisateur
    async follow(username: string) {
      if (!this.token) return;
      const res = await axios.post("http://localhost:3000/follow", { username }, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    // Ne plus suivre un utilisateur
    async unfollow(username: string) {
      if (!this.token) return;
      const res = await axios.post("http://localhost:3000/unfollow", { username }, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },
  },
});

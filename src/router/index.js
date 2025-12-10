import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Feed from '../views/Feed.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/feed', name: 'Feed', component: Feed },
  { path: '/profile/:username', name: 'Profile', component: Profile, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

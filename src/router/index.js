import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pages from "@/views/Pages";
import Settings from "@/views/Settings";
import Documantation from "@/views/Documantation";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pages',
    name: 'Pages',
    component: Pages
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/documantation',
    name: 'Documantation',
    component: Documantation
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

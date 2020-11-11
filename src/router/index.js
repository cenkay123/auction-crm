import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pages from "@/views/Pages";
import Settings from "@/views/Settings";
import Documantation from "@/views/Documantation";
import List from "@/components/pagesComponents/List";
import Create from "@/components/pagesComponents/Create";
import Update from "@/components/pagesComponents/Update";

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
    component: Pages,
    children: [
      {
        path: '/',
        name: 'List',
        component: List
      },
      {
        path: '/create',
        name: 'Create',
        component: Create
      },
      {
        path: '/update/:id',
        name: 'Update',
        component: Update
      }
    ]
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

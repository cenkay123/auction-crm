import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pages from "@/views/Pages";
import Settings from "@/views/Settings";
import Documantation from "@/views/Documantation";
import List from "@/components/pagesComponents/List";
import Create from "@/components/pagesComponents/Create";
import Update from "@/components/pagesComponents/Update";
import Subpages from "@/components/pagesComponents/Subpages";
import News from "@/views/News";
import NewsList from "@/components/newsComponents/NewsList";
import NewsCreate from "@/components/newsComponents/NewsCreate";
import NewsUpdate from "@/components/newsComponents/NewsUpdate";

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
        redirect: '/pages',
        children: [
            {
                path: '/',
                name: 'List',
                component: List,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sayfalar', route: '/pages', disabled: true},
                        {name: 'Sayfa ekleme', route: '/create'},
                    ]
                }
            },
            {
                path: '/create',
                name: 'Create',
                component: Create,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sayfalar', route: '/pages'},
                        {name: 'Sayfa ekleme', route: '/create', disabled: true},
                    ]
                }
            },
            {
                path: '/update/:id',
                name: 'Update',
                component: Update
            },
            {
                path: '/subpages/:id',
                name: 'subpages',
                component: Subpages
            }
        ]
    },
    {
        path: '/news',
        name: 'News',
        component: News,
        redirect: '/news',
        children: [
            {
                path: '/',
                name: 'NewsList',
                component: NewsList,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Haberler', route: '/news', disabled: true},
                    ]
                }
            },
            {
                path: '/NewsCreate',
                name: 'NewsCreate',
                component: NewsCreate,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Haberler', route: '/news'},
                        {name: 'Haber Ekle', route: '/NewsCreate', disabled: true},
                    ]
                }
            },
            {
                path: '/NewsUpdate/:id',
                name: 'NewsUpdate',
                component: NewsUpdate,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Haberler', route: '/news'},
                        {name: 'Haber Guncelle', route: '/NewsUpdate', disabled: true},
                    ]
                }
            },
        ]
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            breadcrumb: [
                {name: 'Anasayfa', route: '/'},
                {name: 'Sayfalar', route: '/pages'},
                {name: 'Sayfa ekleme', route: '/create', disabled: true},
            ]
        }
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

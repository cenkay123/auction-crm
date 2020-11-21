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
import Artists from "@/views/Artists";
import ArtistsList from "@/components/artistsComponents/ArtistsList";
import ArtistsCreate from "@/components/artistsComponents/ArtistsCreate";
import ArtistsUpdate from "@/components/artistsComponents/ArtistsUpdate";
import Slayts from "@/views/Slayts";
import SlaytList from "@/components/slaytComponents/SlaytList";
import SlaytsCreate from "@/components/slaytComponents/SlaytsCreate";
import SlaytsUpdate from "@/components/slaytComponents/SlaytsUpdate";
import GalleryPage from "@/components/pagesComponents/GalleryPage";
import GalleryCreate from "@/components/pagesComponents/GalleryCreate";
import GalleryUpdate from "@/components/pagesComponents/GalleryUpdate";

Vue.use(VueRouter)

const routes = [
    /** Home Router */
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    /** Pages Router */
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
            },
            {
                path: '/GalleryPage/:page_id',
                name: 'galleryPage',
                component: GalleryPage,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sayfalar', route: '/pages'},
                        {name: 'Galeriler', route: '/galleryPage',disabled: true},
                    ]
                }
            },
            {
                path: '/galleryCreate/:page_id',
                name: 'GalleryCreate',
                component: GalleryCreate,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Galeriler', route: '/GalleryPage'},
                        {name: 'Galeri ekleme', route: '/create', disabled: true},
                    ]
                }
            },
            {
                path: '/galleryUpdate/:item_id/:page_id',
                name: 'GalleryUpdate',
                component: GalleryUpdate,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Galeriler', route: '/GalleryPage'},
                        {name: 'Galeri Güncelleme', route: '/create', disabled: true},
                    ]
                }
            },
        ]
    },
    /** News Router */
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
    /** Artists Router */
    {
        path: '/artists',
        name: 'Artists',
        component: Artists,
        redirect: '/artists',
        children: [
            {
                path: '/',
                name: 'ArtistsList',
                component: ArtistsList,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sanatcilar', route: '/artists', disabled: true},
                    ]
                }
            },
            {
                path: '/ArtistsCreate',
                name: 'ArtistsCreate',
                component: ArtistsCreate,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sanatcilar', route: '/artists'},
                        {name: 'Sanatci Ekle', route: '/ArtistsCreate', disabled: true},
                    ]
                }
            },
            {
                path: '/ArtistsUpdate/:id',
                name: 'ArtistsUpdate',
                component: ArtistsUpdate,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sanatcilar', route: '/artists'},
                        {name: 'Sanatci Guncelle', route: '/ArtistsUpdate', disabled: true},
                    ]
                }
            },
        ]
    },
    /** Slayts Router */
    {
        path: '/Slayts',
        name: 'Slayts',
        component: Slayts,
        redirect: '/slayts',
        children: [
            {
                path: '/',
                name: 'SlaytList',
                component: SlaytList,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Slaytlar', route: '/slayts', disabled: true},
                    ]
                }
            },
            {
                path: '/SlaytsCreate',
                name: 'SlaytsCreate',
                component: SlaytsCreate,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Slaytlar', route: '/slayts'},
                        {name: 'Slayt Ekleme', route: 'SlaytsCreate', disabled: true},
                    ]
                }
            },
            {
                path: '/SlaytsUpdate/:id',
                name: 'SlaytsUpdate',
                component: SlaytsUpdate,
                meta: {
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Slaytlar', route: '/slayts'},
                        {name: 'Slayt Güncelleme', route: 'SlaytsUpdate', disabled: true},
                    ]
                }
            }
        ]
    },
    /** Settings Router */
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

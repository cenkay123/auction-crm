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
import Words from "@/views/Words";
import WordsList from "@/components/wordsComponents/WordsList";
import WordCreate from "@/components/wordsComponents/WordCreate";
import WordUpdate from "@/components/wordsComponents/WordUpdate";

Vue.use(VueRouter)

const routes = [
    /** Home Router */
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Anasayfa'
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            title: 'Site ayarlari',
            breadcrumb: [
                {name: 'Anasayfa', route: '/'},
                {name: 'Sayfalar', route: '/pages'},
                {name: 'Sayfa ekleme', route: '/create', disabled: true},
            ]
        }
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
                    title: 'Anasayfa Sliderlar',
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
                    title: 'Yeni SlaytList ekleme',
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
                    title: 'Slayt Güncelleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Slaytlar', route: '/slayts'},
                        {name: 'Slayt Güncelleme', route: 'SlaytsUpdate', disabled: true},
                    ]
                }
            }
        ]
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
                    title: 'Sayfalar',
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
                    title: 'Yeni sayfa ekleme',
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
                component: Update,
                meta: {
                    title: 'Sayfa düzenleme',
                     breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sayfalar', route: '/pages'},
                        {name: 'Sayfa Düzenleme', route: '/update', disabled: true},
                    ]
                }
            },
            {
                path: '/subpages/:id',
                name: 'subpages',
                component: Subpages,
                meta: {
                    title: 'Alt sayfalar',
                     breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sayfalar', route: '/pages'},
                        {name: 'Alt sayfa', route: '/update', disabled: true},
                    ]
                }
            },
            {
                path: '/GalleryPage/:page_id',
                name: 'galleryPage',
                component: GalleryPage,
                meta: {
                    title: 'Galeriler',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sayfalar', route: '/pages'},
                        {name: 'Galeriler', route: '/galleryPage', disabled: true},
                    ]
                }
            },
            {
                path: '/galleryCreate/:page_id',
                name: 'GalleryCreate',
                component: GalleryCreate,
                meta: {
                    title: 'Galeri oluşturma',
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
                    title: 'Galeri düzenleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
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
                    title: 'Haberler',
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
                    title: 'Yeni haber ekleme',
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
                    title: 'Haber düzenleme',
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
                    title: 'Sanatçılar',
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
                    title: 'Yeni sanatçı ekleme',
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
                    title: 'Sanatçı düzenleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sanatcilar', route: '/artists'},
                        {name: 'Sanatci Guncelle', route: '/ArtistsUpdate', disabled: true},
                    ]
                }
            },
        ]
    },

    /** Words Router */
    {
        path: '/Words',
        name: 'Words',
        component: Words,
        redirect: '/Words',
        children: [
            {
                path: '/',
                name: 'WordsList',
                component: WordsList,
                meta: {
                    title: 'Kelimeler',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kelimeler', route: '/words', disabled: true},
                    ]
                }
            },
            {
                path: '/WordCreate',
                name: 'WordCreate',
                component: WordCreate,
                meta: {
                    title: 'Yeni kelime ekleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kelimeler', route: '/words'},
                    ]
                }
            },
            {
                path: '/WordUpdate/:id',
                name: 'WordUpdate',
                component: WordUpdate,
                meta: {
                    title: 'Kelime düzenleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kelimeler', route: '/words'},
                        {name: 'Kelime Güncelleme', route: '/words', disabled: true},
                    ]
                }
            }
        ]
    },
    /** Settings Router */

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

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

import Popup from "@/views/Popup";
import PopupList from "@/components/popupComponents/PopupList";
import PopupCreate from "@/components/popupComponents/PopupCreate";
import PopupUpdate from "@/components/popupComponents/PopupUpdate";

import Categories from "@/views/Categories";
import CategoriesList from "@/components/categoriesComponents/CategoriesList";
import CategoriesCreate from "@/components/categoriesComponents/CategoriesCreate";
import CategoriesUpdate from "@/components/categoriesComponents/CategoriesUpdate";

import Users from "@/views/Users";
import UsersList from "@/components/usersComponents/UsersList";
import UsersCreate from "@/components/usersComponents/UsersCreate";
import UsersUpdate from "@/components/usersComponents/UsersUpdate";

import Products from "@/views/Products";
import ProductsList from "@/components/productsComponents/ProductsList";
import ProductsCreate from "@/components/productsComponents/ProductsCreate";
import ProductsUpdate from "@/components/productsComponents/ProductsUpdate";

import Exhibitions from "@/views/Exhibitions";
import ExhibitionsList from "@/components/exhibitionsComponents/ExhibitionsList";
import ExhibitionsCreate from "@/components/exhibitionsComponents/ExhibitionsCreate";

import ExhibitionsUpdate from "@/components/exhibitionsComponents/ExhibitionsUpdate";



import LanguageSettings from "@/views/LanguageSettings";
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
    /** Settings Router */
    {
        path: '/Settings',
        name: 'Settings',
        component: Settings,
        meta: {
            title: 'Site Ayarlari',
            breadcrumb: [
                {name: 'Anasayfa', route: '/'},
                {name: 'Site Ayarlari', route: '/create', disabled: true},
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
                    title: 'Slaytlar',
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
                    title: 'Slayt Ekleme',
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
                    ]
                }
            },
            {
                path: '/create',
                name: 'Create',
                component: Create,
                meta: {
                    title: 'Sayfa Ekleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sayfalar', route: '/pages'},
                        {name: 'Sayfa Ekleme', route: '/create', disabled: true},
                    ]
                }
            },
            {
                path: '/update/:id',
                name: 'Update',
                component: Update,
                meta: {
                    title: 'Sayfa Düzenleme',
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
                    title: 'Alt Sayfalar',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sayfalar', route: '/pages'},
                        {name: 'Alt Sayfalar', route: '/update', disabled: true},
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
                    title: 'Galeri Ekleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Galeriler', route: '/galleryPage'},
                        {name: 'Galeri Ekleme', route: '/create', disabled: true},
                    ]
                }
            },
            {
                path: '/galleryUpdate/:item_id/:page_id',
                name: 'GalleryUpdate',
                component: GalleryUpdate,
                meta: {
                    title: 'Galeri Güncelleme',
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
                    title: 'Haber Ekle',
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
                    title: 'Haber Guncelle',
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
                        {name: 'Sanatçılar', route: '/artists', disabled: true},
                    ]
                }
            },
            {
                path: '/ArtistsCreate',
                name: 'ArtistsCreate',
                component: ArtistsCreate,
                meta: {
                    title: 'Sanatci Ekle',
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
                    title: 'Sanatci Guncelle',
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
                    title: 'Kelime Ekleme',
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
                    title: 'Kelime Güncelleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kelimeler', route: '/words'},
                        {name: 'Kelime Güncelleme', route: '/words', disabled: true},
                    ]
                }
            }
        ]
    },
    /** Categories Router */
    {
        path: '/Categories',
        name: 'Categories',
        component: Categories,
        redirect: '/Categories',
        children: [
            {
                path: '/',
                name: 'CategoriesList',
                component: CategoriesList,
                meta: {
                    title: 'Kategoriler',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kategoriler', route: '/CategoriesList', disabled: true},
                    ]
                }
            },
            {
                path: '/CategoriesCreate',
                name: 'CategoriesCreate',
                component: CategoriesCreate,
                meta: {
                    title: 'Kategori Ekleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kategoriler', route: '/Categories'},
                        {name: 'Kategori Ekleme', route: '/CategoriesCreate', disabled: true},
                    ]
                }
            },
            {
                path: '/CategoriesUpdate/:id',
                name: 'CategoriesUpdate',
                component: CategoriesUpdate,
                meta: {
                    title: 'Kategori Güncelleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kategoriler', route: '/Categories'},
                        {name: 'Kategori Güncelleme', route: '/Categories', disabled: true},
                    ]
                }
            }
        ]
    },
    /** Popup Router */
    {
        path: '/Popup',
        name: 'Popup',
        component: Popup,
        redirect: '/Popup',
        children: [
            {
                path: '/',
                name: 'PopupList',
                component: PopupList,
                meta: {
                    title: 'Popup',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Popup', route: '/popup', disabled: true},
                    ]
                }
            },
            {
                path: '/PopupCreate',
                name: 'PopupCreate',
                component: PopupCreate,
                meta: {
                    title: 'Popup Ekleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Popup', route: '/Popup'},
                        {name: 'Popup Ekleme', route: '/PopupCreate', disabled: true},
                    ]
                }
            },
            {
                path: '/PopupUpdate/:id',
                name: 'PopupUpdate',
                component: PopupUpdate,
                meta: {
                    title: 'Popup Güncelleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Popup', route: '/Popup'},
                        {name: 'Popup Güncelleme', route: '/PopupUpdate', disabled: true},
                    ]
                }
            }
        ]
    },
    /** Users Router */
    {
        path: '/Users',
        name: 'Users',
        component: Users,
        redirect: '/Users',
        children: [
            {
                path: '/',
                name: 'UsersList',
                component: UsersList,
                meta: {
                    title: 'Kullanıcılar',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kullanıcılar', route: '/users', disabled: true},
                    ]
                }
            },
            {
                path: '/UsersCreate',
                name: 'UsersCreate',
                component: UsersCreate,
                meta: {
                    title: 'Kullanıcı Ekleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kullanıcılar', route: '/Users'},
                        {name: 'Kullanıcı Ekleme', route: '/Users', disabled: true},
                    ]
                }
            },
            {
                path: '/UsersUpdate/:id',
                name: 'UsersUpdate',
                component: UsersUpdate,
                meta: {
                    title: 'Kullanıcı Güncelleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Kullanıcılar', route: '/Users'},
                        {name: 'Kullanıcı Güncelleme', route: '/users', disabled: true},
                    ]
                }
            }
        ]
    },

    /** Products Router */
    {
        path: '/Products',
        name: 'Products',
        component: Products,
        redirect: '/Products',
        children: [
            {
                path: '/',
                name: 'ProductsList',
                component: ProductsList,
                meta: {
                    title: 'Ürünler',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Ürünler', route: '/', disabled: true},
                    ]
                }
            },
            {
                path: '/ProductsCreate',
                name: 'ProductsCreate',
                component: ProductsCreate,
                meta: {
                    title: 'Ürün Ekleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Ürünler', route: '/Products'},
                        {name: 'Ürün Ekleme', route: '/', disabled: true},
                    ]
                }
            },
            {
                path: '/ProductsUpdate/:id',
                name: 'ProductsUpdate',
                component: ProductsUpdate,
                meta: {
                    title: 'Ürün Güncelleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Ürünler', route: '/Products'},
                        {name: 'Ürün Güncelleme', route: '/', disabled: true},
                    ]
                }
            }
        ]
    },


      /** Sergiler Router */
    {
        path: '/Exhibitions',
        name: 'Exhibitions',
        component: Exhibitions,
        redirect: '/Exhibitions',
        children: [
            {
                path: '/',
                name: 'ExhibitionsList',
                component: ExhibitionsList,
                meta: {
                    title: 'Sergiler',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sergiler', route: '/', disabled: true},
                    ]
                }
            },
            {
                path: '/ExhibitionsCreate',
                name: 'ExhibitionsCreate',
                component: ExhibitionsCreate,
                meta: {
                    title: 'Sergi ekleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sergiler', route: '/Exhibitions'},
                        {name: 'Sergi Ekleme', route: '/', disabled: true},
                    ]
                }
            },
            {
                path: '/ExhibitionsUpdate/:id',
                name: 'ExhibitionsUpdate',
                component: ExhibitionsUpdate,
                meta: {
                    title: 'Sergi Güncelleme',
                    breadcrumb: [
                        {name: 'Anasayfa', route: '/'},
                        {name: 'Sergiler', route: '/Exhibitions'},
                        {name: 'Sergi Güncelleme', route: '/', disabled: true},
                    ]
                }
            }
        ]
    },



    /** Dil Ayaları Router */
    {
        path: '/LanguageSettings',
        name: 'LanguageSettings',
        component: LanguageSettings,
        meta: {
            title: 'Dil Ayarlari',
            breadcrumb: [
                {name: 'Anasayfa', route: '/'},
                {name: 'Site Ayarları', route: '/Settings', disabled: false},
                {name: 'Dil Ayaları', route: '/LanguageSettings', disabled: true},
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

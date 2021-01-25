import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios_mixin from "@/axios_mixin";

Vue.use(Vuex)
window.axios = require('axios');


const moduleForm = {
    state: {
        languages: [
            {lang: 'turkce', code: 'tr', id: 1},
            {lang: 'english', code: 'en', id: 2},
        ],
        drawer: 1
    },
    mutations: {
        hello() {
            console.log('hello admin')
        },
        sidebarAction(state) {
            if(state.drawer) {
                state.drawer = false
            }else {
                state.drawer = 1
            }
        }
    }
}

const moduleStore = {
    state: {
        news: [],
        categories: [],
        users: [],
    },
    mutations: {
        successNews(state, data) {
            state.news = data;
        },
        successCategories(state, data) {
            state.categories = data;
        },
        successUsers(state, data) {
            state.users = data;
        },
    }
}

const moduleAuth = {
    state: {
        loggedIn: false,
        userInfo: {},
        userToken: null,
    },
    mutations: {
        login(state, response) {
            state.loggedIn = true;
            state.userInfo = response.data;
            state.userToken = response.data.token;
        },
        logout(state) {
            state.loggedIn = false;
            window.location.href = "/";
        }
    }
}

const modulePages = {
    mixins: [axios_mixin],
    state: {
        pages: []
    },
    mutations: {
        successPages(state, data) {
            state.pages = [];
            data.forEach((item) => {
                var customItem = {
                    id: item.id,
                    parentId: item.parentId,
                    title: item.title_tr,
                    createdAt: item.createdAt,
                    isActive: item.isActive,
                    isMain: item.isMain,
                    rank: item.rank,
                    subPages: item.subPages,
                    SpecificationId: item.pageSpecification.id,
                };
                if (item.parentId==0){
                    state.pages.push(customItem);
                }

            })
        },

    }
}

const moduleSettings = {
    state: {
        siteSettings: {},
        loader: false
    },
    mutations: {
        loaderAction(state, data) {
            state.loader = data
        }
    }
}

const vuexLocal = new createPersistedState({
    storage: window.localStorage
});

const store = new Vuex.Store({
    modules: {
        form: moduleForm,
        auth: moduleAuth,
        settings: moduleSettings,
        pages: modulePages,
        storeData: moduleStore,
    },
    plugins: [vuexLocal]
});

export default store

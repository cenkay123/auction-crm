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
        ]
    },
    mutations: {
        hello() {
            console.log('hello admin')
        }
    }
}

const moduleStore = {
    state: {
        slayts: []
    },
    mutations: {
        successSlayt(state, response) {
            state.slayts = response;
        },
        errorSlayt() {
            axios_mixin.methods.Error_Message('İşlem hatalı','tekrar deneyiniz','error')
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
        pages: [],
        news: [],
        artists: []
    },
    mutations: {
        successPages(state, data) {
            state.pages = [];
            data.forEach((item) => {
                var customItem = {
                    id: item.id,
                    title: item.title_tr,
                    createdAt: item.createdAt,
                    isActive: item.isActive,
                    subPages: item.subPages
                };
                state.pages.push(customItem);
            })
        },
        successNews(state, data) {
            state.news = [];
            state.news = data;
        },
        successArtists(state, data) {
            state.artists = [];
            state.artists = data;
        },
    }
}

const moduleSettings = {
    state: {
        siteSettings: {},
        loader: false
    },
    mutations: {}
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

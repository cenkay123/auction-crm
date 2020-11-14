import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios_mixin from "@/axios_mixin";
Vue.use(Vuex)
window.axios = require('axios');

const moduleForm = {
    state: {
        languages: [
            {lang: 'turkish', code: 'tr'},
            {lang: 'english', code: 'en'},
        ]
    },
    mutations: {
        hello() {
            console.log('hello admin')
        }
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
                    title: item.title_tr,
                    createdAt: item.createdAt,
                    isActive: item.isActive,
                    subPages: item.subPages
                };
                state.pages.push(customItem);
            })
        },
        successPagesCreate() {
            axios_mixin.methods.Error_Message('İslem Basarılı', '', 'success')
        },
        errorPagesCreate() {
            axios_mixin.methods.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
        }
    }
}

const moduleSettings = {
    state: {
        siteSettings: {},
        socialSettings: {},
        langSettings: [],
    },
    mutations: {
        successSite(state, response) {
            state.siteSettings = response.data[0];
        },
        successSocial(state, response) {
            state.socialSettings = response.data;
        },
        successLang(state, response) {
            state.langSettings = response.data[0];
        },
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
        pages: modulePages
    },
    plugins: [vuexLocal]
});

export default store

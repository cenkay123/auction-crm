import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios_mixin from "@/axios_mixin";
import axios from "axios";

Vue.use(Vuex)
window.axios = require('axios');

var vuex = window.localStorage.getItem('vuex')
var token = JSON.parse(vuex);


const systemUtiltys = {
    mixins: [axios_mixin],
    state: {
        base_url: 'http://52.247.242.98:80'
    },
    actions: {
        /* Durum aktif et yada pasif et */
        statusChange(context, credentials) {
            return new Promise((resolve, reject) => {
                axios
                    .post(context.state.base_url + credentials.endpoint, {
                        id: credentials.id,
                        isActive: credentials.isActive
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + token.auth.userToken //the token is a variable which holds the token
                        },
                    })
                    .then(response => {
                        context.commit('getSwallFireSuccess');
                        resolve(response)
                    })
                    .catch(error => {
                        context.commit('getSwallFireError');
                        reject(error)
                    })
            });
        }
    },
    mutations: {
        getSwallFireSuccess() {
            axios_mixin.methods.Swall_Fire('İslem Başarılı', '', 'success')
        },
        getSwallFireError() {
            axios_mixin.methods.Swall_Fire('İslem Hatalı', 'Tekrar deneyiniz', 'error')
        }
    }
}

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
        systemUtilty: systemUtiltys,
        form: moduleForm,
        auth: moduleAuth,
        settings: moduleSettings,
        pages: modulePages
    },
    plugins: [vuexLocal]
});

export default store

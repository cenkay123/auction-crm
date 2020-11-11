import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

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
    state: {
        pages: []
    },
    mutations: {
        successPages(state, data) {
            state.pages = [];
            data.forEach((item) => {
                var customItem = {
                    id: item.id,
                    title: item.tR_Title,
                    createdAt: item.createdAt,
                    isMain: item.isMain
                };
                state.pages.push(customItem);
            })
        },
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
        pages: modulePages
    },
    plugins: [vuexLocal]
});

export default store

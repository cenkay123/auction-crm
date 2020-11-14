import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios_mixin from "@/axios_mixin";
import axios from "axios";

Vue.use(Vuex)
window.axios = require('axios');


const systemUtiltys = {
    mixins: [axios_mixin],
    state: {
        base_url: 'http://52.247.242.98:80'
    },
     actions: {

        /* Table row da sutun silmek */
        deleteItem(context, credentials) {
          return new Promise((resolve, reject) => {
            Vue.swal.fire({
                  title: 'Silmek istediğinizden eminmisiniz?',
                  text: "Silme işlemi yapıldıkdan sonra veri geri getirilemez!",
                  type: 'warning',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Evet, silinsin!'
            }).then((result) => {
               if (result.value){
                  axios
                      .post(context.state.base_url + credentials.endpoint + credentials.id, {
                          id: credentials.id,
                      })
                      .then(response=> {
                          context.commit('getSwallFireSuccess');
                          resolve(response)
                      })
                      .catch(error => {
                          context.commit('getSwallFireError');
                          reject(error)
                      })
                  }
               });
            })
        },
        /* Durum aktif et yada pasif et */
        statusChange(context, credentials){
            return new Promise((resolve, reject) => {
                axios
                  .post(context.state.base_url + credentials.endpoint + credentials.id, {
                    id: credentials.id,
                    IsMain: credentials.IsMain,
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
        getSwallFireSuccess(){
            axios_mixin.methods.Swall_Fire('İslem Başarılı', '', 'success')
        },
        getSwallFireError(){
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
                    title: item.tR_Title,
                    createdAt: item.createdAt,
                    isMain: item.isMain
                };
                state.pages.push(customItem);
            })
        },
        successPagesCreate(){
            axios_mixin.methods.Error_Message('İslem Basarılı', '', 'success')
        },
        errorPagesCreate(){
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

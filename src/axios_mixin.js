import axios from 'axios'
//import Vue from 'vue'

const axios_mixin = {
    data: function () {
        return {
            base_url: 'http://52.247.242.98:80'
        }
    },
    methods: {

        api_calling: function () {
            var vuex = window.localStorage.getItem('vuex')
            var token = JSON.parse(vuex);
            var service = null

            if (token.auth.loggedIn) {
                service = axios.create({
                    headers: {'Authorization': 'Bearer ' + token.auth.userToken}
                })
            } else {
                service = axios.create();
            }
            service.interceptors.response.use(this.handlesuccess());
            return service;
        },
        handlesuccess: function (response) {
            return response;
        },
        api_get: function (path, getSuccess, getError) {
            this.api_calling().get(this.base_url + path).then(
                (response) => (getSuccess(response))
            ).catch(
                (error) => (getError(error))
            );
        },
        api_post: function (path, payload, postsuccess, posterror) {
            this.api_calling().post(this.base_url + path, payload).then(
                (response) => (postsuccess(response.data))
            ).catch(
                (error) => (posterror(error))
            );
        },
        findByKeyAndRemove: function (source, key, oddkey) {
            if (key in source) {
                if (source[key].id === oddkey) {
                    delete source[key]
                }
            }
            return false;
        },
        findByKey: function (source, key, oddkey) {
            if (key in source) {
                if (source[key].id === oddkey) {
                    return oddkey
                }
            }
            return false;
        },

        sourceKeyRemove: function (source, key) {
            if (key in source) {
                delete source[key]
            }
            return false;
        },
        sourceKey: function (source, key) {
            if (key in source) {
                return source[key]
            }
            return false;
        }
    }
};

export default axios_mixin

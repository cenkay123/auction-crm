import axios from 'axios'
import Vue from 'vue'

const axios_mixin = {
    data: function () {
        return {
            base_url: 'http://ec2-18-191-134-40.us-east-2.compute.amazonaws.com'
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
            this.$store.commit('loaderAction', true)
            this.api_calling().get(this.base_url + path).then(
                (response) => {(getSuccess(response)); this.$store.commit('loaderAction', false)}
            ).catch(
                (error) => (getError(error))
            );
        },
        api_post: function (path, payload, postsuccess, posterror) {
            this.$store.commit('loaderAction', true)
            this.api_calling().post(this.base_url + path, payload).then(
                (response) => {(postsuccess(response.data)); this.$store.commit('loaderAction', false)},
            ).catch(
                (error) => (posterror(error))
            );
        },
        Error_Message(title, text, type) {
            Vue.swal.fire({
                toast: true,
                timerProgressBar: true,
                position: 'top-end',
                icon: type,
                title: title,
                showConfirmButton: false,
                timer: 3000,
            });
            this.$store.state.settings.loader=false;

        },
        Swall_Fire(title, text, type) {
            Vue.swal.fire(title, text, type)
        },

        mixinDeleteItem(path, payload, postsuccess, posterror) {
            Vue.swal.fire({
                title: 'Silmek istediğinizden eminmisiniz?',
                text: "Silme işlemi yapıldıkdan sonra veri geri getirilemez!",
                type: 'warning',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Evet, silinsin!',
                cancelButtonText: 'Iptal',
            }).then((result) => {
                if (result.value) {
                    this.api_calling().post(this.base_url + path, payload).then(
                        (response) => {
                            this.Swall_Fire('İslem Basarili', '', 'success');
                            if (postsuccess) {
                                (postsuccess(response.data))
                            }
                        }
                    ).catch(
                        (error) => {
                            this.Swall_Fire('İslem Hatalı', 'Tekrar deneyiniz', 'error');
                            if (posterror) {
                                (posterror(error))
                            }
                        }
                    );
                }
            });
        },
        mixinUpdateItem(path, payload, postsuccess, posterror) {
            this.api_calling().post(this.base_url + path, payload).then(
                (response) => {
                    this.Swall_Fire('İslem Basarili', '', 'success');
                    if (postsuccess) {
                        (postsuccess(response.data))
                    }
                }
            ).catch(
                (error) => {
                    this.Swall_Fire('İslem Hatalı', 'Tekrar deneyiniz', 'error');
                    if (posterror) {
                        (posterror(error))
                    }
                }
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

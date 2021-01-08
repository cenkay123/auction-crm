import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from "@/plugins/vuetify"
import axios_mixin from './axios_mixin'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2';
import JsonExcel from "vue-json-excel";

Vue.use(Notifications);
Vue.use(VueSweetalert2);
//Vue.use(require('vue-moment'));
Vue.use(VueMoment, {moment,});
require('moment/locale/tr')
Vue.component("downloadExcel", JsonExcel);
Vue.mixin(axios_mixin);
Vue.config.productionTip = false;

export const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
});

new Vue({
  router,
  store,
  vuetify,
  mixins: [axios_mixin],
  render: h => h(App)
}).$mount('#app')

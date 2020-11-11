import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from "@/plugins/vuetify"
import axios_mixin from './axios_mixin'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
require('moment/locale/tr')
Vue.config.productionTip = false;
Vue.mixin(axios_mixin);
Vue.use(VueMoment, {
  moment,
})

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

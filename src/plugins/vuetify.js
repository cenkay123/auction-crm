import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
// import colors from 'vuetify/lib/util/colors'

const opts = {
    theme:
    {
        dark: false,
        themes:{
            light:{
                blue:'#000',
            },


        }
    },
}

export default new Vuetify(opts)

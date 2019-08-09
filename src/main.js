import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

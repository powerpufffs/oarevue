import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from "./store";
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
import loadBases from './loadBases'
// import axios from 'axios'
// import Constants from './constants'
import axiosInstance from './axiosInstance'

loadBases()

// const axiosInstance = axios.create({
//   baseURL: Constants.API_PATH
// })

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$axios = axiosInstance


const adminRoutes = ['admin', 'groups']
router.beforeEach((to, from, next) => {
  // debugger
  if(adminRoutes.includes(to.name)) {
    if(!store.getters.isAuthenticated) {
      next(false)
    } else {
      next()
    }
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

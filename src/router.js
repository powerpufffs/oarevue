import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import DictionaryView from './components/DictionaryView'
import EpigraphyView from './components/EpigraphyView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dictionary/:wordId',
      name: 'dictionary',
      component: DictionaryView,
      props: true
    },
    {
      path: '/epigraphies/:textId',
      name: 'epigraphies',
      component: EpigraphyView,
      props: true
    }
  ]
})

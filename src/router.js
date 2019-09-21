import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import DictionaryView from './components/DictionaryView'
import EpigraphyView from './components/EpigraphyView'
import SignInView from './components/SignInView'
import RegisterView from './components/RegisterView'
import EditUserView from './components/EditUserView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/home',
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
      path: '/epigraphies/:textName/:textId',
      name: 'epigraphies',
      component: EpigraphyView,
      props: true
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/edituser',
      name: 'edituser',
      component: EditUserView
    }
  ]
})

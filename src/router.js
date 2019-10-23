import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import DictionaryView from './components/DictionaryView'
import EpigraphyView from './components/EpigraphyView'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'
import EditUserView from './components/EditUserView'
import AdminView from './components/AdminView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/admin',
      component: AdminView
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
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
      path: '/login',
      name: 'login',
      component: LoginView
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

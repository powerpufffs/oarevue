import Home from './components/Home'
import DictionaryView from './components/DictionaryView'
import EpigraphyView from './components/EpigraphyView'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'
import EditUserView from './components/EditUserView'
import AdminView from './components/AdminView'
import GroupView from './components/GroupView'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
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
    path: '/epigraphies/:textId',
    name: 'epigraphies',
    component: EpigraphyView,
    props: true
  },
  {
    path: '/groups/:groupId',
    name: 'groups',
    component: GroupView,
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
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import LoginView from '@/components/LoginView'
// import mockRouter from '../mockRouter'
import OareAppBar from '@/components/base/OareAppBar'
import OareContentView from '@/components/base/OareContentView'
import OareFooter from '@/components/base/OareFooter'
import OareListItem from '@/components/base/OareListItem'
import OareSubheader from '@/components/base/OareSubheader'
import OareUserCard from '@/components/base/OareUserCard'
import flushPromises from 'flush-promises'
// import * as utils from '@/utils/index'

Vue.component('OareAppBar', OareAppBar)
Vue.component('OareContentView', OareContentView)
Vue.component('OareFooter', OareFooter)
Vue.component('OareListItem', OareListItem)
Vue.component('OareSubheader', OareSubheader)
Vue.component('OareUserCard', OareUserCard)

Vue.use(Vuetify)

function createConfig(overrides) {
  const vuetify = new Vuetify()
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(VueRouter)
  const mocks = {
    $store: {
      getters: {
        isAuthenticated: true
      },
      dispatch: () => {
        return Promise.resolve(true)
      }
    }
  }

  return Object.assign({ mocks, vuetify, localVue }, overrides)
}

describe('App.vue', () => {
  it('should be a Vue component', () => {
    let wrapper = shallowMount(LoginView, createConfig())
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('logs in when filling out the form', async () => {
    let wrapper = shallowMount(LoginView, createConfig())
    wrapper.vm.email = "my@em.ail"
    wrapper.vm.password = "myPassword"
    
    wrapper.find('.loginBtn').trigger('click')
    await flushPromises();
    console.log('log in done dapat')
  })
})

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
// import LoginView from '../../src/components/LoginView'
// import mockRouter from '../mockRouter'
import OareAppBar from '../../src/components/base/OareAppBar'
import OareContentView from '../../src/components/base/OareContentView'
import OareFooter from '../../src/components/base/OareFooter'
import OareListItem from '../../src/components/base/OareListItem'
import OareSubheader from '../../src/components/base/OareSubheader'
import OareUserCard from '../../src/components/base/OareUserCard'
import GroupView from '../../src/components/GroupView'
import flushPromises from 'flush-promises'
// import { Breakpoint } from 'vuetify/lib/services'
// import * as utils from '@/utils/index'

Vue.use(VueRouter)
Vue.component('OareAppBar', OareAppBar)
Vue.component('OareContentView', OareContentView)
Vue.component('OareFooter', OareFooter)
Vue.component('OareListItem', OareListItem)
Vue.component('OareSubheader', OareSubheader)
Vue.component('OareUserCard', OareUserCard)

// Vue.use(Vuetify)

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

describe('GroupView.vue', () => {
  let wrapper;
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)

    const router = new VueRouter({
      routes: []
    })

    // Create mock return values
    let groupMockReturn = {
      id: 1,
      name: 'My group',
      users: [
        {
          user_id: 0,
          name: 'Barrack Obama',
          email: 'bar@rack.obama'
        },
        {
          user_id: 1,
          name: 'Joe Biden',
          email: 'joe@bid.en'
        }
      ]
    }

    wrapper = mount(GroupView, {
      localVue,
      router,
      propsData: {
        groupId: 1
      },
      vuetify: new Vuetify({
        mocks: {
          $vuetify: {
            breakpoint: {
              height: 500
            }
          },
        }
      }),
      mocks: {
        $axios: {
          get: (path) => {
            let route = path.split('/')[1]
            switch(route) {
              case 'group':
                return Promise.resolve({data: groupMockReturn})
              case 'users':
                return Promise.resolve({data: []})
              case 'text_text':
                return Promise.resolve({data: []})
              case 'group_rw':
                return Promise.resolve({ data: {
                  group_id: 1,
                  permissions: []
                } })
            }
          }
        }
      }
    })
  })

  it('should show correct number of rows on group table', async () => {
    expect(wrapper.isVueInstance()).toBe(true)
    await flushPromises()
    // console.log(wrapper.html())
  })
  // it('should be a Vue component', () => {
  //   let wrapper = shallowMount(LoginView, createConfig())
  //   expect(wrapper.isVueInstance()).toBeTruthy()
  // })

  // it('logs in when filling out the form', async () => {
  //   let wrapper = shallowMount(LoginView, createConfig())
  //   wrapper.vm.email = "my@em.ail"
  //   wrapper.vm.password = "myPassword"
    
  //   wrapper.find('.loginBtn').trigger('click')
  //   await flushPromises();
  //   console.log('log in done dapat')
  // })
})

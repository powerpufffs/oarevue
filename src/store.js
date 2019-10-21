import Vue from 'vue'
import Vuex from 'vuex'
import { isValidJwt } from './utils/index'
import Constants from './constants'
import axios from 'axios'
import { EventBus } from './utils/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    landed: false,
    user: {},
    jwt: ''
  },
  mutations: {
    setLanded(state) {
      state.landed = true
    },

    setUser(state, user) {
      state.user = user
    },

    setJwt(state, token) {
      state.jwt = token
      state.landed = true
    }
  },
  actions: {

    async register({commit}, userData) {
      try {
        let response = await axios.post(`${Constants.API_PATH}/register`, userData)
        let data = response.data
        commit('setUser', data.data)
        commit('setJwt', data.token)
        return true
      } catch(err) {
        EventBus.$emit('registerFailure', err.response.data.message)
        return false
      }
    },

    async login({commit}, userData) {
      try {
        let response = await axios.post(`${Constants.API_PATH}/login`, userData)
        let data = response.data
        commit('setUser', data.data)
        commit('setJwt', data.token)
        return true
      } catch(err) {
        EventBus.$emit('loginFailure', err.response.data.message)
        return false
      }
    }    

  },
  getters: {
    landed(state) {
      return state.landed
    },

    isAuthenticated(state) {
      return isValidJwt(state.jwt)
    },

    user(state) {
      return state.user
    }
  }
})

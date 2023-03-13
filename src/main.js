import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { createStore } from 'vuex'
import './main.css'
import apiHandler from './plugins/apiHandler'

const store = new createStore({
  state: {
    currentUser: null
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user
    }
  }
})

createApp(App)
  .use(router)
  .use(store)
  .use(VueAxios, axios)
  .mixin({
    methods: {
      callEndpoints: apiHandler,
    }
  })
  .provide('message', {
    text: '',
    type: '',
    show: false
  })
  .mount('#app')


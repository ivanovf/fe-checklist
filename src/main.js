import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import './main.css';
import apiHandler from './plugins/apiHandler'

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .mixin({
    data() {
      return {
        message: {
          text: '',
          type: '',
          show: false
        }
      }
    },
    methods: {
      callEndpoints: apiHandler,
    }
  })
  .mount('#app')

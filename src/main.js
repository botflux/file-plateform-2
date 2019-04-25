import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuelidate'
import api from './plugins/api'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(api, {
  baseUrl: 'http://localhost:3000',
  getToken: () => store.state.user.token
})

new Vue({
  router,
  store,
  api,
  render: h => h(App)
}).$mount('#app')

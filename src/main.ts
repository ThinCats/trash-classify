import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//@ts-ignore
import { createProvider, VueApollo } from './vue-apollo'

Vue.config.productionTip = false
declare module 'vue/types/vue' {
  interface Vue {
    apolloProvider: VueApollo
    $message: CallableFunction
  }
}

new Vue({
  router,
  store,
  //@ts-ignore
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

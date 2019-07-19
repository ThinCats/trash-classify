import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/echarts.js'
//@ts-ignore
import { createProvider, VueApollo, DollarApollo } from './vue-apollo'
import _ from 'lodash'

Vue.config.productionTip = false
Vue.prototype.$_ = _
declare module 'vue/types/vue' {
  interface Vue {
    apolloProvider: VueApollo
    $message: CallableFunction
    $apollo: DollarApollo<any>
    $_: typeof _
  }
}

new Vue({
  router,
  store,
  //@ts-ignore
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

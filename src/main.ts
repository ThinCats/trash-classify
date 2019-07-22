import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/echarts.js'
//@ts-ignore
import { createProvider, VueApollo, DollarApollo } from './vue-apollo'
import _ from 'lodash'
// self global component
import WindowCard from './components/WindowCard.vue'
Vue.component('window-card', WindowCard)

Vue.config.productionTip = false
Vue.prototype.$_ = _
declare module 'vue/types/vue' {
  interface Vue {
    apolloProvider: VueApollo
    $message: CallableFunction
    $notify: CallableFunction
    $apollo: DollarApollo<any>
    $_: typeof _
  }
}

// limit call times of this function
let limitCall = (maxCnt: number, fn: CallableFunction) => {
  let callCnt = 0
  return (arg: any) => {
    if (callCnt < maxCnt) {
      callCnt++
      fn(arg)
    }
  }
}

let vm: Vue = new Vue({
  router,
  store,
  //@ts-ignore
  apolloProvider: createProvider(
    {},
    limitCall(1, (error: any) => {
      vm.$notify({
        title: 'Network failed',
        message: `We're sorry that we can't connect to the backend server,
          please check your network connection. If all is right, feel free to contact with us`,
        type: 'error',
        // won't automatically close
        duration: 0
      })
    })
  ),
  render: h => h(App)
}).$mount('#app')

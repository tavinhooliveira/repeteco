import Vue from 'vue'
import VueResource from 'vue-resource'
import FBSignInButton from 'vue-facebook-signin-button'
import VTooltip from 'v-tooltip'
import Wrapper from './Wrapper'
import router from './router'

Vue.use(VueResource)
Vue.use(FBSignInButton)
Vue.use(VTooltip)

new Vue ({
  el: '#app',
  router,
  render: h => h(Wrapper)
})

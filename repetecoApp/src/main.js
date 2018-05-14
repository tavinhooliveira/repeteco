import Vue from 'vue'
import VueResource from 'vue-resource'
import FBSignInButton from 'vue-facebook-signin-button'
import VTooltip from 'v-tooltip'
import axios from 'axios'
import Wrapper from './Wrapper'
import router from './router'
import SweetModal from 'sweet-modal-vue/src/plugin.js'


Vue.use(VueResource)
Vue.use(FBSignInButton)
Vue.use(VTooltip)
Vue.use(SweetModal)
Vue.prototype.$ajax = axios

// new Vue ({
//   el: '#app',
//   router,
//   render: h => h(Wrapper)
// })

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  template: '<Wrapper/>',
  components: { Wrapper }
})

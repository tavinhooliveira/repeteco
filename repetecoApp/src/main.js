import Vue from 'vue'
import VueResource from 'vue-resource'
import FBSignInButton from 'vue-facebook-signin-button'
import VTooltip from 'v-tooltip'
import axios from 'axios'
import Wrapper from './Wrapper'
import router from './router'
import SweetModal from 'sweet-modal-vue/src/plugin.js'
import Vuex from 'vuex'



Vue.use(VueResource)
Vue.use(FBSignInButton)
Vue.use(VTooltip)
Vue.use(SweetModal)
Vue.use(Vuex)

Vue.prototype.$urlAPI = `http://127.0.0.1:9096/wsrepeteco/`
Vue.prototype.$ajax = axios

// new Vue ({
//   el: '#app',
//   router,
//   render: h => h(Wrapper)
// })


new Vue({
  el: '#app',
  router,
  template: '<Wrapper/>',
  components: { Wrapper }
})

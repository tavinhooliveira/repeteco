import Vue from 'vue'
import VueResource from 'vue-resource'
import FBSignInButton from 'vue-facebook-signin-button'
import VTooltip from 'v-tooltip'
import axios from 'axios'
import Wrapper from './Wrapper'
import router from './router'
import SweetModal from 'sweet-modal-vue/src/plugin.js'
import Vuex from 'vuex'
import { mapGetters, mapMutations, mapActions } from 'vuex'


Vue.use(VueResource)
Vue.use(FBSignInButton)
Vue.use(VTooltip)
Vue.use(SweetModal)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$urlAPI = `http://127.0.0.1:9096/wsrepeteco/`
Vue.prototype.$basicAuthParams = "cmVwZXRlY29BcGk6bWVnYXMqczNuaDQ="
Vue.prototype.$ajax = axios

var store = {
  state:{
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
  },
  getters:{
    getAuth: state =>{
      return state.user;
    },
    getToken: state =>{
        return state.user.authResponse.accessToken;
    },
    getUseriId: state =>{
        return state.user.authResponse.userID;
    },
    getAuthStatus: state =>{
        return state.user.status;
    },
    getTeste: state => {
      return state.teste
    }
  },
  mutations:{
    setAuth(state, n){
      state.user = n;
    }
  },
  actions:{
    
  }
};

new Vue({
  el: '#app',
  store: new Vuex.Store(store),
  router,
  template: '<Wrapper/>',
  components: { Wrapper }
})

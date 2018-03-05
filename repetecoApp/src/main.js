import Vue from 'vue'
import VueResource from 'vue-resource'
import FBSignInButton from 'vue-facebook-signin-button'
import VueRouter from 'vue-router'
import VTooltip from 'v-tooltip'
Vue.use(VueResource)
Vue.use(FBSignInButton)
Vue.use(VueRouter)
Vue.use(VTooltip)

import Login from './pages/Login.vue'
import Classification from './pages/Classification.vue'
import Profile from './pages/Profile.vue'
import Invite from './pages/Invite.vue'
import Notification from './pages/Notification.vue'
import NotificationNewMatch from './pages/NotificationNewMatch.vue'
import NotificationOldMatch from './pages/NotificationOldMatch.vue'
import Config from './pages/Config.vue'
import NotFound from './pages/NotFound.vue'
import ClassificationOn from './pages/ClassificationOn.vue'
import ClassificationOff from './pages/ClassificationOff.vue'


const login = Login
const classification = Classification
const profile = Profile
const invite = Invite
const notification = Notification
const notificationNewMatch = NotificationNewMatch
const notificationOldMatch = NotificationOldMatch
const config = Config
const notFound = NotFound
const classificationOn = ClassificationOn
const classificationOff = ClassificationOff


const rotas = {
  '/': login,
  '/classification': classification,
  '/profile': profile,
  '/config': config,
  '/invite': invite,
  '/notification': notification,
  '/notificationNewMatch': notificationNewMatch,
  '/notificationOldMatch': notificationOldMatch,
  '/config': config,
  '/classificationOn' : classificationOn,
  '/classificationOff' : classificationOff

}

new Vue ({
  el: '#app',
  data:{
    currentRota: window.location.pathname
  },
  computed:{
    routesVariable  (){
      return rotas[this.currentRota] || notFound      
    }
  },
  render (h) {
    return h(this.routesVariable)
  },
})
  export default {
    data() {
      return {
        
      };
    },
  methods: {

  }
}

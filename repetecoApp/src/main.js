import Vue from 'vue'
import VueResource from 'vue-resource'
import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(VueResource)
Vue.use(FBSignInButton)

import Login from './pages/Login.vue'
import Classification from './pages/Classification.vue'
import Profile from './pages/Profile.vue'
import Invite from './pages/Invite.vue'
import Notification from './pages/Notification.vue'
import NotificationNewMatch from './pages/NotificationNewMatch.vue'
import NotificationOldMatch from './pages/NotificationOldMatch.vue'
import Config from './pages/Config.vue'
import NotFound from './pages/NotFound.vue'
import ErrorCall from './pages/ErrorCall.vue'
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
const errorCall = ErrorCall
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
  '/error' : errorCall,
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
  data () {
    return {
      profile: {},
      authorized: false
    }
  },
  methods: {
    getProfile () {
      let vm = this
      FB.api('/me?fields=id,name,link,email,gender,location,picture{url},friends{id,name,picture,link,locale,gender}', function (response) {
        vm.$set(vm, 'profile', response)
        console.log(response);

        //Friends
         if (response.friends.data.length) {
            for (var i = 0; i < response.friends.data.length; i++){
            var fdFriends = null
            fdFriends = response.friends.data[i].name
            } 
            console.log(fdFriends);          
          }
        
      })
    },
    login () {
      let vm = this
      FB.login(function (response) {
        vm.statusChangeCallback(response)
      }, {
        scope: 'public_profile, email, user_friends',
        return_scopes: true
      })
    },
    logout () {
      let vm = this
      FB.logout(function (response) {
        vm.statusChangeCallback(response)
        console.log("logout Efetuado")
      })
    },
statusChangeCallback (response) {
      let vm = this
      if (response.status === 'connected') {
        console.log("Usuario Autorizado!");
        vm.authorized = true
        vm.getProfile()
        console.log("Connectado -> ", vm.getProfile())
      } else if (response.status === 'not_authorized') {
        console.log("Não Autorizado!");
        vm.authorized = false
      } else if (response.status === 'unknown') {
        vm.profile = {}
        vm.authorized = false
      } else {
        vm.authorized = false
      }
    }
  },
  mounted () {
    let vm = this
    
    // facebook
    window.fbAsyncInit = function() {
      FB.init({
        appId: '175578203007671',
        cookie: true,
        xfbml: true,
        version: 'v2.10'
      });
      FB.AppEvents.logPageView();

      // Get FB Login Status
      FB.getLoginStatus(response => {
        vm.statusChangeCallback(response)
      })
    };
  }

}

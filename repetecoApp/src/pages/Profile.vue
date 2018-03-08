<template>
   <div>
      <div v-if="!authorized">
         <ReloadAuthorizedComponent></ReloadAuthorizedComponent>
      </div>
      <div v-else>
         <div v-if="this.statusAPIAPP === true">
            <section>
               <profileComponent v-for="profileinfo in users" v-bind:key="profileinfo.id" v-bind:id="profileinfo.id" v-bind:city="profileinfo.city"
                  v-bind:name="profileinfo.name" v-bind:imagem="profileinfo.imagem" v-bind:link="profileinfo.link" v-bind:id_fb_users="profileinfo.id_fb_users"
                  v-bind:friendsTotalFb="profileinfo.friendsTotalFb" v-bind:friendsTotalApp="profileinfo.friendsTotalApp" v-bind:flagDisplayHot="profileinfo.flagDisplayHot"
                  v-bind:flagDisplayCount="profileinfo.flagDisplayCount" v-bind:friends="profileinfo.friends">
               </profileComponent>
            </section>
         </div>
         <div v-else>
            </br></br></br></br></br>
            <reload></reload>
         </div>
      </div>
   </div>
</template>

<script>
import ProfileComponent from '../components/ProfileComponent.vue';
import UserComponent from '../components/UserComponent.vue';
import FriendComponent from '../components/FriendComponent.vue';
import Reload from '../components/Reload.vue';
import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";

export default {
  name: 'Profile',
  props: ['id', 'name', 'imagem', 'link', 'friends', 'city', 'id_fb_users'],
  components: {
    ProfileComponent,
    FriendComponent,
    UserComponent,
    Reload,
    ReloadAuthorizedComponent
  },
  data() {
      return {
        nomeProjeto: 'Perfil',
        users: [],
        profile: [],
        authorized: false,
        statusAPIAPP: false,
        intervalo: null
      }
  },
  methods: {
    //Facebook - API GET
    getApiRepeteco(userid) {
        this.$http.get(`http://localhost:9096/wsrepeteco/users/${userid}`).then(response => {
            this.users = [response.data]
            if (this.users.length > 0) {
                console.log("API Repeteco: OK!")
                this.statusAPIAPP = true;
            } else {
                this.statusAPIAPP = false;
                console.log("Erro na chamada da API - Repeteco");
            }
        })
    },
    statusChangeCallback(response) {
        let vm = this
        var idFb = response.authResponse.userID
        if (response.status === 'connected') {
            console.log("Usuario Autorizado!");
            console.log("Status: Connectado!")
            vm.authorized = true
            vm.idUserFbSession = idFb
            vm.getApiRepeteco(idFb)
        } else if (response.status === 'not_authorized') {
            console.log("Status: Não Autorizado!");
            vm.authorized = false
        } else if (response.status === 'unknown') {
            vm.profile = {}
            vm.authorized = false
        } else {
            vm.authorized = false
        }
    }
  },
  mounted() {
    let vm = this
    window.fbAsyncInit = function() {
        FB.init({
            appId: '175578203007671',
            cookie: true,
            xfbml: true,
            version: 'v2.10'
        });
        FB.AppEvents.logPageView();
        FB.getLoginStatus(response => {
            vm.statusChangeCallback(response)
        })
    };
  }
  //Facebook - End 
};
</script>
<template>
   <div>
      <section>
         <div v-if="!authorized">
            <ReloadAuthorizedComponent></ReloadAuthorizedComponent>
         </div>
         <div v-else  id="ListFriends" class="ListFriends container notification">
            <div id="searchClassification" class="container searchClassification navbar-fixed-top">
               <input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar...">
            </div>
            
            <ul v-if="this.statusAPIAPP === true" class="list-group" id="searchUL">
               <matchesRecordComponent v-bind:user="users" v-for="user in users" v-bind:key="user.id" v-bind:id_fb_users="user.id_fb_users" v-bind:name="user.name" v-bind:imagem="user.imagem" v-bind:user_id="user.user_id"
                  v-bind:link="user.link" v-bind:friends="user.friends" v-bind:gender="user.gender" v-bind:friendsTotalFb="user.friendsTotalFb"
                  v-bind:friendsTotalApp="user.friendsTotalApp" v-bind:preference="user.preference" v-bind:flagDisplayHot="user.flagDisplayHot" v-bind:matchs="user.matchs"  v-bind:friendsAll="friendsAll">
               </matchesRecordComponent>
            </ul>
            <div v-else>
               <reload></reload>
            </div>   
          </div>     
      </section>
   </div>
</template>
<script>
import Matchscomponent from '../components/Matchscomponent.vue';
import MatchesRecordComponent from '../components/MatchesRecordComponent.vue';
import UserComponent from '../components/UserComponent.vue';
import Reload from "../components/Reload.vue";
import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";

export default {
  name: "Notificatiob",
  props: ["name", "imagem", "option", "user_id", 'item', 'id', 'dataMatch'],
  components: {
    Matchscomponent,
    UserComponent,
    Reload,
    ReloadAuthorizedComponent,
    MatchesRecordComponent
  },
  data() {
    return {
      nomeProjeto: "Matcrs",
      profile: {},
      authorized: false,
      matchs: {},
      statusAPIAPP: false,
      idUserFbSession: null,
      friendsAll: [],
      users: [],
      matchs: []

    };
  },
  computed: {
    isMatch() {
        if(this.users.matchs){
            return true;         
        }else{
            return false;
        }
    }
  
  },
  methods: {    
    getApiRepetecoFriendsAll() {
      this.$http.get(`http://localhost:9096/wsrepeteco/friends`).then(response => {
          this.friendsAll = response.data
          if (this.friendsAll.length > 0) {
              console.log("API Repeteco AllFriends: OK!")
              this.statusAPIAPP = true;
          } else {
              this.statusAPIAPP = false;
              console.log("Erro na chamada da API - Repeteco");
          }
      })
    },
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
            vm.getApiRepetecoFriendsAll()
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
          FB.getLoginStatus(response => {
              vm.statusChangeCallback(response)
          })
      };
  }
};
</script>
<template >
   <div>
      <div v-if="!authorized">
         <ReloadAuthorizedComponent></ReloadAuthorizedComponent>
      </div>
      <div v-else id="ListFriends" class="ListFriends container">
         <div v-if="this.statusAPIAPP === true">
            <div id="searchClassification" class="container searchClassification navbar-fixed-top">
               <input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar..." class="fa fa-search">     
            </div>
            <div class="row container">
               <div  class="btnNotification" >
                  <profileHeaderComponent v-for="user in users" v-bind:key="user.id" v-bind:name="user.name" v-bind:imagem="user.imagem"
                     v-bind:link="user.link" v-bind:friendsTotalFb="user.friendsTotalFb" v-bind:friendsTotalApp="user.friendsTotalApp">
                  </profileHeaderComponent>
                  <div class="btn-group pull-right btnclassifications" role="group" aria-label="...">
                     <button type="button" class="btn btn-default active" v-tooltip.bottom-start="'Todos'" onclick="location.href='/classification'"><i class="fa fa-star-half-o"></i></button>
                     <button type="button" class="btn btn-default " v-tooltip.bottom-start="'Classificados'" onclick="location.href='classificationOn'" data-transition="slide"><i class="fa fa-star"> </i></button>
                     <button type="button" class="btn btn-default" v-tooltip.bottom-start="'Não Classificados'" onclick="location.href='/classificationOff'"><i class="fa fa-star-o"> </i></button>
                  </div>
               </div>
            </div>
            <div class="list-group center-block" id="searchUL">
               <userComponent v-bind:user="users" v-for="user in users" v-bind:key="user.id" v-bind:id_fb_users="user.id_fb_users" v-bind:name="user.name" v-bind:imagem="user.imagem"
                  v-bind:link="user.link" v-bind:friends="user.friends" v-bind:gender="user.gender" v-bind:friendsTotalFb="user.friendsTotalFb"
                  v-bind:friendsTotalApp="user.friendsTotalApp" v-bind:preference="user.preference" v-bind:flagDisplayHot="user.flagDisplayHot" v-bind:matchs="user.matchs">
               </userComponent>
            </div>
            <br>
            <reload v-if="this.users <= 0"></reload>
         </div>
         <div v-else>
            <reload></reload>
         </div>
      </div>
   </div>
</template>

<script>
import UserComponent from "../components/UserComponent.vue";
import Reload from "../components/Reload.vue";
import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";
import ProfileHeaderComponent from "../components/ProfileHeaderComponent.vue";
import Axios from 'axios';

export default {
  name: "ClassificationAPP",
  props: ["id", "id_fb_users", "name", "imagem", "preference", "link", "friends", "matchs", "userProfile"],
  components: {
      UserComponent,
      Reload,
      ReloadAuthorizedComponent,
      ProfileHeaderComponent
  },
  data() {
    return {
      nomeProjeto: "Classification",
      authorized: false,
      statusAPIAPP: false,
      users: {},
      ApiRepetecoStatus: false
    };
  },
  methods: {
    getApiRepeteco(userid) {
        this.$http.get(`http://localhost:9096/wsrepeteco/users/${userid}`).then(response => {
            this.users = [response.data]
            this.ApiRepetecoStatus = response.status;
            if (this.ApiRepetecoStatus === 200) {
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
        if (response.status === 'connected') {
        var idFb = response.authResponse.userID
            console.log("Usuario Autorizado!");
            console.log("Status: Connectado!")
            vm.authorized = true
            vm.getApiRepeteco(idFb)
        } else if (response.status === 'not_authorized') {
            console.log("Status: Não Autorizado!");
            vm.authorized = false
        } else if (response.status === 'unknown') {
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
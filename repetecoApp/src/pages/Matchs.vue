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
            <div class="btnNotification" role="group" >
               <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span> 
               <div class="btn-group pull-right">
                  <div v-show="matchs.length > 0">					        
                     <a href="/matchs" class="active" title="Todos" >Todos |</a> 
                     <a href="/matchsNew" title="Novos Matchs" >Novos Matchs |</a>  
                     <a href="/matchsOld" title="Flash Backs" >Flash Backs</a>
                  </div>
               </div>
            </div>
            <ul v-if="this.statusAPIAPP === true" class="list-group" id="searchUL">
               <matchscomponent v-bind:matchs="matchs"  v-for="matchs in matchs" v-bind:key="matchs.id" v-bind:id="matchs.id" v-bind:name="matchs.name" v-bind:imagem="matchs.imagem" v-bind:link="matchs.link" v-bind:gender="matchs.gender" v-bind:option="matchs.option" v-bind:id_fb_friends="matchs.id_fb_friends" v-bind:user_id="matchs.user_id" v-bind:dataMatch="matchs.dataMatch"></matchscomponent>
            </ul>
            <div v-else>
               <reload></reload>
            </div>
             <p v-if="matchs.length <= 0" class="text-center"></br>Você ainda não tem Matchs! ☹</p>
            </br>
            <!-- {{matchs}} -->
         </div>      
      </section>
   </div>
</template>
<script>
import Matchscomponent from '../components/Matchscomponent.vue';
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
    ReloadAuthorizedComponent
  },
  data() {
    return {
      nomeProjeto: "Matcrs",
      profile: {},
      authorized: false,
      matchs: {},
      statusAPIAPP: false,
      idUserFbSession: null
    };
  },
  computed: {
  //select distinct f2.name, f2.id_fb_friends, f1.user_id from friends f1, friends f2 WHERE f1.user_id=f2.id_fb_friends AND f1.id_fb_friends=1893438167339291
  },
  methods: {
    getApiRepetecoMatchs(userid) {
        this.$http.get(`http://localhost:9096/wsrepeteco/users/${userid}/matchs`).then(response => {
            this.matchs = response.data
            if (this.matchs.length >= 0) {
                console.log("API getApiRepetecoMatchs: OK!")
                this.statusAPIAPP = true;
            } else {
                this.statusAPIAPP = false;
                console.log("Erro na chamada da API - getApiRepetecoMatchs");
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
            vm.getApiRepetecoMatchs(idFb)
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
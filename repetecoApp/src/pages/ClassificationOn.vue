<template >
   <div>
      <div v-if="!authorized">
         <ReloadAuthorizedComponent></ReloadAuthorizedComponent>
      </div>
      <div v-else id="ListFriends" class="ListFriends container">
         <div id="searchClassification" class="container searchClassification navbar-fixed-top">
            <input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar...">
         </div>
         <div class="row container">
            <div class="btnNotification">
               <profileComponent :profile="profile"></profileComponent>
               <div class="btn-group pull-right" role="group" aria-label="...">
                  <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Todos" onclick="location.href='/classification'"><i class="fa fa-star-half-o"> </i></button>
                  <button type="button" class="btn btn-default active" data-toggle="tooltip" data-placement="bottom" title="Classificados" onclick="location.href='classificationOn'" data-transition="slide"><i class="fa fa-star"> </i></button>
                  <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Não Classificados" onclick="location.href='/classificationOff'"><i class="fa fa-star-o"> </i></button>
               </div>
            </div>
         </div>
         <div v-if="this.statusAPIAPP === true" class="list-group" id="searchUL">
            <userComponentOn v-bind:user="users" v-for="user in users" v-bind:key="user.id" v-bind:name="user.name" v-bind:imagem="user.imagem" v-bind:link="user.link" v-bind:friends="user.friends" v-bind:gender="user.gender" v-bind:friendsTotalFb="user.friendsTotalFb" v-bind:preference="user.preference"></userComponentOn>
         </div>
         <div v-else>
            <reload></reload>
         </div>
      </div>
   </div>
</template>
<script>
   import UserComponentOn from "../components/UserComponentOn.vue";
   import Reload from "../components/Reload.vue";
   import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";
   import ProfileComponent from "../components/ProfileComponent.vue";
   
   
   export default {
     name: "ClassificationOff",
     props: ["name", "imagem","friends"],
     components:{
       UserComponentOn,
       ProfileComponent,
       Reload,
       ReloadAuthorizedComponent
     },
     data () {
       return {
         nomeProjeto: "ClassificationOn",
         profile: {},
         authorized: false,
         users: {},
         statusAPIAPP: false
       };
     },
   methods: {
   //Facebook - API GET
   getFacebook (callbackGetApiRepeteco) {
       let vm = this
       FB.api('/me?fields=id,name,link,picture{url},friends{id}', function (response) {
         vm.$set(vm, 'profile', response)
          console.log("API Facebook: OK!")    
         let userid = response.id
         callbackGetApiRepeteco(userid)
       })    
     },
   //WsRepeteco - API GET
   getApiRepeteco(userid){
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
   statusChangeCallback (response) {
         let vm = this
         if (response.status === 'connected') {
           console.log("Usuario Autorizado!");
           vm.authorized = true
           //Chamada API Facebok e Repeteco
           vm.getFacebook(vm.getApiRepeteco)
           console.log("Status: Connectado!")
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
   mounted () {
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
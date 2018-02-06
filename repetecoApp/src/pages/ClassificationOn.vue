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
               <userProfile :profile="profile"></userProfile>
               <div class="btn-group pull-right" role="group" aria-label="...">
                  <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Todos" onclick="location.href='/classification'"><i class="fa fa-star-half-o"> </i></button>
                  <button type="button" class="btn btn-default active" data-toggle="tooltip" data-placement="bottom" title="Classificados" onclick="location.href='classificationOn'" data-transition="slide"><i class="fa fa-star"> </i></button>
                  <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Não Classificados" onclick="location.href='/classificationOff'"><i class="fa fa-star-o"> </i></button>
               </div>
            </div>
         </div>
         <div v-if="this.users != null" class="list-group" id="searchUL">
            <userOn v-bind:user="users" v-for="user in users" v-bind:key="user.id" v-bind:name="user.name" v-bind:imagem="user.imagem" v-bind:link="user.link" v-bind:friends="user.friends" v-bind:gender="user.gender" v-bind:friendsTotalFb="user.friendsTotalFb"></userOn>
         </div>
         <div v-else>
            <reload></reload>
         </div>
      </div>
   </div>
</template>
<script>
   import UserOn from "../components/UserOn.vue";
   import UserProfile from "../components/UserProfile.vue";
   import Reload from "../components/Reload.vue";
   import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";
   
   export default {
     name: "ClassificationOff",
     props: ["name", "imagem","friends"],
     components:{
       UserOn,
       UserProfile,
       Reload,
       ReloadAuthorizedComponent
     },
     data () {
       return {
         nomeProjeto: "ClassificationOn",
         profile: {},
         authorized: false,
         users: {}
       };
     },
   methods: {
   //Facebook - API GET
   getFacebook (callback) {
       let vm = this
       FB.api('/me?fields=id,name,link,picture{url},friends{id}', function (response) {
         vm.$set(vm, 'profile', response)
         console.log("API Facebook: ",response);     
         let userid = response.id
         callback(response.id)
       })    
     },
   //WsRepeteco - API GET
   getApiRepeteco(profileId){
   this.$http.get(`http://localhost:9096/wsrepeteco/users/${profileId}`).then(response => {   
       this.users = [response.data]
       console.log("API APP",this.users)
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
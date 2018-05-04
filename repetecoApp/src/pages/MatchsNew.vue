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
                  <div>					        
                     <a href="/matchs" title="Todos" >Todos |</a> 
                     <a href="/matchsNew" title="Novos Matchs" >Novos Matchs |</a>  
                     <a href="/matchsOld" title="Flash Backs" >Flash Backs</a>
                  </div>
               </div>
            </div>
            <matchNewComponent v-bind:matchs="users.matchs" v-for="matchs in users.matchs" v-bind:key="matchs.id" v-bind:id="matchs.id"
                v-bind:name="matchs.name" v-bind:imagem="matchs.imagem" v-bind:link="matchs.link" v-bind:gender="matchs.gender"
                v-bind:option="matchs.option" v-bind:id_fb_friends="matchs.id_fb_friends" v-bind:user_id="matchs.user_id"
                v-bind:dataMatch="matchs.dataMatch" v-bind:userName="users.name" v-bind:userLink="users.link" v-bind:userImagem="users.imagem" v-bind:read="matchs.read"> 
            </matchNewComponent>
            <div v-if="isMatch == false">
                <br><p class="text-center">Você ainda não tem Matchs! ☹</p>
            </div>
            <br>
         </div>
      </section>
   </div>
</template>
<script>
   import MatchNewComponent from '../components/MatchNewComponent.vue';
   import axios from 'axios';
   import Reload from "../components/Reload.vue";
   import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";
   
   export default{
     name: "NotificationNewMatch",
     props: ["name", "imagem", "option","user_id","link", "matchs", "friends"],
     components:{
   	    MatchNewComponent,
        Reload,
        ReloadAuthorizedComponent,
        axios
     },
     data () {
       return {
         authorized: false,
         statusAPIAPP: false,
         idUserFbSession: null,
         users: [],
         matchsData: [],
         ApiRepetecoStatus: false
       };
     },
  computed: {
    isMatch() {
        if(this.users.matchs){
            return true;      
        }else{
            return false;
        }
    },
    contMatchNewMatch() {
        let listData = this.users;
        let litrs =[];           
        let list = [];
            for (let i = 0; i < this.listData.length; i++) {
                if(this.listData[i].option === 'ficaria'){
                    list = {option: this.listData[i].option}
                    litrs.push(list)
                    }
                }
        return litrs.length
    }

  },
  methods: {
   getApiRepeteco(userid){
   		this.$http.get(`http://localhost:9096/wsrepeteco/users/${userid}`).then(response => {
        this.ApiRepetecoStatus = response.status			
         if (this.ApiRepetecoStatus === 200) {
            this.users = response.data
            this.statusAPIAPP = true;
            console.log("API Repeteco: OK!")
         } else {
           this.statusAPIAPP = false;
           this.users = 0;
           console.log("Erro na chamada da API - Repeteco");
         }    
       })
   	},
   statusChangeCallback (response) {
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
   mounted () {
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
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
                     <a href="/notification" class="active" title="Todos" ><i class="glyphicon glyphicon-bell"> </i>Todos</a> |
                     <a href="/notificationNewMatch" title="Novos Matchs" >Novos Matchs</a> | 
                     <a href="/notificationOldMatch" title="Flash Backs" >Flash Backs</a>
                  </div>
               </div>
            </div>
            <ul v-if="this.statusAPIAPP === true" class="list-group" id="searchUL">
               <notificationNewMatchComponent v-bind:friend="matchsList" v-for="friend in matchsList" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem" v-bind:link="friend.link" v-bind:gender="friend.gender" v-bind:option="friend.option" v-bind:id_fb_friends="friend.id_fb_friends" v-bind:user_id="friend.user_id" v-bind:friendsAll="friendsAll"></notificationNewMatchComponent>
            </ul>
            <div v-else>
               <reload></reload>
            </div>
              <p v-if="contMatchNewMatch <= 0"class="text-center"></br>Você ainda não tem Match! ☹</p>
            </br>
         </div>
      </section>
   </div>
</template>
<script>
   import NotificationNewMatchComponent from '../components/NotificationNewMatchComponent.vue';
   import UserComponent from '../components/UserComponent.vue';
   import Reload from "../components/Reload.vue";
   import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";
   
   export default{
     name: "NotificationNewMatch",
     props: ["name", "imagem", "option","user_id"],
     components:{
   		NotificationNewMatchComponent,
       UserComponent,
       Reload,
       ReloadAuthorizedComponent
     },
     data () {
       return {
         nomeProjeto: "NotificationNewMatch",
         profile: {},
         authorized: false,
         friends: {},
         friendsAll: {},
         statusAPIAPP: false,
         idUserFbSession: null
       };
     },
  computed: {
    matchsList (){
        //myMatch - return list: id_fb_friends
        let fdlist = this.friends;
        let friendslist = [];
        let listFB = null;
        for (let i = 0; i < fdlist.length; i++) {
            listFB = {
                name: fdlist[i].name,
                id_fb_friends: fdlist[i].id_fb_friends,
                user_id: fdlist[i].user_id,
                option: fdlist[i].option,
                link: fdlist[i].link,
                imagem: fdlist[i].imagem
            }
            if (fdlist[i].option === 'ficaria' || fdlist[i].option === 'ficariaNovamente') {
                friendslist.push(listFB)
            }
        }
        //youMatchs - return list: user_id
        let fdlistAll = this.friendsAll;
        let friendslistAll = [];
        let listFbAll = null;
        for (let i = 0; i < fdlistAll.length; i++) {
            listFbAll = {
                user_id: (fdlistAll[i].user_id).toString(),
                option: fdlistAll[i].option
            }
            if ((fdlistAll[i].option === 'ficaria' || fdlistAll[i].option === 'ficariaNovamente') && fdlistAll[i].id_fb_friends === this.idUserFbSession) {
                friendslistAll.push(listFbAll)
            }
        }
        //Match myMatch + you Match
        var matchs = [];
        var listMy = friendslist;
        var listYou = friendslistAll;
        listMy.forEach(
            function myfunction(my){
                listYou.forEach(
                    function youFunction(you){
                        if(my.id_fb_friends === you.user_id && my.option === you.option){
                            matchs.push(my);
                        }
                    }
                )     
            }
        )
        return matchs;
    },
    contMatchNewMatch() { 
        let litrs =[];           
        let list = [];
            for (let i = 0; i < this.matchsList.length; i++) {
                if(this.matchsList[i].option === 'ficaria'){
                    list = {option: this.matchsList[i].option}
                    litrs.push(list)
                    }
                }
        return litrs.length           
    }
  },
  methods: {
   getApiRepeteco(userid){
   			this.$http.get(`http://localhost:9096/wsrepeteco/users/${userid}/friends`).then(response => {				
         this.friends = response.data
         if (this.friends.length > 0) {
           console.log("API Repeteco: OK!")
           this.statusAPIAPP = true;
         } else {
           this.statusAPIAPP = false;
           console.log("Erro na chamada da API - Repeteco");
         }    
       })
   	},
     //usado para extrair o id dos amigos que deram match!
    getApiRepetecoFriendsAll() {
        this.$http.get(`http://localhost:9096/wsrepeteco/friends`).then(response => {
            this.friendsAll = response.data
            if (this.friendsAll.length > 0) {
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
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
               <notificationcomponet v-bind:friend="friends"  v-for="friend in friends" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem" v-bind:link="friend.link" v-bind:gender="friend.gender" v-bind:option="friend.option" v-bind:id_fb_friends="friend.id_fb_friends" v-bind:user_id="friend.user_id" v-bind:friendsAll="friendsAll"></notificationcomponet>
            </ul>
            <div v-else>
               <reload></reload>
            </div>
            </br>
         </div>         
        </br></br></br></br></br></br></br>
                Retorno: {{matchsList}}
        </br></br></br></br></br></br></br>
      </section>
   </div>
</template>
<script>
import Notificationcomponet from '../components/Notificationcomponet.vue';
import UserComponent from '../components/UserComponent.vue';
import Reload from "../components/Reload.vue";
import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";

export default {
  name: "Notificatiob",
  props: ["name", "imagem", "option", "user_id", 'item'],
  components: {
    Notificationcomponet,
    UserComponent,
    Reload,
    ReloadAuthorizedComponent
  },
  data() {
    return {
      nomeProjeto: "Notification",
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
                option: fdlist[i].option
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
                user_id: fdlistAll[i].user_id,
                option: fdlistAll[i].option
            }
            if ((fdlistAll[i].option === 'ficaria' || fdlistAll[i].option === 'ficariaNovamente') && fdlistAll[i].id_fb_friends === this.idUserFbSession) {
                friendslistAll.push(listFbAll)
            }
        }
        //Comparação das duas listas - Return:
        //Ex listMy:  [ { "name": "Angela Caroline", "id_fb_friends": "1873066066343179", "user_id": 1893438167339291, "option": "ficariaNovamente" }, { "name": "Edgard Barbosa", "id_fb_friends": "1341014052712069", "user_id": 1893438167339291, "option": "ficariaNovamente" }, { "name": "Arioston Jaerger", "id_fb_friends": "1768258099913370", "user_id": 1893438167339291, "option": "ficaria" }, { "name": "Usuario Antigo", "id_fb_friends": "1952913858311706", "user_id": 1893438167339291, "option": "ficaria" } ] 
        //Ex listYou: [ { "user_id": 1873066066343179, "option": "ficariaNovamente" }, { "user_id": 1952913858311706, "option": "ficaria" } ] 
        //WHERE listMy.id_fb_friends = listYou.user_id && listMy.option = listYou.option
        var matchs = [];
        var listMy = friendslist;
        var listYou = friendslistAll;        

        return listYou
    }
    //select distinct f2.name, f2.id_fb_friends, f1.user_id from friends f1, friends f2 WHERE f1.user_id=f2.id_fb_friends AND f1.id_fb_friends=1893438167339291
  },
  methods: {
    getApiRepeteco(userid) {
        this.$http.get(`http://localhost:9096/wsrepeteco/notification/${userid}/friends`).then(response => {
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
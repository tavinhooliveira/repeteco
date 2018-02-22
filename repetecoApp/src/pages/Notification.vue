<template>
<div>
  <section>
      <div v-if="!authorized">
        <ReloadAuthorizedComponent></ReloadAuthorizedComponent>
      </div>
			<div v-else  id="ListFriends" class="ListFriends container notification">
      <!--Search -->
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
        <div v-else><reload></reload></div>        
        </br>
			</div>
      </br>
      <!--
      <div class="well">
        id dos usuarios que me curtiram       
        <div v-for="item in friendsAll">
            <div v-if="(item.option === 'ficaria' || item.option === 'ficariaNovamente') && item.id_fb_friends === idUserFbSession">
              User_id: {{ item.user_id}}
            </div>
        </div>
      </div>
      --> 
		</section>
</div>	
</template>

<script>
import Notificationcomponet from '../components/Notificationcomponet.vue';
import UserComponent from '../components/UserComponent.vue';
import Reload from "../components/Reload.vue";
import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";

export default{
  name: "Notificatiob",
  props: ["name", "imagem", "option", "user_id", 'item'],
  components:{
		Notificationcomponet,
		UserComponent,
    Reload,
    ReloadAuthorizedComponent
  },
  data () {
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
methods: {
getApiRepeteco(userid){
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
  getApiRepetecoFriendsAll(){
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

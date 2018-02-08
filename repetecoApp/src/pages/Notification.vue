<template>
<div>
  <section>
			<div class="text-center" v-if="!authorized">
        <br><br><br>
        <section class="error-message ">
          <img src="/src/assets/img/loading.gif" style='height: 90px; width: 90px; border-radius: 100px; border: 2px solid rgba(73, 158, 223, 0.144)'/>
          <br><br>
          <h5 class="error-description text-danger">not authorized</h5>
          <a class="error-link" onclick="location.href='/'">login</a>
        </section>
      </div>

			<div v-else  id="ListFriends" class="ListFriends container notification">
      <!--Search -->
 			<div id="searchClassification" class="container searchClassification navbar-fixed-top">
			 	<input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar...">
			</div>

				<div 	 class="btnNotification" role="group" >
					<span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span> 
					<div class="btn-group pull-right" role="group">
					      <div class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					        <i class="glyphicon glyphicon-bell"></i>
					        <span class="caret"></span>
					      </div>
								<ul class="dropdown-menu">                
									<li><a onclick="location.href='/notificationNewMatch'" data-transition="slide">Novo Lance</a></li>
									<li><a onclick="location.href='/notificationOldMatch'">Flash Back</a></li>
									<li role="separator" class="divider"></li>
									<li><a onclick="location.href='/notification'">Todos</a></li>
								</ul>
					</div>				   
			  </div>
				<ul class="list-group" id="searchUL">
          <notificationcomponet v-bind:friend="friends" v-for="friend in friends" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem" v-bind:link="friend.link" v-bind:gender="friend.gender" v-bind:option="friend.option" v-bind:user_id="friend.user_id"></notificationcomponet>
				</ul>
			</div>
		</section>
</div>	
</template>

<script>

import Notificationcomponet from '../components/Notificationcomponet.vue';
import UserComponet from '../components/UserComponet.vue';
import UserProfile from "../components/UserProfile.vue";
import Reload from "../components/Reload.vue";
import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";


export default{
  name: "Notificatiob",
  props: ["name", "imagem", "option", "user_id"],
  components:{
		Notificationcomponet,
		UserComponet,
		UserProfile,
    Reload,
    ReloadAuthorizedComponent
  },
  data () {
    return {
      nomeProjeto: "Notification",
      profile: {},
			authorized: false,
      friends: {},
      statusAPIAPP: false
    };
	},
methods: {
//Facebook - API GET
getFacebook (callback) {
    let vm = this
    FB.api('/me?fields=id,name,link,picture{url},friends{id}', function (response) {
      vm.$set(vm, 'profile', response)
      console.log("API Facebook: OK!");     
      let userid = response.id
      callback(response.id)
    })    
  },
//WsRepeteco - API GET
getApiRepeteco(profileId){
			this.$http.get(`http://localhost:9096/wsrepeteco/users/${profileId}/friends`).then(response => {				
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

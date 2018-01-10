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
					<userid v-for="usersid in users" v-if="usersid.id_fb_users === profile.id" v-bind:key="usersid.id" v-bind:id="usersid.id" v-bind:city="usersid.city" v-bind:name="usersid.name" v-bind:imagem="usersid.imagem" v-bind:link="usersid.link" v-bind:id_fb_users="usersid.id_fb_users" v-bind:friendsTotalFb="usersid.friendsTotalFb"  v-bind:friends="usersid.friends"></userid>													
				</ul>

			</div>
		</section>
</div>	
</template>

<script>

import Notification from '../components/Notification.vue';
import UserComponet from '../components/UserComponet.vue';
import UserProfile from '../components/UserProfile.vue';
import Profileinfo from '../components/Profileinfo.vue';
import Userid from '../components/Userid.vue';


export default{
	name: 'app',
  props:['name','imagem','link','option','friends'],
  components:{
		Notification,
		UserComponet,
		UserProfile,
		Profileinfo,
		Userid
  },
  created(){

  },
  data () {
    return {
      nomeProjeto: 'Notification',
			users:[],
			profile: [],
			authorized: false,
			

    }
	},
methods: {
//Facebook - Begin
getApiRepeteco(){
this.$http.get("http://localhost:9096/wsrepeteco/users").then(res => {
      if (res.body.length > 0) {
        return (this.users = res.body);
      } else {
        console.log("Erro na chamada da API - Repeteco");
      }
    });
},
getFacebook () {
    let vm = this
    FB.api('/me?fields=id,name,link,email,gender,location,picture{url},friends{id,name,link,email,gender,picture{url}}', function (response) {
      vm.$set(vm, 'profile', response)
      console.log(response);     
    })
	},
statusChangeCallback (response) {
      let vm = this
      if (response.status === 'connected') {
        console.log("Usuario Autorizado!");
        console.log("API Facebook! - Ok");
        console.log("API Repeteco! - Ok");
        vm.authorized = true
        //Chamada API Facebok e Repeteco
        vm.getFacebook()
				vm.getApiRepeteco()
        console.log("Connectado")
      } else if (response.status === 'not_authorized') {
        console.log("Não Autorizado!");
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

}
</script>

<style lang="scss">

</style>
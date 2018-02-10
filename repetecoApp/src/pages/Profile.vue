<template>
<div>
<div class="text-center" v-if="!authorized">
<br><br><br>
  <section class="error-message ">
    <img src="/src/assets/img/loading.gif" style='height: 90px; width: 90px; border-radius: 100px; border: 2px solid rgba(73, 158, 223, 0.144)'/>
    <br><br>
    <h5 class="error-description text-danger">not authorized</h5>
    <a class="error-link" onclick="location.href='/'">login</a>
  </section>
</div>
<div v-if="this.statusAPIAPP === true">
	<section>
	<perfilComponent v-for="profileinfo in users" v-bind:key="profileinfo.id" v-bind:id="profileinfo.id" v-bind:city="profileinfo.city" v-bind:name="profileinfo.name" v-bind:imagem="profileinfo.imagem" v-bind:link="profileinfo.link" v-bind:id_fb_users="profileinfo.id_fb_users" v-bind:friendsTotalFb="profileinfo.friendsTotalFb" v-bind:friendsTotalApp="profileinfo.friendsTotalApp" v-bind:friends="profileinfo.friends"></perfilComponent>
        
  </section>
</div>
<div v-else><reload></reload></div> 
</div>
</template>

<script>
import PerfilComponent from '../components/PerfilComponent.vue';
import UserComponent from '../components/UserComponent.vue';
import FriendComponent from '../components/FriendComponent.vue';
import RecentFriends from '../components/RecentFriends.vue';
import Reload from '../components/Reload.vue';


export default {
  name: 'app',
  props:['id','name','imagem','link','friends', 'city', 'id_fb_users'],
  components:{
    PerfilComponent,
    FriendComponent,
    RecentFriends,
    UserComponent,
    Reload
  },
  data () {
    return {
      nomeProjeto: 'Perfil',
      users:[],
      profile: [],
      authorized: false,
      statusAPIAPP: false
      
    }
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

<style lang="scss">

</style>

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
<div>
	<section>
		<profileinfo v-for="profileinfo in users" v-if="profileinfo.id_fb_users === profile.id" v-bind:key="profileinfo.id" v-bind:id="profileinfo.id" v-bind:city="profileinfo.city" v-bind:name="profileinfo.name" v-bind:imagem="profileinfo.imagem" v-bind:link="profileinfo.link" v-bind:id_fb_users="profileinfo.id_fb_users" v-bind:friendsTotalFb="profileinfo.friendsTotalFb" v-bind:friendsTotalApp="profileinfo.friendsTotalApp" v-bind:friends="profileinfo.friends"></profileinfo>
  </section>
</div>
</div>
</template>

<script>
import Profileinfo from '../components/Profileinfo.vue';
import UserComponent from '../components/UserComponent.vue';
import FriendComponent from '../components/FriendComponent.vue';
import RecentFriends from '../components/RecentFriends.vue';
import Reload from '../components/Reload.vue';


export default {
  name: 'app',
  props:['name','imagem','link','friends', 'city', 'id_fb_users'],
  components:{
    Profileinfo,
    FriendComponent,
    RecentFriends,
    UserComponent,
    Reload
  },
  created(){
  },
  data () {
    return {
      nomeProjeto: 'Perfil',
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
    FB.api('/me?fields=id,name,link,email,gender,location,picture{url},friends{id,name,link,email,gender,picture.type(large)}', function (response) {
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

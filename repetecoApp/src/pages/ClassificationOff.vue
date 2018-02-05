<template >
<div v-if="!authorized">
  <section class="error-message ">
    <img src="/src/assets/img/loading.gif" style='height: 90px; width: 90px; border-radius: 100px; border: 2px solid rgba(73, 158, 223, 0.144)'/>
    <h5 class="error-description text-danger">Verificando Autorização...</h5>
    <a class="error-link" onclick="location.href='/'">login</a>
  </section>
</div>
<!--List Friends -->
<div v-else id="ListFriends" class="ListFriends container">
    <div id="searchClassification" class="container searchClassification navbar-fixed-top">
      <input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar...">
    </div>
    <div class="row container">
      <div class="btnNotification" role="group">
         <userProfile :profile="profile"></userProfile>
          <div class="btn-group pull-right" role="group" aria-label="...">
            <button type="button" class="btn btn-default" onclick="location.href='/classification'"><i class="fa fa-star-half-o"> </i></button>
            <button type="button" class="btn btn-default" onclick="location.href='classificationOn'" data-transition="slide"><i class="fa fa-star"> </i></button>
            <button type="button" class="btn btn-default active" onclick="location.href='/classificationOff'"><i class="fa fa-star-o"> </i></button>
          </div>          
      </div>      
    </div> 
    <ul v-if="this.users.length != 0" class="list-group" id="searchUL">
      <userOff v-for="user in users" v-if="user.id_fb_users === profile.id" v-bind:key="user.id" v-bind:name="user.name" v-bind:imagem="user.imagem" v-bind:link="user.link" v-bind:preference="user.preference" v-bind:friends="user.friends"></userOff>
    </ul>
    <p v-else><reload></reload></p>
</div>
</template>

<script>

import UserOff from '../components/UserOff.vue';
import Reload from "../components/Reload.vue";
import UserProfile from "../components/UserProfile.vue";

export default {
  name: 'app',
  props:['name','imagem','link','friends'],
  components:{
    UserOff,
    Reload,
    UserProfile
  },
    beforeCreate(){
    console.log('beforeCreate');
  },
  created(){
  },
  beforeMount(){
    console.log('beforeMount');
  },
  data () {
    return {
      nomeProjeto: 'Social Classification',
      intervalo:null,
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

/*Css Para Error*/
.error-message { text-align: center; margin-top: 60px;}
.error-code {margin: 0; color: #979797; font-size: 7.8rem; line-height: .9em;}
a{color: #5ba4e5; text-decoration: none; margin-top: 100px;}
.links{margin-top: 50px;}
.links a{ padding-left: 10px;}

.error-message img{width: 320px; height: 210px;}
/*Css Para Error - END*/

.classificationTrue {display: none}
</style>

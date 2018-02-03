<template >
<div>
<div v-if="!authorized">
  <section class="error-message ">
    <img src="/src/assets/img/loading.gif" style='height: 90px; width: 90px; border-radius: 100px; border: 2px solid rgba(73, 158, 223, 0.144)'/>
    <h5 class="error-description text-danger">not authorized</h5>
    <a class="error-link" onclick="location.href='/'">login</a>
  </section>
</div>
<div v-else id="ListFriends" class="ListFriends container">
    <div id="searchClassification" class="container searchClassification navbar-fixed-top">
      <input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar...">      
    </div>
    <div class="row container">
      <div class="btnNotification" >
            <userProfile :profile="profile"></userProfile>      
          <div class="btn-group pull-right" role="group" aria-label="...">
            <button type="button" class="btn btn-default active" data-toggle="tooltip" data-placement="bottom" title="Todos" onclick="location.href='/classification'"><i class="fa fa-star-half-o"> </i></button>
            <button type="button" class="btn btn-default " data-toggle="tooltip" data-placement="bottom" title="Classificados" onclick="location.href='classificationOn'" data-transition="slide"><i class="fa fa-star"> </i></button>
            <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Não Classificados" onclick="location.href='/classificationOff'"><i class="fa fa-star-o"> </i></button>
          </div>          
      </div>     
    </div> 
    <div v-if="this.users != null" class="list-group" id="searchUL">
      <userComponet v-bind:user="users" v-for="user in users" v-bind:key="user.id" v-bind:name="user.name" v-bind:imagem="user.imagem" v-bind:link="user.link" v-bind:friends="user.friends" v-bind:gender="user.gender" v-bind:friendsTotalFb="user.friendsTotalFb"></userComponet>
    </div>
    <div v-else><reload></reload></div>    
    <!--<input type="text" name="profile" value="1893438167339291" id="profile" v-model="profile.id">-->

</div>
</div>
</template>

<script>
import UserComponet from "../components/UserComponet.vue";
import UserProfile from "../components/UserProfile.vue";
import Reload from "../components/Reload.vue";

export default {
  name: "ClassificationAPP",
  props: ["name", "imagem","friends"],
  components: {
    UserComponet,
    UserProfile,
    Reload
  },
  beforeCreate() {
  },
 created() {

  },
  beforeMount() {
  },
  data() {
    return {
      nomeProjeto: "Classification",
      profile: {},
      authorized: false,
      users: {}
    };
  },
methods: {
//Facebook - API GET
getFacebook () {
    let vm = this
    FB.api('/me?fields=id,name,link,email,gender,location,picture{url},friends{id,name,link,email,gender,picture{url}}', function (response) {
      vm.$set(vm, 'profile', response)
      console.log("API Facebook: ",response);     
      let userid = response.id
      console.log("teste", userid)
    })    
  },
//WsRepeteco - API GET
getApiRepeteco(){
//id: 1893438167339291
var userid = 1893438167339291;
this.$http.get("http://localhost:9096/wsrepeteco/users/"+userid).then(response => {   
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
        vm.getFacebook()
        vm.getApiRepeteco()
        console.log("Status: Connectado")
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

.btnLoginFb {
    margin-bottom: -28px;
    padding-top: 14px;
    }
/*Css Para Error*/
.error-message {
  text-align: center;
  margin-top: 60px;
}
.error-code {
  margin: 0;
  color: #979797;
  font-size: 7.8rem;
  line-height: 0.9em;
}
a {
  color: #5ba4e5;
  text-decoration: none;
  margin-top: 100px;
}
.links {
  margin-top: 50px;
}
.links a {
  padding-left: 10px;
}

.error-message img {
  width: 320px;
  height: 210px;
}
/*Css Para Error - END*/
</style>

<template>
<div>
<!--Login-->
<section>
    <div class="container" id="logar">
        <div class="row col-md-6 col-md-offset-3">
            <div v-if="!authorized" class="well text-center">
                <div><img src="/src/assets/img/repeteco.png" style='height: 100px; width: 100px;'>
                </div>
                <h3>Vamos La!</h3>
                <h6>Para Entar! é Obrigatório o login no Facebook!</h6>
                <div class="">
                    <div class="col-2">
                        <button type="button" class="btn btn-primary" @click="login">Login Facebook</button>                        
                    </div>

                </div>
            </div>
            <div v-else class="well text-center">
                <div>
                  <img :src="profilePicture" style='height: 100px; width: 100px; border-radius: 75px; border: 2px solid rgba(73, 158, 223, 0.144)'>
                </div>
                <div>
                  <a v-bind:href="profile.link" target="_blank">{{profile.name}}</a>                  
                </div>
                <br>     
                <div class="well">
                    <h3><i class="fa fa-star">Pronto!</i></h3>
                    <h6>Você tem <b v-html="totalFriendsApp"></b> amigos no APP de <b>{{profile.friends.summary.total_count}}</b> no facebook!</h6>
                    <h6>Agora é só Classificar Seus Amigos!</h6>
                    <p onclick="location.href='/classification'" class="btn btn-success">Classificar</p><br>
                </div>
            </div>
            <div class="row col-md-6 text-center classificationInfo container">
                <a class="btn btn-default fa fa-question-circle" role="button" data-toggle="collapse" href="#collapseclassificationInfo" aria-expanded="false" aria-controls="collapseclassificationInfo">
                    <span>Como Funciona</span>
                </a>
                <a v-show="authorized"  class="btn btn-default fa fa-sign-out" @click="logout">Logout</a>
                <div class="collapse" id="collapseclassificationInfo">
                    <div class="">
                    <img src="/src/assets/img/info1.png">						   
                    </div>
                </div>						
            </div>
        </div>				
    </div>
</section>
<br>
</div>
</template>

<script>

import UserProfile from "../components/UserProfile.vue";

export default {
name: 'login',
components: {
  UserProfile
},
data () {
  return {
    profile: {},
    authorized: false,
    users: null,
    data: [],
    summary: []    
  }
},
computed: {
  profilePicture () {
    return (this.profile.id) ? `https://graph.facebook.com/${this.profile.id}/picture?width=300` : `/src/assets/img/loading.gif`
  },
  totalFriendsApp () {
    if(this.profile.id){
      var f =  this.profile.friends.data.length;
      return f;
      }
    return 0;
    },
    
},
methods: {
  //Facebook - Begin
  getFacebook () {
  let vm = this
    FB.api('/me?fields=id,name,link,email,gender,location,locale,picture{url},friends{id,name,link,email,gender,location,locale,picture{url}}', function (response) {
      vm.$set(vm, 'profile', response)
        //De-Para FB Users
        let users = null;
        users = {
          id: response.id,
          name: response.name,
          id_fb_users: response.id,
          link: response.link,
          email:  response.email,
          gender: response.gender,
          imagem: response.picture.data.url,
          city: response.locale,
          nationality: response.locale,
          preference: "null",
          friendsTotalFb: response.friends.summary.total_count,
          friendsTotalApp: response.friends.data.length
        }
        //id do usuario logado
        let userid = response.id
        //lista de Amigos
        let fdlist = response.friends.data
        let friendslist = [];
        let listFB = null;             
        for (let i = 0; i < fdlist.length; i++) {
          listFB = {
            id: fdlist[i].id,
            id_fb_friends: fdlist[i].id,
            name: fdlist[i].name,
            link: fdlist[i].link,
            gender: fdlist[i].gender,
            imagem: fdlist[i].picture.data.url
          }          
          friendslist.push(listFB)           
          }        
        //logs
        console.log("API-FB",response);
        console.log("API-RP-Users",users);
        console.log("API-RP-Friends",friendslist);        
        //Inserir User Na Basse Via Ajax
        $.ajax({
          url: "http://localhost:9096/wsrepeteco/users",
          method: "POST",
          headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json'
          },
          dataType: 'json',
          crossDomain : true,
          origin: "*",
          processData: false,
          data: JSON.stringify(users)
        });

        //Inserir Friends Na Basse Via Ajax
        $.ajax({
          url: "http://localhost:9096/wsrepeteco/users/"+userid+"/friends",
          method: "POST",
          headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json'
          },
          dataType: 'json',
          crossDomain : true,
          origin: "*",
          processData: true,
          data: JSON.stringify(friendslist)
        });

    })
  },  
  login () {
    let vm = this
    FB.login(function (response) {
        vm.statusChangeCallback(response)
    }, {
      scope: 'public_profile, email, user_friends',
      return_scopes: true
    })
  },
  logout () {
    let vm = this
    FB.logout(function (response) {
      vm.statusChangeCallback(response)
      console.log("logout Efetuado")
    })
  },
  statusChangeCallback (response) {
    let vm = this
    if (response.status === 'connected') {
      console.log("Usuario Autorizado!");
      console.log("API Facebook! - Ok");
      vm.authorized = true
      //Chamada API Facebok e Repeteco
      vm.getFacebook()
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
  // facebook
  window.fbAsyncInit = function() {
    FB.init({
      appId: '175578203007671',
      cookie: true,
      xfbml: true,
      version: 'v2.10'
    });
    FB.AppEvents.logPageView();
    // Get FB Login Status
    FB.getLoginStatus(response => {
      vm.statusChangeCallback(response)
    })
  };
}
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  cursor: pointer;
}
</style>

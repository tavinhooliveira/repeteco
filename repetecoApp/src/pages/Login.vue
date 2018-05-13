<template>
   <div>
      <section>
         <div class="container" id="logar">
            <div class="row col-md-6 col-md-offset-3 ">
               <div v-if="!authorized" class="well_b text-center">
                  <div><img src="/src/assets/img/repeteco.png" style='height: 100px; width: 100px;'>
                  </div>
                  <h3 class="titleh3">Vamos La!</h3>
                  <h6 class="titleh6">Para Entar! é Obrigatório o login no Facebook!</h6>
                  <div class="">
                     <div class="col-2">
                        <button type="button" class="btn btn-primary" @click="login"><b> f    </b>Login Facebook</button>                        
                     </div>
                  </div>
                  <h6>Ao entrar, você concorda com os nossos <a href="/termos">Termos</a> e <a href="/politicas">Politica de Privacidade.</a></h6>
               </div>
               <div v-else class="well_b text-center">
                  <div>
                     <img :src="profilePicture" style='height: 100px; width: 100px; border-radius: 75px; border: 2px solid rgba(73, 158, 223, 0.144)'>
                  </div>                  
                  <div>
                     <a v-bind:href="profile.link" v-tooltip.bottom-start="'Perfil Facebook'" target="_blank">{{profile.name}}</a>                  
                  </div>
                  <br>     
                  <div class="">
                     <h3><i class="fa fa-star">Pronto!</i></h3>
                     <h6>Você tem <b v-html="totalFriendsApp"></b> amigos no APP de <b v-html="totalFriendsFB"></b> no facebook!</h6>
                     <h6>Agora é só Classificar Seus Amigos!</h6>
                     <br>
                     <a href="/classification"  class="btn btn-success" >Entrar <span id="iconEntrar" class="glyphicon glyphicon-log-in"></span></a>
                  </div>
               </div><br>
               <div class="row col-md-6 text-center classificationInfo container">
                  <a class="btn btn-default " role="button" data-toggle="collapse" href="#collapseclassificationInfo" aria-expanded="false" aria-controls="collapseclassificationInfo">
                  <span>Como Funciona <i class="fa fa-question-circle"></i></span>
                  </a>
                  <a v-show="authorized"  class="btn btn-default " @click="logout">Logout
                  <i class="fa fa-sign-out"></i>
                  </a>
                  <br>
                  <div class="well collapse" id="collapseclassificationInfo">
                     <aboutComponent></aboutComponent>
                  </div>
                  <br>
                    <carroselLoginComponet></carroselLoginComponet>
                  <br><br>
               </div>
            </div>
         </div>
      </section>
      <br>
   </div>
</template>

<script>
import ProfileHeaderComponent from "../components/ProfileHeaderComponent.vue";
import CarroselLoginComponet from "../components/CarroselLoginComponet.vue";
import AboutComponent from "../components/AboutComponent.vue";

export default {
  name: 'login',
  components: {
    ProfileHeaderComponent,
    CarroselLoginComponet,
    AboutComponent
  },
  data() {
    return {
      profile: {},
      authorized: false,
      users: null,
      data: [],
      summary: []
    }
  },
  computed: {
    profilePicture() {
      return (this.profile.id) ? this.profile.picture.data.url : `/src/assets/img/loading3.gif`
    },
    totalFriendsApp() {
      if (this.profile.id) {
        var f = this.profile.friends.data.length;
        return f;
      }
    return 0;
    },
    totalFriendsFB() {
      if (this.profile.id) {
        var f = this.profile.friends.summary.total_count;
        return f;
      }
    return 0;
    }
  },
  methods: {
    //Facebook - Begin
    getFacebook() {
      let vm = this
      FB.api('/me?fields=id,name,link,email,gender,location,locale,picture{url},friends{id,name,link,email,gender,location,locale,picture{url}}', function(response) {
          vm.$set(vm, 'profile', response)
          //De-Para FB Users
          let users = null;
          users = {
              id: response.id,
              name: response.name,
              id_fb_users: response.id,
              link: response.link,
              email: response.email,
              gender: response.gender,
              imagem: response.picture.data.url,
              city: response.locale,
              nationality: response.locale,
              preference: "",
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
                  id: userid + fdlist[i].id,
                  id_fb_friends: fdlist[i].id,
                  name: fdlist[i].name,
                  link: fdlist[i].link,
                  gender: fdlist[i].gender,
                  imagem: fdlist[i].picture.data.url
              }
              friendslist.push(listFB)
          }
          //Inserir User Na Basse Via Ajax.
          $.ajax({
              url: "http://localhost:9096/wsrepeteco/users",
              async: false,
              method: "POST",
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  'dataType': 'json'
              },
              dataType: 'json',
              crossDomain: true,
              origin: "*",
              processData: false,
              data: JSON.stringify(users)
          });

          //Inserir Friends Na Basse Via Ajax
          $.ajax({
              url: "http://localhost:9096/wsrepeteco/users/" + userid + "/friends",
              async: false,
              method: "POST",
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  'dataType': 'json'
              },
              dataType: 'json',
              crossDomain: true,
              origin: "*",
              processData: true,
              data: JSON.stringify(friendslist)
          });
          
        })
    },
  login() {
      let vm = this
      FB.login(function(response) {
          vm.statusChangeCallback(response)
      }, {
          scope: 'public_profile, email, user_friends',
          return_scopes: true
      })
  },
  logout() {
      let vm = this
      FB.logout(function(response) {
          vm.statusChangeCallback(response)
          console.log("logout Efetuado")
      })
      window.localStorage.removeItem('idFBStorage');
  },
  statusChangeCallback(response) {
      let vm = this
      if (response.status === 'connected') {
          var idFb = response.authResponse.userID
          console.log("Autorizando Usuario...");
          vm.authorized = true
          //Chamada API Facebok e Repeteco
          vm.getFacebook()
          console.log("Usuario Connectado")
          console.log("API Facebook: - Ok!");
        window.localStorage.setItem('idFBStorage', idFb);
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
  mounted() {
    let vm = this
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

<style>
/*Inibir botoes do menu e footer- Begin */
.btnNotificationNewMatch{display:none}
.menu a,footer{display:none}
header #logotipo{width:94px;height:35px;margin-top:-11px;margin-left:485px}
@media (max-width:480px) and (min-width:320px){
  header #logotipo{width:94px;height:35px;margin-top:-11px;margin-left:92px}
  .well_b {
    background-color: rgba(255, 255, 255, 0.94) !important;
    border: 1px solid #b4b4b47d;
    padding: 10px;
}
}
body{background-image:url(/src/assets/img/bg.png)!important;background-repeat:no-repeat;background-size:100%}
#app{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px;}
button{cursor:pointer}
#iconEntrar {color: #FFF !important;}
.well_b{background-color: rgba(255, 255, 255, .15);
    border: 1px solid #b4b4b47d;
    padding: 10px;
    }
.well img {    height: 100px;
    width: 100px;
    border-radius: 75px;
    border: 6px solid #7777772b;
}
.titleh3{color: #e48189}
.titleh6{color: #e48189}
</style>

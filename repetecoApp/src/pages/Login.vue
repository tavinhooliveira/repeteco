<template>
   <div>
      <section>
         <div class="container" id="logar">
             <!-- <router-link v-show="listeningWsRepeteco == 500" to="" onclick="Refresh();"><img id="logotipo" src="/src/assets/img/logo.png" style="margin-left: -54px;margin-top: -56px;z-index: 9999999;position: absolute;margin-right: 10px;" data-toggle="tooltip" data-placement="bottom" title="Refresh">
             </router-link>             -->
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
                  </div><br>
                  <h6>Ao entrar, você concorda com os nossos <a href="/termos">Termos</a> e <a href="/politicas">Politica de Privacidade.</a></h6>
               </div>
               <div v-else class="well_b text-center">
                    <div >
                        <img :src="profilePictureLarge" style='height: 100px; width: 100px; border-radius: 75px;'>
                    </div>                
                    <div v-show="listeningWsRepeteco == 200">
                        <a v-bind:href="profile.link" v-tooltip.bottom-start="'Perfil Facebook'" target="_blank">{{profileNome}}</a>                  
                    </div>
                    <br>     
                    <div v-if="listeningWsRepeteco == 200" class="">
                        <span v-show="dataIdFB != 0" >
                            <h3><i class="fa fa-star">Pronto!</i></h3>
                            <h6>Você tem <b v-html="totalFriendsApp"></b> amigos no APP de <b v-html="totalFriendsFB"></b> no facebook!</h6>
                            <h6>Agora é só Classificar Seus Amigos!</h6>
                            <br>
                            <span>
                                <a href="/classification" class="btn btn-success" >Entrar <span id="iconEntrar" class="glyphicon glyphicon-log-in"></span></a>
                            </span>
                        </span>
                    </div>
                     <span v-else-if="listeningWsRepeteco == 500" class="alert text-warning">                         
                         <p> Desculpe, algo deu errado, tente mais tarde! 
                            <h6 class="error-description">Erro 500 – Internal Server Error</h6>
                         </p><br>
                             <section class="links">
                                <a class="error-link" href="/">Tentar Novamente</a>
                            </section><br> 
                            <section class="links">
                                <a href="/termos">Termos</a> |
                                <a href="/politicas">Politicas</a>
                            </section>
                     </span>
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
import CarroselLoginComponet from "../components/utils/CarroselLoginComponet.vue";
import AboutComponent from "../components/utils/AboutComponent.vue";
import axios from 'axios';

export default {
    name: 'login',
    components: {
        CarroselLoginComponet,
        AboutComponent,
        axios
    },
    data() {
        return {
        profile: {},
        authorized: false,
        users: null,
        data: [],
        summary: [],
        listeningWsRepeteco: 500,
        dataNotify: [],
        dataIdFB: 0
        }
    },
    computed: {
        profileNome(){
        return (this.profile.name) ? this.profile.name : `Verificando...`
        },
        profilePicture() {
        return (this.profile.id) ? this.profile.picture.data.url : `/src/assets/img/loading3.gif`
        },
        profilePictureLarge() {
        return (this.profile.id) ? `https://graph.facebook.com/${this.profile.id}/picture?type=large` : `/src/assets/img/loading3.gif`
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
        islisteningWsRepeteco(responseFb){
            let mv = this;
            var authAux = responseFb;
            axios.get(this.$urlAPI, {"headers":{"authorization":"Basic "+this.$basicAuthParams}})
            .then(response => {
                this.listeningWsRepeteco = response.status;
                if (this.listeningWsRepeteco === 200) {
                    mv.getFacebook()                    
                    this.$store.commit('setAuth', responseFb);
                    sessionStorage.setItem('user',JSON.stringify(responseFb));
                    //this.$store.commit(setAuth, "nada mesmo");
                    console.log("API Repeteco listening... OK!")
                } else {
                    console.log("Erro na conexão da API, tente mais tarde!");
                    this.listeningWsRepeteco = 404;
                }
            })
            .catch(e => {
                console.log(e,"Erro! Tente novamente mais tarde!")
            })
        },
        
        getFacebook() {
        let vm = this
        FB.api('/me?fields=id,name,link,email,gender,location,locale,picture{url},friends{id,name,link,email,gender,location,locale,picture{url}}', function(response) {
            vm.$set(vm, 'profile', response)
            //De-Para FB Users
            let users = null;
            let userid = response.id
            console.log("teste response FB: ", response)
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
                numberWhats: "",
                friendsTotalFb: response.friends.summary.total_count,
                friendsTotalApp: response.friends.data.length
            }
            //De-Para FB Friends
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
                vm.createUserFb(users);
                vm.createFriendsFb(friendslist, userid);
                vm.dataIdFB = userid
                vm.notifyCountNotReadMatch(userid)                       
            })
        },
        createUserFb(users){
            $.ajax({
                url: (this.$urlAPI+`users`),
                async: false,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'dataType': 'json',
                    'authorization': 'Basic '+this.$basicAuthParams
                },
                dataType: 'json',
                crossDomain: true,
                origin: "*",
                processData: false,
                data: JSON.stringify(users)
            });
        },
        createFriendsFb(friendslist, userid){
            $.ajax({
                url: (this.$urlAPI+`users/${userid}/friends`),
                async: false,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'dataType': 'json',
                    'authorization': 'Basic '+this.$basicAuthParams
                },
                dataType: 'json',
                crossDomain: true,
                origin: "*",
                processData: true,
                data: JSON.stringify(friendslist)
            });
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
            window.sessionStorage.removeItem('user');
            window.localStorage.clear();
            window.sessionStorage.clear();
        },
        statusChangeCallback(response) {
            let vm = this
            console.log("Autorizando Usuario...");
            if (response.status === 'connected') {
                let responseFb = response
                var idFb = response.authResponse.userID
                vm.authorized = true
                vm.islisteningWsRepeteco(responseFb);
                console.log("Usuario Autorizado");               
            } else if (response.status === 'not_authorized') {
                console.log("Usuario Não Autorizado!");
                vm.authorized = false
            } else if (response.status === 'unknown') {
                vm.profile = {}
                vm.authorized = false
                 console.log("Usuario Não Autorizado!");
            } else {
                vm.authorized = false
                 console.log("Usuario Não Autorizado!");
            }
        },
         notifyCountNotReadMatch(userid){
            //chamada a API user
            axios.get(this.$urlAPI+`users/${userid}/notification`, {"headers":{"authorization":"Basic "+this.$basicAuthParams}})
            .then(response => {
                    this.dataNotify = response.data.length
                    console.log("[login] Notifications: ", this.dataNotify)
            //Data corrente
            var today = new Date();
            var dd = today.getDate(); 
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            var currentTime = today.toLocaleString('pt-BR');

            //Atributos de MSG
            var dataAtribute ={
                msg: "Você Tem ",
                count: this.dataNotify,
                date: currentTime        
            }       

            var e = new Notification ("RepetecoWEB: ", {
                icon: this.profile.picture.data.url,               
                body: dataAtribute.msg + dataAtribute.count +" Notificações!"+ "\n" + "Atualizado em: " + dataAtribute.date,
                tag: "NEVERGRIND-CHAT-ALERT",
                silent: false,
                vibrate: [200, 100, 200]
            })
            e.onclick = function (){
                location.href = "/notification";
            }
            });            
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
.menu a,header{display:none}
.menu a,header #logotipo{display:none !important;}
@media (max-width:480px) and (min-width:320px){
    .well_b {
        border: 1px solid #b4b4b47d;
        padding: 10px;
        box-shadow: 0px 2px 19px -7px;
        border-radius: 10px;
        background: #fff;
        unicode-bidi: embed;
    }
}
#app{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px;}
button{cursor:pointer}
#iconEntrar {color: #FFF !important;}
.well_b{background-color: rgba(255, 255, 255, .15);
    border: 1px solid #b4b4b47d;
    padding: 10px;
     box-shadow: 0px 2px 19px -7px;
    border-radius: 10px;
    background: #fff;
    unicode-bidi: embed;
    }
.well img {    height: 100px;
    width: 100px;
    border-radius: 75px;
    border: 6px solid #7777772b;
}
.titleh3{color: #e48189}
.titleh6{color: #e48189}
</style>

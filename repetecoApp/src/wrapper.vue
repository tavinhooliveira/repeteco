<template>
    <div id="app">        
          <header class="navbar-fixed-top navbar-default" id="navmenu">            
            <header-component :imagem="usersData.imagem"/>
        </header>
        <span v-if="!authorized">
            <ReloadAuthorizedComponent></ReloadAuthorizedComponent>
        </span>
        <span v-else>
            <router-view> </router-view>
      </span>        
        <footer class="footer navbar-fixed-bottom navbar-default">
            <div class="container">
                <div class="col-md-12 btn btn-navbar">
                               
                    <router-link to="notification"><span class="footerIcon fa fa-bell fa-red  text-red fa-1x col-md-3" data-transition="pop" data-toggle="tooltip" data-placement="top" title="Notificações"><i v-show="coutNotificationNotRead != 0" class="badge btnNotify" id="cont_cl_fico">{{coutNotificationNotRead}}</i></span></router-link>                     
                    <router-link to="matchs"><span class="footerIcon fa fa-heartbeat fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Matchs"><i v-show="coutMatchsNotRead != 0" class="badge btnNotify" id="cont_cl_fico">{{coutMatchsNotRead}}</i></span></router-link>     
                    <router-link to="config"><span class="footerIcon fa fa-sun-o fa-1x col-md-3 " data-transition="pop" data-toggle="tooltip" data-placement="top" title="Configuração"></span></router-link>
                    <a href="/" onclick="Refresh();"><span class="footerIcon fa fa-sign-out fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Sair"></span></a>
                </div>
            </div>
        </footer> 
        <span id="goTop" v-on:click="scrolltop();"  data-toggle="tooltip" data-placement="top" title="Topo"></span>
        {{localStoregeFuntion}}
    </div>
</template>

<script>
import ReloadAuthorizedComponent from "./components/ReloadAuthorizedComponent.vue";
import axios from 'axios';
import HeaderComponent from './components/HeaderComponent.vue';
export default {
    name: 'wrapper',
    components:{
        axios,
        HeaderComponent,
        ReloadAuthorizedComponent
    },
    data() {
        return {
            usersData: [],
            authorized: true
        }
    },
    computed: {
        localStoregeFuntion(){
            let vm = this
            var idFBStoragelogado = window.localStorage.getItem('idFBStorage');
            if(idFBStoragelogado != null){
            console.log("Wrapper: [localStorage] "+idFBStoragelogado);
            vm.getUsers(idFBStoragelogado);
            }else{
            console.log("Wrapper [localStorage] NOK!");
            }
        },
        //Recupera a quantidade de matchs
        coutMatchs() {
            if(this.usersData.matchs){
                return this.usersData.matchs.length;         
            }else{
                return 0;
            }
        },
        //Recupera a quantidade de Notificação
        coutNotification() {
            if(this.usersData.notification){
                return this.usersData.notification.length;         
            }else{
                return 0;
            }
        },
        //Recuperado a quantidade de Notificação NÃO lidas (status)!
        coutNotificationNotRead() {
            if(this.usersData.notification){
                let litrs =[];           
                let list = [];
                    for (let i = 0; i < this.usersData.notification.length; i++) {
                        if(this.usersData.notification[i].status === '0'){
                            list = {status: this.usersData.notification[i].status}
                            litrs.push(list)
                            }
                        }
                return litrs.length
            }          
        },
        //Recuperado a quantidade de Matchs NÃO lidos (read)!
        coutMatchsNotRead() {
            if(this.usersData.matchs){
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.usersData.matchs.length; i++) {
                    if(this.usersData.matchs[i].read === '0'){
                        list = {read: this.usersData.matchs[i].read}
                        litrs.push(list)
                        }
                    }
            return litrs.length           
            } 
        }
    },
    methods: {
        getUsers(userid){
            axios.get(`http://localhost:9096/wsrepeteco/users/${userid}`)
            .then(response => {
                this.usersStatus = response.status;
                if (this.usersStatus === 200) {
                    this.usersData = response.data
                    console.log("API Wrapper [GetUsers] OK!")
                } else {
                    this.usersData = []
                    console.log("Not Wrapper GetUsers");
                }
            })
        },
        scrolltop: function(){
            window.scrollTo(0, 0);
        }

     }
 
}
</script>

<style>
.btnNotificationNewMatch{position:fixed;float:bottom;bottom:0px;right:15px;z-index:100}
.btnNotificationNewMatchBtn .btnNotificationNewMatchInput{display:inline-block; z-index: 99999}
.btnPrincipal{font-size:18px;padding:15px;margin-bottom:30px}
.btnColor:hover{color:#f31d1b;font-size:24px}
.btnNotify {font-size: 9px; margin-top: -29px; margin-left: -8px; background-color: #f25655d1;}

#goTop {
    position: fixed; margin-left: 1000px; top: 88%;height: 35px;right: -8px;width: 60px;opacity: 0.1;cursor: pointer;
    background: url(/src/assets/img/arrowtop.png) no-repeat;-moz-transition: opacity 300ms linear;-ms-transition: opacity 300ms linear;
    transition: opacity 300ms linear; -webkit-transition: opacity 300ms linear;z-index: 9999;
}
</style>







    


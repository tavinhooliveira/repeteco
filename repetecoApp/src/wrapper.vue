<template>
    <div id="app">
        <header class="navbar-fixed-top navbar-default" id="navmenu">
            <div class="container">
                <div class="menu col-md-12 btn btn-navbar">
                    <a href="/profile" onclick="Refresh();"><span class="headerIcon fa fa-user col-md-4" data-toggle="tooltip" data-placement="bottom" title="Perfil"></span></a>             
                    <span href="#" onclick="Refresh();"><span class="headerIcon col-md-4"><img id="logotipo" src="/src/assets/img/logo.png" data-toggle="tooltip" data-placement="bottom" title="Refresh"></span></span> 
                    <a href="/classification"><span class="headerIcon fa fa-star-half-o col-md-4" data-toggle="tooltip" data-placement="bottom" title="Classificação"></span></a>  
                </div>
            </div>
        </header>
            <router-view> </router-view>
        <footer class="footer navbar-fixed-bottom navbar-default">
            <div class="container">
                <div class="col-md-12 btn btn-navbar">              
                    <a href="/notification"><span class="footerIcon fa fa-bell fa-red  text-red fa-1x col-md-3" data-transition="pop" data-toggle="tooltip" data-placement="top" title="Notificação"><i v-show="coutNotificationNotRead != 0" class="badge btnNotify" id="cont_cl_fico">{{coutNotificationNotRead}}</i></span></a>                     
                    <a href="/matchs"><span class="footerIcon fa fa-heartbeat fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Matchs"><i v-show="coutMatchsNotRead != 0" class="badge btnNotify" id="cont_cl_fico">{{coutMatchsNotRead}}</i></span></a>       
                    <a href="/config"><span class="footerIcon fa fa-sun-o fa-1x col-md-3 " data-transition="pop" data-toggle="tooltip" data-placement="top" title="Configuração"></span></a>
                    <a href="/" onclick="Refresh();"><span class="footerIcon fa fa-sign-out fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Sair"></span></a>
                </div>
            </div>
        </footer>
        {{localStoregeFuntion}}

        <!-- Botões flutuantes -->
        <!-- <div class="">            
            <div class="col-md-3 btnNotificationNewMatchBtn">
                <i  href="#"  class="btn btnCircular btnPrincipal btnColor fa fa-bell" data-toggle="tooltip" data-placement="top" title="Alertas"></i> 
            </div>
        </div>

         <div class="btnNotificationNewMatch ">            
            <div class="col-md-3 btnNotificationNewMatchBtn">
                <a  href="#navmenu"  class="btn btnCircular btnPrincipal btnColor glyphicon glyphicon-triangle-top" data-toggle="tooltip" data-placement="top" title="Topo"></a> 
            </div>
        </div> -->

        <!-- Receber Notificações -->
        <span v-if="coutMatchs > 0">{{notifyCountMatch}}</span>  

        <span id="goTop" v-on:click="scrolltop();"  data-toggle="tooltip" data-placement="top" title="Topo"></span>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'wrapper',
    components:{
        axios
    },
    data() {
        return {
            matchsData: [],
            notificationData: [],
            matchsNotifyStatus: 500
        }
    },
    computed: {
        localStoregeFuntion(){
            let ch = this
            var idFBStoragelogado = window.localStorage.getItem('idFBStorage');
            if(idFBStoragelogado != null){
            console.log("wrapper id: OK!");
                ch.matchsNotify(idFBStoragelogado);
                ch.getNotificationAPI(idFBStoragelogado);
            }else{
            console.log("wrapper id: NOK!");
            }
        },
        coutMatchs() {
            if(this.matchsData){
                return this.matchsData.length;         
            }else{
                return 0;
            }
        },
        coutNotification() {
            if(this.notificationData){
                return this.notificationData.length;         
            }else{
                return 0;
            }
        },
        //Recuperado a quantidade de Notificação NÃO lidas (status)!
        coutNotificationNotRead() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.notificationData.length; i++) {
                    if(this.notificationData[i].status === '0'){
                        list = {status: this.notificationData[i].status}
                        litrs.push(list)
                        }
                    }
            return litrs.length           
        },
        //Recuperado a quantidade de Matchs NÃO lidos (read)!
        coutMatchsNotRead() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.matchsData.length; i++) {
                    if(this.matchsData[i].read === '0'){
                        list = {read: this.matchsData[i].read}
                        litrs.push(list)
                        }
                    }
            return litrs.length           
        },
        notifyCountMatch(){
            //Data corrente
            var today = new Date();
            var dd = today.getDate(); 
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            var currentTime = today.toLocaleString('pt-BR');
            //Atributos de MSG
            var dataAtribute ={
                msg: "Você Tem ",
                count: this.matchsData.length,
                date: currentTime        
            }       

            var e = new Notification ("RepetecoWEB", {
                body: dataAtribute.msg + dataAtribute.count +" Matchrs!"+ "\n" + "Atualizado em: " + dataAtribute.date,
                icon: "/src/assets/img/repeteco.png",
                tag: "NEVERGRIND-CHAT-ALERT",
                silent: false,
                vibrate: [200, 100, 200]
            });            
            e.onclick = function (){
                location.href = "/matchs";
            }
        }       
    },
    methods: {
        matchsNotify(userid){
            axios.get(`http://localhost:9096/wsrepeteco/users/${userid}/matchs/`)
            .then(response => {
                this.matchsNotifyStatus = response.status;
                if (this.matchsNotifyStatus === 200) {
                    this.matchsData = response.data
                    console.log("Yes Matchs")
                } else {
                    this.matchsData = []
                    console.log("Not Matchs");
                }
            })
        },
        getNotificationAPI(userid){
            axios.get(`http://localhost:9096/wsrepeteco/users/${userid}/notification`)
            .then(response => {
                this.notificationDataStatus = response.status
                if (this.notificationDataStatus === 200) {
                    this.notificationData = response.data
                    this.statusNotification = true;
                    console.log("API notificationData: OK!")
                } else {
                    this.notificationData = [];
                    console.log("API notificationData: - Not notificationData");
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
.btnNotificationNewMatchBtn .btnNotificationNewMatchInput{display:inline-block}
.btnPrincipal{font-size:18px;padding:15px;margin-bottom:30px}
.btnColor:hover{color:#f31d1b;font-size:24px}
.btnNotify {font-size: 9px; margin-top: -29px; margin-left: -8px; background-color: #f25655d1;}

#goTop {
    position: fixed;
    margin-left: 1000px;
    top: 88%;
    height: 35px;
    right: -8px;
    width: 60px;
    opacity: 0.1;
    cursor: pointer;
    background: url(/src/assets/img/arrowtop.png) no-repeat;
    -moz-transition: opacity 300ms linear;
    -ms-transition: opacity 300ms linear;
    transition: opacity 300ms linear;
    -webkit-transition: opacity 300ms linear;
    z-index: 9999;
}


</style>







    


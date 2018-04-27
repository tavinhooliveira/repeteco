<template>
    <div id="app">
        <header class="navbar-fixed-top navbar-default" id="navmenu">
            <div class="container">
                <div class="menu col-md-12 btn btn-navbar">
                    <a href="/profile"><span class="headerIcon fa fa-user col-md-4" data-toggle="tooltip" data-placement="bottom" title="Perfil"></span></a>             
                    <span href="#" onclick="Refresh();"><span class="headerIcon col-md-4"><img id="logotipo" src="/src/assets/img/logo.png" data-toggle="tooltip" data-placement="bottom" title="Refresh"></span></span> 
                    <a href="/classification"><span class="headerIcon fa fa-star-half-o col-md-4" data-toggle="tooltip" data-placement="bottom" title="Classificação"></span></a>  
                </div>
            </div>
        </header>    

        <router-view> </router-view>        

        <footer class="footer navbar-fixed-bottom navbar-default">
            <div class="container">
                <div class="col-md-12 btn btn-navbar">              
                    <a href="/notification"><span class="footerIcon fa fa-bell fa-red  text-red fa-1x col-md-3" data-transition="pop" data-toggle="tooltip" data-placement="top" title="Notificação"></span></a>                     
                    <a href="/matchs"><span class="footerIcon fa fa-heartbeat fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Matchs"></span></a>       
                    <a href="/config"><span class="footerIcon fa fa-sun-o fa-1x col-md-3 " data-transition="pop" data-toggle="tooltip" data-placement="top" title="Configuração"></span></a>
                    <a href="/" onclick="Refresh();"><span class="footerIcon fa fa-sign-out fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Sair"></span></a>
                </div>
            </div>
        </footer>

        {{localStoreFuntion}}
        <div v-if="coutMatchs > 0" class="btnNotificationNewMatch">            
            <div class="col-3 btnNotificationNewMatchBtn">
                <a  href="/matchs"  class="btn btnCircular btnPrincipal btnColor fa fa-heartbeat" data-toggle="tooltip" data-placement="left" title="Matchs!" name="1"><i class=""><b>{{coutMatchs}}</b></i></a> 
            </div>
        </div>

          
        <div class="btn footer pull-left"><a onclick="solicitationNotification();" data-toggle="tooltip" data-placement="right" title="Notify" class="glyphicon glyphicon-bell"><i><b></b></i></a></div>


        <!-- Receber Notificações -->
        <span v-if="coutMatchs > 0">{{notifyCountMatch}}</span>
        
         
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
            matchsData: [] 
        }
    },
    computed: {
        localStoreFuntion(){
            let ch = this
            var idFBStoragelogado = window.localStorage.getItem('idFBStorage');
            console.log("wrapper id: "+idFBStoragelogado);
            if(idFBStoragelogado != null){
                ch.matchsNotify(idFBStoragelogado)
            }
        },
        coutMatchs() {
            if(this.matchsData){
                return this.matchsData.length;         
            }else{
                return 0;
            }
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
                this.matchsData = response.data
                if (this.matchsData.length > 0) {
                    console.log("Yes Matchs")
                } else {
                    console.log("Not Matchs");
                }
            })
        }  

    }
}
</script>

<style>
.btnNotificationNewMatch{position:fixed;float:bottom;bottom:15px;right:15px;z-index:100}
.btnNotificationNewMatchBtn .btnNotificationNewMatchInput{display:inline-block}
.btnPrincipal{font-size:18px;padding:15px;margin-bottom:30px}
.btnColor:hover{color:#f31d1b;font-size:24px}
</style>







    


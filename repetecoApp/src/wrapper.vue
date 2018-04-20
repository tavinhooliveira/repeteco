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

        <router-view></router-view>        

        <footer class="footer navbar-fixed-bottom navbar-default">
            <div class="container">
                <div class="col-md-12 btn btn-navbar">              
                    <a href="/notification"><span class="footerIcon fa fa-bell fa-red  text-red fa-1x col-md-3" data-transition="pop" data-toggle="tooltip" data-placement="top" title="Notificação"></span></a>                     
                    <a href="/matchs" onclick="Refresh();"><span class="footerIcon fa fa-heartbeat fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Matchs"></span></a>       
                    <a href="/config"><span class="footerIcon fa fa-sun-o fa-1x col-md-3 " data-transition="pop" data-toggle="tooltip" data-placement="top" title="Configuração"></span></a>
                    <a href="/" onclick="Refresh();"><span class="footerIcon fa fa-sign-out fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Sair"></span></a>
                </div>
            </div>
        </footer>

        <!-- Botão Match Flutuante -->
        <div v-if="isMatch === true" class="btnNotificationNewMatch">            
            <div class="col-3 btnNotificationNewMatchBtn">
                <!-- <a href="/notification" class="btn btnCircular btnPrincipal btnColor" data-toggle="tooltip" data-placement="left" title="Matchs!" name="1"><i class=""><b>42</b></i></a> -->
                <a v-on:click="notifyNewMatch();" class="btn btnCircular btnPrincipal btnColor" data-toggle="tooltip" data-placement="left" title="Matchs!" name="1"><i class=""><b>42</b></i></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wrapper',
    components:{

    },
    data() {
        return {
        isMatch: true,
        }
    },
    computed: {
                
        notifyNewMatch(){
            var data ={
                type: "Novo Match",
                date: "05/04/2018 - 21:30",
                name: "Camila Lima",
                msgPrefix: "Você e ",
                msgSufix: " tem Interesses em comum!",
                weapon: "Tome a iniciativa!"

            }            
            var e = new Notification ("RepetecoWEB", {
                body: data.msgPrefix + data.name + data.msgSufix + "\n" + data.type + " - " + data.date,
                icon: "/src/assets/img/repeteco.png",
                tag: "NEVERGRIND-CHAT-ALERT",
                silent: false,
                vibrate: [200, 100, 200]
            });            
            e.onclick = function (){
                location.href = "/notification";
            }
        return e;
        }
        
    },
    methods: {

  }

}
</script>




<style>
.btnNotificationNewMatch{
	position: fixed;
	float: bottom;
	bottom: 15px;
	right: 15px;
	z-index: 100;
}
.btnNotificationNewMatchInput, .btnNotificationNewMatchBtn {
	display: inline-block;
}
.btnCircular{
	border-radius: 50%;
}
.btnPrincipal{
	font-size: 10px;
    padding: 15px;
    margin-bottom: 30px;
}
.btnColor {
    background-color: #f33634;
    color: #fff;
    border: 4px;
    font-size: 8px
}
.btnColor:hover {
    background-color: #f31d1b;
    color: #fff;
    font-size: 14px;
    border: 4px solid rgba(163, 173, 183, 0.54);
}

</style>

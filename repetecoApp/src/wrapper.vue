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
                    <a href="/share"><span class="footerIcon fa fa-share-alt fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Compartilhar"></span></a>       
                    <a href="/notification"><span class="footerIcon fa fa-bell fa-red  text-red fa-1x col-md-3" data-transition="pop" data-toggle="tooltip" data-placement="top" title="Notificação"></span></a>                     
                    <a href="/config"><span class="footerIcon fa fa-sun-o fa-1x col-md-3 " data-transition="pop" data-toggle="tooltip" data-placement="top" title="Configuração"></span></a>
                    <a href="/" onclick="Refresh();"><span class="footerIcon fa fa-sign-out fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Sair"></span></a>
                </div>
            </div>
        </footer>

        <!-- Botão Match Flutuante -->
        <div v-if="isMatch === true" class="btnPesquisar">            
            <div class="col-3 btnPesquisarBtn">
                <button href="/config" class="btnCircular btnPrincipal " name="1"><i class="">42</i></button>
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
        isMatch: true
        }
    }, 
}
</script>

<style>
.btnPesquisar{
	position: fixed;
	float: bottom;
	bottom: 15px;
	right: 15px;
	z-index: 100;
}
.btnPesquisarInput, .btnPesquisarBtn {
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
</style>

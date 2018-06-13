<template>
    <div id="navmenu">
        <div class="header container">
            <div class="col-md-4">
                <span class="">
                    <router-link class="btnClassification" to="classification"><span class="round"><img id="" src="/src/assets/img/btnClassification.png" data-toggle="tooltip" data-placement="bottom" title="Classificação"></span></router-link>
                </span>
            </div>
            <div class="col-md-4">
                <span class="navbar-brand-center">
                    <router-link class="col-md-4" to="" onclick="Refresh();"><img id="logotipo" src="/src/assets/img/logo.png" data-toggle="tooltip" data-placement="bottom" title="Atualizar..."></router-link> 
                </span>
            </div>
            <div class="col-md-4">
                <span class="pull-right">
                    <profileHeaderComponent class="HeaderComponent col-md-4" link="/profile" :imagem="imagem" :name="name"/>
                </span>            
            </div>           
        </div>
    </div> 
</template>

<script>
import ProfileHeaderComponent from '../template/ProfileHeaderComponent.vue';
export default {
    props: ['imagem', 'name'],
    name: 'HeaderComponent',
    components:{
    ProfileHeaderComponent
    }
}
</script>
<style>
.navMenu{
     z-index: 9999999 !important;
}
.header .navbar-brand-center {
    position: absolute;
    left: 50%;
    padding: 0;
    margin: 0;
    -webkit-transform: translate(-50%,0);
    -ms-transform: translate(-50%,0);
    -o-transform: translate(-50%,0);
    transform: translate(-50%,0);
}

.header a #logotipo{
    margin-top: -45px;
    margin-left: -25px;
    z-index: 9999999 !important;
    position: absolute;
    margin-left: -55px;
}
.header a #logotipo:hover{
    zoom: 20px
}
.header .btnClassification img{
    width: 30px;
    height: 23px;
    position: absolute;
    z-index: 9999999 !important;
    margin: 15px 0px auto -5px;
}
.header .btnClassification img:hover {
    width: 33px;
    height: 24px;
    border-radius: 65px;
    padding: 2px;
    position: absolute;
    z-index: 9999999 !important;
    margin: 15px 0px auto -5px;
    box-shadow: -1px -1px 90px 2px #e0e0e0;
}

@media (min-width : 300px) and (max-width : 500px){
    .header a #logotipo {
        margin-top: 15px;
        margin-left: -50px;
        z-index: 9999999 !important;
        position: absolute;
    }
}

</style>

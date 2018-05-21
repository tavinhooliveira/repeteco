<template>
    <div>
        <div class="container HeaderComponent">
            <div class="menu col-md-12 btn btn-navbar">
                <profileHeaderComponent link="/profile" :imagem="imagem" />
                <router-link to="" onclick="Refresh();"><span class="headerIcon col-md-4"><img id="logotipo" src="/src/assets/img/logo.png" data-toggle="tooltip" data-placement="bottom" title="Refresh"></span></router-link> 
                <router-link to="classification"><span class="headerIcon round pull-right"><img id="" src="/src/assets/img/teste.png" data-toggle="tooltip" data-placement="bottom" title="Classificação"></span></router-link>
            </div>
        </div>
    </div> 
</template>

<script>
import ProfileHeaderComponent from '../template/ProfileHeaderComponent.vue';
export default {
    props: ['imagem'],
    name: 'HeaderComponent',
    components:{
        ProfileHeaderComponent
    }
}
</script>
<style>
.HeaderComponent img {width: 25px; height: 18px; margin-right: 30px;}
.HeaderComponent img:hover {margin-top: -3px;}
@media (min-width : 300px) and (max-width : 500px){
.HeaderComponent img {margin-top: -3px; margin-right: -5px;}
}
</style>

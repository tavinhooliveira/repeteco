<template>
<div>
    <div class="container">
        <div class="menu col-md-12 btn btn-navbar">
            <profileHeaderComponent link="/profile" :imagem="imagem" />
            <span href="#" onclick="Refresh();"><span class="headerIcon col-md-4"><img id="logotipo" src="/src/assets/img/logo.png" data-toggle="tooltip" data-placement="bottom" title="Refresh"></span></span> 
            <router-link to="classification"><span class="headerIcon fa fa-star-half-o col-md-4" data-toggle="tooltip" data-placement="bottom" title="Classificação"></span></router-link>
        </div>
    </div>
</div> 
</template>

<script>
import ProfileHeaderComponent from '../components/ProfileHeaderComponent.vue';
export default {
    props: ['imagem'],
    name: 'HeaderComponent',
    components:{
        ProfileHeaderComponent
    },
    computed: {

    }
}
</script>
<style>
</style>

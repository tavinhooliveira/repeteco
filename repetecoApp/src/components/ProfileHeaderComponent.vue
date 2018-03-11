<template>
<div  class="col-md-3 profile">
    <div v-if="name != null" class="media">
        <div class="media-left">
            <a v-bind:href="link" target="_blank" title="Perfil Facebook">
            <img class="media-object" :src="imagem"></a>
        </div>
        <div class="media-body">
            <h6 class=""><a v-bind:href="link" target="_blank" title="Perfil Facebook">{{name}}</a>
                <p id="friendsCount"><i class="fa fa-users"></i><b> {{friendsTotalApp}} de {{friendsTotalFb}} </b>Amigos 
                <i class="glyphicon glyphicon-refresh" onclick="Refresh();" title="Atualizar"></i>
                </p> 
            </h6>
        </div>
    </div>
    <div v-else class="media">
        <div class="media-left">
            <img class="media-object" :src="profilePicture">
        </div>
        <div class="media-body">
            <h1 v-html="profileName"></h1>
        </div>
    </div>
</div> 
</template>

<script>
export default {
    props: ['user','name','link','imagem', 'friendsTotalFb','friendsTotalApp'],
    name: 'ProfileComponent',
    computed: {
        profileName () {      
            return '<h6 onclick="Refresh();">Buscando... <a>Atualizar</a></h6>'
        },
        profilePicture () {
            return `/src/assets/img/man.jpg`
        }
    }
}
</script>
<style lang="scss" scoped>
.profile img {width: 35px;height: 38px;border-radius: 41px;border: 2px solid rgba(73, 158, 223, 0.144) !important;}
.profile h6 a{margin-top: 10px !important;}
#friendsCount {font-size: 10px}
</style>

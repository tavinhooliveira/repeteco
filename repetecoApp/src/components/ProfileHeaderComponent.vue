<template>
<div  class="col-md-3 profile">
    <div  class="media">
        <div class="media-left">
            <a v-bind:href="link" target="_blank" title="Perfil Facebook">
                <img class="media-object" :src="imagem">
            </a>
        </div>
        <div class="media-body">
            <h6 class=""><a v-bind:href="link" target="_blank" title="Perfil Facebook">{{name}} nome</a>
             
            </h6>
        </div>
    </div>
</div> 
</template>


<!--
<template>
<div  class="col-md-3 profile">
    <div v-if="profile.id" class="media">
        <div class="media-left">
            <a v-bind:href="profile.link" target="_blank" title="Perfil Facebook">
                <img class="media-object" :src="profilePicture">
            </a>
        </div>
        <div class="media-body">
            <h6 class=""><a v-bind:href="profile.link" target="_blank" title="Perfil Facebook">{{this.profile.name}}</a>
             <p id="friendsCount"><i class="fa fa-users"></i><b> {{profile.friends.data.length}} de {{profile.friends.summary.total_count}} </b>Amigos</p> 
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
-->

<script>
export default {
  props: ['profile','id','name','link','imagem'],
  name: 'ProfileComponent',
  computed: {
    profileName () {
      if (this.profile.id) {
        return `${this.profile.name}`
        console.log('User Conectado', this.profile.name);
      } else {
        return '<h6 onclick="Refresh();">Buscando... <a>Atualizar</a></h6>'
      }
    },
    profilePicture () {
        return (this.profile.id) ? `https://graph.facebook.com/${this.profile.id}/picture?width=300` : `/src/assets/img/man.gif`
    },
  }
}
</script>

<style lang="scss" scoped>
.profile img {
    width: 35px;
    height: 38px;
    border-radius: 41px;
    border: 2px solid rgba(73, 158, 223, 0.144) !important;
}
.profile h6 a{
    margin-top: 10px !important;
}
#friendsCount {font-size: 10px}
</style>

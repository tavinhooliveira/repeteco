<template>
<span>
  <li v-if="genderPreference === gender || genderPreference === ''">
    <!-- <a v-bind:href="link" target="_blank"> -->
    <a v-on:click="sweetModalPerfil();">
      <img v-bind:src="imagem" v-tooltip.bottom-start="name"><br>
    </a>
  </li>

   <!-- modal perfil -->
    <sweet-modal ref="sweetModalPerfil">
      <div class="media">
            <a :href="link" target="_blank">
              <img class="" style="width:200px" v-bind:src="profilePictureLarge || `/src/assets/img/man.jpg`">
            </a>
          <div class="media-body">
            <h4 class="">{{name}}</h4>
            <p class="thumbnail" v-if="gender === 'male'">Sexo: Masculino</p>
            <p class="thumbnail" v-if="gender === 'female'">Sexo: Feminino</p>
          <div>                      
          </div>
              <br>
              <a :href="link" target="_blank">@Perfil Facebook</a>
            </div>
        </div>     
    </sweet-modal>
<!-- modal perfil -->
</span>
</template>
<script>
export default{
  props:['key','name','imagem','link', 'preference', 'gender', 'idfriends'],
  data(){
     return{
      efeitoClick: null,
      genderPreference: this.preference,   
     } 
  },
  methods: {
    sweetModalPerfil(){
      return this.$refs.sweetModalPerfil.open();
    }
  },
  computed: {
    profilePictureLarge() {
      return (this.idfriends) ? `https://graph.facebook.com/${this.idfriends}/picture?type=large` : `/src/assets/img/loading3.gif`
    }
  }
}
</script>

<style>
.slider {
    height: 100px;
    position: relative;
    margin: 9px;
    margin-bottom: -22px;
    padding: 0 4%;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
}

.slider h3{
  position: absolute;
  top: 22px;
  z-index: 30;
}

.slider .handle.handlePrev {
    left: 0;
    margin-left: 0%;
}

.slider .handle.handleNext {
    right: 0;
    margin-right: 0%;
}

.setasScroller{ margin-top: 40px;}

.slider .handle.active {
    cursor: pointer;
}

.slider .handle {
    /*background: rgba(20, 20, 20, 0.26);*/
    position: absolute;
    top: 0;
    height: 100%;
    bottom: 0;
    z-index: 20;
    width: 4%;
    text-align: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    color: #fff;
}


.row {
  overflow: hidden;
}
.row__inner {
  -webkit-transition: 450ms -webkit-transform;
  transition: 450ms -webkit-transform;
  transition: 450ms transform;
  transition: 450ms transform, 450ms -webkit-transform;
  font-size: 0;
  white-space: nowrap;
  margin: 70.3125px 0;
  padding-bottom: 10px;
}

</style>

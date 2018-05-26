<template>
<span>
   <li v-if="(genderPreference === gender || genderPreference === '')" class="list-group-item col-md-4" v-bind:style="efeitoClick" v-on:mouseover="mauseEfeito()" v-on:mouseout="removemauseEfeito()">
      <form class="statusForm">
            <div class="media-left col-md-4 LfPicture" >
              <a v-on:click="sweetModalPerfil();"  v-tooltip.left-start="'@Perfil'"><img class="media-object" v-bind:src="imagem || `/src/assets/img/man.jpg`"></a>
         </div>      
         <div class="col-md-8 classification">
            <h4 class="media-heading"><a v-bind:href="link" target="_blank">{{name}}</a></h4>
            <div class="LfLocation">{{city}}</div>
            <div class="img_classification center-block" @change="updateStatusOption()"> 
               <label class="cl_fiquei" v-tooltip.top-start="'Já Fiquei'">
               <input type="radio" value="fiquei" id="optionclassificada" v-model="optiondata">
               <span class="cl_fiquei"></span>
               </label>
               <label class="cl_ficaria2" v-tooltip.top-start="'Ficaria Novamente'">
               <input type="radio" value="ficariaNovamente" id="optionclassificada" v-model="optiondata">
               <span class="cl_ficaria2"></span>
               </label>
               <label v-show="flagDisplayHot === true" class="cl_picante" style="padding-left: 0px;" v-tooltip.left-start="'Tivemos um Relação Picante'">
               <input type="radio"  value="relacaoPicante" id="optionclassificada" v-model="optiondata">
               <span class="cl_picante"></span>
               </label>
               <label class="cl_fico" v-tooltip.top-start="'Ficaria'">
               <input type="radio"  value="ficaria" id="optionclassificada" v-model="optiondata">
               <span class="cl_fico"></span>
               </label>
               <label class="cl_Ninteresse" v-tooltip.left-start="'Sem Interesse'">
               <input type="radio"  value="semInteresse" id="optionclassificada" v-model="optiondata">
               <span class="cl_Ninteresse"></span>
               </label>
            </div>
         </div>
         <div v-if="optiondata != null" v-on:click="starClickOff()" class=" starClassification classificationTrue pull-right" v-tooltip.left-start="'Desclassificar'"></div>
         <div v-else class=" starClassification starClassificationFalse pull-right"></div>
         <div v-show="optiondata === null" class="text-center msgClamigos">Desclassificado! 👎</div>
      </form>
   </li>
      <!-- modal perfil -->
    <sweet-modal ref="sweetModalPerfil">
      <div class="media">
            <a :href="link" target="_blank">
              <img class="" style="width:200px" v-bind:src="imagem || `/src/assets/img/man.jpg`">
            </a>
          <div class="media-body">
            <h4 class="">{{name}}</h4>
            <p class="thumbnail" v-if="gender === 'male'">Sexo: Masculino</p>
            <p class="thumbnail" v-if="gender === 'female'">Sexo: Feminino</p>
              <div >
              <div class="img_classification center-block" @change="updateStatusOption()"> 
                <label class="cl_fiquei" v-tooltip.top-start="'Já Fiquei'">
                <input type="radio" value="fiquei" id="optionclassificada" v-model="optiondata">
                <span class="cl_fiquei"></span>
                </label>
                <label class="cl_ficaria2" v-tooltip.top-start="'Ficaria Novamente'">
                <input type="radio" value="ficariaNovamente" id="optionclassificada" v-model="optiondata">
                <span class="cl_ficaria2"></span>
                </label>
                <label v-show="flagDisplayHot === true" class="cl_picante" v-tooltip.left-start="'Tivemos um Relação Picante'">
                <input type="radio"  value="relacaoPicante" id="optionclassificada" v-model="optiondata">
                <span class="cl_picante"></span>
                </label>
                <label class="cl_fico" v-tooltip.top-start="'Ficaria'">
                <input type="radio"  value="ficaria" id="optionclassificada" v-model="optiondata" >
                <span class="cl_fico"></span>
                </label>
                <label class="cl_Ninteresse" v-tooltip.left-start="'Sem Interesse'">
                <input type="radio"  value="semInteresse" id="optionclassificada" v-model="optiondata">
                <span class="cl_Ninteresse"></span>
                </label>
              </div>         
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
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
export default {
  props: ['id', 'id_fb_friends', 'name', 'imagem', 'link', 'city', 'nationality', 'option', 'gender', 'option', 'friendsTotalFb', 'preference', 'flagDisplayHot'],
  components:{
    SweetModal,
		SweetModalTab
  },
  data() {
    return {
      efeitoClick: null,
      genderPreference: this.preference,
      optiondata: this.option
    }
  },
  computed: {
    pictureLarge() {
      return (this.id_fb_friends) ? `https://graph.facebook.com/${this.id_fb_friends}/picture?width=350` : `/src/assets/img/man.gif`
    }
  },
  methods: {
    sweetModalPerfil(){
      return this.$refs.sweetModalPerfil.open();
    },
    mauseEfeito: function() {
      this.efeitoClick = 'transform: scale(1.1); box-shadow: -0px 1px 15px 0px #cdd2d8;  z-index: 999;'
    },
    removemauseEfeito: function() {
      this.efeitoClick = null;
    },
    starClickOff: function() {
      this.optiondata = null;
      const fdOption = {
        option: this.optiondata
      }
      var friendId = this.id;
      $.ajax({
        url: (this.$urlAPI+`friends/opcao/${friendId}`),
        method: "PUT",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json'
        },
        dataType: 'json',
        crossDomain: true,
        origin: "*",
        processData: true,
        data: JSON.stringify(fdOption)
      });

      this.efeitoClick = 'transition: opacity .5s; color: red; transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);'
    },
    updateStatusOption: function() {
      const fdOption = {
        option: this.optiondata
      }
      var friendId = this.id;
      $.ajax({
        url: (this.$urlAPI+`friends/opcao/${friendId}`),
        method: "PUT",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json'
        },
        dataType: 'json',
        crossDomain: true,
        origin: "*",
        processData: true,
        data: JSON.stringify(fdOption)
      });
    }
  }
}
</script>
<style>
.ListFriends li .LfPicture img:hover{border: 4px solid rgba(85, 169, 247, 0.54) !important;}
.optionShow{color: #c0bebe}
.msgClamigos {font-size: 10px; color: #cecdcd; position: absolute; margin-top: 25px; margin-left: 102px;}
</style>

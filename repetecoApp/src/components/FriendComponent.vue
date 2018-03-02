<template>

<li v-if="genderPreference === gender || genderPreference === ''"  class="list-group-item col-md-4" v-bind:style="efeitoClick" v-on:mouseover="mauseEfeito()" v-on:mouseout="removemauseEfeito()">
    <form class="statusForm center-block" >
        <div class="media-left col-md-4 LfPicture" >
            <a v-bind:href="link" target="_blank"><img class="media-object" v-bind:src="imagem"></a>
        </div>
        <div class="col-md-8 classification">
            <h4 class="media-heading "><a v-bind:href="link" target="_blank">{{name}}</a></h4>
            <div class="LfLocation">{{city}}</div>
            <div class="img_classification center-block" @change="updateStatusOption()"> 
                <label class="cl_fiquei" title="Já Fiquei">
                    <input type="radio" value="fiquei" id="optionclassificada" v-model="optiondata">
                    <span class="cl_fiquei"></span>
                </label>
                <label class="cl_ficaria2" title="Ficaria Novamente">
                    <input type="radio" value="ficariaNovamente" id="optionclassificada" v-model="optiondata">
                    <span class="cl_ficaria2"></span>
                </label>
                <label v-show="flagDisplayHot === true" class="cl_picante" style="padding-left: 0px;" title="Relação Picante">
                    <input type="radio"  value="relacaoPicante" id="optionclassificada" v-model="optiondata">
                    <span class="cl_picante"></span>
                </label>
                <label class="cl_fico" title="Ficaria">
                    <input type="radio"  value="ficaria" id="optionclassificada" v-model="optiondata">
                    <span class="cl_fico"></span>
                </label>
                <label class="cl_Ninteresse" title="Sem Interesse">
                    <input type="radio"  value="semInteresse" id="optionclassificada" v-model="optiondata">
                    <span class="cl_Ninteresse"></span>
                </label>
            </div>                  
        </div>
        <div v-if="optiondata != null" v-on:click="starClickOff()" class=" starClassification classificationTrue pull-right"></div>
        <div v-else class=" starClassification starClassificationFalse pull-right"></div>		
    </form>   				
</li>

<!--
 <li class="list-group-item col-md-4 classification" >
    <div class="media-left LfPicture">
        <a v-bind:href="link" target="_blank"><img class="media-object" v-bind:src="imagem"></a>
    </div>
    <div class="media-body  ">
        <h4 class="NFName"><a v-bind:href="link" target="_blank">{{name}}</a></h4>
        <div class="img_classification center-block" @change="updateStatusOption()"> 
                <label class="cl_fiquei" title="Já Fiquei">
                    <input type="radio" value="fiquei" id="optionclassificada" v-model="optiondata">
                    <span class="cl_fiquei"></span>
                </label>
                <label class="cl_ficaria2" title="Ficaria Novamente">
                    <input type="radio" value="ficariaNovamente" id="optionclassificada" v-model="optiondata">
                    <span class="cl_ficaria2"></span>
                </label>
                <label v-show="flagDisplayHot === true" class="cl_picante" style="padding-left: 0px;" title="Relação Picante">
                    <input type="radio"  value="relacaoPicante" id="optionclassificada" v-model="optiondata">
                    <span class="cl_picante"></span>
                </label>
                <label class="cl_fico" title="Ficaria">
                    <input type="radio"  value="ficaria" id="optionclassificada" v-model="optiondata">
                    <span class="cl_fico"></span>
                </label>
                <label class="cl_Ninteresse" title="Sem Interesse">
                    <input type="radio"  value="semInteresse" id="optionclassificada" v-model="optiondata">
                    <span class="cl_Ninteresse"></span>
                </label>
            </div>    
    <div v-if="optiondata != null" v-on:click="starClickOff()" class=" starClassification classificationTrue pull-right"></div>
    <div v-else class=" starClassification starClassificationFalse pull-right"></div> 
    </div>
</li>
-->
</template>

<script>
export default{
  props:['id','id_fb_friends','name','imagem','link', 'city','nationality','option','gender','option', 'friendsTotalFb', 'preference', 'flagDisplayHot'],
  data(){
     return{
        efeitoClick: null,
        genderPreference: this.preference,
        optiondata: this.option               
    } 
  },
  methods:{        
        mauseEfeito: function(){
            this.efeitoClick = 'transform: scale(1.1); box-shadow: -0px 1px 15px 0px #cdd2d8;  z-index: 999;'
        },
        removemauseEfeito: function(){
            this.efeitoClick = null;
        },
        starClickOff: function(){
            this.optiondata = null;
            const fdOption = {option:  this.optiondata}
            var friendId = this.id;
            $.ajax({
                url: "http://localhost:9096/wsrepeteco/friends/opcao/"+friendId,
                method: "PUT",
                headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'dataType': 'json'
                },
                dataType: 'json',
                crossDomain : true,
                origin: "*",
                processData: true,
                data: JSON.stringify(fdOption)
            });

            this.efeitoClick = 'transition: opacity .5s; color: red; transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);'
        },
        updateStatusOption: function(){             
            const fdOption = {option:  this.optiondata}
            var friendId = this.id;
            $.ajax({
                url: "http://localhost:9096/wsrepeteco/friends/opcao/"+friendId,
                method: "PUT",
                headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'dataType': 'json'
                },
                dataType: 'json',
                crossDomain : true,
                origin: "*",
                processData: true,
                data: JSON.stringify(fdOption)
            });
        }
    }
}


</script>
<style lang="scss">
.ListFriends li .LfPicture img:hover{border: 4px solid rgba(85, 169, 247, 0.54) !important;}
.optionShow{color: #c0bebe}
.ListFriends .img_classification label {
    margin-left: 5px;
    padding-left: 5px;
}
</style>

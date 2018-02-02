<template>
<li v-if="genderPreference === gender || gender === 'T' || gender === 'male' "  class="list-group-item col-md-4" v-bind:style="efeitoClick" v-on:mouseover="clickEfeito()" v-on:mouseout="removeClickEfeito()">
    <form class="statusForm">
        <div class="media-left col-md-4 LfPicture" >
            <a v-bind:href="link" target="_blank"><img class="media-object" v-bind:src="imagem"></a>
        </div>
        <div class="col-md-8 classification">
            <h4 class="media-heading"><a v-bind:href="link" target="_blank">{{name}}</a></h4>
            <div class="LfLocation">{{city}}</div>
            
            <div class="img_classification" v-on:click="updateStatusOption()"> 
                <label class="cl_fiquei" title="Já Fiquei">
                    <input type="radio" value="fiquei" id="optionc" v-model="statusOption">
                    <span class="cl_fiquei"></span>
                </label>
                <label class="cl_ficaria2" title="Ficaria Novamente">
                    <input type="radio" value="ficariaNovamente" id="optionc" v-model="statusOption">
                    <span class="cl_ficaria2"></span>
                </label>
                <label class="cl_picante" title="Relação Picante">
                    <input type="radio"  value="relacaoPicante" id="optionc" v-model="statusOption">
                    <span class="cl_picante"></span>
                </label>
                <label class="cl_fico" title="Ficaria">
                    <input type="radio"  value="ficaria" id="optionc" v-model="statusOption">
                    <span class="cl_fico"></span>
                </label>
                <label class="cl_Ninteresse" title="Sem Interesse">
                    <input type="radio"  value="semInteresse" id="optionc" v-model="statusOption">
                    <span class="cl_Ninteresse"></span>
                </label>
            </div>        
        </div>
        <div v-if="statusOption != null" v-on:click="starClickOff()"  class=" starClassification classificationTrue pull-right"></div>
        <div v-else class=" starClassification starClassificationFalse pull-right"></div>       			
    </form>
   				
</li>
</template>

<script>
export default{
  props:['name','imagem','link', 'city','nationality','option','gender','option', 'friendsTotalFb'],
  data(){
     return{
        efeitoClick: null,
        genderPreference: "female",
        statusOption: this.option,
           
    } 
  },
  methods:{
        clickEfeito: function(){
            this.efeitoClick = 'transform: scale(1.1); box-shadow: -0px 1px 15px 0px #cdd2d8;  z-index: 999;'
        },
        removeClickEfeito: function(){
            this.efeitoClick = null;
        },
        starClickOff: function(){
            this.statusOption = null;
            this.efeitoClick = 'transition: opacity .5s; color: red; transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);'
        },
        //[TODO]implementar o post ao clicar
        updateStatusOption: function(){
        //Receber ID do friends e a opcao clicada
        //let idFriends = this.id;
        var OptionClick = document.getElementById('optionc').value;
        console.log("Valor clicado",OptionClick)        
        var fdOption = null;
        fdOption = {
        option:  OptionClick
        }
        $.ajax({
            //url: "http://localhost:9096/wsrepeteco/friends/opcao/"+idFriends,
            url: "http://localhost:9096/wsrepeteco/friends/opcao/1952913858311706",
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
.ListFriends li .LfPicture img:hover{
    border: 4px solid rgba(85, 169, 247, 0.54) !important;
}

</style>

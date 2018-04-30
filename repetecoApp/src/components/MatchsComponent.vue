<template>
   <div>
      <section id="idMatchs"   v-if="option === 'ficaria' || option === 'ficariaNovamente'" >
         <li v-if="option === 'ficaria'"  class="list-group-item col-md-4 notification" >
            <div class="media-left LfPicture">
               <a v-bind:href="link" target="_blank"><img class="media-object" v-bind:src="imagem"></a>
            </div>
            <div class="media-body  notification">
               <h4 class="NFName"><a v-bind:href="link" target="_blank">{{name}}</a></h4>
               <small class="Nfmensagem">Disse que rola um possivel... <br> <b>Lance!</b>
                </small>
            </div>
            <div class="notification pull-right">
               <div class="img_classification">
                  <button type="button btnMatchFalse" v-on:click="refreshVue(); starClickOff();" class="close btnMatchFalse" aria-label="Close" v-tooltip.top-start="'Desfazer Match'">          
                      <span aria-hidden="true">&times;</span>          
                  </button>
                  <i class="imgficaria" v-tooltip.top-start="'Ficaria'"></i>
                  <span class="Nfdate">{{dataMatch}}</span>
                  <span id="mtPiscadinhas" class="btn pull-right" v-on:click="picadinhaNotify();" v-tooltip.top-start="'Enviar uma Piscadinha'">😉 Piscadinha</span>
               </div>
            </div>
         </li>
         <li v-else class="list-group-item col-md-4 notification" >
            <div class="media-left LfPicture ">
               <a v-bind:href="link" target="_blank"><img class="media-object " v-bind:src="imagem"></a>
            </div>
            <div class="media-body  notification">
               <h4 class="NFName"><a v-bind:href="link" target="_blank">{{name}}</a></h4>
               <small class="Nfmensagem">Disse que rola um possivel... <br> <b>Flash Back!</b> </small>
            </div>
            <div class="notification pull-right">
               <div class="img_classification">
                  <button type="button btnMatchFalse" v-on:click="refreshVue(); starClickOff();" class="close btnMatchFalse" aria-label="Close" v-tooltip.top-start="'Desfazer Match'">          
                      <span aria-hidden="true">&times;</span>          
                  </button>
                  <i class="imgficaria2" v-tooltip.top-start="'Ficaria Novamente'"></i>
                  <span class="Nfdate">{{dataMatch}}</span>
                  <span id="mtPiscadinhas" class="btn pull-right" v-on:click="picadinhaNotify();" v-tooltip.top-start="'Enviar uma Piscadinha'"><i class="fa fa-eye"> Piscadinha</i></span>
               </div>
            </div>
         </li>
      </section>
   </div>
</template>

<script>
export default{
  props:['name','id','imagem','link','option','user_id','id_fb_friends', 'dataMatch', 'userName', 'userLink', 'userImagem'],
    components:{
  },
  data() {
    return {
      efeitoClick: null,
      genderPreference: this.preference,
      optiondata: this.option,
      click: null
    }
  },
  computed:{
 

  }, 
  methods: {
    starClickOff: function() {
      this.optiondata = null;
      const fdOption = {
        option: this.optiondata
      }
      var click = true;
      var friendId = this.id;
      var idUserYouMatchs = this.id_fb_friends +  this.user_id;
      console.log("id idUserYouMatchs"+idUserYouMatchs);
      $.ajax({
        url: "http://localhost:9096/wsrepeteco/friends/opcao/" + friendId,
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

       $.ajax({
        url: "http://localhost:9096/wsrepeteco/matchs/" + friendId,
        method: "DELETE",
        dataType: 'json',
        crossDomain: true,
        origin: "*",
        processData: true,
      });

      $.ajax({
        url: "http://localhost:9096/wsrepeteco/matchs/" + idUserYouMatchs,
        method: "DELETE",
        dataType: 'json',
        crossDomain: true,
        origin: "*",
        processData: true,
      });

      this.efeitoClick = 'transition: opacity .5s; color: red; transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);'
    },
    picadinhaNotify: function(){
      var idFriendsCorrent = this.id_fb_friends
      const fdpsOption = {
        id_fb_friends: this.id_fb_friends,
        name: this.userName,
        imagem: this.userImagem,
        link: this.userLink,
        type: "Piscadinha",
        status: "0",
        text: "deu uma piscadinha em você!",
        user_id: this.user_id        
      }
      $.ajax({
        url: "http://localhost:9096/wsrepeteco/users/"+ idFriendsCorrent +"/notification",
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json'
        },
        dataType: 'json',
        crossDomain: true,
        origin: "*",
        processData: true,
        data: JSON.stringify(fdpsOption)
      });
      console.log("Piscadinha clicou"+idFriendsCorrent);

    },
     refreshVue: function(){
      window.location.reload();
    }
  }
}
</script>

<style>
.btnMatchFalse { margin-top: -72px; margin-right: -38px;}
.msgClamigos{margin-top: -17px; margin-left: 16px;}
</style>


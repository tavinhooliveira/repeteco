<template>
   <section>
      <li v-if="option === optionNew" style="display: block;" >
           <div v-if="read === '0'" class="list-group-item col-md-4 notification readView" v-on:click="readView(); refreshVue();" v-tooltip.top-start="'Click p/ marcar como vizualizado'">
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
                  <button type="button btnMatchFalse"  class="close btnMatchFalse" aria-label="Close" v-tooltip.top-start="'Desfazer Match'">          
                      <span class="glyphicon glyphicon-eye-close"></span>          
                  </button>
                  <i class="imgficaria" v-tooltip.top-start="'Ficaria'"></i>
                  <span class="Nfdate">{{dataMatch}}</span>
               </div>
            </div>
           </div>
           <!-- not View -->
           <div v-else class="list-group-item col-md-4 notification">
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
                 <span class="btn  btnModalAcaoMatch" v-tooltip.top-start="'Acão!'" ><i class="fa fa-ellipsis-h" data-toggle="modal" data-target=".bs-example-modal-sm"></i></span>
                  <i class="imgficaria" v-tooltip.top-start="'Ficaria'"></i>
                  <span class="Nfdate">{{dataMatch}}</span>
               </div>
            </div>
           </div>
         </li>
         <!-- Small modal -->
         <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">O Que Deseja Fazer?</h4>
                </div>
                <div class="modal-body">

                  <div class="list-group">
                    <button type="button" v-on:click="piscadinhaNotify(); refreshVue();" class="list-group-item"><span class="badge"><img src="/src/assets/img/piscadinha.png"></span>Enviar uma Piscadinha</button>
                    <button type="button" class="disabled list-group-item"><span class="badge"><img src="/src/assets/img/whatsapp.png"></span>Enviar WhatsApp</button>
                    <button type="button" v-on:click="starClickOff(); refreshVue();" class="list-group-item"><span class="badge"><img src="/src/assets/img/closeMatch.png"></span>Desfazer Match</button>
                  </div>

                </div>
            </div>
          </div>
        </div>
        <!-- End Small modal -->
   </section>
</template>

<script>
export default{
  props:['name','id','imagem','link','option','user_id','id_fb_friends', 'dataMatch', 'userName', 'userLink', 'userImagem', 'read'],
    components:{
  },
  data() {
    return {
      efeitoClick: null,
      genderPreference: this.preference,
      optiondata: this.option,
      click: null,
      optionNew: 'ficaria'
    }
  }, 
  methods: {
    //Desfazer match
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
    //Enviar uma Piscadinha
    piscadinhaNotify: function(){
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
      console.log("Piscadinha enviada para: "+idFriendsCorrent);
    },
    //Refresh page
     refreshVue: function(){
      window.location.reload();
    },
    //Marcar como lida
    readView: function(){
      var idFriendsCorrentRead = this.id
      const fdpsReadOption = {
        read: "1"        
      }
      $.ajax({
        url: "http://localhost:9096/wsrepeteco/matchs/readStatus/"+ idFriendsCorrentRead,
        method: "PUT",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json'
        },
        dataType: 'json',
        crossDomain: true,
        origin: "*",
        processData: true,
        data: JSON.stringify(fdpsReadOption)
      });
      console.log("ReadView"+idFriendsCorrentRead);
    }
  }
}
</script>

<style>
.btnMatchFalse { margin-top: -72px; margin-right: -38px;}
.msgClamigos{margin-top: -17px; margin-left: 16px;}
/* .readView{box-shadow: 0px 0px 2px 0px #355fe8 !important;} */
.readView{box-shadow: 0px 0px 2px 0px #355fe8 !important;}
.btnModalAcaoMatch{
    margin-top: -77px;
    margin-left: 19px;
    font-size: 12px;
    z-index: 999;
    position: absolute;
}
</style>
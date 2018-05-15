<template>
   <div>
      <section id="idMatchs"   v-if="option === optionNew || option === optionOld" >
         <li v-if="option === 'ficaria'" style="display: block;" >
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
                  <div  class="close btnMatchFalse" aria-label="Close" v-tooltip.top-start="'Não Vizualizado'">          
                    <span class="glyphicon glyphicon-eye-close"></span>          
                  </div>
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
                  <span class="btn  btnModalAcaoMatch" v-tooltip.top-start="'Acão!'" ><i class="fa fa-ellipsis-h" v-on:click="sweetModalSimple();"></i></span>
                  <i class="imgficaria" v-tooltip.top-start="'Ficaria'"></i>
                  <span class="Nfdate">{{dataMatch}}</span>
               </div>
            </div>
           </div>
         </li>
         <!-- Old matchs ================================== -->
         <li v-else style="display: block;">
            <div v-if="read === '0'" class="list-group-item col-md-4 notification readView" v-on:click="readView(); refreshVue();" v-tooltip.top-start="'Click p/ marcar como vizualizado'">
                <div class="media-left LfPicture ">
                    <a v-bind:href="link" target="_blank"><img class="media-object " v-bind:src="imagem"></a>
                </div>
                <div class="media-body  notification">
                    <h4 class="NFName"><a v-bind:href="link" target="_blank">{{name}}</a></h4>
                    <small class="Nfmensagem">Disse que rola um possivel... <br> <b>Flash Back!</b> </small>
                </div>
                <div class="notification pull-right">
                    <div class="img_classification">
                        <div  class="close btnMatchFalse" aria-label="Close" v-tooltip.top-start="'Não Vizualizado'">          
                          <span class="glyphicon glyphicon-eye-close"></span>          
                        </div>
                        <i class="imgficaria2" v-tooltip.top-start="'Ficaria Novamente'"></i>
                        <span class="Nfdate">{{dataMatch}}</span>  
                    </div>
                </div>
            </div>
            <!-- not view -->
            <div v-else class="list-group-item col-md-4 notification">
                <div class="media-left LfPicture ">
                    <a v-bind:href="link" target="_blank"><img class="media-object " v-bind:src="imagem"></a>
                </div>
                <div class="media-body  notification">
                    <h4 class="NFName"><a v-bind:href="link" target="_blank">{{name}}</a></h4>
                    <small class="Nfmensagem">Disse que rola um possivel... <br> <b>Flash Back!</b> </small>
                </div>
                <div class="notification pull-right">
                    <div class="img_classification">
                        <span class="btn  btnModalAcaoMatch" v-tooltip.top-start="'Acão!'" ><i class="fa fa-ellipsis-h" v-on:click="sweetModalSimple();"></i></span>
                        <i class="imgficaria2" v-tooltip.top-start="'Ficaria Novamente'"></i>
                        <span class="Nfdate">{{dataMatch}}</span>
                    </div>
                </div>
            </div>
        </li>
        <!-- Modal Begin -->
            <sweet-modal ref="sweetModalSimple" >O Que Deseja Fazer com: {{name}}
              <div class="list-group modal-body">
                <button type="button" v-on:click="piscadinhaNotify(); sweetModalSuccess();" class="list-group-item"><span class="badge"><img src="/src/assets/img/piscadinha.png"></span>Enviar uma Piscadinha</button>
                <span v-if="isValidWhats == true">
                  <button type="button" v-on:click="whatsAppNotify(); sweetModalSuccess();" class="list-group-item"><span class="badge"><img src="/src/assets/img/whatsapp.png"></span>Enviar WhatsApp</button>
                </span>
                <span v-else>
                  <button type="button" class="list-group-item disabled"><span class="badge"><img src="/src/assets/img/whatsapp.png"></span>Enviar WhatsApp</button>
                </span>
                <button type="button" v-on:click="sweetModalAcao();" class="list-group-item"><span class="badge"><img src="/src/assets/img/closeMatch.png"></span>Desfazer Match</button>
                <div v-show="isValidWhats ==  false">
                  <p id="infoWhats">Para enviar o Número do WhatsApp é nescessário Cadastar em: Perfil/Editar</p>
                </div>
              </div>
            </sweet-modal>
            <!-- modal success  -->
            <sweet-modal icon="success" ref="sweetModalSuccess">
              Feito!
          </sweet-modal>
          <!-- modal acao -->
          <sweet-modal icon="error" ref="sweetModalAcao">
            <p>Tem Certeza que desaja desfazer o Match?</p>

            <button v-on:click="starClickOff(); refreshVue();" role="button" class="btn btn-warning">Desfazer</button>
          </sweet-modal>
        <!-- Modal End -->
      </section>
   </div>
</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
export default{
  props:['name','id','imagem','link','option','user_id','id_fb_friends', 'dataMatch', 'userName', 'userLink', 'userImagem', 'read', 'userNumberWhats'],
    components:{
      SweetModal,
		  SweetModalTab
  },
  data() {
    return {
      efeitoClick: null,
      genderPreference: this.preference,
      optiondata: this.option,
      click: null,
      optionNew: 'ficaria',
      optionOld: 'ficariaNovamente'
    }
  },
  computed:{
    isValidWhats() {
      if(this.userNumberWhats != '' && this.userNumberWhats != null){
        return true;
        document.getElementById("btnWhats").style.display = "none";
      } return false;
    }    

  }, 
  methods: {
    sweetModalSimple(){
      return this.$refs.sweetModalSimple.open();
    },
    sweetModalSuccess(){
      return this.$refs.sweetModalSuccess.open();
    },
    sweetModalAcao(){
      return this.$refs.sweetModalAcao.open();
    },
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
    //Enviar uma Piscadinha
    whatsAppNotify: function(){
      var idFriendsCorrent = this.id_fb_friends
      const fdpsOption = {
        id_fb_friends: this.id_fb_friends,
        name: this.userName,
        imagem: this.userImagem,
        link: this.userLink,
        type: "WhatsApp",
        status: "0",
        text: "Enviou o WhatsApp para você: "+this.userNumberWhats,
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
.readView{box-shadow: 0px 0px 2px 0px #355fe8 !important;}
#infoWhats{font-size: 9px; color: rgb(241, 144, 70); margin-top: 10px;}
</style>


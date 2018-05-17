<template>
  <section>
    <div>
        <div >
          <div v-if="this.statusAPIAPP === true" id="configuracao" class="configuracao col-md-6 container col-md-offset-3 ">
              <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="" role="group" >                     
                      <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>
                      <span class="pull-right"> Config. <i class="glyphicon glyphicon-cog"></i> </span>	   
                    </div>
                </div>
              </div>
                <div id="msgPreference" class="" style="display:none">
                    <span onclick="this.parentElement.style.display='none'"
                      class="pull-right text-success"> <i class="glyphicon glyphicon-remove-circle"></i></span>
                    <strong>OK!</strong> Suas Preferências foram registradas!
                </div>
              <div class="" >
                </br>
                <button type="button" class="btn btn-default btn-lg btn-block" data-toggle="collapse" href="#collapseInteresse" aria-expanded="false" aria-controls="collapseInteresse">Interesses</button>
                <div class="collapse" id="collapseInteresse">
                    <div class="panel-heading">
                      <h4>Interesses</h4>
                      <form class="well" @change="updatePreferencia()">
                          <div>
                            <input class="w3-radio" type="radio" name="preferencia" id="male" value="male" v-model="user.preference">
                            <label for="male" class="fa fa-male"> Homem</label>
                          </div>
                          <div>
                            <input class="w3-radio " type="radio" name="preferencia" id="female" value="female" v-model="user.preference">
                            <label for="female" class="fa fa-female"> Mulher</label>
                          </div>
                          <div>
                            <input class="w3-radio" type="radio" name="preferencia" id="Ambos" value="" v-model="user.preference">
                            <label for="Ambos" class="fa fa-venus-mars"> Ambos</label>
                          </div>
                      </form>
                    </div>
                </div>
                </br>
                <button type="button" class="btn btn-default btn-lg btn-block" data-toggle="collapse" href="#collapsePrivacy" aria-expanded="false" aria-controls="collapsePrivacy">Privacidade</button>
                <div class="collapse" id="collapsePrivacy">
                    <ul class="list-group" @change="updatePreferencia()">
                      <div class="panel-heading">
                          <h4>Privacidade</h4>
                          <div class="">
                            <li class="list-group-item">
                                <label>
                                <input class="w3-radio" type="checkbox" name="flagDisplayCount" id="flagDisplayCount" v-model="user.flagDisplayCount"/>
                                <i class="fa fa-calculator" aria-hidden="true"></i> <span>Exibir Contagem no Perfil</span>
                                </label>
                            </li>
                            <li class="list-group-item">
                                <label>
                                <input class="w3-radio" type="checkbox" name="flagDisplayHot" id="flagDisplayHot" v-model="user.flagDisplayHot"/>
                                <i class="glyphicon glyphicon-fire" aria-hidden="true"></i> <span>Exibir Opção Picante</span>
                                </label>
                            </li>
                          </div>
                      </div>
                    </ul>
                </div>
                </br>
                <button type="button" class="btn btn-default btn-lg btn-block" data-toggle="collapse" href="#collapsePolicies" aria-expanded="false" aria-controls="collapsePolicies">Política</button>
                <div class="collapse" id="collapsePolicies">
                    <div class="panel-heading">
                      <h4>Política</h4>
                      <li class="list-group-item well">
                          <div>                            
                            <span><a href="/termos"><i class="fa fa-link" aria-hidden="true"></i> Termo de Serviço</a></span>
                            <span class="pull-right"><a href="/politicas"><i class="fa fa-link" aria-hidden="true"></i> Políticas</a></span>
                          </div>
                      </li>
                    </div>
                </div>
                </br>
                <button type="button" class="btn btn-default btn-lg btn-block" data-toggle="collapse" href="#collapseAccount" aria-expanded="false" aria-controls="collapseAccount">Conta</button>
                <div class="collapse" id="collapseAccount">
                    <div class="panel-heading">
                      <h4>Conta</h4>
                      <li class="list-group-item well">
                          <div>
                            <span><i class="fa fa-sign-out" aria-hidden="true"></i><a href="/" @click="logout">Sair</a></span>
                            <span class="pull-right"><a href="#"> <i class="fa fa-times-circle-o" aria-hidden="true"></i> Apagar Conta</a></span>
                          </div>
                      </li>
                    </div>
                </div>
              </div>          

                <br><br><br>
                <button type="button" class="btn panel-default btn-lg btn-block" data-toggle="collapse" href="#collapsyAbout" aria-expanded="false" aria-controls="collapsePrivacy">Como Funciona</button>
                <div class="collapse" id="collapsyAbout">
                    <ul class="list-group">
                      <br><aboutComponent></aboutComponent><br>
                    </ul>
                </div>
                <br><br>
                <button type="button" class="btn panel-default btn-lg btn-block" data-toggle="collapse" href="#collapsyContact" aria-expanded="false" aria-controls="collapsePrivacy">Sobre Nós</button>
                <div class="collapse" id="collapsyContact">
                    <ul class="list-group">
                      <div class="panel-heading">
                              <div class="">
                              <br>  
                              <p><h4>CONTATOS</h4>
                              <h5>Quer falar conosco ou nos envie um e-mail.</h5>
                              <p>Fone: 83 3066-2470 / 83 998870611</p>
                              <p> Email: repetecowebapp@gmail.com / tavinhomegas18@gmail.com</p>
                              <br>
                              <h4>PARCERIAS</h4>
                              <h5>Interessado em se tornar parceiro?</h5>
                              <p>Fone: 83 3066-2470 / 83 998870611</p>
                              <p>Email: repetecowebapp@gmail.com / tavinhomegas18@gmail.com</p>
                              <br>
                              <h4>ENDEREÇO</h4>
                              <p>Antonio José Santiago - 215</p>
                              <p>Campina Grande - PB/BR</p>
                              <br>
                              <h4>REDE SOCIAIS</h4>
                              <p><a href="#" target="_blank">Facebook</a></p>
                              <p><a href="#" target="_blank">Instagram</a></p>
                              <p><a href="#" target="_blank">Twitter</a></p>
                              <p><a href="#" target="_blank">WhatsApp</a></p>
                              <br><br>
                          </div>
                      </div>
                    </ul>
                </div>
                <br>
                 <div class="navbar-fixed-bottom ">
                    <p class="text-center "> <h6 class=" text-center copyright">Copyright ©Megas - Todos os direitos reservados - Versão 1.0 - 2018</h6></p>
                    <br><br>
                </div>
                <br><br><br>
          </div>
          <div v-else>
              <br><br><br><br><br><br>
              <reload></reload>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import Reload from "../components/Reload.vue";
import AboutComponent from "../components/AboutComponent.vue";
export default {
    props: ['preference'],
    data() {
        return {
            user: {},
            statusAPIAPP: false
        }
    },
    components: {
        Reload,
        AboutComponent
    },
    created(){
        let vm = this;
        vm.localStoregeFuntion;
    },
    computed: {
        localStoregeFuntion(){
            let vm = this
            var idFBStoragelogado = window.localStorage.getItem('idFBStorage');
            if(idFBStoragelogado != null){
              console.log("Wrapper: [config] - id: "+idFBStoragelogado);
              vm.getApiRepeteco(idFBStoragelogado);
            }else{
              console.log("Wrapper [config] NOK!");
            }
        }
  },
  methods: {
    //WsRepeteco - API GET
    getApiRepeteco(profileId) {
      this.$http.get(this.$urlAPI+`users/${profileId}`).then(response => {
        this.user = response.data
        if (this.user) {
          this.statusAPIAPP = true;
        } else {
          this.statusAPIAPP = false;
          console.log("Erro na chamada da API - Repeteco");
        }
      })
    },
    //PUT API APP Set Preferencia Sexual
    updatePreferencia: function() {
        const setPreference = {
          preference: this.user.preference,
          flagNotificationMatch: this.user.flagNotificationMatch,
          flagNotificationFriends: this.user.flagNotificationFriends,
          flagDisplayCount: this.user.flagDisplayCount,
          flagDisplayHot: this.user.flagDisplayHot
        }
        var userid = this.user.id
        $.ajax({          
            url: (this.$urlAPI+`users/${userid}/preference`),
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'dataType': 'json'
            },
            dataType: 'json',
            crossDomain: true,
            origin: "*",
            processData: true,
            data: JSON.stringify(setPreference)
        });
        document.getElementById("msgPreference").style.display = "block";
    }
  }

}
</script>
<style>
#msgPreference{padding: 0px 20px;}</style>

<template>
<div>
<form>
  <div>
    <div class="form-group">
      <label for="exampleInputName">Nome</label>
      <input type="text" class="form-control" id="exampleInputName" v-model="name" disabled>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email</label>
      <input type="text" class="form-control" id="exampleInputEmail1" placeholder="@email.com" v-model="email">
    </div>
    <div class="form-group">
      <label for="exampleInputWhatsNumber">Numero WhatsApp</label>
      <input type="text" class="form-control" id="exampleInputWhatsNumber" placeholder="(dd) d dddd-dddd" v-model="dataNumberWhats">
    </div>
    <div class="form-group">
      <label for="exampleInputCity">Cidade - UF</label>
      <input type="text" class="form-control" id="exampleInputCity" placeholder="Email"  v-model="city">
    </div>
    <div class="form-group">
      <label for="exampleInputCity">Sexo</label>
      <span v-if="gender === 'male'">
        <input type="text" class="form-control" id="exampleInputSexo" placeholder="Sexo"  value="Masculino" disabled>
      </span>
      <span v-else-if="gender === 'female'">
        <input type="text" class="form-control" id="exampleInputSexo" placeholder="Sexo"  value="Masculino" disabled>
      </span>
    </div>

    <div class="form-group">
      <p class="help-block"></p>
      <a class="" data-toggle="collapse" href="#collapsePerfilEditeMore" aria-expanded="false" aria-controls="collapsePerfilEditeMore" style="font-size: 10px;"><i class="glyphicon glyphicon-edit"/> Mais...</a>
    </div>
      <!-- box Edite perfil Info -->
      <span class="collapse" id="collapsePerfilEditeMore">
            <ul class="list-group box">
                <div class="panel-heading">
                    <div class="">
                      <div class="panel-heading">
                          <label for="exampleCheckPreference">Preferencia:</label><br>
                          <label for="male">
                            <input type="radio" checked="checked" name="radio" value="male" v-model="preference">
                          <i class="checkmark fa fa-male"> Homem</i>
                          </label>

                          <label for="female">
                            <input type="radio" name="radio" value="female" v-model="preference">
                            <i class="checkmark fa fa-female"> Mulher</i>
                          </label>

                          <label for="Ambos" >
                            <input type="radio" name="radio" value="" v-model="preference">
                            <i class="fa fa-venus-mars"> Ambos</i>
                          </label>
                      </div>
                    </div>
                    <div class="panel-heading">
                      <label for="exampleCheckPreference">Privacidades:</label><br>
                      <label>
                        <input class="w3-radio" type="checkbox" name="flagDisplayCount" id="flagDisplayCount" v-model="flagDisplayCount"/>
                        <i class="fa fa-calculator" aria-hidden="true"></i> <span>Exibir Contagem no Perfil</span>
                      </label>

                      <label>
                        <input class="w3-radio" type="checkbox" name="flagDisplayHot" id="flagDisplayHot" v-model="flagDisplayHot"/>
                        <i class="glyphicon glyphicon-fire" aria-hidden="true"></i> <span>Exibir Opção Picante</span>
                      </label>
                  </div>
              </div>
          </ul>
      </span>
  </div>
</form>
<button data-toggle="collapse" href="#collapsePerfilEdite" aria-expanded="false" aria-controls="collapsePerfilEdite" class="btn btn-default ">Cancelar</button>
<button v-on:click="updateUserPerfil(); sweetModalFormSuccess()" data-toggle="collapse" aria-expanded="false" aria-controls="collapsePerfilEdite" class="btn btn-success pull-right">Salvar</button>
<!-- modal perfil -->
    <sweet-modal ref="sweetModalFormSuccess" icon="success"/>
</div>
</template>
<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue';
export default {
    name: '',
    props: ['id','name','email','city','numberWhats','preference', 'gender','flagDisplayCount', 'flagDisplayHot'],
    components:{
      SweetModal,
		  SweetModalTab
  },
    data() {
        return {
          dataNumberWhats: this.numberWhats
        }
    },
    computed:{
        

    },
    methods: {
      sweetModalFormSuccess(){
        return this.$refs.sweetModalFormSuccess.open();
       },
      updateUserPerfil: function() {
        const setUpdateData = {
          preference: this.preference,
          flagNotificationMatch: this.flagNotificationMatch,
          flagNotificationFriends: this.flagNotificationFriends,
          flagDisplayCount: this.flagDisplayCount,
          flagDisplayHot: this.flagDisplayHot,
          numberWhats: this.dataNumberWhats,
          email: this.email,
          city: this.city
        }
        var userId = this.id
        $.ajax({
            url: (`http://localhost:9096/wsrepeteco/users/${userId}/perfilupdate`),
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'dataType': 'json'
            },
            dataType: 'json',
            crossDomain: true,
            origin: "*",
            processData: true,
            data: JSON.stringify(setUpdateData)
        });
        // document.getElementById("msgPreference").style.display = "block";
    }

  },
};

</script>
<style scoped>

</style>
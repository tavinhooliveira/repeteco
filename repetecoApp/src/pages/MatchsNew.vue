<template>
   <div class="pageMatch">
      <section>
         <div v-if="statusAPIAPP === true" id="ListFriends" class="ListFriends container notification">
           <span v-show="contMatchNewMatch != null">
            <div id="searchClassification" class="container searchClassification navbar-fixed-top">
               <input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar...">
            </div>
            <br>
            <div class="btnNotification" role="group" >
               <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span> 
                <div v-show="contMatchNewMatch > 0" class="btn-group pull-right">
                  <div class="btn " data-toggle="collapse" href="#btnCollapseLeft" aria-expanded="false" aria-controls="btnCollapseLeft"><i class="fa fa-ellipsis-h"></i></div>
                  <div id="btnCollapseLeft" class="">
                    <div>					        
                        <router-link to="matchs">Todos |</router-link>
                        <router-link to="matchsOld" v-tooltip.bottom-start="'Um Caso Antigo'">Flash Backs </router-link>
                          <button class="btn btn-default btn-xs" type="button" v-tooltip.bottom-start="'Vizualizado'">
                            <span class="fa fa-eye"></span> 
                          </button>
                          <button class="btn btn-default btn-xs" type="button"  v-tooltip.bottom-start="'Não Vizualizado'">
                            <span class="fa fa-eye-slash"></span>
                          </button>                      
                    </div>                  
                  </div>                 
                </div>
            </div>
            </span>
            <div  class="list-group" id="searchUL">
              <matchNewComponent v-bind:matchs="users.matchs" v-for="matchs in users.matchs" v-bind:key="matchs.id" v-bind:id="matchs.id"
                  v-bind:name="matchs.name" v-bind:imagem="matchs.imagem" v-bind:link="matchs.link" v-bind:gender="matchs.gender"
                  v-bind:option="matchs.option" v-bind:id_fb_friends="matchs.id_fb_friends" v-bind:user_id="matchs.user_id"
                  v-bind:dataMatch="matchs.dataMatch" v-bind:userName="users.name" v-bind:userLink="users.link" v-bind:userImagem="users.imagem" v-bind:read="matchs.read"> 
              </matchNewComponent>
            </div>
            <div v-if="contMatchNewMatch <= 0 || contMatchNewMatch == null">
                <br><p class="text-center">Você não tem Match para essa classificação ☹</p>
            </div>
            <br>
         </div>
         <div v-else><br><br><br><br>
              <reload></reload>
          </div>  
      </section>
   </div>
</template>
<script>
import MatchNewComponent from '../components/MatchNewComponent.vue';
import axios from 'axios';
import Reload from "../components/Reload.vue";

export default{
  name: "NotificationNewMatch",
  props: ["name", "imagem", "option","user_id","link", "matchs", "friends"],
  components:{
    MatchNewComponent,
    Reload,
    axios
    },
  data () {
    return {
      statusAPIAPP: false,
      users: [],
      matchsData: [],
      ApiRepetecoStatus: false
    };
    },
  created(){
    let vm = this;
    vm.localStoregeFuntion;
  },
  computed: {
    localStoregeFuntion(){
        let ch = this
        var idFBStoragelogado = window.localStorage.getItem('idFBStorage');
        if(idFBStoragelogado != null){
        console.log("Wrapper: [Matcrs] - id: "+idFBStoragelogado);
        ch.getApiRepeteco(idFBStoragelogado);
        }else{
        console.log("Wrapper [Matcrs] NOK!");
        }
    },
    contMatchNewMatch() {
      if(this.users.matchs){
        let litrs =[];           
        let list = [];
            for (let i = 0; i < this.users.matchs.length; i++) {
              if(this.users.matchs[i].option === 'ficaria'){
                list = {option: this.users.matchs[i].option}
                    litrs.push(list)
                    }
                }
          return litrs.length    
      }
    }
  },
  methods: {
    getApiRepeteco(userid){
      this.$http.get(this.$urlAPI+`users/${userid}`).then(response => {
        this.ApiRepetecoStatus = response.status			
        if (this.ApiRepetecoStatus === 200) {
            this.users = response.data
            this.statusAPIAPP = true;
            console.log("API Repeteco: OK!")
        } else {
          this.statusAPIAPP = false;
          this.users = 0;
          console.log("Erro na chamada da API - Repeteco");
        }    
      })
    }
  }
};
</script>

<style>

</style>

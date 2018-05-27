<template>
   <div class="pageMatch">
      <section>
        <div v-if="statusAPIAPP === true" id="ListFriends" class="ListFriends container notification">
          <span v-show="contMatchOldMatch != null">
             <searchComponent/>
            <br>
            <div class="btnNotification" role="group" >
               <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span> 
                <div v-show="contMatchOldMatch > 0" class="btn-group pull-right">
                  <div class="btn " data-toggle="collapse" href="#btnCollapseLeft" aria-expanded="false" aria-controls="btnCollapseLeft"><i class="fa fa-ellipsis-h"></i></div>
                  <div id="btnCollapseLeft" class="">
                    <div>					        
                        <router-link to="matchs">Todos |</router-link>
                        <router-link to="matchsNew" v-tooltip.bottom-start="'Um Novo Lance'"> Novo Lance </router-link>
                        <button class="btn btn-default btn-xs" type="button" v-tooltip.bottom-start="'Vizualizado'" v-on:click="showView = true">
                          <span class="fa fa-eye"></span> 
                        </button>
                        <button class="btn btn-default btn-xs" type="button"  v-tooltip.bottom-start="'Não Vizualizado'" v-on:click="showView = false">
                          <span class="fa fa-eye-slash"></span>
                        </button>                      
                    </div>                  
                  </div>                 
                </div>
            </div>
            </span>
            <div  class="list-group" id="searchUL">
             <span v-if="showView == true">
              <readView v-bind:matchs="users.matchs" v-for="matchs in users.matchs" v-bind:key="matchs.id" v-bind:id="matchs.id"
                  v-bind:name="matchs.name" v-bind:imagem="matchs.imagem" v-bind:link="matchs.link" v-bind:gender="matchs.gender"
                  v-bind:option="matchs.option" v-bind:id_fb_friends="matchs.id_fb_friends" v-bind:user_id="matchs.user_id"
                  v-bind:dataMatch="matchs.dataMatch" v-bind:userName="users.name" v-bind:userLink="users.link" v-bind:userImagem="users.imagem" v-bind:read="matchs.read"> 
              </readView>
             </span>
             <span v-else-if="showView == false">
               <notReadView v-bind:matchs="users.matchs" v-for="matchs in users.matchs" v-bind:key="matchs.id" v-bind:id="matchs.id"
                  v-bind:name="matchs.name" v-bind:imagem="matchs.imagem" v-bind:link="matchs.link" v-bind:gender="matchs.gender"
                  v-bind:option="matchs.option" v-bind:id_fb_friends="matchs.id_fb_friends" v-bind:user_id="matchs.user_id"
                  v-bind:dataMatch="matchs.dataMatch" v-bind:userName="users.name" v-bind:userLink="users.link" v-bind:userImagem="users.imagem" v-bind:read="matchs.read">
                </notReadView>
             </span>
             <span v-else-if="showView == 'all'">
                <matchOldComponent v-bind:matchs="users.matchs" v-for="matchs in users.matchs" v-bind:key="matchs.id" v-bind:id="matchs.id"
                  v-bind:name="matchs.name" v-bind:imagem="matchs.imagem" v-bind:link="matchs.link" v-bind:gender="matchs.gender"
                  v-bind:option="matchs.option" v-bind:id_fb_friends="matchs.id_fb_friends" v-bind:user_id="matchs.user_id"
                  v-bind:dataMatch="matchs.dataMatch" v-bind:userName="users.name" v-bind:userLink="users.link" v-bind:userImagem="users.imagem" v-bind:read="matchs.read"> 
                </matchOldComponent>
             </span>


            </div>
            <div v-if="contMatchOldMatch <= 0 || contMatchOldMatch == null"><br><br><br><br>
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
import SearchComponent from "../components/utils/SearchComponent.vue";
import MatchOldComponent from '../components/match/old/MatchOldComponent.vue';
import ReadView from '../components/match/old/ReadView.vue';
import NotReadView from '../components/match/old/NotReadView.vue';
import axios from 'axios';
import Reload from "../components/utils/Reload.vue";
   
   export default{
     name: "NotificationOldMatch",
     props: ["name", "imagem", "option","user_id","link", "matchs", "friends"],
     components:{
   	    MatchOldComponent,
        Reload,
        axios,
        SearchComponent,
        ReadView,
        NotReadView
     },
     data () {
       return {
         statusAPIAPP: false,
         users: [],
         matchsData: [],
         ApiRepetecoStatus: false,
         showView: "all"
       };
     },
  created(){
    let vm = this;
    var idAux = vm.$store.getters.getUseriId;
    vm.getApiRepeteco(idAux);
  },
  computed: {
    isMatch() {
        if(this.users.matchs){
            return true;         
        }else{
            return false;
        }
    },
    contMatchOldMatch() {
      if(this.users.matchs){
        let litrs =[];           
        let list = [];
            for (let i = 0; i < this.users.matchs.length; i++) {
              if(this.users.matchs[i].option === 'ficariaNovamente'){
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
        this.$http.get(this.$urlAPI+`users/${userid}`, {"headers":{"authorization":"Basic "+this.$basicAuthParams}}).then(response => {
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
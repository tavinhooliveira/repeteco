<template >
   <div>
      <div id="ListFriends" class="ListFriends container">
         <div v-if="this.statusAPIAPP === true">
            <div id="searchClassification" class="container searchClassification navbar-fixed-top">
               <input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar...">
            </div>
            <div class="row container">
               <div class="btnNotification">
                  <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span> 
                  
                  <div class="btn-group pull-right">
                     <router-link to="classification"><button type="button" class="btn btn-default" v-tooltip.bottom-start="'Todos'" ><i class="fa fa-star-half-o"> </i></button></router-link>
                     <router-link to="classificationOn"><button type="button" class="btn btn-default active" v-tooltip.bottom-start="'Classificados'" data-transition="slide"><i class="fa fa-star"> </i></button></router-link>
                     <router-link to="classificationOff"><button type="button" class="btn btn-default" v-tooltip.bottom-start="'Não Classificados'"> <i class="fa fa-star-o"></i></button></router-link>
                  </div>
               </div>
            </div>
            <div class="list-group" id="searchUL">
               <userComponentOn v-bind:user="users" v-for="user in users" v-bind:key="user.id" v-bind:name="user.name"
                  v-bind:imagem="user.imagem" v-bind:link="user.link" v-bind:friends="user.friends" v-bind:gender="user.gender"
                  v-bind:friendsTotalFb="user.friendsTotalFb" v-bind:preference="user.preference" v-bind:flagDisplayHot="user.flagDisplayHot">
               </userComponentOn>
            </div>
            </br>
         </div>
         <div v-else>
            <reload></reload>
         </div>
      </div>
   </div>
</template>

<script>
import UserComponentOn from "../components/UserComponentOn.vue";
import Reload from "../components/Reload.vue";
import axios from 'axios';


export default {
  name: "ClassificationOff",
  props: ["name", "imagem", "friends"],
  components: {
    UserComponentOn,
    Reload,
    axios
  },
  data() {
    return {
      nomeProjeto: "ClassificationOn",
      users: {},
      statusAPIAPP: false
    };
  },
  created(){
    let vm = this;
    vm.localStoregeFuntion;
  },
  computed: {
    localStoregeFuntion(){
        let mv = this
        var idFBStoragelogado = window.localStorage.getItem('idFBStorage');
        if(idFBStoragelogado != null){
          console.log("Wrapper: [classificationOn] - id: "+idFBStoragelogado);
          mv.getApiRepeteco(idFBStoragelogado);
        }else{
          console.log("Wrapper [classificationOn] NOK!");
        }
    }
  },
  methods: {
    getApiRepeteco(userid) {
        axios.get(this.$urlAPI+`users/${userid}`).then(response => {
          this.users = [response.data]
          if (this.users.length > 0) {
              console.log("API Repeteco: OK!")
              this.statusAPIAPP = true;
          } else {
              this.statusAPIAPP = false;
              console.log("Erro na chamada da API - Repeteco");
          }
        })
    }
  }
};
</script>
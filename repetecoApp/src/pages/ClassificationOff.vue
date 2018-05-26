<template >
   <div>
      <div id="ListFriends" class="ListFriends container">
         <div v-if="this.statusAPIAPP === true">
            <SearchComponent/>
            <div class="row container">
               <div class="btnNotification">
                  <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span> 
                  
                    <div class="btn-group pull-right">
                        <router-link to="classification"><button type="button" class="btn btn-default" v-tooltip.bottom-start="'Todos'"><i class="fa fa-star-half-o"> </i></button></router-link>
                        <router-link to="classificationOn"><button type="button" class="btn btn-default" v-tooltip.bottom-start="'Classificados'" data-transition="slide"><i class="fa fa-star"> </i></button></router-link>
                        <router-link to="classificationOff"><button type="button" class="btn btn-default active" v-tooltip.bottom-start="'Não Classificados'" ><i class="fa fa-star-o"> </i></button></router-link>
                    </div>
               </div>
            </div>
            <div class="list-group" id="searchUL">
               <userComponentOff v-bind:user="users" v-for="user in users" v-bind:key="user.id" v-bind:name="user.name" v-bind:imagem="user.imagem"
                  v-bind:link="user.link" v-bind:friends="user.friends" v-bind:gender="user.gender" v-bind:friendsTotalFb="user.friendsTotalFb"
                  v-bind:preference="user.preference" v-bind:flagDisplayHot="user.flagDisplayHot"></userComponentOff>
            </div>
            <br>
         </div>
         <div v-else>
            <reload></reload>
         </div>
      </div>
   </div>
</template>

<script>
import SearchComponent from "../components/utils/SearchComponent.vue";
import UserComponentOff from "../components/classification/UserComponentOff.vue";
import Reload from "../components/utils/Reload.vue";
import axios from 'axios';

export default {
  name: "ClassificationOff",
  props: ["name", "imagem", "friends"],
    components: {
        UserComponentOff,
        Reload,
        SearchComponent,
        axios
    },
    data() {
        return {
            nomeProjeto: "ClassificationOff",
            users: {},
            statusAPIAPP: false
        };
    },
    created(){
        let vm = this;
        var idAux = vm.$store.getters.getUseriId;
        vm.getApiRepeteco(idAux);
    },
  methods: {
    getApiRepeteco(userid) {
        axios.get(this.$urlAPI+`users/${userid}`).then(response => {
            this.users = [response.data]
            if (this.users.length > 0) {
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

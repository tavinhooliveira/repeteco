<template >
   <div>       
      <div id="ListFriends" class="ListFriends container">
         <div v-if="this.statusAPIAPP === true">
            <div class="row container">
                <searchComponent/>
               <div  class="btnNotification" >
                    <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>                  
                    <div class="btn-group pull-right">
                     <router-link to="classification"><button type="button" class="btn btn-default active" v-tooltip.bottom-start="'Todos'" ><i class="fa fa-star-half-o"></i></button></router-link>
                     <router-link to="classificationOn"><button type="button" class="btn btn-default " v-tooltip.bottom-start="'Classificados'" data-transition="slide"><i class="fa fa-star"> </i></button></router-link>
                     <router-link to="classificationOff"><button type="button" class="btn btn-default" v-tooltip.bottom-start="'Não Classificados'" ><i class="fa fa-star-o"> </i></button></router-link>
                  </div>
               </div>
            </div>
            <div class="list-group center-block" id="searchUL">
               <userComponent v-bind:user="users" v-for="user in users" v-bind:key="user.id" v-bind:id_fb_users="user.id_fb_users" v-bind:name="user.name" v-bind:imagem="user.imagem"
                  v-bind:link="user.link" v-bind:friends="user.friends" v-bind:gender="user.gender" v-bind:friendsTotalFb="user.friendsTotalFb"
                  v-bind:friendsTotalApp="user.friendsTotalApp" v-bind:preference="user.preference" v-bind:flagDisplayHot="user.flagDisplayHot" v-bind:matchs="user.matchs">
               </userComponent>
            </div>
            <br>
            <reload v-if="this.users <= 0"></reload>
         </div>
         <div v-else>
            <reload></reload>
         </div>
      </div>
   </div>
</template>

<script>

import SearchComponent from "../components/utils/SearchComponent.vue";
import UserComponent from "../components/classification/UserComponent.vue";
import Reload from "../components/utils/Reload.vue";
import axios from 'axios';

export default {
  name: "ClassificationAPP",
  props: ["id", "id_fb_users", "name", "imagem", "preference", "link", "friends", "matchs", "userProfile"],
    components: {
        UserComponent,
        Reload,
        SearchComponent,
        axios
        },
        data() {
            return {
                nomeProjeto: "Classification",
                statusAPIAPP: false,
                users: {},
                ApiRepetecoStatus: false,
                idAux: null
            };
        },
        created(){
            let vm = this;
            var idAux = vm.$store.getters.getUseriId;
            vm.getApiRepeteco(idAux);
        },
        computed: {

    },
    methods: {
        getApiRepeteco(userid) {
            axios.get(this.$urlAPI+`users/${userid}`).then(response => {
                this.users = [response.data]
                this.ApiRepetecoStatus = response.status;
                if (this.ApiRepetecoStatus === 200) {
                    console.log("API Repeteco Users: OK!")
                    this.statusAPIAPP = true;
                } else {
                    this.statusAPIAPP = false;
                    console.log("Erro na chamada da API - Repeteco");
                }
            })
        },

    }
};
</script>
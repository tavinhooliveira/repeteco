<template >
   <div>
      <div id="ListFriends" class="ListFriends container">
         <div v-if="this.statusAPIAPP === true">
            <div class="row container">
                <searchComponent/>
               <div  class="btnNotification" >
                    <span> <a onclick="history.go(-1)" style="cursor:pointer"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span> 
                    <span style="cursor:pointer; font-size: 11px;" @click="sortUsers('name')"><i class="glyphicon glyphicon-sort-by-alphabet"></i></span>
                    <i style="font-size: 11px;" class="fa fa-users"> {{contFriends}}</i>            
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
         <span v-else-if="this.statusAPIAPP === 500">
             <internalServerComponent/>
         </span>
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
import InternalServerComponent from "../components/utils/InternalServerComponent.vue";
import axios from 'axios';

export default {
  name: "ClassificationAPP",
  props: ["id", "id_fb_users", "name", "imagem", "preference", "link", "friends", "matchs", "userProfile"],
    components: {
        UserComponent,
        Reload,
        SearchComponent,
        InternalServerComponent,
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
        contFriends() {
            return this.users[0].friends.length
        }
    },
    methods: {
        sortUsers: function(chave) {
            this.users[0].friends.sort(function(a, b) {
            return a[chave].localeCompare(b[chave])
            });
        },
        getApiRepeteco(userid) {
            axios.get(this.$urlAPI+`users/${userid}`, {"headers":{"authorization":"Basic "+this.$basicAuthParams}})
            .then(response => {
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
            .catch(e => {
                console.log(e,"Erro! Tente novamente mais tarde!")
                this.statusAPIAPP = 500;
            })
        }
    },
};
</script>
<template>
   <div>
      <section>
         <div v-if="this.statusApiRepeteco === true && this.statusApiRepetecoAll === true" id="ListFriends" class="ListFriends container notification">
            <searchComponent/>            
            <div  class="list-group" id="searchUL">
               <matchesRecordComponent v-bind:user="users" v-for="user in users" v-bind:key="user.id" v-bind:id_fb_users="user.id_fb_users" v-bind:name="user.name" v-bind:imagem="user.imagem" v-bind:user_id="user.user_id"
                  v-bind:link="user.link" v-bind:friends="user.friends" v-bind:gender="user.gender" v-bind:friendsTotalFb="user.friendsTotalFb"
                  v-bind:friendsTotalApp="user.friendsTotalApp" v-bind:preference="user.preference" v-bind:flagDisplayHot="user.flagDisplayHot" v-bind:numberWhats="user.numberWhats" v-bind:matchs="user.matchs"  v-bind:friendsAll="friendsAll">
               </matchesRecordComponent>
            </div>
          </div>
            <div v-else><br><br><br><br>
               <reload></reload>
            </div>   
      </section>
   </div>
</template>
<script>
import SearchComponent from "../components/utils/SearchComponent.vue";
import MatchesRecordComponent from '../components/match/MatchesRecordComponent.vue';
import Reload from "../components/utils/Reload.vue";

export default {
  name: "Notificatiob",
  props: ["name", "imagem", "option", "user_id", 'item', 'id', 'dataMatch'],
  components: {
    Reload,
    MatchesRecordComponent,
    SearchComponent
  },
  data() {
        return {
        nomeProjeto: "Matcrs",
        matchs: {},
        statusApiRepeteco: false,
        statusApiRepetecoAll: false,
        friendsAll: [],
        users: [],
        matchs: []

        };
    },
    created(){
        let vm = this;
        vm.localStoregeFuntion;
    },
    computed: {
        isMatch() {
            if(this.users.matchs){
                return true;         
            }else{
                return false;
            }
        },
        localStoregeFuntion(){
            let mv = this
            var idFBStoragelogado = window.localStorage.getItem('idFBStorage');
            if(idFBStoragelogado != null){
                console.log("Wrapper: [Matcrs] - id: "+idFBStoragelogado);
                mv.getApiRepeteco(idFBStoragelogado);
                mv.getApiRepetecoFriendsAll()
            }else{
                console.log("Wrapper [Matcrs] NOK!");
            }
        }
    
    },
    methods: {    
        getApiRepetecoFriendsAll() {
        this.$http.get(this.$urlAPI+`friends`).then(response => {
            this.friendsAll = response.data
            if (this.friendsAll.length > 0) {
                console.log("API Repeteco AllFriends: OK!")
                this.statusApiRepetecoAll = true;
            } else {
                this.statusApiRepetecoAll = false;
                console.log("Erro na chamada da API - AllFriends");
            }
        })
        },
        getApiRepeteco(userid) {
            this.$http.get(this.$urlAPI+`users/${userid}`).then(response => {
                this.users = [response.data]
                if (this.users.length > 0) {
                    console.log("API Repeteco: OK!")
                    this.statusApiRepeteco = true;
                } else {
                    this.statusApiRepeteco = false;
                    console.log("Erro na chamada da API - Repeteco");
                }
            })
        }
    }
};
</script>
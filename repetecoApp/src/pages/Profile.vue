<template>
   <div>
      <div>
         <div v-if="this.statusAPIAPP === true">
            <section>
               <profileComponent v-for="profileinfo in users" v-bind:key="profileinfo.id" v-bind:id="profileinfo.id" v-bind:city="profileinfo.city"
                  v-bind:name="profileinfo.name" v-bind:imagem="profileinfo.imagem" v-bind:link="profileinfo.link" v-bind:id_fb_users="profileinfo.id_fb_users"
                  v-bind:friendsTotalFb="profileinfo.friendsTotalFb" v-bind:friendsTotalApp="profileinfo.friendsTotalApp" v-bind:flagDisplayHot="profileinfo.flagDisplayHot"
                  v-bind:flagDisplayCount="profileinfo.flagDisplayCount" v-bind:friends="profileinfo.friends" v-bind:notification="profileinfo.notification"  v-bind:friendsAll="friendsAll">
               </profileComponent>               
            </section>
         </div>
         <div v-else>
            <br><br><br><br><br>
            <reload></reload>
         </div>
      </div>
       {{localStoregeFuntion}}
   </div>
</template>

<script>
import ProfileComponent from '../components/ProfileComponent.vue';
import UserComponent from '../components/UserComponent.vue';
import FriendComponent from '../components/FriendComponent.vue';
import Reload from '../components/Reload.vue';

export default {
  name: 'Profile',
  props: ['id', 'name', 'imagem', 'link', 'friends', 'city', 'id_fb_users'],
  components: {
    ProfileComponent,
    FriendComponent,
    UserComponent,
    Reload
  },
  data() {
      return {
        nomeProjeto: 'Perfil',
        users: [],
        statusAPIAPP: false,
        intervalo: null,
        friendsAll: [],
        getApiRepetecoStatus: 500
      }
  },
  computed: {
        localStoregeFuntion(){
            let ch = this
            var idFBStoragelogado = window.localStorage.getItem('idFBStorage');
            if(idFBStoragelogado != null){
            console.log("Wrapper: [Profile] - id: "+idFBStoragelogado);
            ch.getApiRepeteco(idFBStoragelogado);
            ch.getApiRepetecoFriendsAll();
            }else{
            console.log("Wrapper [Profile] NOK!");
            }
        }
    },
  methods: {
    //usado para extrair o id dos amigos que deram match!
    getApiRepetecoFriendsAll() {
        this.$http.get(`http://localhost:9096/wsrepeteco/friends`).then(response => {
            this.friendsAll = response.data
            if (this.friendsAll.length > 0) {
                console.log("API Repeteco AllFriends: OK!")
                this.statusAPIAPP = true;
            } else {
                this.statusAPIAPP = false;
                console.log("Erro na chamada da API - Repeteco");
            }
        })
    },
    //API repeteco lista de user corrente                    
    getApiRepeteco(userid) {
        this.$http.get(`http://localhost:9096/wsrepeteco/users/${userid}`).then(response => {
            this.getApiRepetecoStatus = response.status
            if (this.getApiRepetecoStatus === 200) {
                this.users = [response.data];
                this.statusAPIAPP = true;
                console.log("API Repeteco: OK!")
            } else {
                this.users = 0;
                this.statusAPIAPP = false;
                console.log("Erro na chamada da API - Repeteco");
            }
        })
    }
  }
};
</script>
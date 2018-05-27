<template>
   <div>
        <div>
            <div v-if="this.statusAPIAPP === true">
                <section>
                    <profileComponent v-for="profileinfo in users" v-bind:key="profileinfo.id" v-bind:id="profileinfo.id" v-bind:city="profileinfo.city"
                        v-bind:name="profileinfo.name" v-bind:imagem="profileinfo.imagem" v-bind:link="profileinfo.link" v-bind:id_fb_users="profileinfo.id_fb_users"
                        v-bind:friendsTotalFb="profileinfo.friendsTotalFb" v-bind:friendsTotalApp="profileinfo.friendsTotalApp" v-bind:flagDisplayHot="profileinfo.flagDisplayHot"
                        v-bind:flagDisplayCount="profileinfo.flagDisplayCount" v-bind:numberWhats="profileinfo.numberWhats" v-bind:email="profileinfo.email" v-bind:gender="profileinfo.gender"  v-bind:preference="profileinfo.preference"
                        v-bind:friends="profileinfo.friends" v-bind:notification="profileinfo.notification"  v-bind:friendsAll="friendsAll">
                    </profileComponent>  
                </section>
            </div>
            <div v-else>
                <br><br><br><br><br>
                <reload></reload>
            </div>
        </div>
   </div>
</template>

<script>
import ProfileComponent from '../components/profile/ProfileComponent.vue';
import Reload from '../components/utils/Reload.vue';
import axios from 'axios';
export default {
  name: 'Profile',
  props: ['id', 'name', 'email', 'imagem', 'link', 'friends', 'city', 'id_fb_users', 'gender','numberWhats'],
  components: {
    ProfileComponent,
    Reload,
    axios
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
    created(){
        let vm = this;
        var idAux = vm.$store.getters.getUseriId;
        vm.getApiRepeteco(idAux);
        vm.getApiRepetecoFriendsAll();
    },
    methods: {
        //usado para extrair o id dos amigos que deram match!
        getApiRepetecoFriendsAll() {
            axios.get(this.$urlAPI+`friends`, {"headers":{"authorization":"Basic "+this.$basicAuthParams}}).then(response => {
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
            axios.get(this.$urlAPI+`users/${userid}`, {"headers":{"authorization":"Basic "+this.$basicAuthParams}}).then(response => {
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
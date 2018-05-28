<template>
    <div id="app">        
        <span>
            <header class="navbar-fixed-top navbar-default">
                <header-component :imagem="usersData.imagem"/>
            </header>
            <router-view> </router-view>
            <footer-component :varcoutNotificationNotRead="coutNotificationNotRead" :varcoutMatchsNotRead="coutMatchsNotRead" />
        </span>         
        <span id="goTop" v-on:click="scrolltop();"  data-toggle="tooltip" data-placement="top" title="Topo"></span>
    </div>
</template>

<script>
import axios from 'axios';
import ReloadAuthorizedComponent from "./components/utils/ReloadAuthorizedComponent.vue";
import HeaderComponent from './components/template/HeaderComponent.vue';
import FooterComponent from './components/template/FooterComponent';
export default {
    name: 'wrapper',
    components:{
        axios,
        ReloadAuthorizedComponent,
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            usersData: [],
            storeResponseAuth: false,
            storeUserId: false,
            userAuxStatus: false         
        }
    },
    created(){
        let vm = this;
        vm.localStoregeFuntion;
        vm.getStoreAuthUser;
            
    },
    computed: {
        //Recuperando Usuario/Authenticação da Sessão
        getStoreAuthUser(){
            let vm = this;
            let userAux = vm.$store.getters.getAuth;
                if(userAux){
                    vm.userAuxStatus = vm.$store.getters.getAuthStatus;
                    if(vm.userAuxStatus == 'connected'){
                        vm.storeResponseAuth = vm.$store.getters.getAuth;
                        vm.storeUserId = vm.$store.getters.getUseriId;
                        vm.getUsers(vm.storeUserId);
                    }else{
                        this.$router.push('/');
                    }
                }else{
                    this.$router.push('/');
                }
        },
        //Quantidade de Matchs       
        coutMatchs() {
            if(this.usersData.matchs){
                return this.usersData.matchs.length;         
            }else{
                return 0;
            }
        },
        //Recupera a quantidade de Notificação
        coutNotification() {
            if(this.usersData.notification){
                return this.usersData.notification.length;         
            }else{
                return 0;
            }
        },
        //Recuperado a quantidade de Notificação NÃO lidas (status)!
        coutNotificationNotRead() {
            if(this.usersData.notification){
                let litrs =[];           
                let list = [];
                    for (let i = 0; i < this.usersData.notification.length; i++) {
                        if(this.usersData.notification[i].status === '0'){
                            list = {status: this.usersData.notification[i].status}
                            litrs.push(list)
                            }
                        }
                return litrs.length
            }          
        },
        //Recuperado a quantidade de Matchs NÃO lidos (read)!
        coutMatchsNotRead() {
            if(this.usersData.matchs){
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.usersData.matchs.length; i++) {
                    if(this.usersData.matchs[i].read === '0'){
                        list = {read: this.usersData.matchs[i].read}
                        litrs.push(list)
                        }
                    }
            return litrs.length           
            } 
        }               
    },
    methods: {
        //Recuperando a informações de usuario da API.
        getUsers(userid){
            axios.get(this.$urlAPI+`/users/${userid}`, {"headers":{"authorization":"Basic "+this.$basicAuthParams}})
            .then(response => {
                this.usersStatus = response.status;
                if (this.usersStatus === 200) {
                    this.usersData = response.data                    
                } else {
                    this.usersData = []
                    console.log("Not Wrapper GetUsers");
                }
            })
        },
        //Voltar ao topo
        scrolltop: function(){
            window.scrollTo(0, 0);
        }        
        
     }
 
}
</script>

<style>
.btnNotificationNewMatch{position:fixed;float:bottom;bottom:0px;right:15px;z-index:100}
.btnNotificationNewMatchBtn .btnNotificationNewMatchInput{display:inline-block; z-index: 99999}
.btnPrincipal{font-size:18px;padding:15px;margin-bottom:30px}
.btnColor:hover{color:#f31d1b;font-size:24px}
.btnNotify {font-size: 9px; margin-top: -29px; margin-left: -8px; background-color: #f25655d1;}

#goTop {
    position: fixed; margin-left: 1000px; top: 88%;height: 35px;right: -8px;width: 60px;opacity: 0.1;cursor: pointer;
    background: url(/src/assets/img/arrowtop.png) no-repeat;-moz-transition: opacity 300ms linear;-ms-transition: opacity 300ms linear;
    transition: opacity 300ms linear; -webkit-transition: opacity 300ms linear;z-index: 9999;
}
</style>







    


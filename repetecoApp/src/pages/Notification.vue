<template >
   <div>
      <div>
        <br><br><br>
        <div class="panel-heading col-md-6 col-md-offset-3">
                <div class="" role="group" >                     
                    <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>  
                </div>
        </div>
        <div id="notify" class="col-md-6 container panel col-md-offset-3">
            <div class="list-group">
                <div class="panel-heading">
                    <h4>Notificações: <span>{{coutNotification}}</span></h4>
                    <div v-show="coutNotification != 0" class="pull-right notificationView" >
                        <button class="btn btn-default btn-xs" type="input"  value="true" v-tooltip.bottom-start="'Vizualizado'" v-on:click="showView = true">
                            <span class="fa fa-eye" value="true"></span> 
                        </button>
                        <button class="btn btn-default btn-xs" type="button" value="false"  v-tooltip.bottom-start="'Não Vizualizado'" v-on:click="showView = false">
                            <span class="fa fa-eye-slash" value="false"></span>
                        </button>  
                    </div>
                    <div v-if="this.statusNotification === true">                        
                        <span v-if="showView == true">
                            <NReadTrue v-bind:notification="notificationData" v-for="notification in notificationData" v-bind:key="notification.id" v-bind:id="notification.id" v-bind:name="notification.name" v-bind:link="notification.link"
                                v-bind:imagem="notification.imagem" v-bind:type="notification.type" v-bind:text="notification.text" v-bind:status="notification.status" v-bind:dateNotify="notification.dateNotify">
                            </NReadTrue>
                        </span>
                        <span v-else-if="showView == false">
                            <NReadFalse v-bind:notification="notificationData" v-for="notification in notificationData" v-bind:key="notification.id" v-bind:id="notification.id" v-bind:name="notification.name" v-bind:link="notification.link"
                                v-bind:imagem="notification.imagem" v-bind:type="notification.type" v-bind:text="notification.text" v-bind:status="notification.status" v-bind:dateNotify="notification.dateNotify">
                            </NReadFalse>
                        </span>
                        <span v-else-if="showView == 'all'">
                        <NotificationComponent v-bind:notification="notificationData" v-for="notification in notificationData" v-bind:key="notification.id" v-bind:id="notification.id" v-bind:name="notification.name" v-bind:link="notification.link"
                            v-bind:imagem="notification.imagem" v-bind:type="notification.type" v-bind:text="notification.text" v-bind:status="notification.status" v-bind:dateNotify="notification.dateNotify">
                        </NotificationComponent>
                        </span>
                                        
                    <div v-show="coutNotification === 0">
                        <p class="text-center">Nehuma Notificação no momento!</p>
                    </div>
                    </div>
                    <div v-else>
                        <reload></reload>
                    </div>                   
                </div>
            </div>
        </div>  
      </div>
   </div>
</template>

<script>

import NReadTrue from "../components/notification/NReadTrue.vue";
import NReadFalse from "../components/notification/NReadFalse.vue";
import NotificationComponent from "../components/notification/NotificationComponent.vue";
import Reload from "../components/utils/Reload.vue";
import axios from 'axios';

export default {
  name: "Notification",
  props: ['notification' ],
    components: {
        Reload,
        NotificationComponent,
        NReadTrue,
        NReadFalse,
        axios
    },
    data() {
        return {
        notificationData: [],
        statusNotification: null,
        notificationDataStatus: null,
        showView: "all"
        };
    },
    created(){
        let vm = this;
        var idAux = vm.$store.getters.getUseriId;
        vm.getNotificationAPI(idAux);
    },
    computed:{
        coutNotification() {
            if(this.notificationData){
                return this.notificationData.length;         
            }else{
                return 0;
            }
        } 
    }, 
    methods: {
        //Recuperado os Matchs
        getNotificationAPI(userid){
            axios.get(this.$urlAPI+`users/${userid}/notification`)        
            .then(response => {
            this.notificationData = response.data
            this.notificationDataStatus = response.status
                if (this.notificationDataStatus === 200) {
                    this.statusNotification = true;
                } else {
                    console.log("API notificationData: - Not notificationData");
                    this.notificationData = false
                }
            })
        }
    }
};
</script>
<style>
.notificationView{margin-top: -35px;}
</style>

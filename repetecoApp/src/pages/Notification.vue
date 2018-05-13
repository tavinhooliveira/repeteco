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
                    <h4>Notificações:<span>{{coutNotification}}</span></h4>
                    <div class="pull-right notificationView">
                        <button class="btn btn-default btn-xs" type="button" v-tooltip.bottom-start="'Vizualizado'">
                            <span class="fa fa-eye"></span> 
                          </button>
                          <button class="btn btn-default btn-xs" type="button"  v-tooltip.bottom-start="'Não Vizualizado'">
                            <span class="fa fa-eye-slash"></span>
                          </button>  
                    </div>
                    <div v-if="this.statusNotification === true">
                        <NotificationComponent v-bind:notification="notificationData" v-for="notification in notificationData" v-bind:key="notification.id" v-bind:id="notification.id" v-bind:name="notification.name" v-bind:link="notification.link"
                            v-bind:imagem="notification.imagem" v-bind:type="notification.type" v-bind:text="notification.text" v-bind:status="notification.status" v-bind:dateNotify="notification.dateNotify">
                        </NotificationComponent>                 
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
        {{localStoregeFuntion}}  
      </div>
   </div>
</template>

<script>
import NotificationComponent from "../components/NotificationComponent.vue";
import Reload from "../components/Reload.vue";
import axios from 'axios';

export default {
  name: "Notification",
  props: ['notification'],
  components: {
      Reload,
      NotificationComponent,
      axios
  },
  data() {
    return {
      notificationData: [],
      statusNotification: null,
      notificationDataStatus: null
    };
  },
  computed:{
    localStoregeFuntion(){
        let ch = this
        var idFBStoragelogado = window.localStorage.getItem('idFBStorage');
        if(idFBStoragelogado != null){
        console.log("Wrapper: [Matcrs] - id: "+idFBStoragelogado);
        ch.getNotificationAPI(idFBStoragelogado);
        }else{
        console.log("Wrapper [Matcrs] NOK!");
        }
    },
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
    axios.get(`http://localhost:9096/wsrepeteco/users/${userid}/notification`)
        .then(response => {
            this.notificationData = response.data
            this.notificationDataStatus = response.status
            if (this.notificationDataStatus === 200) {
                console.log("API notificationData: OK!")
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

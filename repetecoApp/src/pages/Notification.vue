<template >
   <div>
      <div v-if="!authorized">
         <ReloadAuthorizedComponent></ReloadAuthorizedComponent>
      </div>
      <div v-else>
        <br><br><br>
        <div class="panel-heading col-md-6 col-md-offset-3">
                <div class="" role="group" >                     
                    <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>
                    <span class="pull-right"><i class="fa fa-bell fa-red"></i> </span>	   
                </div>
        </div>
        <div id="notify" class="col-md-6 container panel col-md-offset-3">
            <div class="list-group">
                <div class="panel-heading">
                    <h4>Notificações:</h4>
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
      </div>
   </div>
</template>

<script>
import NotificationComponent from "../components/NotificationComponent.vue";
import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";
import Reload from "../components/Reload.vue";
import axios from 'axios';

export default {
  name: "Notification",
  props: ['notification'],
  components: {
      Reload,
      ReloadAuthorizedComponent,
      NotificationComponent,
      axios
  },
  data() {
    return {
      authorized: false,
      notificationData: [],
      statusNotification: null,
      notificationDataStatus: null
    };
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
    statusChangeCallback(response) {
        let vm = this
        if (response.status === 'connected') {
        var idFb = response.authResponse.userID
            console.log("Usuario Autorizado!");
            console.log("Status: Connectado!")
            vm.authorized = true
            vm.getNotificationAPI(idFb);
        } else if (response.status === 'not_authorized') {
            console.log("Status: Não Autorizado!");
            vm.authorized = false
        } else if (response.status === 'unknown') {
            vm.authorized = false
        } else {
            vm.authorized = false
        }       
    },          //Recuperado os Matchs
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
  },
  mounted() {
    let vm = this
    window.fbAsyncInit = function() {
        FB.init({
            appId: '175578203007671',
            cookie: true,
            xfbml: true,
            version: 'v2.10'
        });
        FB.getLoginStatus(response => {
            vm.statusChangeCallback(response)
        })
    };
  }

};
</script>
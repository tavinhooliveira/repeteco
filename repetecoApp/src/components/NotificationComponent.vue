<template >
   <div>
    <li v-if="statusData === '1'" class="list-group-item itemNotificationRead">
        <span>
            <img class="imgNotificatioCirculo"  v-bind:src="imagem" style='height: 40px; width: 40px;'>
            <span>
            <i v-if="type === 'Match'" class="fa fa-heartbeat" aria-hidden="true"></i>
            <i v-if="type === 'Novo Amigo'" class="fa fa-user-plus" aria-hidden="true"></i>
            <i v-if="type === 'Piscadinha'" class="fa fa-eye" aria-hidden="true"></i>
            <i v-if="type != 'Novo Amigo' && type != 'Match' && type != 'Piscadinha'" class="fa fa-info-circle" aria-hidden="true"></i>            
            </span>
           <a v-tooltip.top-start="'Vizualizar Perfil no Facebook!'" v-bind:href="link" target="_blank">{{name}}</a> -
            {{text}}
            <span class="pull-right btnDate">
                <span id="dataNotify">{{dateNotify}}</span>
                <i v-on:click="deleteNotificationRead(); " class="glyphicon glyphicon-remove" v-tooltip.top-start="'Deletar Notificação'"></i>    
            </span>
        </span>
    </li>
    <li v-if="statusData === '0'" v-on:click="starClickRead();" class="list-group-item itemNotification">
        <span>
            <img class="imgNotificatioCirculo"  v-bind:src="imagem" style='height: 40px; width: 40px;'>
            <span>
            <i v-if="type === 'Match'" class="fa fa-heartbeat" aria-hidden="true"></i>
            <i v-if="type === 'Novo Amigo'" class="fa fa-user-plus" aria-hidden="true"></i>
            <i v-if="type === 'Piscadinha'" class="fa fa-eye" aria-hidden="true"></i>
            <i v-if="type != 'Novo Amigo' && type != 'Match' && type != 'Piscadinha'" class="fa fa-info-circle" aria-hidden="true"></i>             
            </span>
            <a v-tooltip.top-start="'Vizualizar Perfil no Facebook!'" v-bind:href="link" target="_blank">{{name}}</a> - 
            {{text}}
            <span class="pull-right btnDate">
                <span id="dataNotify">{{dateNotify}}</span>
                <i class="glyphicon glyphicon-record " v-tooltip.top-start="'Marcar Como Lida'"></i>     
            </span>
        </span>
    </li>       
   </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "NotificationComponent",
  props: ['id', 'id_fb_friends', 'name','imagem','link','type','status','text','dateNotify','user_id'],
  components: {
    axios

  },
  data() {
    return {
        statusData: this.status
    };
  },
  methods: {
    starClickRead: function() {
      this.statusData = 1;
      const fdStatus = {
        status: this.statusData
      }
      var notifyId = this.id;
      $.ajax({
        url: "http://localhost:9096/wsrepeteco/notification/status/" + notifyId,
        method: "PUT",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json'
        },
        dataType: 'json',
        crossDomain: true,
        origin: "*",
        processData: true,
        data: JSON.stringify(fdStatus)
      });
      this.efeitoClick = 'transition: opacity .5s; color: red; transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);'
      this.refreshVue();
    },
    deleteNotificationRead: function() {
      this.statusData = null;
      var notifyId = this.id;
      $.ajax({
        url: "http://localhost:9096/wsrepeteco/notification/delete/" + notifyId,
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'dataType': 'json'
        },
        dataType: 'json',
        crossDomain: true,
        origin: "*",
        processData: true
      });
    },
    refreshVue: function(){
      window.location.reload();
    }
    
  }
};
</script>

<style>
#dataNotify{font-size: 8px; color: #afa8a8;}
.itemNotification{margin-bottom: 2px; background-color: #eeeeee85; margin-top: 5px;}
.imgNotificatioCirculo{border-radius: 20px;}
.itemNotificationRead{margin-bottom: 2px; background-color: #dbfffa21; margin-top: 5px;}
</style>

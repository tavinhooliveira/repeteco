<template >
   <div>
    <li v-if="statusData === '1'" class="list-group-item itemNotificationRead">
        <span>
            <img class="imgNotificatioCirculo"  v-bind:src="imagem || `/src/assets/img/man.jpg`" style='height: 40px; width: 40px;'>
            <span>
            <i v-if="type === 'Match'" class="fa fa-heartbeat" aria-hidden="true"></i>
             <i v-if="type === 'WhatsApp'" class="fa fa-whatsapp" aria-hidden="true"></i>
            <i v-if="type === 'Novo Amigo'" class="fa fa-user-plus" aria-hidden="true"></i>
            <i v-if="type === 'Piscadinha'" class="fa fa-eye" aria-hidden="true"></i>
            <i v-if="type != 'Novo Amigo' && type != 'Match' && type != 'Piscadinha' && type != 'WhatsApp'"  class="fa fa-info-circle" aria-hidden="true"></i>            
            </span>
           <a v-tooltip.top-start="'Vizualizar Perfil no Facebook!'" v-bind:href="link" target="_blank">{{name}}</a> -
            {{text}}
            <span class="pull-right btnDate">
                <span id="dataNotify">{{dateNotify}}</span>
                <i v-on:click="deleteNotificationRead(); " class="glyphicon glyphicon-remove" v-tooltip.top-start="'Deletar Notificação'"></i>    
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

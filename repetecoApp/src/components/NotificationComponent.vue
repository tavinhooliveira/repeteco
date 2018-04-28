<template >
   <div>
    <li v-if="status === '1'" class="list-group-item itemNotificationRead">
        <span>
            <img class="imgNotificatioCirculo"  v-bind:src="imagem" style='height: 40px; width: 40px;'>
            <span><b>{{type}}: </b></span><a v-bind:href="link" target="_blank">{{name}}</a> - 
            {{text}}
            <i class="fa fa-heartbeat" aria-hidden="true"></i>
            <span class="pull-right">
                <span id="dataNotify">{{dateNotify}}</span>
                <i class="glyphicon glyphicon-record " v-tooltip.top-start="'Marcar Como Lida'"></i>    
            </span>
        </span>
    </li>
    <li v-if="status === '0'" class="list-group-item itemNotification">
        <span>
            <img class="imgNotificatioCirculo"  v-bind:src="imagem" style='height: 40px; width: 40px;'>
            <span><b>{{type}}: </b></span><a v-bind:href="link" target="_blank">{{name}}</a> - 
            {{text}}
            <i class="fa fa-heartbeat" aria-hidden="true"></i>
            <span class="pull-right">
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

    };
  },
  methods: {

  }
};
</script>

<style>
#dataNotify{font-size: 8px; color: #afa8a8;}
.itemNotification{margin-bottom: 2px; background-color: #eeeeee85; margin-top: 5px;}
.imgNotificatioCirculo{border-radius: 20px;}
.itemNotificationRead{}
</style>

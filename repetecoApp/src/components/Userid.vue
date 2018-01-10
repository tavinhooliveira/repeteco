<template>
<div>
    <notification v-for="notification in friends" v-bind:key="notification.id" v-bind:name="notification.name" v-bind:imagem="notification.imagem" v-bind:link="notification.link" v-bind:friendsTotalFb="notification.friendsTotalFb" v-bind:option="notification.option" v-bind:friends="notification.friends"></notification>
</div> 
</template>

<script>
import Notification from './Notification.vue';

export default {
  props: ['name','id','id_fb_users','friends'],
  name: 'userid',
   components:{
     Notification  
   },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>
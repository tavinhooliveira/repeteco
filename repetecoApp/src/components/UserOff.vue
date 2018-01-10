<template>
<div>
  <friendOff v-for="friend in friends" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem" v-bind:link="friend.link" v-bind:city="friend.city" v-bind:nationality="friend.nationality" v-bind:option="friend.option" v-bind:gender="friend.gender"></friendOff>
</div>  
</template>

<script>
import FriendOff from './FriendOff.vue';

export default{
  props:['name','imagem','link','nationality','friends'],
  components:{
    FriendOff
  },
  methods:{

  }
}

</script>

<style lang="scss">
.userProfile a{text-decoration: none; padding-right: 10px; }
.userProfile img{
    width: 40px;
    height: 40px;
    border-radius: 41px;
    border: 4px solid rgba(163, 173, 183, 0.54) !important;
    background: #fff;
    margin-left: 10px;
}
</style>
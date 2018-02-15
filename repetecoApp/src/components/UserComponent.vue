<template>
  <div>
    <div>
      <friendComponent v-for="friend in friends" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem"
        v-bind:link="friend.link" v-bind:city="friend.city" v-bind:nationality="friend.nationality" v-bind:option="friend.option"
        v-bind:id_fb_friends="friend.id_fb_friends" v-bind:gender="friend.gender" v-bind:preference="preference" v-bind:flagDisplayHot="flagDisplayHot">
      </friendComponent>
    </div>
    <p v-if="friends.length <= 0"class="text-center">Nenhum amigo encontrado! ☹</p> 
  </div>  
</template>
<script>
import FriendComponent from './FriendComponent.vue';
export default{
  props:['name','imagem','link','nationality','friendsTotalFb','friends','preference','flagDisplayHot'],
  components:{
    FriendComponent
  }
}
</script>
<style lang="scss">
.userProfile a{text-decoration: none; padding-right: 10px; }
.userProfile img{width: 40px;height: 40px;border-radius: 41px;border: 4px solid rgba(163, 173, 183, 0.54) !important;background: #fff;margin-left: 10px;}
</style>
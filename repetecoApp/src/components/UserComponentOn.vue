<template>
   <div>
      <div >
         <friendComponentOn v-if="friend.option != null" v-for="friend in friends" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem" v-bind:link="friend.link" v-bind:city="friend.city" v-bind:nationality="friend.nationality" v-bind:option="friend.option" v-bind:id_fb_friends="friend.id_fb_friends" v-bind:gender="friend.gender" v-bind:preference="preference"></friendComponentOn>
   </div>
   </div>
</template>
<script>
   import FriendComponentOn from './FriendComponentOn.vue';
   
   export default{
     props:['name','imagem','link','nationality','friendsTotalFb','friends', 'preference'],
     components:{
       FriendComponentOn
     },
     methods:{
       userPreferenceApp: function(){
         var userPreference = this.users[0].preference;
         console.log("user preference gender", userPreference)
         return userPreference; 
       },
       friendPreferenceApp: function(){
         var friendPreference = this.users[0].friends[0].gender;
         console.log("friends gender", friendPreference)
         return friendPreference; 
       }
     }
   }
   
</script>
<style lang="scss">
   .userProfile a{text-decoration: none; padding-right: 10px; }
   .userProfile img{width: 40px;height: 40px;border-radius: 41px;border: 4px solid rgba(163, 173, 183, 0.54) !important;background: #fff;margin-left: 10px;}
</style>
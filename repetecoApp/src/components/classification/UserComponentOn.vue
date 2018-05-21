<template>
  <div>
    <div>
      <friendComponentOn v-if="friend.option != null" v-for="friend in friends" v-bind:key="friend.id" v-bind:id="friend.id" v-bind:name="friend.name" 
        v-bind:imagem="friend.imagem" v-bind:link="friend.link" v-bind:city="friend.city" v-bind:nationality="friend.nationality"
        v-bind:option="friend.option" v-bind:id_fb_friends="friend.id_fb_friends" v-bind:gender="friend.gender"
        v-bind:preference="preference" v-bind:flagDisplayHot="flagDisplayHot">
      </friendComponentOn>
    </div>
    <p v-if="contAllClassification <= 0"class="text-center"></br>Nenhum amigo classificado! ☹</p> 
  </div>
</template>
<script>
import FriendComponentOn from '../classification/FriendComponentOn.vue';
export default{
  props:['name','imagem','link','nationality','friendsTotalFb','friends', 'preference', 'flagDisplayHot'],
  components:{
    FriendComponentOn
  },
  computed: {    
    contAllClassification() { 
        let litrs =[];           
        let list = [];
            for (let i = 0; i < this.friends.length; i++) {
                if(this.friends[i].option != null){
                    list = {option: this.friends[i].option}
                    litrs.push(list)
                    }
                }
    return litrs.length           
		}
  }
}   
</script>
<style lang="scss">
.userProfile a{text-decoration: none; padding-right: 10px; }
.userProfile img{width: 40px;height: 40px;border-radius: 41px;border: 4px solid rgba(163, 173, 183, 0.54) !important;background: #fff;margin-left: 10px;}
</style>
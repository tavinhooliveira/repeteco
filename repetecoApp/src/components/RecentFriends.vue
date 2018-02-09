<template>				
  <li><a v-bind:href="link" target="_blank"><img v-bind:src="imagem" v-bind:title="name"></a></li>
</template>
<script>
export default{
  props:['name','imagem','link'],
  data(){
     return{
   
    } 
  },
  methods:{
       
    }
}
</script>

<style lang="scss">
</style>
     
     
     

<template>
    <section>                        
        <div v-if="option === 'ficaria' || option === 'ficariaNovamente'">
           <div>User_id do Friend {{user_id}} - {{option}}</div>
        </div>
    </section>   
</template>

<script>
export default{
  props:['name', 'match_id_fb_friends', 'user_id', 'option'],
  data(){
     return{
    
    } 
  },
  methods:{

    }
}
</script>


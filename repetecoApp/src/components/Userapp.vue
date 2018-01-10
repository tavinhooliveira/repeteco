<template>   
<div class="row well small">
    <p>Id: {{id}}</p>
    <p>Id_FD: {{id_fb_users}}</p>
    <p>Nome: {{name}}</p>
    <p>Sexo: {{gender}}</p>
    <p>Cidade: {{city}}</p>
    <p>Nacionalidade: {{nationality}}</p>
    <p>preferencia: {{preference}}</p>
    <p>preferencia: {{link}}</p>
    <p>preferencia: {{email}}</p>
    <p>preferencia: {{imagem}}</p>
    <p>Total FB: {{friendsTotalFb}}</p>
</div> 
</template>

<script>
//Usar esse Parametro de entrada
// <userapp v-for="user in users" v-bind:key="user.id" v-bind:id="user.id" v-bind:id_fb_users="user.id_fb_users" v-bind:name="user.name" v-bind:gender="user.gender" v-bind:preference="user.preference" v-bind:nationality="user.nationality" v-bind:city="user.city" v-bind:link="user.link" v-bind:email="user.email" v-bind:imagem="user.imagem" v-bind:friendsTotalFb="user.friendsTotalFb"></userapp>
export default{
  props:['id','id_fb_users','name','gender','city','nationality','preference','link','email','imagem','friendsTotalFb'],  
  components:{

  },
  methods:{   

  }
}

</script>




















<style lang="scss">
.userProfile a{text-decoration: none; padding-right: 10px; }
.userProfile img{width: 40px;height: 40px;border-radius: 41px;border: 4px solid rgba(163, 173, 183, 0.54) !important;background: #fff;margin-left: 10px;
}
</style>
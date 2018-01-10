<template >
<div>
  
<div id="ListFriends" class="ListFriends container">
    <div id="searchClassification" class="container searchClassification navbar-fixed-top">
      <input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar...">      
    </div>
    <div class="row container">
      <div class="btnNotification" role="group">
        <span id="friendsCount"><i class="fa fa-users"></i>
        <!-- <b>{{totalFriendsAPP()}}</b> de {{users.friendsTotalFb}}   -->
        Amigos</span>
          <div class="btn-group pull-right" role="group" aria-label="...">
            <button type="button" class="btn btn-default active" data-toggle="tooltip" data-placement="bottom" title="Todos" onclick="location.href='/'"><i class="fa fa-star-half-o"> </i></button>
            <button type="button" class="btn btn-default " data-toggle="tooltip" data-placement="bottom" title="Classificados" onclick="location.href='classificationOn'" data-transition="slide"><i class="fa fa-star"> </i></button>
            <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Não Classificados" onclick="location.href='/classificationOff'"><i class="fa fa-star-o"> </i></button>
          </div>          
      </div>     
    </div> 
    <ul class="list-group" id="searchUL">
        <friend v-for="friend in users" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem" v-bind:link="friend.link" v-bind:city="friend.city" v-bind:nationality="friend.nationality" v-bind:option="friend.option" v-bind:gender="friend.gender" v-bind:friendsTotalFb="friend.friendsTotalFb"></friend>
    </ul> 
</div>
<br>
</div>

</template>

<script>
import Reload from "../components/Reload.vue";
import Friend from "../components/Friend.vue";


export default {
  name: "Userapppage",
  props: ['name','imagem','link','nationality'],
   data() {
    return {
    };
  },
  components: {
    Reload,
    Friend
  },
beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    this.$http.get("http://localhost:9096/wsrepeteco/users/1/friends").then(res => {
      if (res.body.length > 0) {
        console.log("chamando a API - users <ok>" + res.body );
        return (this.users = res.body);
      } else {
        console.log("Erro na chamada da API - users");
      }
    });
  },
  beforeMount() {
    console.log("beforeMount");
  },
  data() {
    return {
      nomeProjeto: "Social Classification",
      users: {},
      
    };
  },
  methods: {
    // totalFriendsAPP: function() {
    //   var total = this.users[0].friends.length;
    //   return total;
    // }
  }

};
</script>

<style lang="scss">
</style>

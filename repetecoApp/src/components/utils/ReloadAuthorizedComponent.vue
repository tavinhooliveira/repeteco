<template >
  <div>
    <br><br><br>
    <section class="error-message " v-on:click="refreshVue();" >
      <i class="fa fa-refresh fa-spin fa-3x fa-fw" v-tooltip.top-start="'Atualizar?'"></i>
      <span class="sr-only" >Loading...</span>
      <h5 class="error-description text-danger" >Verificando Autorização...</h5>
      <router-link  to="/" class="error-link">login</router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: "ReloadAuthorized",
  data() {
    return {
    }
  },
  computed: {
    //Refresh page
     
  },
  methods:{
    refreshVue: function(){
      window.location.reload();
    }
  }
};
</script>

<style lang="scss">

.btnLoginFb {
    margin-bottom: -28px;
    padding-top: 14px;
    }
/*Css Para Error*/
.error-message {
  text-align: center;
  margin-top: 60px;
}
.error-code {
  margin: 0;
  color: #979797;
  font-size: 7.8rem;
  line-height: 0.9em;
}
a {
  color: #5ba4e5;
  text-decoration: none;
  margin-top: 100px;
}
.links {
  margin-top: 50px;
}
.links a {
  padding-left: 10px;
}

.error-message img {
  width: 320px;
  height: 210px;
}
/*Css Para Error - END*/
</style>

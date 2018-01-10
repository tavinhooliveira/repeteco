<template >
<div>
  <section class="error-message">
    <img src="/src/assets/img/loading.gif"/>
    <section class="links">
        <a class="error-link" onclick="window.history.go(-1);" href="#">☚ Volte</a>
    </section>  
    <section class="links">
        <a href="/">Classificações</a>
        <a href="/profile">Perfil</a>
        <a href="/config">Configurações</a>
        <a href="/politicas">Politicas</a>
    </section>
  </section>
</div>
</template>

<script>
export default {
  name: "Reload",
  props: [],
  components: {

  },
  methods: {

  }
};
</script>

<style lang="scss">
/*Css Para Error*/
.error-message {
  text-align: center;
  margin-top: 50px;
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
  margin-top: 15px;
}
.links a {
  padding-left: 10px;
}

.error-message img {
  width: 320px;
  height: 210px;
  margin-bottom: 130px;
}
/*Css Para Error - END*/
</style>

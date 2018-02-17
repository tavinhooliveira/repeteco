<template >
<div>
  <section class="error-message" onclick="Refresh();">
    <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
    <br><br><br>
    <span class="sr-only">Loading...</span>
    <section class="links">
        <a class="error-link" onclick="window.history.go(-1);" href="#">☚ Volte</a>
        <h5 class="error-description">Erro 500 – Internal Server Error</h5>
    </section>  
    <section class="links">
        <a href="/">Login</a>
        <a href="/classification">Classificações</a>
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
.refreshIcon {margin-top: -84px; margin-left: -9px; position: absolute;}  
.error-message {
  text-align: center;
  margin-top: 10px;
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
  margin-top: 50px;
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
  margin-bottom: 60px;
}
.error-description{color: #a29d9d}
/*Css Para Error - END*/
</style>

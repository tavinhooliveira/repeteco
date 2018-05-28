<template >
<div><br><br><br><br><br><br>
  <section class="error-message" onclick="Refresh();">
    <img src="/src/assets/img/repeteco.png" style='height: 100px; width: 100px;'>
    <h1 class="error-code">500</h1>
    <h2 class="error-description">Internal Server Error</h2>
    <p> Desculpe, algo deu errado, tente mais tarde!</p>  
    <section class="links ">
        <a href="/">login</a>
        <a onclick="Refresh();"> Tente Novamente </a>
        <a href="/termos">Termos</a>
        <a href="/politicas">Politicas</a>
    </section>
  </section>
</div>
</template>

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
    margin-left: -10px;
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

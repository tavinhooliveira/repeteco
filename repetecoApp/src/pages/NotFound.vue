<template>
<div>
  <section class="error-message well">
    <h1 class="error-code">404</h1>
    <h2 class="error-description">Not Found</h2>
    <a class="error-link" onclick="window.history.go(-1);" href="#">☚ Volte</a>
    <section class="links">
      <a href="/">Login</a>
      <a href="/classification">Classificações</a>
      <a href="/profile">Perfil</a>
      <a href="/config">Configurações</a>
      <a href="/politicas">Politicas</a>
    </section>
  </section>
</div>
</template>

<style lang="scss">
#navmenu{display:none;}
.footer {display:none;}
.error-message { text-align: center; margin-top: 60px;}
.error-code {margin: 0; color: #979797; font-size: 7.8rem; line-height: .9em;}
a{color: #5ba4e5; text-decoration: none; margin-top: 100px;}
.links{margin-top: 50px;}
.links a{ padding-left: 10px;}

</style>

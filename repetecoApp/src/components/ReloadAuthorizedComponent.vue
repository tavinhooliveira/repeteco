<template >
<div>
    <section class="error-message ">
        <img src="/src/assets/img/loading.gif" style='height: 90px; width: 90px; border-radius: 100px; border: 2px solid rgba(73, 158, 223, 0.144)'/>
        <h5 class="error-description text-danger">Verificando Autorização...</h5>
        <a class="error-link" onclick="location.href='/'">login</a>
    </section>
</div>
</template>

<script>
export default {
  name: "ReloadAuthorized",
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

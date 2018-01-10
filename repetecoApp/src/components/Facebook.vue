<template>
</template>

<script>
export default{
  props:[],
  data(){
     return{
           
    } 
  },
  methods:{

  }
}  
  
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '175578203007671',
      xfbml      : true,
      version    : 'v2.10'
    });
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

    function statusChangeCallback(response){
      if (response.status === 'connected') {
        console.log("Usuario Autorizado!");
        requestAPI()
        $('#logar').hide();
      }else{
        console.log("Não Autorizado!");
        $('#searchClassification').hide();
      }
    }

    function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function requestAPI(){
    FB.api('me?fields=id,name,link,picture{height,width,url,is_silhouette},friends{name,picture,link,locale,location,gender}', function(response){
        if (response){
          console.log(response);
          /*Return list de Amigos para a Classificaçao*/         
          if (response.friends.data.length) {
            for (var i = 0; i < response.friends.data.length; i++){
              response.innerHTML = ''
              document.getElementById('getPerfilNewFriends').innerHTML += `
              <li><a href="${response.friends.data[i].link}" target="_blank">
                <img src="${response.friends.data[i].picture.data.url}">
                <p>${response.friends.data[i].name}</p></a>
              </li>`
            }            
          }

        }
    });
  }


  function logOut(){
    FB.logout(function(response) {
      statusChangeCallback(response);
      console.log("logout Efetuado")
    });
  }

</script>

<style lang="scss">
</style>
  
  
<template>
   <div id="">
      </br>
      <div v-if="!authorized">
         <ReloadAuthorizedComponent></ReloadAuthorizedComponent>
      </div>
      <div v-else id="perfil" class="perfil  col-md-6 container panel col-md-offset-3">
         <div class="well">
            <p class="text-center" >Convide Seus Amigos do Facebook para o Repeteco!</p>
            <button type="button" class="btn btn-primary btn-lg center-block" data-toggle="modal" data-target="#myModal">
            Enviar Convites!
            </button>
         </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Invite</h4>
               </div>
               <div class="modal-body">
                  ...
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import ReloadAuthorizedComponent from "../components/ReloadAuthorizedComponent.vue";
export default {
  name: 'Invite',
  props: [],
  components: {
    ReloadAuthorizedComponent
  },
  data() {
    return {
      nomeProjeto: 'Invite',
      profile: [],
      authorized: false
    }
  },
  methods: {
    statusChangeCallback(response) {
        let vm = this
        if (response.status === 'connected') {
            console.log("Usuario Autorizado!");
            vm.authorized = true
            console.log("Status: Connectado!")
        } else if (response.status === 'not_authorized') {
            console.log("Status: Não Autorizado!");
            vm.authorized = false
        } else if (response.status === 'unknown') {
            vm.profile = []
            vm.authorized = false
        } else {
            vm.authorized = false
        }
      }
    },
    mounted() {
      let vm = this
      window.fbAsyncInit = function() {
          FB.init({
              appId: '175578203007671',
              cookie: true,
              xfbml: true,
              version: 'v2.10'
          });
          FB.AppEvents.logPageView();
          FB.getLoginStatus(response => {
              vm.statusChangeCallback(response)
          })
      };
    }
  //Facebook - End 
};
</script>

<template>
   <section>
   <div>
      <div v-if="this.statusAPIAPP === true" id="configuracao" class="configuracao col-md-6 container col-md-offset-3 ">
         <div class="panel panel-default">
            <div class="panel-heading">
               <div class="" role="group" >
                  <p class="text-center"><i class="fa fa-user"></i> {{user.name}}</p>
                  <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>
                  <span class="pull-right"> Config. <i class="glyphicon glyphicon-cog"></i> </span>	   
               </div>
            </div>
            <div class="" >
               <div class="panel-heading">
                  <h4>Preferências</h4>
                  <form class="well" @change="updatePreferencia()">
                     <div>
                        <input class="w3-radio" type="radio" name="preferencia" id="male" value="male" v-model="user.preference">
                        <label for="male" class="fa fa-male"> Homem</label>
                     </div>
                     <div>
                        <input class="w3-radio " type="radio" name="preferencia" id="female" value="female" v-model="user.preference">
                        <label for="female" class="fa fa-female"> Mulher</label>
                     </div>
                     <div>
                        <input class="w3-radio" type="radio" name="preferencia" id="Ambos" value="" v-model="user.preference">
                        <label for="Ambos" class="fa fa-venus-mars"> Ambos</label>
                     </div>
                    <div id="msgPreference" class="w3-panel w3-pale-green w3-display-container" style="display:none">
                        <span onclick="this.parentElement.style.display='none'"
                        class="pull-right text-success"> ✘</span>
                        <span class="label label-success">Preferência Registrada! ✔</span>
                    </div>
                  </form>
               </div>
               <ul class="list-group">
                  <div class="panel-heading">
                     <h4>Notificações</h4>
                     <div class="well">
                        <li class="list-group-item">
                           <label>
                           <input class="w3-radio" type="checkbox" name="NtMatch" id="NtMatch" v-model="user.flagNotificationMatch"/>
                           <i class="fa fa-heartbeat" aria-hidden="true"></i> <span>Notificações de Match</span>
                           </label>
                        </li>
                        <li class="list-group-item">
                           <label>
                           <input class="w3-radio" type="checkbox" name="NtNnovoAmigo" id="NtNnovoAmigo" v-model="user.flagNotificationFriends"/>
                           <i class="fa fa-users" aria-hidden="true"></i> <span>Novo Amigo</span>
                           </label>
                        </li>
                     </div>
                  </div>
                  <div class="panel-heading">
                     <h4>Privacidade</h4>
                     <div class="well">
                        <li class="list-group-item">
                           <label>
                           <input class="w3-radio" type="checkbox" name="ExPicante" id="ExPicante" v-model="user.flagDisplayCount"/>
                           <i class="fa fa-calculator" aria-hidden="true"></i> <span>Exibir Contagem no Perfil</span>
                           </label>
                        </li>
                        <li class="list-group-item">
                           <label>
                           <input class="w3-radio" type="checkbox" name="ExPicante" id="ExPicante" v-model="user.flagDisplayHot"/>
                           <i class="fa fa-fire" aria-hidden="true"></i> <span>Exibir Opção Picante</span>
                           </label>
                        </li>
                     </div>
                  </div>
                  <div class="panel-heading">
                     <h4>Política</h4>
                     <li class="list-group-item well">
                        <div>                            
                            <span><a href="#"><i class="fa fa-link" aria-hidden="true"></i> Termo de Serviço</a></span>
                            <span class="pull-right"><a href="#"><i class="fa fa-link" aria-hidden="true"></i> Privacidade</a></span>
                        </div>
                     </li>
                  </div>
                  <div class="panel-heading">
                     <h4>Conta</h4>
                     <li class="list-group-item well">
                        <div>
                           <span><i class="fa fa-sign-out" aria-hidden="true"></i><a href="/" @click="logout">Sair</a></span>
                           <span class="pull-right"><a href="#"> <i class="fa fa-times-circle-o" aria-hidden="true"></i> Apagar Conta</a></span>
                        </div>
                     </li>
                  </div>
               </ul>
            </div>
         </div>
      </div>
	  <div v-else>
      <br><br><br><br><br><br>
      <reload></reload></div>  
  	</div>
   </section>
</template>
<script>

import Reload from "../components/Reload.vue";

export default{
props:['preference'],
data(){
	return{
		user: {},
		profile: {},
		statusAPIAPP: false                   
	} 
},
components:{
	Reload
},
created(){	

},
methods:{
	//Facebook - API GET
	getFacebook (callback) {
		let vm = this
		FB.api('/me?fields=id,name,link,picture{url},friends{id}', function (response) {
		vm.$set(vm, 'profile', response)
		console.log("API Facebook: ",response);     
		let userid = response.id
		callback(response.id)
		})    
	},
	//WsRepeteco - API GET
	getApiRepeteco(profileId){
		this.$http.get(`http://localhost:9096/wsrepeteco/users/${profileId}`).then(response => {				
		this.user = response.data
		if (this.user) {
			console.log("API APP",this.user)
			this.statusAPIAPP = true;
		} else {
			this.statusAPIAPP = false;
			console.log("Erro na chamada da API - Repeteco");
		}    
		})
		},
    //Logout
    logout () {
        let vm = this
        FB.logout(function (response) {
        vm.statusChangeCallback(response)
        console.log("logout Efetuado")
        })
    },
	//PUT API APP Set Preferencia Sexual
	updatePreferencia: function(){				
		const setPreference = {preference:  this.user.preference}
		var userId = this.user.id
		$.ajax({
			url: (`http://localhost:9096/wsrepeteco/users/${userId}/preference`),
			method: "PUT",
			headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'dataType': 'json'
			},
			dataType: 'json',
			crossDomain : true,
			origin: "*",
			processData: true,
			data: JSON.stringify(setPreference)
		});
        document.getElementById("msgPreference").style.display = "block";
	},
	statusChangeCallback (response) {
		let vm = this
		if (response.status === 'connected') {
		console.log("Usuario Autorizado!");
		vm.authorized = true
		//Chamada API Facebok e Repeteco
		vm.getFacebook(vm.getApiRepeteco)
		console.log("Status: Connectado!")
		} else if (response.status === 'not_authorized') {
		console.log("Status: Não Autorizado!");
		vm.authorized = false
		} else if (response.status === 'unknown') {
		vm.profile = {}
		vm.authorized = false
		} else {
		vm.authorized = false
		}
	}
},
mounted () {
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
}

</script>

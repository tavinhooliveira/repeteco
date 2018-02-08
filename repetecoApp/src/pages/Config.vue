<template>
 <section>	
<div id="configuracao" class="configuracao col-md-6 container col-md-offset-3 ">		
<div class="panel panel-default">
  <div class="panel-heading">
		<div class="" role="group" >
			<p class="text-center"><i class="fa fa-user"></i> {{user.name}}</p>
			<span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>
			<span class="pull-right"> Config. <i class="glyphicon glyphicon-cog"></i> </span>	   
		</div>
	</div>

  <div class="">
			<div class="panel-heading"><h4>Preferências</h4>
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
						<input class="w3-radio " type="radio" name="preferencia" id="Ambos" value="" v-model="user.preference">
						<label for="Ambos" class="fa fa-venus-mars"> Ambos</label>
					</div>
				</form>
			</div>
    <ul class="list-group">
			<div class="panel-heading"><h4>Notificações</h4>
				<div class="well">
				<li class="list-group-item">
					<label>
						<i class="fa fa-heartbeat" aria-hidden="true"></i> <span>Notificações de Match</span>
						<input type="checkbox" name="NtMatch" id="NtMatch" value="NtMatch"/>
					</label>
				</li>
				<li class="list-group-item">
					<label>
						<i class="fa fa-users" aria-hidden="true"></i> <span>Novo Amigo</span>
						<input type="checkbox" name="NtNnovoAmigo" id="NtNnovoAmigo" value="NtNnovoAmigo"/>
					</label>
				</li>
				</div>
			</div>
			<div class="panel-heading"><h4>Privacidade</h4>
				<div class="well">
				<li class="list-group-item">
					<label>
						<i class="fa fa-calculator" aria-hidden="true"></i> <span>Exibir Contagem no Perfil</span>
						<input type="checkbox" name="ExPicante" id="ExPicante" value="ExPicante"/>
					</label>
				</li>
				<li class="list-group-item">
					<label>
						<i class="fa fa-fire" aria-hidden="true"></i> <span>Exibir Opção Picante</span>
						<input type="checkbox" name="ExPicante" id="ExPicante" value="ExPicante"/>
					</label>
				</li>
				</div>
			</div>
			<div class="panel-heading"><h4>Política</h4>
				<li class="list-group-item well">
						<div><i class="fa fa-link" aria-hidden="true"></i><a href="#"> Termo de Serviço</a>
						<a href="#"  class="pull-right"><i class="fa fa-link" aria-hidden="true"></i> Privacidade</a></div>				        
				</li>
			</div>
			<div class="panel-heading"><h4>Conta</h4>
				<li class="list-group-item well">
					<div>
						<i class="fa fa-sign-out" aria-hidden="true"></i><a href="#"> Sair</a>
						<a href="#" class="pull-right"> <i class="fa fa-times-circle-o" aria-hidden="true"></i> Apagar Conta</a>
					</div>
				</li>
			</div>
  	</ul>
  </div>
</div>
</div>
</section>
</template>
<script>
export default{
  props:['preference'],
  data(){
     return{
		user: {},
		profile: {}             
    } 
  },
  components:{

  },
  created(){
   //GET API APP usuario Logado 
   this.$http.get('http://localhost:9096/wsrepeteco/users/1893438167339291').then(res =>{
     this.user = res.body;
	  console.log("API APP",this.user)
	 });
  },
  methods:{
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
        }
    }
}

</script>

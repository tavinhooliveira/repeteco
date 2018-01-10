<template>
 <section>	
<div id="configuracao" class="configuracao col-md-6 container col-md-offset-3 ">		
<div class="panel panel-default">
  <div class="panel-heading">
		<div class="" role="group" >
			<span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>
			<span class="pull-right"> Config. <i class="glyphicon glyphicon-cog"></i> </span>	   
		</div>
	</div>

  <div class="">
    <ul class="list-group">
			<div class="panel-heading"><h4>Preferências</h4>
				<li class="list-group-item">
					<label for="Pfmasculino">
						<i class="fa fa-male" aria-hidden="true"></i> <span>Homen</span>
						<input type="radio" name="preferencia" id="Pfmasculino" value="Pfmasculino"/>
					</label>
				</li>
				<li class="list-group-item">
					<label for="PfFeminino">
						<i class="fa fa-female" aria-hidden="true"></i> <span>Mulher</span>
						<input type="radio" name="preferencia" id="PfFeminino" value="PfFeminino"/>
					</label>
				</li>	
				<li class="list-group-item">
					<label for="PfAmbos">
						<i class="fa fa-venus-mars" aria-hidden="true"></i> <span>Ambos</span>
						<input type="radio" name="preferencia" id="PfAmbos" value="PfAmbos"/>
					</label>
				</li>
			</div>
			<div class="panel-heading"><h4>Notificações</h4>
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
			<div class="panel-heading"><h4>Privacidade</h4>
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
			<div class="panel-heading"><h4>Política</h4>
				<li class="list-group-item">
						<div><i class="fa fa-link" aria-hidden="true"></i><a href="#"> Termo de Serviço</a></div>
						<div><i class="fa fa-link" aria-hidden="true"></i><a href="#"> Privacidade</a></div>				        
				</li>
			</div>
			<div class="panel-heading"><h4>Conta</h4>
				<li class="list-group-item">
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
export default {

}
</script>

<style lang="scss">

</style>

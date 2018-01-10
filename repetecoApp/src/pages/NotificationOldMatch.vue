<template>
<div>
  <section>
    <!--Search -->
 			<div id="searchClassification" class="container searchClassification navbar-fixed-top">
			 	<input type="text" id="searchInput" onkeyup="functionSearch()" placeholder="Buscar...">
			</div>		

			<div id="ListFriends" class="ListFriends container notification">
				<div class="btnNotification" role="group" >
					<span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>
					<div class="btn-group pull-right" role="group">
					      <div class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					        <i class="glyphicon glyphicon-bell"></i>
					        <span class="caret"></span>
					      </div>
								<ul class="dropdown-menu">                
									<li><a onclick="location.href='/notificationNewMatch'" data-transition="slide">Novo Lance</a></li>
									<li><a onclick="location.href='/notificationOldMatch'">Flash Back</a></li>
									<li role="separator" class="divider"></li>
									<li><a onclick="location.href='/notification'">Todos</a></li>
								</ul>
					</div>						   
			  </div>	
				<ul class="list-group" id="searchUL">
						<notificationOldMatch v-for="notification in notification" v-bind:key="notification.id" v-bind:name="notification.name" v-bind:imagem="notification.imagem" v-bind:link="notification.link" v-bind:friendsTotalFb="notification.friendsTotalFb" v-bind:option="notification.option" v-bind:friends="notification.friends"></notificationOldMatch>											
				</ul>

			</div>
		</section>
</div>	
</template>

<script>

import NotificationOldMatch from '../components/NotificationOldMatch.vue';
import UserComponet from '../components/UserComponet.vue';


export default{
	name: 'app',
  props:['name','imagem','link','option','friends'],
  components:{
		NotificationOldMatch,
    UserComponet
  },
  created(){
   this.$http.get('http://localhost:9096/wsrepeteco/friends').then(res =>{
     this.notification = res.body;
	 });
	 this.$http.get('http://localhost:9096/wsrepeteco/users').then(res =>{
     this.users = res.body;
   });
  },
  data () {
    return {
      nomeProjeto: 'Social Classification',
			notification:[],
			users:[],
    }
  }

}
</script>

<style lang="scss">

</style>
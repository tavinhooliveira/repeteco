<template>
<div>
  <div id="perfil" class="perfil  col-md-6 container panel col-md-offset-3">
			<div class="perfilPrincipal panel-body well" id="perfilPrincipal">
			  	<div class="row perfilPicture">
            <a v-bind:href="link" target="_blank"><img class="media-object" :src="profilePicture"></a>
			  	</div>
			  	<div>
			    	<h4 class="perfilName"><a v-bind:href="link" target="_blank">{{name}}</a>
						</h4>			  		
			  	</div>
			    <div class="row perfilbrprogress">
			    	<p class="pull-right" id="friendsCount"><b>{{friendsTotalApp}}</b> de {{friendsTotalFb}} <i class="fa fa-users"></i> </p>
			    	<div class="progress">
						<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 70%;">
						    70%
						 </div>
					</div>
			    </div>
          <ul v-show="flagDisplayCount === true" class="row list-group panel-body">
						<li class="">						
						  <div class="classification">
						   	<ul class="img_classification col-md-12">
									<li class="cl_fiquei" data-toggle="tooltip" data-placement="top" title="Já Fiquei">
										<span class="badge" id="cont_cl_fiquei">15</span>
									</li>
									<li class="cl_ficaria2" data-toggle="tooltip" data-placement="top" title="Ficaria Novamente">
										<span class="badge" id="cont_cl_ficaria2">8</span>
									</li>
									<li v-show="flagDisplayHot === true"class="cl_picante" data-toggle="tooltip" data-placement="top" title="Relação Picante">
										<span class="badge" id="cont_cl_picante">2</span>
									</li>
									<li class="cl_fico" data-toggle="tooltip" data-placement="top" title="Ficaria">
										<span class="badge" id="cont_cl_fico">6</span>
									</li>
									<li class="cl_Ninteresse" data-toggle="tooltip" data-placement="top" title="Sem Interesse">
										<span class="badge" id="cont_cl_Ninteresse">60</span>
									</li>
								</ul>
						  </div>
						</li>			
					</ul>
			</div>

      <div id="perfilMatch" class="well perfilMatch panel-body">
				<div class="row">
					<div class="row  perfilMatchList col-md-12 container">
						<div class="perfilMatchListInfo">
							<a href="/notificationNewMatch">
								<i class="cl_ficaria2">  </i>
								<span><b>Match</b> Iai Rola?</span>
								<span class="badge pull-right">4</span>
							</a>
						</div>
					</div>
					<div class="row  perfilMatchList col-md-12 container">
						<div class="perfilMatchListInfo">
								<a href="/notificationOldMatch">
								<i class="cl_fico">  </i>
								<span><b>Macth</b> Alerta de Flash Back!</span>
								<span class="badge pull-right">5</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="well">
				<span>
					<span class="pull-left staricon fa fa-star fa-2x"></span>
					<span>Você Foi Classificado</span>
					<span class="badge pull-right">76</span>
				</span>
			</div>
      <div id="perfilNewFriends" class="well perfilNewFriends panel-body">
				<small><i class="fa fa-users"></i>Amigos Recentes no APP</small>				
				<div id=""  ref="scroller">			
					<ul class="row__inner">					
						<recentFriends v-for="friend in friends" v-if="friend.option != null" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem" v-bind:link="friend.link" v-bind:option="friend.option"></recentFriends>											
					</ul>	
				</div>
				<nav id="menu-carrossel">
					<span v-on:mouseover="scrollEsquerda()" v-on:mouseout="clearScroll()" class="prev glyphicon glyphicon-chevron-left pull-left handle handlePrev active" ></span>
					<span v-on:mouseover="scrollDireita()" v-on:mouseout="clearScroll()" class="next glyphicon glyphicon-chevron-right pull-right handle handleNext active"></span>
				</nav>
				</br></br>				
			</div>
  </div> 
  </div>
</template>


<script>
import FriendComponent from '../components/FriendComponent.vue';
import UserComponent from '../components/UserComponent.vue';
import RecentFriends from './RecentFriends.vue';	

export default{
  props:['name','imagem','link','friendsTotalFb','friends', 'city', 'id', 'id_fb_users', 'friendsTotalApp', 'flagDisplayCount', 'flagDisplayHot'],
  computed: {
    profileName () {
      if (this.id) {
        return `${this.name}`
        console.log('User Conectado', this.name);
      } else {
        return '<h6 onclick="Refresh();">Buscando... <a>Atualizar</a></h6>'
      }
    },
    profilePicture () {
        return (this.id) ? `https://graph.facebook.com/${this.id}/picture?width=300` : `/src/assets/img/man.gif`
    },
  },
	components:{
    FriendComponent,
		UserComponent,
		RecentFriends
  },
	data () {
    return {
      max: 50,
      value: 33.333333333
    }
  },
  methods:{
    scrollDireita(){
      this.intervalo = setInterval(() => { this.$refs.scroller.scrollLeft += 1 }  , 5);
    },
    scrollEsquerda(){
      this.intervalo = setInterval(() => { this.$refs.scroller.scrollLeft -= 1 }  , 5);
    },
    clearScroll(){
      clearInterval(this.intervalo);
    }
  }
}

</script>


<style lang="scss">

.perfilNewFriends {
 margin-bottom: 50px;
}

.perfilNewFriends ul li {
	display: inline-block;
	padding-left: 12px;
	width: 38px !important;
}

.perfilNewFriends ul li a img:hover{
    zoom: 1.2;
    position: relative;
    border-radius: 86px;
		border: 2px solid #6961e2;
}

#menu-carrossel {
    margin-top: -40px;
}

</style>
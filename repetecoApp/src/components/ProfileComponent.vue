<template>
<div>
  <div id="perfil" class="perfil  col-md-6 container panel col-md-offset-3">
			<div class="perfilPrincipal panel-body well" id="perfilPrincipal">
			  	<div class="row perfilPicture center-block">
            <a v-bind:href="link" target="_blank"><img class="media-object" :src="profilePicture"></a>
			  	</div>
			  	<div>
			    	<h4 class="perfilName center-block"><a v-bind:href="link" target="_blank">{{name}}</a>
						</h4>			  		
			  	</div>
			    <div class="row perfilbrprogress">
			    	<p class="pull-right" id="friendsCount">{{friendsTotalApp}} de {{friendsTotalFb}} <i class="fa fa-users"></i> </p>
						
			    	<div class="progress progress-striped ">
							<div class="bar" role="progressbar" :style="'height:30px;background:#1E8BC3;width:' + friendsTotalApp + '%'"><b class="text-secondary">{{progress()}}%</b></div>
						</div>
			    </div>
          <ul v-show="flagDisplayCount === true" class="row list-group panel-body">
						<li class="">						
						  <div class="classification center-block">
						   	<ul class="img_classification col-md-12 center-block">
									<li class="cl_fiquei" v-tooltip.top-start="'Já Fiquei'" >
										<span class="badge" id="cont_cl_fiquei">15</span>
									</li>
									<li class="cl_ficaria2" v-tooltip.top-start="'Ficaria Novamente'">
										<span class="badge" id="cont_cl_ficaria2">8</span>
									</li>
									<li v-show="flagDisplayHot === true"class="cl_picante" v-tooltip.top-start="'Relação Picante'">
										<span class="badge" id="cont_cl_picante">2</span>
									</li>
									<li class="cl_fico" v-tooltip.top-start="'Ficaria'">
										<span class="badge" id="cont_cl_fico">6</span>
									</li>
									<li class="cl_Ninteresse" v-tooltip.top-start="'Sem Interesse'">
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
								<span> Match Iai Rola?</span>
								<span class="badge pull-right">4</span>
							</a>
						</div>
					</div>
					<div class="row  perfilMatchList col-md-12 container">
						<div class="perfilMatchListInfo">
								<a href="/notificationOldMatch">
								<i class="cl_fico"></i>
								<span>Macth Alerta de Flash Back!</span>
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
			<div id="perfilNewFriends" class="slider perfilNewFriends well  panel-body">
				<small> <i class="fa fa-users"></i> Amigos Recentes no APP</small>
				<span v-on:mouseover="scrollEsquerda()" v-on:mouseout="clearScroll()" class="handle handlePrev active">
					<i class="setasScroller glyphicon glyphicon-triangle-left"></i>
				</span>
					<div ref="scroller" class="row">
						<ul class="row__inner" >
							<carroselComponent v-for="friend in friends" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem" v-bind:link="friend.link"></carroselComponent>	
						</ul>
					</div>
				<span v-on:mouseover="scrollDireita()" v-on:mouseout="clearScroll()"  class="handle handleNext active">
					<i class="setasScroller glyphicon glyphicon-triangle-right" ></i>
				</span>
			</div>
			</br>

  	</div>
  </div>
</template>

<script>
import FriendComponent from '../components/FriendComponent.vue';
import UserComponent from '../components/UserComponent.vue';
import CarroselComponent from '../components/CarroselComponent.vue';

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
		CarroselComponent
  },
  methods:{
		progress(){
			//return (this.friendsTotalFb  * this.friendsTotalApp) / 100
			return Math.round(this.friendsTotalFb  - this.friendsTotalApp) / 100
		},
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
.perfil b {color:#f5f5f5; font-size: 9px; margin-left: 5px;}
.perfilNewFriends {margin-bottom: 50px;}

.perfilNewFriends ul li {
	display: inline-block;
	padding-left: 12px;
	width: 38px !important;
}

.perfilNewFriends ul li a img:hover{
    // zoom: 1.2;
    position: relative;
    border-radius: 86px;
		border: 2px solid #6961e2;
}

#menu-carrossel {
    margin-top: -40px;
}

</style>
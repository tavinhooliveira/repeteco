<template>
   <div>
    
         {{postMacts}} 
      <div id="perfil" class="perfil  col-md-6 container panel col-md-offset-3">
         <div class="perfilPrincipal panel-body well" id="perfilPrincipal">
            <div class="row perfilPicture center-block">
               <a v-bind:href="link" target="_blank"><img class="media-object" v-bind:src="imagem"></a>
            </div>
            <div>
               <h4 class="perfilName center-block"><a v-bind:href="link" target="_blank">{{name}}</a>
               <h6 class="small">{{friendsTotalApp}} de {{friendsTotalFb}} <i class="fa fa-users"></i> </h6>
               </h4>
            </div>                       
            <ul v-show="flagDisplayCount === true">
               <li class="centroDiv">
                  <div class="classification">
                     <ul class="img_classification">
                        <li class="cl_fiquei" v-tooltip.top-start="'Já Fiquei'" >
                           <span class="badge" id="cont_cl_fiquei">{{contFiquei}}</span>
                        </li>
                        <li class="cl_ficaria2" v-tooltip.top-start="'Ficaria Novamente'">
                           <span class="badge" id="cont_cl_ficaria2">{{contFicariaNovamente}}</span>
                        </li>
                        <li v-if="flagDisplayHot === true" class="cl_picante" v-tooltip.top-start="'Relação Picante'">
                           <span class="badge" id="cont_cl_picante">{{contRelacaoPicante}}</span>
                        </li>
                        <li v-else class="cl_picante" style="" v-tooltip.top-start="'Opção Inativa'">
                            <span class="badge" id="cont_cl_picante">✗</span>                           
                        </li>
                        <li class="cl_fico" v-tooltip.top-start="'Ficaria'">
                           <span class="badge" id="cont_cl_fico">{{contFicaria}}</span>
                        </li>
                        <li class="cl_Ninteresse" v-tooltip.top-start="'Sem Interesse'">
                           <span class="badge" id="cont_cl_Ninteresse">{{contSemInteresse}}</span>
                        </li>
                     </ul>
                  </div>
               </li>
            </ul>
            <div>
                <div class="center-block well progressBarCirculos">
                    <div class="row center-block centroDiv">
                        <div class="col-md-3  center-block" v-tooltip.top-start="'Amigos no Aplicativo'">
                            <div class="progress blue">
                                <span class="progress-left">
                                    <span class="progress-bar"></span>
                                </span>
                                <span class="progress-right">
                                    <span class="progress-bar"></span>
                                </span>
                                <div class="progress-value" :value="progress()" :max="friendsTotalApp">{{friendsTotalApp}}  </div>                                 
                                 <p class="labelCount text-center"><i class="fa fa-users" aria-hidden="true"></i></p>
                            </div>
                        </div>
                        <div class="col-md-3  center-block" v-tooltip.top-start="'Amigos no Facebook'" >
                            <div class="progress yellow">                                
                                <span class="progress-left">
                                    <span class="progress-bar"></span>
                                </span>
                                <span class="progress-right">
                                    <span class="progress-bar"></span>
                                </span>
                                <div class="progress-value">{{friendsTotalFb}}</div>
                                <p class="labelCount text-center"><i class="fa fa-facebook-official" aria-hidden="true"></i></p>
                            </div>
                        </div>
                        <div class="col-md-3  center-block " v-tooltip.top-start="'Total de Classificação'">
                            <div class="progress green">
                                <span class="progress-left">
                                    <span class="progress-bar"></span>
                                </span>
                                <span class="progress-right">
                                    <span class="progress-bar"></span>
                                </span>
                                <div class="progress-value">{{progress()}}</div>
                                <p class="labelCount text-center"><i class="fa fa-star" aria-hidden="true"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        <div v-if="contAllClassification != 0" id="perfilMatch" class="well perfilMatch panel-body">
            <div class="row">            
             <button type="button" class="btn btn-lg btn-block " data-toggle="collapse" href="#collapsePolicies" aria-expanded="false" aria-controls="collapsePolicies" v-show="countMatch > 0" ><img src="/src/assets/img/heart00.gif" width="25px" height="25px" v-tooltip.top-start="'Click!'"></br> Você tem {{countMatch}} Match!  </button></br>
                <div class="collapse" id="collapsePolicies">
                    <div v-show="contMatchNewMatch != 0" class="row  perfilMatchList col-md-12 container">
                        <div class="perfilMatchListInfo">
                            <a href="/matchsNew">
                            <i class="cl_ficaria2">  </i>
                            <span> Match Iai Rola?</span>
                            <span class="badge pull-right">{{contMatchNewMatch}}</span>
                            </a>
                        </div>
                    </div>
                    <div v-show="contMatchOldMacth != 0" class="row  perfilMatchList col-md-12 container">
                        <div class="perfilMatchListInfo">
                            <a href="/matchsOld">
                            <i class="cl_fico"></i>
                            <span>Macth Alerta de Flash Back!</span>
                            <span class="badge pull-right">{{contMatchOldMacth}}</span>
                            </a>
                        </div>
                </div><!--End Collapse-->
            </div>
        </div>

            <div v-if="contAllClassification != 0" class="alert alert-info alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Você Classificou</strong> {{contAllClassification}} amigos(as) <span v-show="contNotClassification != 0">{{contNotClassification}} ainda espera por você!</span>
            </div>
         </div>
         <div v-show="contYouAllClassification != 0" class="well">
            <span>
            <span class="pull-left staricon fa fa-star fa-2x"></span>
            <span>Você Foi Classificado</span>
            <span class="badge pull-right">{{contYouAllClassification}}</span>
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
          <h6 class="text-center copyright">Copyright ©Megas - Todos os direitos reservados - Versão 1.0</h6>
         </br>
      </div>
   </div>
</template>

<script>
import FriendComponent from '../components/FriendComponent.vue';
import UserComponent from '../components/UserComponent.vue';
import CarroselComponent from '../components/CarroselComponent.vue';
import axios from 'axios';

export default {
	props: ['name', 'imagem', 'link', 'friendsTotalFb', 'friends', 'city', 'id', 'id_fb_users', 'friendsTotalApp', 'flagDisplayCount', 'flagDisplayHot', 'friendsAll'],
	components: {
        FriendComponent,
        UserComponent,
        CarroselComponent,
        axios
    },
    data() {
        return {
        matchsData: []    
        }
    },
    computed: {
		profileName() {
				if (this.id) {
						return `${this.name}`
						console.log('User Conectado', this.name);
				} else {
						return '<h6 onclick="Refresh();">Buscando... <a>Atualizar</a></h6>'
				}
		},
		profilePicture() {
				return (this.id) ? `https://graph.facebook.com/${this.id}/picture?width=300` : `/src/assets/img/loading0.gif`
		},
        contFiquei() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.friends.length; i++) {
                    if(this.friends[i].option === 'fiquei'){
                        list = {option: this.friends[i].option}
                        litrs.push(list)
                        }
                    }
		    return litrs.length           
		},
        contFicariaNovamente() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.friends.length; i++) {
                    if(this.friends[i].option === 'ficariaNovamente'){
                        list = {option: this.friends[i].option}
                        litrs.push(list)
                        }
                    }
		    return litrs.length           
		},
        contRelacaoPicante() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.friends.length; i++) {
                    if(this.friends[i].option === 'relacaoPicante'){
                        list = {option: this.friends[i].option}
                        litrs.push(list)
                        }
                    }
		    return litrs.length           
		},
        contFicaria() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.friends.length; i++) {
                    if(this.friends[i].option === 'ficaria'){
                        list = {option: this.friends[i].option}
                        litrs.push(list)
                        }
                    }
		    return litrs.length           
		},
        contSemInteresse() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.friends.length; i++) {
                    if(this.friends[i].option === 'semInteresse'){
                        list = {option: this.friends[i].option}
                        litrs.push(list)
                        }
                    }
		    return litrs.length           
		},
        contAllClassification() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.friends.length; i++) {
                    if(this.friends[i].option != null){
                        list = {option: this.friends[i].option}
                        litrs.push(list)
                        }
                    }
		    return litrs.length           
		},
        contNotClassification() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.friends.length; i++) {
                    if(this.friends[i].option === null){
                        list = {option: this.friends[i].option}
                        litrs.push(list)
                        }
                    }
		    return litrs.length           
		},
        contYouAllClassification() { 
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.friendsAll.length; i++) {
                    if(this.friendsAll[i].option != null && this.friendsAll[i].id_fb_friends === this.id_fb_users){
                        list = {option: this.friendsAll[i].option}
                        litrs.push(list)
                        }
                    }
		    return litrs.length           
		},
        //myMatch - return list: matchsList
        matchsList (){
        let fdlist = this.friends;
        let friendslist = [];
        let listFB = null;
        for (let i = 0; i < fdlist.length; i++) {
            listFB = {
                id: fdlist[i].id,
                name: fdlist[i].name,
                id_fb_friends: fdlist[i].id_fb_friends,
                user_id: fdlist[i].user_id,
                option: fdlist[i].option,
                link: fdlist[i].link,
                imagem: fdlist[i].imagem
            }
            if (fdlist[i].option === 'ficaria' || fdlist[i].option === 'ficariaNovamente') {
                friendslist.push(listFB)
            }
        }
        //youMatchs - return list: friendslistAll
        let fdlistAll = this.friendsAll;
        let friendslistAll = [];
        let listFbAll = null;
        for (let i = 0; i < fdlistAll.length; i++) {
            listFbAll = {
                user_id: (fdlistAll[i].user_id).toString(),
                option: fdlistAll[i].option
            }
            if ((fdlistAll[i].option === 'ficaria' || fdlistAll[i].option === 'ficariaNovamente') && fdlistAll[i].id_fb_friends === this.id_fb_users) {
                friendslistAll.push(listFbAll)
            }
        }
        //Match myMatch + you Match
        var matchs = [];
        var listMy = friendslist;
        var listYou = friendslistAll;
        listMy.forEach(
            function myfunction(my){
                listYou.forEach(
                    function youFunction(you){                        
                        if(my.id_fb_friends === you.user_id && my.option === you.option){
                            matchs.push(my);
                        }
                    }
                )     
            }
        )
        return matchs;
    },
    //Inserir e Recuperar Matcrs
    postMacts(){
        //Inserir Matcrs Na Basse Via Ajax
        let userid =  this.id_fb_users;
        let listMatchs = this.matchsList;
        $.ajax({
            url: "http://localhost:9096/wsrepeteco/users/" + userid + "/matchs",
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'dataType': 'json'
            },
            dataType: 'json',
            crossDomain: true,
            origin: "*",
            processData: true,
            data: JSON.stringify(listMatchs)
        });        
        //Recuperado os Matchs (LISTA) retur: matchsData
        axios.get(`http://localhost:9096/wsrepeteco/users/${userid}/matchs/`)
        .then(response => {
            this.matchsData = response.data
            if (this.matchsData.length > 0) {
                console.log("API matchsData: OK!")
            } else {
                console.log("API matchsData: - Not Matchs");
            }
        })
    },
    //Recuperado a quantidade de todos os Matchs!
    countMatch(){
       let cout = this.matchsData;
       if(cout.length > 0){
           return cout.length;
       }else{
           return 0;
       }
    },
    //Recuperado a quantidade de Matchs (ficaria)!
    contMatchNewMatch() { 
        let litrs =[];           
        let list = [];
            for (let i = 0; i < this.matchsData.length; i++) {
                if(this.matchsData[i].option === 'ficaria'){
                    list = {option: this.matchsData[i].option}
                    litrs.push(list)
                    }
                }
        return litrs.length           
    },
    //Recuperado a quantidade de Matchs (ficaria novamente)!
    contMatchOldMacth() { 
        let litrs =[];           
        let list = [];
            for (let i = 0; i < this.matchsData.length; i++) {
                if(this.matchsData[i].option === 'ficariaNovamente'){
                    list = {option: this.matchsData[i].option}
                    litrs.push(list)
                    }
                }
        return litrs.length           
    },
   
        
	},	
	methods: {
		progress() {
        //return ( (this.friendsTotalApp - this.contAllClassification) / this.friendsTotalFb * 100)
        //return Math.round( this.contAllClassification * this.friendsTotalApp ) / 100
        return this.contAllClassification
	},
		scrollDireita() {
				this.intervalo = setInterval(() => {
						this.$refs.scroller.scrollLeft += 1
				}, 5);
		},
		scrollEsquerda() {
				this.intervalo = setInterval(() => {
						this.$refs.scroller.scrollLeft -= 1
				}, 5);
		},
		clearScroll() {
				clearInterval(this.intervalo);
		}
	}
}
</script>
<style>
.copyright{color: #5d5d5d; font-size: 10px;}
.perfil b {color:#f5f5f5; font-size: 9px; margin-left: 5px;}
.perfilNewFriends {margin-bottom: 50px;}
.perfilNewFriends ul li {display: inline-block; padding-left: 12px; width: 38px !important;}
.perfilNewFriends ul li a img:hover{
// zoom: 1.2;
position: relative; border-radius: 86px; border: 2px solid #6961e2;}
#menu-carrossel {margin-top: -40px;}


.progressBarCirculos .centroDiv{margin-left: 12%;}
@media (min-width : 320px) and (max-width : 480px){
.progressBarCirculos .centroDiv {margin-left: 3%;}
}
/*Stilo progress bar  #44484b*/
.progress{width:150px;height:150px;line-height:150px;background:0 0;margin:0 auto;box-shadow:none;position:relative}.progress .progress-bar,.progress:after,.progress>span{height:100%;position:absolute}.progress:after{content:"";width:100%;border-radius:50%;border:12px solid #fff;top:0;left:0}.progress>span{width:50%;overflow:hidden;top:0;z-index:1}.progress .progress-left{left:0}.progress .progress-bar{width:100%;background:0 0;border-width:12px;border-style:solid;top:0}.progress .progress-left .progress-bar{left:100%;border-top-right-radius:80px;border-bottom-right-radius:80px;border-left:0;-webkit-transform-origin:center left;transform-origin:center left}.progress .progress-right{right:0}.progress .progress-right .progress-bar{left:-100%;border-top-left-radius:80px;border-bottom-left-radius:80px;border-right:0;-webkit-transform-origin:center right;transform-origin:center right;animation:loading-1 1.8s linear forwards}.progress 
.progress-value{width:90%;height:90%;border-radius:50%;background:#44484b;font-size:24px;color:#fff;line-height:135px;text-align:center;position:absolute;top:5%;left:5%}.progress.blue .progress-bar{border-color:#049dff}.progress.blue .progress-left .progress-bar{animation:loading-2 1.5s linear forwards 1.8s}.progress.yellow .progress-bar{border-color:#fdba04}.progress.yellow .progress-left .progress-bar{animation:loading-3 1s linear forwards 1.8s}.progress.pink .progress-bar{border-color:#ed687c}.progress.pink .progress-left .progress-bar{animation:loading-4 .4s linear forwards 1.8s}.progress.green .progress-bar{border-color:#1abc9c}.progress.green .progress-left .progress-bar{animation:loading-5 1.2s linear forwards 1.8s}@keyframes loading-1{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes loading-2{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(144deg);transform:rotate(144deg)}}@keyframes loading-3{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@keyframes loading-4{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(36deg);transform:rotate(36deg)}}@keyframes loading-5{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(126deg);transform:rotate(126deg)}}@media only screen and (max-width:990px){.progress{margin-bottom:20px}}
.labelCount{color: #fff;position: relative;margin-top: 25px;}
</style>

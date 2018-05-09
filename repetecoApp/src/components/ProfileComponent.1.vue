<template>
  <div class="col-md-offset-1 col-md-10">
    {{postMacts}}

    <div class="perfil col-md-3 container">
        <div class="">
            <div class="user-heading round" v-tooltip.top-start="'Perfil Facebook'">
                <a v-bind:href="link" target="_blank">
                    <img v-bind:src="imagem" alt="">
                </a>
                <h4 class="perfilName center-block"><a v-bind:href="link" target="_blank">{{name}}</a>
                    <h6 class="small center-block">{{friendsTotalApp}} de {{friendsTotalFb}} <i class="fa fa-users"></i> </h6>
                </h4>
            </div>

            <div class="classification" v-show="flagDisplayCount === true">
                <ul class="img_classification">
                    <li class="cl_fiquei" v-tooltip.top-start="'Já Fiquei'">
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

            <ul class="perfil panel nav nav-pills nav-stacked">
                <li v-if="contAllClassification != 0" class="alert alert-info alert-dismissible" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>Você Classificou</strong> {{contAllClassification}} amigos(as) <span v-show="contNotClassification != 0">{{contNotClassification}} ainda espera por você!</span>
                </li>
                <li class="listyle" v-show="contYouAllClassification != 0"><i class="fa fa-star"></i> Você Foi Classificado
                    <span class="badge pull-right">{{contYouAllClassification}}x</span>
                </li>
                <li class="listyle" v-if="countMatch != 0" ><i class="fa fa-heartbeat"></i> Total de Mathcs
                    <span class="badge pull-right">{{countMatch}}</span>            
                </li>
                <li v-if="countMatch != 0" id="perfilMatch" class=" perfilMatch panel-body">
                    <div v-show="contMatchNewMatch != 0" class="perfilMatchList ">
                        <div class="perfilMatchListInfo">
                            <a href="/matchsNew">
                                <i class="cl_ficaria2">  </i>
                                <span> Match Iai Rola?</span>
                                <span class="badge pull-right">{{contMatchNewMatch}}</span>
                            </a>
                        </div>
                    </div>
                    <div v-show="contMatchOldMacth != 0" class="perfilMatchList ">
                        <div class="perfilMatchListInfo">
                            <a href="/matchsOld">
                                <i class="cl_fico"></i>
                                <span>Macth Flash Back!</span>
                                <span class="badge pull-right">{{contMatchOldMacth}}</span>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div class="panel perfil  panel col-md-9 perfilBG">
        <div class="perfil col-md-3 well  center-block" v-tooltip.top-start="'Amigos no Aplicativo'">
            <a href="/classification">
            <div class="layer w-100 mB-10">
                <h6 class="lh-1">Amigos no Repeteco</h6>
            </div>
            <div class="progress yellow">
                <span class="progress-left">
                    <span class="progress-bar"></span>
                </span>
                <span class="progress-right">
                    <span class="progress-bar"></span>
                </span>
                <div class="progress-value" :value="progress()" :max="friendsTotalApp">{{friendsTotalApp}} </div>
                <p class="labelCount text-center"><i class="fa fa-users" aria-hidden="true"></i></p>
            </div>
            </a>
        </div>

        <div class="perfil col-md-3 well  center-block" v-tooltip.top-start="'Amigos no Aplicativo'">
            <a href="/classification">
            <div class="layer w-100 mB-10">
                <h6 class="lh-1">Amigos no Facebook</h6>
            </div>
            <div class="progress blue">
                <span class="progress-left">
                    <span class="progress-bar"></span>
                </span>
                <span class="progress-right">
                    <span class="progress-bar"></span>
                </span>
                <div class="progress-value">{{friendsTotalFb}}</div>
                <p class="labelCount text-center"><i class="fa fa-facebook-official" aria-hidden="true"></i></p>
            </div>
            </a>
        </div>
        <div class="perfil col-md-3 well  center-block" v-tooltip.top-start="'Amigos no Aplicativo'">
            <a href="/classificationOn">
            <div class="layer w-100 mB-10">
                <h6 class="lh-1">Amigos Classificados</h6>
            </div>
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
            </a>
        </div>
        <div class="perfil col-md-3 well  center-block" v-tooltip.top-start="'Amigos no Aplicativo'" >
             <a href="/matchs">
            <div class="layer w-100 mB-10">
                <h6 class="lh-1">Total de Matchs</h6>
            </div>
            <div class="progress pink">
                <span class="progress-left">
                    <span class="progress-bar"></span>
                </span>
                <span class="progress-right">
                    <span class="progress-bar"></span>
                </span>
                <div class="progress-value">{{countMatch}}</div>
                <p class="labelCount text-center"><i class="fa fa-heartbeat" aria-hidden="true"></i></p>
            </div>
             </a>
        </div>
    </div>
    <div class=" col-md-5">
         
    </div>

    <div class="perfilBG">
        <div class=" col-md-5 ">
            <div id="perfilNewFriends" class="slider perfilNewFriends well  panel-body">
                <small> <i class="fa fa-users"></i> Amigos Recentes no APP</small><br>
                <span v-on:mouseover="scrollEsquerda()" v-on:mouseout="clearScroll()" class="handle handlePrev active">
                <i class="setasScroller glyphicon glyphicon-triangle-left"></i>
                </span>
                <div ref="scroller" class="row">
                    <ul class="row__inner">
                        <carroselComponent v-for="friend in friends" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem" v-bind:link="friend.link"></carroselComponent>
                    </ul>
                </div>
                <span v-on:mouseover="scrollDireita()" v-on:mouseout="clearScroll()" class="handle handleNext active">
                <i class="setasScroller glyphicon glyphicon-triangle-right" ></i>
                </span>
            </div>
            <br>
            <div class="">
                <div class="well panel-body">
                    <button type="button" class="btn btn-primary btn-lg center-block" data-toggle="modal" data-target="#myModal">
                    Compartilhe o RepetecoWeb <i class="fa fa-share-alt"></i> 
                    </button>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 container panel">
            <div class="list-group">
                <div class="panel-heading">
                    <h4>Notificações:</h4>
                    <div v-if="this.notification">
                        <NotificationComponent v-bind:notification="notification" v-for="notification in notification" v-bind:key="notification.id" v-bind:id="notification.id" v-bind:name="notification.name" v-bind:link="notification.link"
                            v-bind:imagem="notification.imagem" v-bind:type="notification.type" v-bind:text="notification.text" v-bind:status="notification.status" v-bind:dateNotify="notification.dateNotify">
                        </NotificationComponent>                 
                    </div>                   
                    <div v-else>
                        <p class="text-center">Nehuma Notificação no momento!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


 


   <div  class="col-md-offset-3 col-md-8">
                        <p class="text-center socailIcons" >
                <a href="https://www.facebook.com/Repeteco-490925014612889/" target="_blank"><i class="col-md-offset-4  col-md-1 fa fa-facebook-official" aria-hidden="true"></i></a>
                <a href="https://www.facebook.com/Repeteco-490925014612889/" target="_blank"><i class="col-md-1 fa fa-instagram" aria-hidden="true"></i></a>
                <a href="https://www.facebook.com/Repeteco-490925014612889/" target="_blank"><i class="col-md-1 fa fa-twitter" aria-hidden="true"></i></a>
                <a href="https://www.facebook.com/Repeteco-490925014612889/" target="_blank"><i class="col-md-1 fa fa-google-plus" aria-hidden="true"></i></a>  
            </p><br>
            <h6 class=" text-center copyright">Copyright ©Megas - Todos os direitos reservados - Versão 1.0 - 2018</h6>
        <br><br>
    </div>


 <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Share... <a href="https://www.facebook.com/Repeteco-490925014612889/" target="_blank">RepetecoAPP</a></h4>
               </div>
               <div class="modal-body">
              
                <div id="fb-root" ></div>             
                  
                <div class="fb-like" data-href="https://www.facebook.com/Repeteco-490925014612889/?ref=settings" data-layout="standard" data-action="like" width="200px" data-size="small" data-show-faces="true" data-share="true"></div>
                </br></br>
                <p class="text-center">Salve essa Página no seu Facebook!
                <div class="text-center fb-save col-md-offset-4 col-md-4" data-uri="https://www.instagram.com/tavinhooliveira/" data-size="large"></div>
                </p>
               </br>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
               </div>
            </div>
         </div>
      </div>
 <!-- End Modal -->  

</div>
</template>

<script>
import FriendComponent from '../components/FriendComponent.vue';
import UserComponent from '../components/UserComponent.vue';
import CarroselComponent from '../components/CarroselComponent.vue';
import NotificationComponent from "../components/NotificationComponent.vue";
import axios from 'axios';

export default {
	props: ['name', 'imagem', 'link', 'friendsTotalFb', 'friends', 'city', 'id', 'id_fb_users', 'friendsTotalApp', 'flagDisplayCount', 'flagDisplayHot', 'friendsAll', 'notification'],
	components: {
        FriendComponent,
        UserComponent,
        CarroselComponent,
        NotificationComponent,
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
                imagem: fdlist[i].imagem,
                read: "0"
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
.progress{width:150px;height:150px;line-height:150px;background:0 0;margin:0 auto;box-shadow:none;position:relative}
.progress .progress-bar,.progress:after,.progress>span{height:100%;position:absolute}
.progress:after{content:"";width:100%;border-radius:50%;border:12px solid #fff;top:0;left:0}
.progress>span{width:50%;overflow:hidden;top:0;z-index:1}.progress .progress-left{left:0}
.progress .progress-bar{width:100%;background:0 0;border-width:12px;border-style:solid;top:0}
.progress .progress-left .progress-bar{left:100%;border-top-right-radius:80px;border-bottom-right-radius:80px;border-left:0;-webkit-transform-origin:center left;transform-origin:center left}
.progress .progress-right{right:0}
.progress .progress-right .progress-bar{left:-100%;border-top-left-radius:80px;border-bottom-left-radius:80px;border-right:0;-webkit-transform-origin:center right;transform-origin:center right;animation:loading-1 1.8s linear forwards}
.progress .progress-value{width:90%;height:90%;border-radius:50%;background:#44484b;font-size:24px;color:#fff;line-height:135px;text-align:center;position:absolute;top:5%;left:5%}.progress.blue .progress-bar{border-color:#049dff}
.progress.blue .progress-left .progress-bar{animation:loading-2 1.5s linear forwards 1.8s}
.progress.yellow .progress-bar{border-color:#fdba04}
.progress.yellow .progress-left .progress-bar{animation:loading-3 1s linear forwards 1.8s}
.progress.pink .progress-bar{border-color:#ed687c}
.progress.pink .progress-left .progress-bar{animation:loading-4 .4s linear forwards 1.8s}
.progress.green .progress-bar{border-color:#1abc9c}
.progress.green .progress-left .progress-bar{animation:loading-5 1.2s linear forwards 1.8s}@keyframes loading-1{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes loading-2{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(144deg);transform:rotate(144deg)}}@keyframes loading-3{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@keyframes loading-4{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(36deg);transform:rotate(36deg)}}@keyframes loading-5{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(126deg);transform:rotate(126deg)}}@media only screen and (max-width:990px){.progress{margin-bottom:20px}}
.labelCount{color: #fff;position: relative;margin-top: 25px;}


/* new stile */

.user-heading {
    background: #d9edf7;
    color: #fff;
    border-radius: 4px 4px 0 0;
    -webkit-border-radius: 4px 4px 0 0;
    padding: 30px;
    text-align: center;
}
.user-heading a img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 10px solid rgba(255,255,255,0.3);
    -webkit-border-radius: 50%;
}
.clafonth6{
    font-family: -webkit-body;
    color: #818489;
}
.listyle{
    padding: 10px;
    color: #89817f;
}
.perfil {
    background-color: #fff0;
}
.perfilBG {
    background-color: #fff;
}
.btnDate {
    margin-top: -17px;
}
</style>

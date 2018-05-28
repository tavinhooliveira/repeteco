<template>
<div class="newProfile  ">
    <br><br><br>
    <!-- sidebar -->
    <div class="col-md-3 ">
        <!-- sidebar Perfil -->
       <div class="user-heading round">
           <span v-tooltip.top-start="'Perfil Facebook'">
                <a v-bind:href="link" target="_blank">
                    <img v-bind:src="imagem || `/src/assets/img/man.jpg`" alt="">
                </a>
                <h4 class="perfilName center-block"><a v-bind:href="link" target="_blank">{{name}}</a>
                    <h6 class="small center-block">{{friendsTotalApp}} de {{friendsTotalFb}} <i class="fa fa-users"></i> </h6>
                </h4>
            </span>
            <a class="" data-toggle="collapse" href="#collapsePerfilEdite" aria-expanded="false" aria-controls="collapsePerfilEdite" style="font-size: 10px;"><i class="glyphicon glyphicon-edit"/> Edita Perfil</a>
        </div>
        <!-- box Edite perfil Info -->
        <span class="collapse" id="collapsePerfilEdite">
            <ul class="list-group box">
                <div class="panel-heading">
                    <div class="">
                        <formProfile :id="id" :name="name" :email="email" :city="city" :preference="preference" :numberWhats="numberWhats" :gender="gender" :flagDisplayCount="flagDisplayCount" :flagDisplayHot="flagDisplayHot"/>                   
                    </div>
                </div>
            </ul>
        </span>
        <!-- sidebar Box Cout options ===========================================================-->
        <div class="box  classification" v-show="flagDisplayCount === true">
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
            </ul><br>
        </div>
        <!-- box cout Classification new Old Alert! -->
        <div v-if="contAllClassification != 0" class="box perfil">
                <div v-if="contAllClassification != 0" class="alert alert-info alert-dismissible" role="alert">
                    <strong>Você Classificou</strong> {{contAllClassification}} amigos(as) <span v-show="contNotClassification != 0">{{contNotClassification}} ainda espera por você!</span>
                </div>
             <ul class="nav nav-stacked">
                <li class="listyle" v-show="contYouAllClassification != 0"><i class="fa fa-star"></i> Você Foi Classificado
                    <span class="badge pull-right">{{contYouAllClassification}}x</span>
                </li>
                <li class="listyle" v-if="countMatch != 0" ><i class="fa fa-heartbeat"></i> Total de Mathcs
                    <span class="badge pull-right">{{countMatch}}</span>            
                </li>
                <li class="listyle" v-if="contMatchNewMatch != 0" ><router-link to="/matchsNew" v-tooltip.top-start="'Verificar Novos Lances'"><i class="fa fa-heartbeat"></i> Match Novo Lance!                                          
                        <span class="badge pull-right">{{contMatchNewMatch}}</span></router-link>        
                </li>
                <li class="listyle" v-if="contMatchOldMacth != 0" ><router-link to="/matchsOld" v-tooltip.top-start="'Verificar Flash backs'"><i class="fa fa-heartbeat"></i> Macth Flash Back!                                          
                        <span class="badge pull-right">{{contMatchOldMacth}}</span></router-link>      
                </li>
                <li class="listyle" v-if="countNotification > 0" ><router-link to="/notification"><i class="fa fa-bell"></i> Notificações:                                          
                        <label v-show="countNotificationNotRead !=0" class="label label-info">  Não Vizualizadas: {{countNotificationNotRead}} </label>
                        <span class="badge pull-right">{{countNotification}}</span></router-link>   
                </li>
            </ul>
        </div>

    </div>

    <!-- body ===========================================================-->
    <div id="boxProgress" class="col-md-9">
        <div class="box col-md-9">
            <div class=" col-md-3">            
                <div class="" v-tooltip.top-start="'Amigos no Aplicativo'">
                    <router-link to="/classification">
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
                    </router-link>
                </div>
            </div>           
            <div class="col-md-3 box-progress">            
                <div class="" v-tooltip.top-start="'Amigos no Aplicativo'">
                <router-link to="/classification">
                    <div class="layer w-100 mB-6">
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
                </router-link>
                </div>
            </div>            
            <div class=" col-md-3">            
                <div class="" v-tooltip.top-start="'Amigos no Aplicativo'">
                    <router-link to="/classificationOn">
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
                    </router-link>
                </div>
            </div>
            <div class=" col-md-3">            
                <div class="" v-tooltip.top-start="'Amigos no Aplicativo'" >
                    <router-link to="/matchs">
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
                    </router-link>
                </div>
            </div>
        </div>
        <!-- box sidebar right Top -->
        <div class="box col-md-3 perfilCoutClassification">
            <h6 class="text-center">Siga Nas Redes Sociais</h6>              
                <ul class="col-md-12 tablist" role="tablist">
                    <li class="col-md-3" v-tooltip.bottom-start="'Facebook'"><a href="https://www.facebook.com/Repeteco-490925014612889/" target="_blank"><i class="fa fa-facebook-official"></i></a></li>
                    <li class="col-md-3" v-tooltip.bottom-start="'Instagram'"><a href="https://www.facebook.com/Repeteco-490925014612889/" target="_blank"><i class="fa fa-instagram"></i></a></li>
                    <li class="col-md-3" v-tooltip.bottom-start="'Twitter'"><a href="https://www.facebook.com/Repeteco-490925014612889/" target="_blank"><i class="fa fa-twitter"></i></a></li>
                    <li class="col-md-3" v-tooltip.bottom-start="'Google-plus'"><a href="https://www.facebook.com/Repeteco-490925014612889/" target="_blank"><i class="fa fa-google-plus"></i></a></li>

                </ul>
                <div class="">
                    <CarroselAdvertisingComponet></CarroselAdvertisingComponet>   
                </div>
        </div>
        <!-- box Large -->
        <div v-show="friendsTotalApp > 0" class="box col-md-12 profile-info n-border-top">            
            <div id="perfilNewFriends" class="slider perfilNewFriends  panel-body">
                <small> <i class="fa fa-users"></i> Amigos Recentes no APP</small><br>
                <span v-on:mouseover="scrollEsquerda()" v-on:mouseout="clearScroll()" class="handle handlePrev active">
                <i class="setasScroller glyphicon glyphicon-triangle-left"></i>
                </span>
                <div ref="scroller" class="row">
                    <ul class="row__inner">
                        <carroselComponent v-for="friend in friends" v-bind:key="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem"
                        v-bind:link="friend.link" v-bind:gender="friend.gender" v-bind:preference="preference" ></carroselComponent>
                    </ul>
                </div>
                <span v-on:mouseover="scrollDireita()" v-on:mouseout="clearScroll()" class="handle handleNext active">
                    <i class="setasScroller glyphicon glyphicon-triangle-right" ></i>
                </span>
            </div>
        </div>

        <div class="col-md-8 ">
            <div class="alert alert-info alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <p>Conheça a nossa <a href="/politicas"> política</a> e os <a href="/termos"> termos</a> de uso do webApp <strong>Repeteco!</strong> Convide seus amigos do <a href="https://www.facebook.com/"> facebook</a> para entrar.</span></p>
            </div>
        </div>
        <div class="box col-md-4">
            <br>
            <button type="button" class="btn btn-default center-block" data-toggle="modal" data-target="#myModal">
                Não entende como funciona ? <i class="glyphicon glyphicon-info-sign"></i> 
            </button>
        </div>
    </div>

    <br><br>      
 <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Repeteco Web</h4>
               </div>
                <div class="modal-body">        
                    <aboutComponent></aboutComponent>
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
import CarroselComponent from '../utils/CarroselComponent.vue';
import CarroselAdvertisingComponet from "../utils/CarroselAdvertisingComponet.vue";
import AboutComponent from "../utils/AboutComponent.vue";
import FormProfile from "../profile/FormProfile.vue";
import axios from 'axios';
export default {
	props: ['name', 'imagem', 'email', 'link', 'gender','friendsTotalFb','preference','numberWhats', 'friends', 'city', 'id', 'id_fb_users', 'friendsTotalApp', 'flagDisplayCount', 'flagDisplayHot', 'friendsAll', 'notification'],
	components: {
        CarroselComponent,
        CarroselAdvertisingComponet,
        AboutComponent,
        FormProfile,
        axios      
    },
    data() {
        return {
        matchsData: []    
        }
    },
    created(){
        let vm = this;
        vm.postMacts;
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
        countNotification(){
            if(this.notification){
                return this.notification.length;
            }
        },
        countNotificationNotRead(){
            let litrs =[];           
            let list = [];
                for (let i = 0; i < this.notification.length; i++) {
                    if(this.notification[i].status === '0'){
                        list = {status: this.notification[i].status}
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
            url: (this.$urlAPI+`users/${userid}/matchs`),
            method: "PUT",
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'dataType': 'json',
              'authorization': 'Basic '+this.$basicAuthParams
            },
            dataType: 'json',
            crossDomain: true,
            origin: "*",
            processData: true,
            data: JSON.stringify(listMatchs)
        });        
        //Recuperado os Matchs (LISTA) retur: matchsData
        axios.get(`http://localhost:9096/wsrepeteco/users/${userid}/matchs/` , {"headers":{"authorization":"Basic "+this.$basicAuthParams}})
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
/* new stile */
.user-heading {
    background: #8a8a8a03;
    color: #fff;
    border-radius: 4px 4px 0 0;
    -webkit-border-radius: 4px 4px 0 0;
    text-align: center;
}
.user-heading a img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 10px solid rgba(255,255,255,0.3);
    -webkit-border-radius: 50%;
}
.user-heading a img:hover {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 15px solid rgba(188, 221, 247, 0.62);
    -webkit-border-radius: 50%;
}
.box0 {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    border-top: 3px solid #f25655;
    border-bottom: 5px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
    background-color: #fff;
}
.box {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    /* border-top: 3px solid #e7e7e7; */
    border-bottom: 5px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
    background-color: #00000003;
}
.box-progress{}

.newProfile .ProfileNav-label {
    color: #657786;
    font-weight: bold;
    font-size: 11px;
    letter-spacing: .02em;
    transition: color .15s ease-in-out;
}

.perfilCoutClassification ul li{text-decoration: none; display: inline-block;}

.progressBarCirculos .centroDiv{margin-left: 12%;}
@media (min-width : 320px) and (max-width : 480px){
.progressBarCirculos .centroDiv {margin-left: 3%;}
#boxProgress .lh-1{margin-left: 30% }
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



</style>

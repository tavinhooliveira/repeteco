<template>
    <div class="pageMatch">
        <br>        
        <div class="btnNotification" role="group">
            <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>
            <div v-show="isMatch == true" class="btn-group pull-right">
                  <div class="btn " data-toggle="collapse" href="#btnCollapseLeft" aria-expanded="false" aria-controls="btnCollapseLeft"><i class="fa fa-ellipsis-h"></i></div>
                  <div id="btnCollapseLeft" class="">
                    <div>					        
                        <router-link to="matchsNew" v-tooltip.bottom-start="'Um Novo Lance'"> Lance |</router-link>
                        <router-link to="matchsOld" v-tooltip.bottom-start="'Um Caso Antigo'"> Flash Backs </router-link>
                          <button class="btn btn-default btn-xs" type="button" v-tooltip.bottom-start="'Vizualizado'" v-on:click="showView = true">
                            <span class="fa fa-eye"></span> 
                          </button>
                          <button class="btn btn-default btn-xs" type="button"  v-tooltip.bottom-start="'Não Vizualizado'" v-on:click="showView = false">
                            <span class="fa fa-eye-slash"></span>
                          </button>                      
                    </div>                  
                  </div>                 
                </div>
        </div>
        </br>
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div class="btn-group" role="group">
                <button type="button" onclick="Refresh();" class="btn btn-default"><i class="footerIcon fa fa-heartbeat fa-1x"></i> Verificar Matchs <i class="footerIcon fa fa-heartbeat fa-1x"></i></button>
            </div>
        </div>
        <matchscomponent v-bind:matchs="matchsData" v-for="matchs in matchsData" v-bind:key="matchs.id" v-bind:id="matchs.id"
        v-bind:name="matchs.name" v-bind:imagem="matchs.imagem" v-bind:link="matchs.link" v-bind:gender="matchs.gender"
        v-bind:option="matchs.option" v-bind:id_fb_friends="matchs.id_fb_friends" v-bind:user_id="matchs.user_id"
        v-bind:dataMatch="matchs.dataMatch" v-bind:userName="name" v-bind:userLink="link" v-bind:userImagem="imagem" v-bind:read="matchs.read" v-bind:userNumberWhats="numberWhats"> 
        </matchscomponent>
        <div v-if="isMatch == false">
            <br><p class="text-center">Você ainda não tem Matchs! ☹</p>
        </div>
    </div>
</template>
<script>
import Matchscomponent from './Matchscomponent.vue';
import axios from 'axios';

export default{
  props:['id','id_fb_users','user_id','name','imagem','link','nationality','friendsTotalFb','friends','preference','flagDisplayHot', 'matchs', 'friendsAll', 'numberWhats'],
  components:{
      Matchscomponent,
      axios
  },
   beforeCreate() {
    
  },
    created(){
        let vm = this;
        vm.postMacts;
        vm.callMatchs;
    },
   data() {
        return {
        friendslist: [],
        myMatchList: [],
        matchsData: [],
        showView: "all"     
        }
    },
  computed: {  
    isMatch() {
        if(this.matchsData.length > 0){
            return true;         
        }else{
            return false;
        }
    },
    coutMatchs() {
        if(this.matchsData){
            return this.matchsData.length;         
        }else{
            return 0;
        }
    }, 
    matchsList (){
        //myMatch - return list: id_fb_friends
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
        //youMatchs - return list: user_id
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
       
    },
     //Recuperado os Matchs
    callMatchs(){
        let userid =  this.id_fb_users;
        axios.get(this.$urlAPI+`users/${userid}/matchs/`)
        .then(response => {
            this.matchsData = response.data
            if (this.matchsData.length > 0) {
                console.log("API matchsData: OK!")
            } else {
                console.log("API matchsData: - Not Matchs");
            }
        })   
    }
              
	},
    method: {

  },
}
</script>

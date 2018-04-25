<template>
    <div>
        </br>
        {{postMacts}}
        <div class="btnNotification" role="group">
            <span> <a onclick="history.go(-1)"><i class="glyphicon glyphicon-chevron-left"></i>Voltar</a></span>
            <div class="btn-group pull-right">
                <div v-show="isMatch == true">
                    <a href="/matchs" class="active" title="Todos">Todos |</a>
                    <a href="/matchsNew" title="Novos Matchs">Novos Matchs |</a>
                    <a href="/matchsOld" title="Flash Backs">Flash Backs</a>
                </div>
            </div>
        </div>
        </br>
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
            <div class="btn-group" role="group">
                <button type="button" onclick="Refresh();" class="btn btn-default"><i class="footerIcon fa fa-heartbeat fa-1x"></i> Verificar Matchs <i class="badge" id="cont_cl_fico">{{coutMatchs}}</i></button>
            </div>
        </div>
        <matchscomponent v-bind:matchs="matchs" v-for="matchs in matchs" v-bind:key="matchs.id" v-bind:id="matchs.id" v-bind:name="matchs.name" v-bind:imagem="matchs.imagem" v-bind:link="matchs.link" v-bind:gender="matchs.gender" v-bind:option="matchs.option" v-bind:id_fb_friends="matchs.id_fb_friends" v-bind:user_id="matchs.user_id" v-bind:dataMatch="matchs.dataMatch">
        </matchscomponent>
        <div v-if="isMatch == false">
            <p class="text-center">
                </br>Você ainda não tem Matchs! ☹</p>
            <!-- {{readyReloadTemp}} -->
        </div>
    </div>
</template>
<script>
import Matchscomponent from './Matchscomponent.vue';

export default{
  props:['id','id_fb_users','user_id','name','imagem','link','nationality','friendsTotalFb','friends','preference','flagDisplayHot', 'matchs', 'friendsAll'],
  components:{
      Matchscomponent
  },
   beforeCreate() {
    console.log('Teste Creating aquiiii !')
  },
   data() {
        return {
        friendslist: [],
        myMatchList: []        
        }
    },
  computed: {
    readyReloadTemp() {    
        window.setTimeout('Refresh()', 1000);
    
    },    
    isMatch() {
        if(this.matchs){
            return true;         
        }else{
            return false;
        }
    },
    coutMatchs() {
        if(this.matchs){
            return this.matchs.length;         
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
                imagem: fdlist[i].imagem
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
    //[TESTE] Inserir Matcrs Na Basse Via Ajax
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
    }   
              
	},
    method: {
     
  },
}
</script>

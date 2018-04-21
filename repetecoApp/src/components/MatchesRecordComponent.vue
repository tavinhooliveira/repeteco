<template>
  <div></br>
{{postMacts}}
<div>
<matchscomponent v-bind:matchs="matchs"  v-for="matchs in matchs" v-bind:key="matchs.id" v-bind:id="matchs.id"
    v-bind:name="matchs.name" v-bind:imagem="matchs.imagem" v-bind:link="matchs.link" v-bind:gender="matchs.gender"
    v-bind:option="matchs.option" v-bind:id_fb_friends="matchs.id_fb_friends" v-bind:user_id="matchs.user_id"
    v-bind:dataMatch="matchs.dataMatch">
</matchscomponent>
</div>
<div v-if="CoutMatches == 0"> 
  <p class="text-center"></br>Você ainda não tem Matchs! ☹</p>
  {{readyReloadTemp}}
</div>
 </div>  
</template>
<script>
import Matchscomponent from './Matchscomponent.vue';

export default{
  props:['id','id_fb_users','name','imagem','link','nationality','friendsTotalFb','friends','preference','flagDisplayHot', 'matchs', 'friendsAll'],
  components:{
      Matchscomponent
  },
   beforeCreate() {
    console.log('Teste Creating aquiiii !')
  },
   data() {
        return {
        isMatch: true,
        friendslist: []
        
        }
    },
  method: {
      
  },
  computed: {
    readyReloadTemp() {    
        window.setTimeout('Refresh()', 1000);
    
    },    
    CoutMatches() {
        if(this.matchs){
            return this.matchs           
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
    notifyCountMatch(){
            //Data corrente
            var today = new Date();
            var dd = today.getDate(); 
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            var currentTime = today.toLocaleString('pt-BR');
            //Atributos de MSG
            var dataAtribute ={
                msg: "Você Tem ",
                countMatchrs: this.matchsList.length,
                date: currentTime        
            }

            var e = new Notification ("RepetecoWEB", {
                body: dataAtribute.msg + dataAtribute.countMatchrs +" Matchrs!"+ "\n" + "Atualizado em: " + dataAtribute.date,
                icon: "/src/assets/img/repeteco.png",
                tag: "NEVERGRIND-CHAT-ALERT",
                silent: false,
                vibrate: [200, 100, 200]
            });            
            e.onclick = function (){
                location.href = "/notification";
            }
        },
        getStatusNotification () {
          if (!window.Notification) {
              return "unsupported";
          }
          // return window.Notification.permission;
            return null;
            Notification.requestPermission().then(status => {
              if (status == 'granted') {
                  console.log('permissão de Notificação concedida');
              }else{
                  // pode ser default, ou denied
                  console.log(status);
                  console.log('Sem permissão de Notificação');
              }
          });

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
}
</script>

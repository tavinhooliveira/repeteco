<template>
  <div>
    <div>
      <friendComponent v-for="friend in friends" v-bind:key="friend.id" v-bind:id="friend.id" v-bind:name="friend.name" v-bind:imagem="friend.imagem"
        v-bind:link="friend.link" v-bind:city="friend.city" v-bind:nationality="friend.nationality" v-bind:option="friend.option"
        v-bind:id_fb_friends="friend.id_fb_friends" v-bind:gender="friend.gender" v-bind:preference="preference" v-bind:flagDisplayHot="flagDisplayHot">
      </friendComponent>
    </div>
      <p v-if="contFriendsAll <= 0" class="text-center"></br>Nenhum amigo encontrado! ☹</p>

      <span v-if="matchsList.length > 0">{{notifyCountMatch}}</span>
      {{getStatusNotification}}
      {{postMacts}}
      <!-- </br>{{matchs}}</br> -->
      <!-- {{this.matchsList}} -->

  </div>  
</template>
<script>
import FriendComponent from './FriendComponent.vue';

export default{
  props:['id','id_fb_users','name','imagem','link','nationality','friendsTotalFb','friends','preference','flagDisplayHot', 'matchs', 'friendsAll'],
  components:{
    FriendComponent    
  },
   data() {
        return {
        isMatch: true
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
            return (this.id) ? `https://graph.facebook.com/${this.id}/picture?width=300` : `/src/assets/img/man.gif`
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
    contFriendsAll() { 
      let litrs =[];           
      let list = [];
          for (let i = 0; i < this.friends.length; i++) {               
            list = {option: this.friends[i].option}
            litrs.push(list)
                  
            }
    return litrs.length           
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
        },
            
	},
}
</script>
<style>
.userProfile a{text-decoration: none; padding-right: 10px; }
.userProfile img{width: 40px;height: 40px;border-radius: 41px;border: 4px solid rgba(163, 173, 183, 0.54) !important;background: #fff;margin-left: 10px;}
</style>
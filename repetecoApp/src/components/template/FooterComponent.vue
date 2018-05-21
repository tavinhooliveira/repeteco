<template>
    <span>
        <footer class="footer navbar-fixed-bottom navbar-default">
            <div class="container">
                <div class="col-md-12 btn btn-navbar">
                               
                    <router-link to="notification"><span class="footerIcon fa fa-bell fa-red  text-red fa-1x col-md-3" data-transition="pop" data-toggle="tooltip" data-placement="top" title="Notificações"><i v-show="varcoutNotificationNotRead != 0" class="badge btnNotify" id="cont_cl_fico">{{varcoutNotificationNotRead}}</i></span></router-link>                     
                    <router-link to="matchs"><span class="footerIcon fa fa-heartbeat fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Matchs"><i v-show="varcoutMatchsNotRead != 0" class="badge btnNotify" id="cont_cl_fico">{{varcoutMatchsNotRead}}</i></span></router-link>     
                    <router-link to="config"><span class="footerIcon fa fa-sun-o fa-1x col-md-3 " data-transition="pop" data-toggle="tooltip" data-placement="top" title="Configuração"></span></router-link>
                    <a href="/" onclick="Refresh();"><span class="footerIcon fa fa-sign-out fa-1x col-md-3" data-toggle="tooltip" data-placement="top" title="Sair"></span></a>
                </div>
            </div>
        </footer>
    </span>     
</template>
<script>

export default {
    name: 'footerNotify',
    props: ['varcoutNotificationNotRead', 'varcoutMatchsNotRead'],
    components: {

    },
    data() {
        return {

        }
    },
    computed:{

    },
    methods: {

    },
};
</script>
<style>

</style>


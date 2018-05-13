<template>
<div  class="col-md-4 profileHeaderComponent">
    <div class="media">
        <div class="media-left">
            <a :href="link" >
                <img class="media-object" :src="imagem || `/src/assets/img/man.jpg`" v-tooltip.right-start="'Perfil'">
            </a>
        </div>
    </div>
</div> 
</template>

<script>
export default {
    props: ['link','imagem'],
    name: 'ProfileHeaderComponent',
    computed: {
    }
}
</script>
<style lang="scss" scoped>
.profileHeaderComponent img {width: 35px;height: 38px;border-radius: 41px;border: 2px solid rgba(73, 158, 223, 0.144) !important;margin-top: -10px;position: absolute;}
.profileHeaderComponent img:hover {border-radius: 41px;border: 4px solid rgba(73, 158, 223, 0.144) !important;margin-top: -10px;position: absolute;}
</style>

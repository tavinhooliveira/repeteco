<template>
<div  class="profileHeaderComponent">
    <router-link :to="link">
        <img class="media-object" :src="imagem || `/src/assets/img/man.jpg`" v-tooltip.left-start="name">
    </router-link>
</div> 
</template>

<script>
export default {
    props: ['link','imagem', 'name'],
    name: 'ProfileHeaderComponent',
    computed: {
    }
}
</script>
<style lang="scss" scoped>
.profileHeaderComponent img {width: 35px;height: 38px;border-radius: 41px;border: 2px solid rgba(73, 158, 223, 0.144) !important;position: absolute; z-index: 9999999 !important;     margin: 5px 12px auto -20px;}
.profileHeaderComponent img:hover {box-shadow: -1px -1px 100px 2px #e0e0e0; border-radius: 41px;border: 4px solid rgba(73, 158, 223, 0.144) !important;position: absolute; z-index: 9999999 !important;}
</style>

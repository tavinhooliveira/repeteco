<template>
  <li>
    <a v-bind:href="link" target="_blank"><img v-bind:src="imagem" v-tooltip.bottom-start="name"><br></a>
  </li>
</template>
<script>
export default{
  props:['name','imagem','link'],
  data(){
     return{
      efeitoClick: null    
     } 
  }
}
</script>

<style>
.slider {
    height: 100px;
    position: relative;
    margin: 9px;
    margin-bottom: -22px;
    padding: 0 4%;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
}

.slider h3{
  position: absolute;
  top: 22px;
  z-index: 30;
}

.slider .handle.handlePrev {
    left: 0;
    margin-left: 0%;
}

.slider .handle.handleNext {
    right: 0;
    margin-right: 0%;
}

.setasScroller{ margin-top: 40px;}

.slider .handle.active {
    cursor: pointer;
}

.slider .handle {
    /*background: rgba(20, 20, 20, 0.26);*/
    position: absolute;
    top: 0;
    height: 100%;
    bottom: 0;
    z-index: 20;
    width: 4%;
    text-align: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    color: #fff;
}


.row {
  overflow: hidden;
}
.row__inner {
  -webkit-transition: 450ms -webkit-transform;
  transition: 450ms -webkit-transform;
  transition: 450ms transform;
  transition: 450ms transform, 450ms -webkit-transform;
  font-size: 0;
  white-space: nowrap;
  margin: 70.3125px 0;
  padding-bottom: 10px;
}

</style>

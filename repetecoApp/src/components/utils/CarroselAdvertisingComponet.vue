<template>
   <div class="caroselAdvertiting">
      <br>
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
         <!-- Indicators -->
         <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1" ></li>
         </ol>
         <!-- Wrapper for slides -->
         <div class="carousel-inner" role="listbox">
               <div class="item active">        
                <a href="https://www.google.com.br/search?rlz=1C1GGRV_enBR789BR789&biw=1602&bih=856&tbm=isch&sa=1&ei=1DAhW_HiM4qZwgTy2o-oDA&q=anuncie+aqui+png&oq=anuncie+a&gs_l=img.3.1.0l10.8266.10029.0.12302.9.9.0.0.0.0.190.1023.0j6.6.0....0...1c.1.64.img..3.6.1021...0i67k1.0.W2XFzOOt6Tw#imgrc=zvbftFzUr7DjJM:" target="_blank"> <img src="/src/assets/img/slaider/ads/ad02.png"></a>
               </div>          
               
               <div class="item">
                 <a href="https://www.google.com.br/search?rlz=1C1GGRV_enBR789BR789&biw=1602&bih=856&tbm=isch&sa=1&ei=1DAhW_HiM4qZwgTy2o-oDA&q=anuncie+aqui+png&oq=anuncie+a&gs_l=img.3.1.0l10.8266.10029.0.12302.9.9.0.0.0.0.190.1023.0j6.6.0....0...1c.1.64.img..3.6.1021...0i67k1.0.W2XFzOOt6Tw#imgrc=tw6DidFVEyz3_M:" target="_blank" > <img src="/src/assets/img/slaider/ads/ad01.png"></a>
                 <div class="carousel-caption"> </div>
               </div>
         </div>
         <!-- Left and right controls -->
         <a class="left handle carousel-control" href="#myCarousel" role="button" data-slide="prev">
         <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
         <span class="sr-only">Previous</span>
         </a>
         <a class="right handle carousel-control" href="#myCarousel" role="button" data-slide="next">
         <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
         <span class="sr-only">Next</span>
         </a>
         <i class="publi-title">publicidade</i>
      </div>
   </div>
</template>
<script>
export default{
  props:[],
  data(){
     return{
          
     } 
  }
}
</script>

<style>


 .caroselAdvertiting .handle.active {
     cursor: pointer;
}
 .caroselAdvertiting .handle {
    /*background: rgba(20, 20, 20, 0.26);
    */
     position: absolute;
     top: 0;
     bottom: 0;
     z-index: 20;
     width: 0%;
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
.caroselAdvertiting .carousel-indicators {
      margin-bottom: -25px;
    
}
.caroselAdvertiting .carousel-indicators .active {
    width: 12px;
    height: 12px;
    margin: 0;
    background-color: #10101029;
}
.caroselAdvertiting a {
    color: #ffffff;
    text-decoration: none;
}

.caroselAdvertiting .carousel-inner b {
    color: #747474;
}
.caroselAdvertiting .carousel-inner p {
    color: #747474;
}
.publi-title {
    color: #d6d6d6;
    font-size: 11px;
    margin-left:  20px;
}

.carousel-control .glyphicon-chevron-left, .carousel-control .icon-prev {margin-top: 17px;}
.carousel-control .glyphicon-chevron-right, .carousel-control .icon-next {margin-top: 17px;}
</style>



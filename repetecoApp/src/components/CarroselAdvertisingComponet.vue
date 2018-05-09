<template>
   <div class="caroselAdvertiting">
      <br>
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
         <!-- Indicators -->
         <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
         </ol>
         <!-- Wrapper for slides -->
         <div class="carousel-inner" role="listbox">
               <div class="item active">        
                 <img src="/src/assets/img/slaider/ads/ad01.jpeg">
               </div>          
               
               <div class="item">
                 <img src="/src/assets/img/slaider/ads/ad02.jpeg">
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
      </div><br>
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

 .caroselAdvertiting img{
    height: 100px !important;
    width: 260px;
}
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
      margin-bottom: -40px;
    
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



</style>



<template>
   <div class="CarouselLogin">
      <br>
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
         <!-- Indicators -->
         <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
            <li data-target="#myCarousel" data-slide-to="4"></li>
            <li data-target="#myCarousel" data-slide-to="5"></li>
         </ol>
         <!-- Wrapper for slides -->
         <div class="carousel-inner" role="listbox">
            <div class="item active">
               </br></br>
               <b> e se você podesse classificar todos os seus amigos do Facebook?</b>
               <p>Secretamente</p>
            </div>
            <div class="item">
               </br></br>
               que tal um <b>Flash Backs</b> ou um <b>novo Lance</b>
               <p>com pessoas da sua bolha social</p>
            </div>
            <!--
               <div class="item ">        
                 <img src="/src/assets/img/slaider/slaider01.png">
               </div>
               
               
               <div class="item">
                 <img src="/src/assets/img/slaider/slaider03.png" >
                 <div class="carousel-caption"> </div>
               </div>
               
            <div class="item">
               <h3>Curta nosa fampage</h3>
               <div class="fb-page" data-href="https://www.facebook.com/Repeteco-490925014612889/" data-height="50px" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true">
                  <blockquote cite="https://www.facebook.com/Repeteco-490925014612889/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Repeteco-490925014612889/">Repeteco</a></blockquote>
               </div>
            </div>
                -->
               <div class="item">
                 <div class="fb-like" data-href="https://www.facebook.com/Repeteco-490925014612889/?ref=settings" data-layout="standard" data-action="like" width="200px" data-size="small" data-show-faces="true" data-share="true"></div>
               </div>
              
            <div class="item"></br>
               <b>Faça o Login e Confira: </br>Repeteco APP</b>
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
.CarouselLogin {height: 195px;}
.CarouselLogin img {margin-left: 20px;}
.CarouselLogin .handle.handlePrev {
    left: 0;
    margin-left: 0%;
}
.CarouselLogin .handle.handleNext {
    right: 0;
    margin-right: 0%;
}
.CarouselLogin .handle.active {
    cursor: pointer;
}
.CarouselLogin .handle {
    /*background: rgba(20, 20, 20, 0.26);*/
    position: absolute;
    top: 0;
    height: 100%;
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
.CarouselLogin .carousel-indicators {
      margin-bottom: -50px;
    
}
.CarouselLogin .carousel-indicators .active {
    width: 12px;
    height: 12px;
    margin: 0;
    background-color: #10101029;
}
.CarouselLogin a {
    color: #ffffff;
    text-decoration: none;
}

</style>



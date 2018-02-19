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
        <img src="/src/assets/img/slaider/slaider01.png" alt="Chania">
        <div class="carousel-caption">
      
        </div>
      </div>

      <div class="item">
        <img src="/src/assets/img/slaider/slaider02.png" alt="Chania" >
        <div class="carousel-caption">
 
        </div>
      </div>
    
      <div class="item">
        <img src="/src/assets/img/slaider/slaider03.png" alt="Flower" >
        <div class="carousel-caption">
 
        </div>
      </div>

      <div class="item">
        <img src="/src/assets/img/slaider/slaider01.png" alt="Flower" >
        <div class="carousel-caption">

        </div>
      </div>

      <div class="item">
        <img src="/src/assets/img/slaider/slaider02.png" alt="Flower" >
        <div class="carousel-caption">

        </div>
      </div>

      <div class="item">
        <img src="/src/assets/img/slaider/slaider01.png" alt="Flower" >
        <div class="carousel-caption">
        </div>
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
    display: none;
}


.CarouselLogin .carousel-indicators .active {
    width: 12px;
    height: 12px;
    margin: 0;
    background-color: #f5f5f5;
}

.CarouselLogin a {
    color: #ffffff;
    text-decoration: none;
}
</style>



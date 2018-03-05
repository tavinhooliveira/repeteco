<template>
<div>
    <section   v-if="option === 'ficaria' || option === 'ficariaNovamente'" >                        
        <li v-if="option === 'ficaria'"  class="list-group-item col-md-4 notification" >
            <div class="media-left LfPicture">
                <a v-bind:href="link" target="_blank"><img class="media-object" v-bind:src="imagem"></a>
            </div>
            <div class="media-body  notification">
                <h4 class="NFName"><a v-bind:href="link" target="_blank">{{name}}</a></h4>
                <small class="Nfmensagem">Disse que rola um possivel... <br> <b>Lance!</b> </small>
            </div>
            <div class="notification pull-right">
                <div class="img_classification">
                    <i class="imgficaria" v-tooltip.top-start="'Ficaria'"></i>
                <span class="Nfdate">1min</span>
                </div>
            </div> 
        </li>
        
        <li v-else class="list-group-item col-md-4 notification" >
            <div class="media-left LfPicture">
                <a v-bind:href="link" target="_blank"><img class="media-object" v-bind:src="imagem"></a>
            </div>
            <div class="media-body  notification">
                <h4 class="NFName"><a v-bind:href="link" target="_blank">{{name}}</a></h4>
                <small class="Nfmensagem">Disse que rola um possivel... <br> <b>Flash Back!</b> </small>
            </div>
            <div class="notification pull-right">
                <div class="img_classification">
                    <i class="imgficaria2" v-tooltip.top-start="'Ficaria Novamente'"></i>
                <span class="Nfdate">1min</span>
                </div>
            </div>  
        </li>        
    </section>
    </div>
</template>

<script>
export default{
  props:['name','imagem','link','option','user_id', 'id_fb_friends', 'friendsAll'],
    components:{

  },
  data(){
     return{
    
    } 
  },
  methods:{

    }
}
</script>


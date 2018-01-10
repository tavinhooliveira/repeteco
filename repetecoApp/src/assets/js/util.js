 
/*Funçao Notificacao Return true/false*/
 $(function() {
    $('#toggle-event-notification').change(function() {
    	var notification = $(this).prop('checked');
     	console.log(notification);
    })
 })
/*Funçao Preferencia sexual Return true/false*/

/*Funcao Search*/
function functionSearch() {
    // Declare variables
    var input, filter, ul, li, a, i, div, h4;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("searchUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h4")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


/*Refresh na pagina*/
function Refresh(){
window.location.reload();
//setTimeout('location.reload();', 5000);
}


/*Funcao Star Classification true */
$(document).ready(function(){
$("input:radio").on("click", function(){
var classificacaoId = null;
var classificacaoId = $(this).attr("id");
var statusClassification = false;

  if (classificacaoId != null) {    
    $(this).parent().parent().parent().parent().find('.starClassification').addClass('classificationTrue');
    statusClassification = true;
    /*unCheked*/
    $(".classificationTrue").on("click", function(){
      $(this).removeClass('classificationTrue').prev().find("input:radio").attr('checked', false);
      statusClassification = false;
      classificacaoId = null;

      console.log("Opção: "+classificacaoId);
      console.log("Status:"+statusClassification);
    });
  }
  console.log("Opção: "+classificacaoId);
  console.log("Status:"+statusClassification);
});
});

$('#exampleModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

/*Corrosel newFriends*/
$(function() {
    $("#carrossel"). jCarouselLite({
        btnPrev: '.prev', 
        btnNext: '.next',
        visible: 10
    })
});


$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

    
/*funcao Modal*/
$(function () {
    $('#exampleModal').modal('toggle')
});

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
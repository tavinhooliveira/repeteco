
/*Funçao Notificacao Return true/false*/
 $(function() {
    $('#toggle-event-notification').change(function() {
    	var notification = $(this).prop('checked');
     	console.log(notification);
    })
 })

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

/*Solicitar Permissão de notificação*/
function solicitationNotification(){
    if (!window.Notification) {
        return "unsupported";
    }
    Notification.requestPermission().then(status => {
        if (status == 'granted') {
            console.log('permissão de Notificação concedida: '+status);
        }else{
            console.log('Sem permissão de Notificação: '+status);
        }
    });
    

  }


/*Refresh na pagina*/
function Refresh(){
window.location.reload();
//setTimeout('location.reload();', 5000);
};
/*Modal*/
$('#myModal').on('shown.bs.modal', function () {
})

/*popover*/
$(function () {
    $('[data-toggle="popover"]').popover()
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

/*funcaoLightbox*/
$(function () { 
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
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
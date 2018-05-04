$(document).ready(function(){
  $(window).scroll(function () {

    let sc = $(window).scrollTop();
    if (sc > 2447 && sc < 3200) {
      $("#" + 'about').css("color", "#ff2800")
    }

    else {
      $('#about').css("color", "inherit")
    }
  });



})

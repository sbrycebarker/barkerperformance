$(document).ready(function(){
  // $('.header-overlay').css('display', 'none');
  $(window).scroll(function (event) {
  
    var sc = $(window).scrollTop();
    // console.log(sc)
    if (sc > 2447 && sc < 3200) {
      $("#" + 'about').css("color", "#ff2800")
    }

    else {
      $('#about').css("color", "inherit")
    }
  });

  // function createSlick() {
  //   $('.multiple-items').not('slick-initialized').slick({
  //     centerMode: true,
  //     infinite: true,
  //     autoplay: true,
  //     responsive: false
  //   });
  // }
  //
  // createSlick()

});

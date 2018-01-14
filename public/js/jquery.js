$(document).ready(function(){

  $(window).scroll(function (event) {
    var sc = $(window).scrollTop();
    console.log(sc)
    if (sc > 2447 && sc < 3200) {
      $("#" + 'about').css("color", "#ff2800")
    }

    // else if (sc > 3200) {
    //   $("#" + 'about').css("color", "inherit")
    // }

    else {
      $("#" + 'about').css("color", "inherit")
    }
  });


  // $('.multiple-items').slick({
  //     centerMode: true,
  //     infinite: true,
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     autoplay: true
  // });





});

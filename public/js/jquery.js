$(document).ready(function(){

  $(window).scroll(function (event) {
    var sc = $(window).scrollTop();
    // console.log(sc);
  });

  $('.multiple-items').slick({
      centerMode: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true
  });


});

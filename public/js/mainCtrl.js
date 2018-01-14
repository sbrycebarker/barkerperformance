angular.module('app').controller('mainCtrl', function($scope, service, $state, $http) {
  $scope.test = service.serviceTest

  function home() {
      $("html, body").animate({ scrollTop: "0" }, 1000)

  }

  function about() {
      $("html, body").animate({ scrollTop: "2777" }, 1000)

  }

  function onpage() {
    $("#" + "home").css("color", "inherit")
    $("#" + "products").css("color", "inherit")
    $("#" + "life").css("color", "inherit")
    $(document).ready(function() {
      var state = $state.current.name
      console.log(state)
      $("#" + state).css("color", "#ff2800")

    })
    $('.multiple-items').slick({
        centerMode: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true
    });
  }

  onpage();

// <===========================================JAVASCRIPT==========================================================>
})

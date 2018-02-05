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
      slidesToShow: 4,
      slidesToScroll: 1
    });
  }

  onpage();

// <===========================================JAVASCRIPT==========================================================>

  $scope.users = function(results) {
    service.users().then(function(results){
      let users = results
      console.log("results")
    })
  }
  //
  $scope.users();


})

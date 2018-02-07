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


  function home() {
      $("html, body").animate({ scrollTop: "0" }, 1000)

  }

  function about() {
      $("html, body").animate({ scrollTop: "2777" }, 1000)

  }

// <===========================================JAVASCRIPT==========================================================>

  $scope.getUsers = function() {
    service.getUsers().then(function(result){
      console.log("main", result.data[0])
      if (!result) {
        $scope.users = "Login"
      } else {        
      $scope.users = result.data[0].name
    }
    })
  }

  $scope.getUsers();

  $scope.user = function(result) {
    service.user().then(function(result) {
      $scope.user = result
    })
  }

  // $scope.user();

  $scope.createUser = function(data) {
    let user = data;
  }



})

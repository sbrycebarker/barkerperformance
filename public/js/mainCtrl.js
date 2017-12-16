angular.module('app').controller('mainCtrl', function($scope, service, $state, $http) {
  $scope.test = service.serviceTest

  function home() {
      $("html, body").animate({ scrollTop: "0" }, 1000)

  }

  function about() {
      $("html, body").animate({ scrollTop: "2777" }, 1000)

  }

  function onpage() {
    $(document).ready(function() {
      var state = $state.current.name
      console.log(state)

      $("#" + state).css("border", "2px solid white")

    })
  }

  onpage()

// <===========================================JAVASCRIPT==========================================================>
})

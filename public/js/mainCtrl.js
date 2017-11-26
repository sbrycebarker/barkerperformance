angular.module('app').controller('mainCtrl', function($scope, service) {
  $scope.test = service.serviceTest
})
